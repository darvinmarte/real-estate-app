const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat.js')

const listingCommentSchema = new Schema({
    
        zillowID: {
            type: String,
            required: true
        },
        comments:[
            {  

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
            }
        ]
    },
    {
        toJSON: {
            getters: true,
        }
    });


const ListingComment = model("ListingComment", listingCommentSchema);

module.exports = ListingComment;
