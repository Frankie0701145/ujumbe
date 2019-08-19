const NewsModel = require("../../models/newsModel");
const UserModel = require("../../models/userModel");
const CommentModel = require("../../models/commentModel");




module.exports = async (req, res, next)=>{

    comment = {
      comment: req.body.comment,
      news: req.body.newsId,
      user: req.user.id
    };
    try{
        comment = await CommentModel.create(comment);
        //find the logged in user
        let user = await UserModel.findById(req.user.id);
        //add the comment to the user record
        user.comments.push(comment.id);
        //save the user
        let updatedUser = await user.save();
        //find the news that is commented
        let news = await NewsModel.findById(req.body.newsId);
        //add the comment to the news record
        news.comments.push(comment.id);
        //save the news
        let updatedNews = await news.save();
        comment.name = req.user.firstName;
        let name = req.user.firstName + req.user.lastName;
        data = {
          comment:comment,
          name: name
        }
        res.status("201").send(data);
    }
    //handler validation error later
    catch(err){
        console.log("Inside the catch block");
        console.log(err);
        res.status("500").send();
    }
};
