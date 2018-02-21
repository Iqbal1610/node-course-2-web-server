const express=require('express');
const hbs=require('hbs');//handlebarjs load

const fs=require('fs');
var app=express();

hbs.registerPartials(__dirname+'/views/partials');

// call handlebarjs
app.set('view engine','hbs');
//for static url pass

 app.use((req,res,next)=>{
   var now=new Date().toString();
   var log=`${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log',log +'\n');
   next();
 });
 // app.use((req,res,next)=>{
 //   res.render('maintenance.hbs');
 // });

 app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
//  res.send('<h1>Hello Express</h1>');
// res.send({
//   name:'Iqbal',
//   likes:[
//     'Biking',
//     'Cities'
//   ]
// });//by using Express
res.render('home.hbs',{
  pageTitle:'Home page',
  welcomeMessage:'Wel come to my website',
  //currentYear:new Date().getFullYear()
});

});

app.get('/about',(req,res)=>{
  //res.send('This is About page');//using express
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear:new Date().getFullYear()
  });//using handlebarjs
});

// /bad - send back json with errorMessage
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to handle request'
  })
})
app.listen(3000,()=>{
  console.log('Server is up on port 3000');
});
