const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// comment schema
  const commentSchema = new Schema ({
      userId: {
         type:String,
         required: true
      },
      comment: {
        type: String,
        required: true
      },
      likes: {
        type: Number
      },
      dislikes: {
        type: Number
      },
      newsId: {
        type: String,
        required: [true, "The news id is required"]
      }
    },
    {timestamps: true}
 );


const Comment = mongoose.model("Comment". commentSchems);
module.exports = Comment;
