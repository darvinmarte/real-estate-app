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
};

module.exports = resolvers;
