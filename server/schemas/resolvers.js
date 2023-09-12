const { useForkRef } = require("@mui/material");
const { User, ForumTopic, ListingComment } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

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
      return ForumTopic.find();
    },

    getOneForumTopic: async (parent, { topicId }) => {
      return ForumTopic.findOne({ _id: topicId });
    },
    // ListingComment query resolvers
    listingComments: async(_, { zID }, context)=> {
      return ListingComment.find({ zID: zID})
    },
    
    me: async (parent, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('posts');
      }
      throw new AuthenticationError('You need to be logged in!');
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
          { _id: thoughtId },
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

    addListingComment: async(_, args, context) => {
    if (context.user){
      const listingComment = await ListingComment.create(args)
      return listingComment
    }
    throw AuthenticationError
    },
  },
};

module.exports = resolvers;
