const NewsModel = require("../../models/newsModel");
const UserModel = require("../../models/userModel");
//disagree endPoint
module.exports = (req, res, next)=>{
    NewsModel.findById(req.params.newsId)
      .then((news)=>{
        if(news){
          UserModel.findById(req.user.id)
            .then((user)=>{
              //make sure the user did not previously disagree with the news
              let newsDisagreeIndex = user.disagrees.findIndex(id => id==req.params.newsId);
              if(newsDisagreeIndex!==-1){
                //if the user had previously disagreed return with an error
                req.flash('err', 'You have previously disagreed with this news');
                return res.redirect(`/showLocationNews/${req.params.newsId}`);
              }
              //find if the user had previously agreed with the news
              let newsAgreeIndex = user.agrees.findIndex(id => id==req.params.newsId);
              let didPreviouslyAgree = false;

              if(newsAgreeIndex!==-1){
                // remove the agree if they had previously agreed
                user.agrees.splice(newsAgreeIndex, 1);
                didPreviouslyAgree=true;
              }

              user.disagrees.push(news.id);
              user.save().then((user)=>{
                news.disagree(didPreviouslyAgree).then((news)=>{
                  req.flash("success", "Disagreed successfully");
                  res.redirect(`/showLocationNews/${req.params.newsId}`);
                }).catch((err)=>{
                  console.log(err);
                  res.status("500").send();
                });
              }).catch((err)=>{
                console.log(err);
                res.status("500").send();
              });
            })
            .catch((err)=>{
              console.log(err);
              res.status("500").send();
            });
        }else{
          return res.status("404").send();
        }
      }).catch((err)=>{
        console.log(err);
        res.status("500").send();
      });
};
