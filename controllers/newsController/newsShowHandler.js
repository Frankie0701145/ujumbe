const NewsModel = require("../../models/newsModel");
const UserModel = require("../../models/userModel");

module.exports = (req, res, next)=>{
      NewsModel.findById(req.params.newsId)
        .populate('user', 'firstName lastName')
        .populate({
          path: 'comments',
          options: {
            sort: {createdAt: "descending"}
          },
          populate: {
            path: 'user',
            select: 'firstName lastName'
          }
        })
        .exec()
        .then((news)=>{
          if(news){
            res.render('newsShow.ejs',{
               errors: req.flash("err"),
               successMessages: req.flash("success"),
               req: req,
               news: news
             });
          }else{
            res.status("400").send();
          }
        }).catch((err)=>{
          console.log(err);
          res.status("500").send();
        })
};
