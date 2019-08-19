const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// comment schema
  const commentSchema = new Schema ({
      user: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: [true, "The user id is required"]
      },
      comment: {
        type: String,
        required: [true, "The comment text is required"]
      },
      likes: {
        type: Number,
        default: 0
      },
      dislikes: {
        type: Number,
        default: 0
      },
      news: {
        type: Schema.Types.ObjectId,
        ref: "News",
        required: [true, "The news id is required"]
      }
    },
    {timestamps: true}
 );
commentSchema.pre("remove", function(next){
  console.log("!!!!!!!!!!The pre remove hook here!!!!!!!!!!!!!!!!!")
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
