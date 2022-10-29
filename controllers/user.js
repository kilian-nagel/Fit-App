const express = require('express');
const router = express.Router();
const fs = require('fs');
const userModel = require('../models/users.js');

router
    .route('/updateUserData')
    .put(async (req,res)=>{
        userModel.updateOne({uid:req.body.user.uid},{$set:{data:req.body.user.data}},(err,doc)=>{
            if(err) console.log(err);
            res.send("data send.");
        });
    });

module.exports = router;