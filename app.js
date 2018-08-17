const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let nodemailer = require('nodemailer');
let app = express();
var gulp = require('gulp');
var sass = require('gulp-sass');

// Load views and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Setting public folder for statis assets
app.use(express.static(path.join(__dirname, 'vendor')));

app.post('/send', (req, res) => {
  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        type: 'OAuth2',
        user: "infinityteam66@gmail.com", // Your gmail address.
        clientId: "73021354819-88765p7bdlc5rr8s1ddhms2aeoqgvm5h.apps.googleusercontent.com",
        clientSecret: "VrYdny3F6uH3vMZw4KEI9h9Z",
        refreshToken: "1/mqzCe7PJ-9nyPwnqlmuOI-sz1KjlI4fxEGS0WmXQhMo"
    }
  });
  // Setup mail configuration
let mailOptions = {
  from: '"Humaiz Anjum" <infinityteam66@gmail.com>', // sender address
  to: 'adil.waqar78@hotmail.com', // list of receivers
  subject: 'Contact', // Subject line
  text: 'asd'
  // html: `<h5>Contact Details: </h5>
  //   <ul>
  //     <li>${req.body.name}</li>
  //     <li>${req.body.email}</li>
  //     <li>${req.body.phone}</li>
  //   </ul>
  //   <br>
  //   <p>${req.body.message}</p>
 // ` // html body
};
// send mail
smtpTransport.sendMail(mailOptions, function(error, info) {
  if (error) {
    sails.log.debug(error);
    return res.notOk({
      status: 'error',
      msg: 'Email sending failed'
    })
  } else {
    // console.log('Message %s sent: %s', info.messageId, info.response);
    // return res.ok({
    //   status: 'ok',
    //   msg: 'Email sent'
    // })
    res.send('SUCCESS');
  }
  smtpTransport.close();
});
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(4000, (err) => {
  console.log('Server started on port 4000');
});