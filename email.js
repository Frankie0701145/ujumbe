const sgMail = require('@sendgrid/mail');
const config = require('config');
sgMail.setApiKey(config.get("SendgridApi.key"));
const msg = {
  to: 'test@example.com',					//receiver's email
  from: 'test@example.com',			//sender's email
  subject: 'I think its working',				//Subject
  text: 'and finally  i can send email from sendgrid',		//content
  html: 'and easy to do anywhere, even with Node.js',			//HTML content
};
sgMail.send(msg);
