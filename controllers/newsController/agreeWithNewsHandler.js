const NewsModel = require("../../models/newsModel");
const UserModel = require("../../models/userModel");
//agree end Point
module.exports =  (req, res, next)=>{
    NewsModel.findById(req.params.newsId)
      .then((news)=>{
        if(news){
          UserModel.findById(req.user.id)
            .then((user)=>{
              //find if the user had previously disagreed with the news
              let index = user.disagrees.findIndex(id => id===req.params.newsId);
              let didPreviouslyDisagree;
              if(!(index==-1)){
                //if user had previously disagreed with the news remove it
                console.log("inside the if");
                user.disagree[index].remove();
                didPreviouslyDisagree = true;
              }
              user.agrees.push(news.id)
              user.save().then((user)=>{
                news.agree(didPreviouslyDisagree).then((news)=>{
                  res.status("202").redirect(`/locationNews/${req.params.locationId}`);
                }).catch((err)=>{
                  console.log(err);
                  res.status("504").send();
                });
              }).catch((err)=>{
                console.log(err);
                res.status("504").send();
              });
            }).catch((err)=>{
              console.log(err);
              res.status("504").send();
            });
        }else{
          return res.status("404").send();
        }
      }).catch((err)=>{
        console.log(err);
        res.status("504").send();
      });
};
