const express = require('express');
const hbs = require('hbs')
const fs = require('fs')

var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req,res,next)=> {
var now = new Date().toString();
    console.log(now);
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) =>{
      if(err){
        console.log('unable to append to server log');
      }
    } )
    next();
})

// app.use((req, res, next) =>{
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req,res) => {
  res.render('help.hbs',{
    pageTitle : 'Blockchain',
    welcome : 'Welcome to my site',
    keywords : [
      'smart contracts',
      'solidity'
    ],
  //  currentYear : new Date().getFullYear()
  }
  )
})

//app.get('/',(req, resp) => {
//resp.send('<h1>hello express</h1>');
//resp.send({
  //name : 'Blockchain',
  //keywords : [
    //'smart contracts',
  //  'solidity'
//  ]
//})
//});

app.get('/about', (req,resp) => {
  //resp.send('inside about')
  resp.render('about.hbs', {
    pageTitle : 'About Page',
  //  currentYear : new Date().getFullYear()
  })
})


app.get('/bad', (req,res) =>{
  res.send({
    errorMessage : [
      'page not found',
      'page expired'
    ]
  })
})
app.listen(3000,() =>{
  console.log('server is up on port 3000');
});
