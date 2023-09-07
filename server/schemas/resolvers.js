const { User, ForumTopic, ForumComment } = require("../models");
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    //User query resolvers

    //Forum query resolvers
    getAllForumTopics: async () => {
      return ForumTopic.find();
    },

    getOneForumTopic: async (parent, { topicId }) => {
      return ForumTopic.findOne({ _id: topicId });
    },

  
  },
  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
