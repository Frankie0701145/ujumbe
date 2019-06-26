const sgMail = require('@sendgrid/mail');
const jwt = require("jsonwebtoken");

module.exports = function(user, req, cb){

      //setting up the
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      let accesstoken = jwt.sign({id: user.id}, process.env.JWT_KEY, {expiresIn: '1h'});

      let link = `${req.headers.host}/resetPassword/${accesstoken}`;
      const msg = {
        to: `${user.email}`,					//receiver's email
        from: 'noreply@ujumbe.com',			//sender's email
        subject: 'Password Reset',				//Subject
        text: `
                Dear ${user.firstName}
                Password Reset for Your ujumbe Account
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
      sgMail.send(msg, cb); //cb function takes an error  and json
};
