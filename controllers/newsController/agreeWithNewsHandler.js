const NewsModel = require("../../models/newsModel");
const UserModel = require("../../models/userModel");
//agree end Point
module.exports =  (req, res, next)=>{
    NewsModel.findById(req.params.newsId)
      .then((news)=>{
        if(news){
          UserModel.findById(req.user.id)
            .then((user)=>{
              //make sure the user did not previously agree with the news
              let newsAgreeIndex = user.agrees.findIndex(id => id==req.params.newsId);
              if(newsAgreeIndex!==-1){
                req.flash('err', 'You have previously agreed with this news');
                return res.redirect(`/showLocationNews/${req.params.newsId}`);
              }
              //find if the user had previously disagreed with the news
              let newsDisagreeIndex = user.disagrees.findIndex(id => id==req.params.newsId);
              let didPreviouslyDisagree = false;

              if(newsDisagreeIndex!==-1){
                //if user had previously disagreed with the news remove it
                user.disagrees.splice(newsDisagreeIndex,1);
                didPreviouslyDisagree = true;
              }
              //add the news id
              user.agrees.push(news.id);
              user.save().then((user)=>{
                news.agree(didPreviouslyDisagree).then((news)=>{
                  req.flash("success", "Agreed successfully");
                  res.redirect(`/showLocationNews/${req.params.newsId}`);
                }).catch((err)=>{
                  console.log(err);
                  res.status("500").send();
                });
              }).catch((err)=>{
                console.log(err);
                res.status("500").send();
              });
            }).catch((err)=>{
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
