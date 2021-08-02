const db = require("../models");
// const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const env = process.env.NODE_ENV || 'local';
const c = require('../config/config.json')[env];
const fs = require("fs");
const passport=require("passport")
const adminCred = {
    name: "admin",
    email: "superAdmin@mail.com",
    role: 1,
    password: "SuperAdmin",
    mobile: "9999999999"
};
module.exports = {
    adminSeed: async (req, res) => {
        try {
            const salt = await bcryptjs.genSalt(10);
            adminCred.password = await bcryptjs.hash(adminCred.password, salt);
            const adminseed = await db.user.create(adminCred)
            return res.status(200).json({
                success: true,
                message: "Admin seeded Successfully",
                data: { adminseed }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Something went wrong",
            });
        }
    },
    doLogin:async(req,res)=>{
        try {
            console.log("hi");
            const goauth = await  passport.authenticate('google',{scope:['profile','email']}, { failureRedirect: '/failed' })
            // const veauth= await passport.authenticate('google', { failureRedirect: '/failed' })
            
            res.json({
                success:true,
                message:"login succesfully",
                data:{goauth,veauth}
                
            })
        } catch (error) {
            
        }
    }
}