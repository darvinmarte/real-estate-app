const { Schema, model } = require("mongoose");

const forumTopicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const ForumTopic = model("ForumTopic", forumTopicSchema);

module.exports = ForumTopic;
