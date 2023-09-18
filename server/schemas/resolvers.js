const { useForkRef } = require("@mui/material");
const { User, ForumTopic, ListingComment } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {

  Query: {
    //User query resolvers
    // profiles: async () => {
    //   return User.find();
    // },

    // profile: async (parent, { profileId }) => {
    //   return User.findOne({ _id: profileId });
    // },
    //Forum query resolvers
    getAllForumTopics: async () => {
      return ForumTopic.find().sort({ createdAt: -1 });
    },

    getOneForumTopic: async (parent, { topicId }) => {
      return ForumTopic.findOne({ _id: topicId });
    },
    // ListingComment query resolvers
    listingComments: async (_, { zillowId }) => {
      return ListingComment.findOne({ zillowID: zillowId });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    checkout: async (_, { amount }, context) => {
      const url = new URL(context.headers.referer).origin;

      const line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "donation",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // removeProfile: async (parent, { profileId }) => {
    //   return User.findOneAndDelete({ _id: profileId });
    // },
    // only if user is logged in be able to delte

    login: async (parent, { email, password }) => {
      // console.log(email, password);
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    addForumTopic: async (parent, { title, content }, context) => {
      if (context.user) {
        const topic = await ForumTopic.create({
          title,
          content,
          author: context.user.name,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: topic._id } }
        );

        return topic;
      }
      throw AuthenticationError;
    },

    removeForumTopic: async (parent, { topicId }, context) => {
      if (context.user) {
        const topic = await ForumTopic.findOneAndDelete({
          _id: topicId,
          author: context.user.name,
        });

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: topic._id } }
        );
        return user;
      }
      throw AuthenticationError;
    },

    addForumComment: async (parent, { topicId, commentText }, context) => {
      if (context.user) {
        return ForumTopic.findOneAndUpdate(
          { _id: topicId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.name },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },

    removeForumComment: async (parent, { topicId, commentId }, context) => {
      if (context.user) {
        return ForumTopic.findOneAndUpdate(
          { _id: topicId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.name,
              },
            },
          },
          { new: true, runValidators: true }
        );
      }
      throw AuthenticationError;
    },

    //if it doesnt exist create it
    addListingComment: async (
      _,
      { zillowID, comment, authorName },
      context
    ) => {
      if (context.user) {
        // const listingComment = await ListingComment.create(args)
        // return listingComment

        //find if the id exists in database,
        const data = await ListingComment.findOneAndUpdate(
          { zillowID: zillowID },
          {
            //add comment to comment array
            $addToSet: {
              comments: { comment, authorName },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        if (!data) {
          const newData = await ListingComment.create({
            zillowID: zillowID,
            comments: [
              {
                comment,
                authorName,
              },
            ],
          });
          return newData;
        } else {
          return data;
        }
      }
      throw AuthenticationError;
    },


    removeComment: async(
      parent, { zillowId, commentId },context)=>{
    //if the user is logged in
    if(context.user){
      const {data} = await ListingComment.findOneAndUpdate(
        {zillowID: zillowId},
        {
          $pull:{
            comments:{
              _id: commentId,
              authorName: context.user.name
            }
          }
        },{
          new: true, runValidators: true 
        }
        )
        return data;
      }
      throw AuthenticationError;
    }

  },
}
  
module.exports = resolvers;
