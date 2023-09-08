const { useForkRef } = require("@mui/material");
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
  login: async (parent, { email, password }) => {
    console.log(email, password )
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(user);
      return { token, user };
    }
}
};

module.exports = resolvers;
