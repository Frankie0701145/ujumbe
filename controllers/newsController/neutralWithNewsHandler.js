const NewsModel = require("../../models/newsModel");
const UserModel = require("../../models/userModel");

module.exports = (req, res, next)=>{

  NewsModel.findById(req.params.newsId)
    .then((news)=>{
        if(!news){
          res.status("400").send();
        }else{
          UserModel.findById(req.user.id)
            .then((user)=>{
                if(!user){
                  return res.status("400").send();
                }else{
                  let didPreviouslyAgree = false;
                  let didPreviouslyDisagree = false;
                  //find if the user had previously agreed or previously disagree
                  let newsAgreeIndex = user.agrees.findIndex(id => id==req.params.newsId);
                  let newsDisagreeIndex = user.disagrees.findIndex(id => id==req.params.newsId);

                  if(newsAgreeIndex!==-1){
                    //if the user had previously agreed
                    user.agrees.splice(newsAgreeIndex,1);
                    didPreviouslyAgree = true;
                  }else if (newsDisagreeIndex!==-1){
                    //if the user had previously disagreed
                    user.disagrees.splice(newsAgreeIndex,1);
                    didPreviouslyDisagree = true;
                  }else{
                    req.flash("err", "Can't neutralise it is already neutral");
                    return res.redirect(`/showLocationNews/${req.params.newsId}`);
                  }
                  //save the user
                  user.save()
                   .then((user)=>{
                     //save the news
                     news.neutral(didPreviouslyAgree,didPreviouslyDisagree)
                        .then((news)=>{
                          req.flash("success", "Neutralised successfully");
                          res.redirect(`/showLocationNews/${req.params.newsId}`);
                        }).catch((err)=>{
                          console.log(err);
                          res.status("500").send();
                        });
                   })
                   .catch((err)=>{
                      console.log(err);
                      res.status("500").send();
                   });
                }
            })
            .catch((err)=>{
              console.log(err);
              res.status("500").send();
            });
        }
    }).catch((err)=>{
      console.log(err);
      res.status("500").send();
    });

}
