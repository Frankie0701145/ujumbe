//Controller to send the reset password link to the email provided


const userModel = require('../models/usersModel');
const sgMail = require('@sendgrid/mail');
const jwt = require("jsonwebtoken");

sgMail.setApiKey("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");

module.exports = function(req, res, next){
    console.log("starting sending the reset email");
    userModel.findOne({email: req.body.email}, function(err, user){
      //if err pass the err to the error handler
      if(err){
        console.log(err);
        return next(err)
      }
      //if no error
      else{
        //if their is no user with that email
        if(!user){
          req.flash("err", "User With that email does not exist");
          res.redirect("/forgotPassword");
        }
        //if there is a user with that email
        else{
          let accesstoken = jwt.sign({id: user.id}, "secret", {expiresIn: '1h'});
          let link = `${req.headers.host}/resetPassword/${accesstoken}`;
          const msg = {
            to: `${user.email}`,					//receiver's email
            from: 'noreply@UjamaaWatch.com',			//sender's email
            subject: 'Password Reset',				//Subject
            text: `
                    Dear ${user.firstName}
                    Password Reset for Your UjamaaWatch Account
                    To reset the password click on the link below. If you did not request for a password reset don\'t worry just ignore the link.
                    ${link}
                  `
            ,		//content
            html: ` <html>
                    <h2> Dear ${user.firstName}</h2>
                    <h3>Password Reset </h3>
                    <body>
                      <p>To reset the password click on the link below. If you did not request for a password reset don\'t worry just ignore the link.</p>
                      <a href= "${link}">${link}</a>
                    </body>
                    </html>
                  `,			//HTML content
          };
          sgMail.send(msg, function(err, json){
            if(err){
              console.log(err);
              req.flash("err", `Password Reset link would not be sent to this email. Try again later ${user.email}.`);
              res.redirect("/forgotPassword");
            }else{
              console.log("email sent sucessfully");
              let message = "Password Reset link sent to this email " + user.email;
              req.flash("success", message);
              res.redirect("/forgotPassword");
            }
          });

        }
      }
    });
};
