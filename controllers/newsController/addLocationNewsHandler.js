const newsModel = require("../../models/newsModel");
const userModel = require("../../models/userModel");
const getNewsParams = (req) => {

      let addNewsParams ={
        title: req.body.title,
        text: req.body.text,
        coordinate: {
          coordinate: req.body.location.split(',')
        },
        user: req.user.id
      };

      return addNewsParams
};

const addNewsHandler = (req, res, next)=>{
    let addNewsParams = getNewsParams(req);
    console.log(addNewsParams);
    const news = new newsModel(addNewsParams);
    news.save(addNewsParams).
      then((newNews)=>{
        userModel.findById(req.user.id).
         then((user)=>{
            user.news.push(newNews.id);
            user.save().
             then((user)=>{
                console.log("news saved succcessfully");
                req.flash("success", "News saved successfully");
                res.redirect('/');
            });
        }).
         catch((err)=>{
            console.log(err);
            next(err);
        });
      }).
      catch((err)=>{
        console.log(err);
        let errors = []
        for(errName in err.errors){
          errors.push({message:err.errors[errName].message});
        }
        res.render('addNews',{
          req: req,
          successMessages: req.flash("success"),
          validationErrors: errors,
          errors: req.flash(err),
          locations:req.user.locations
        });
    });
};

module.exports = addNewsHandler;
