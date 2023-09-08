const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat.js')

const listingCommentSchema = new Schema({
        zID: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        authorName: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true,
        }
    });


const ListingComment = model("listingComment", listingCommentSchema);

module.exports = ListingComment;
