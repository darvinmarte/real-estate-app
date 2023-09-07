const { Schema, model } = require("mongoose");

const forumCommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: "ForumTopic",
  },
});

const ForumComment = model("ForumComment", forumCommentSchema);

module.exports = ForumComment;
