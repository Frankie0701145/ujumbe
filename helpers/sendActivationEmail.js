const sgMail = require('@sendgrid/mail');
const jwt = require("jsonwebtoken");

module.exports =  function(user, req, cb){

  sgMail.setApiKey("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");
  let accesstoken = jwt.sign({id: user.id}, "secret", {expiresIn: '3days'});

  let link = `${req.headers.host}/activateAccount/${accesstoken}`;
  const msg = {
    to: `${user.email}`,					//receiver's email
    from: 'noreply@UjamaaWatch.com',			//sender's email
    subject: 'Account Activation',				//Subject
    text: `
            Dear ${user.firstName}
            Account Activation for Your UjamaaWatch Account
            To activate account click on the link below. If you did not register in UjamaaWatch ignore the link below.
            ${link}
          `
    ,		//content
    html: ` <html>
            <h2> Dear ${user.firstName}</h2>
            <h3>Account Activation for Your UjamaaWatch Account </h3>
            <body>
              <p>To activate account click on the link below. If you did not register in UjamaaWatch ignore the link below.</p>
              <a href= "${link}">${link}</a>
            </body>
            </html>
          `,			//HTML content
  };
  sgMail.send(msg, cb); //cb function takes an error  and json
};
