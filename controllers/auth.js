
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/users.js');
const uri = process.env.MONGODB_CONNECTION_URI;

mongoose.connect(uri)
  .then(()=>{console.log('connected.');})
  .catch((err)=>{console.log(err);})

router.route('/login')
    .post(async (req,res)=>{
        // Search if user already in db.
        let doesUserExist = await userModel.find({uid:req.body.uid}).catch(err=>{console.log(err)});
        doesUserExist = Boolean(doesUserExist.length);
        
        // Add user if it doesnt exists.
        if(!doesUserExist){
          res.redirect(307,'../../user/createNewUser');
        } else {
          res.sendStatus(200);
        }
    });

module.exports = router;