require('dotenv').config()
const express =require('express')
const bodyParser=require('body-parser')
const cors=require ('cors')
const app=express()
const session = require('express-session');
const path = require('path');
const port =require('./config/index').server.port
const passport = require('passport')
console.log(port);

const user = require('./routes/user');


const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}


app.use(session({
  name: 'gAuth',
  secret: 'Xpecj@1dj12',
  resave: true,
  saveUninitialized: true
}));



app.use(passport.initialize());
app.use(passport.session());


require('./passport-setup')


app.use('/google', user);

const db = require('./models');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/', passport.authenticate('google', { scope: ['profile', 'email'] },{ failureRedirect: '/failed' }),
function(req, res) {
  console.log(req.user.email)
  
  // Successful authentication, redirect home.
  res.redirect('/success');
}
);

db.sequelize.sync({force:false})
  .then(()=> console.log('successfully synced with DB'))
  .catch((err)=> console.log("Sync error", err))


app.use('/', user);





// set port, listen for requests
app.listen(port,()=>{
  console.log("Localhost server is running....");
})