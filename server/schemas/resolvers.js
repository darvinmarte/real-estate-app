const { useForkRef } = require("@mui/material");
const { User, ForumTopic, ListingComment } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    //User query resolvers

    //Forum query resolvers
    getAllForumTopics: async () => {
      return ForumTopic.find().sort({ createdAt: -1 });
    },

    getOneForumTopic: async (parent, { topicId }) => {
      return ForumTopic.findOne({ _id: topicId });
    },
    // ListingComment query resolvers
    listingComments: async(_, { zID }, context)=> {
      return ListingComment.find({ zillowID: zID})
    }
  },
  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      console.log(email, password);
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

    //if it doesnt exist create it
    addListingComment: async(_, {zillowID, comment, authorName}, context) => {
      if (context.user){
        // const listingComment = await ListingComment.create(args)
        // return listingComment

        //find if the id exists in database, 
        const data = await ListingComment.findOneAndUpdate(
          {zillowID: zillowID},
          {
          //add comment to comment array
          $addToSet:{
            comments:{ comment, authorName}
          }
        },{
          new: true,
          runValidators: true,
        }
      )
      if (!data){
        const newData = await ListingComment.create({
          zillowID: zillowID,
          comments:[{
            comment,
            authorName
          }]
        })
        return newData;
      }else{
        return data;
      }


    }
    throw AuthenticationError
    },
  },
};

module.exports = resolvers;
