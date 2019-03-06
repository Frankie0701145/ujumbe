const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// comment schema
  const commentsSchema = new Schema ({
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


const Comments = mongoose.model("comments". commentsSchems);
module.exports = Comments;
