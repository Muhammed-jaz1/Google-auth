const express = require('express');
const { doLogin } = require('../controllers/auth');
const router = express.Router();

router.get('/',(req,res)=>{
  res.render("login/index.ejs")
})


module.exports=router