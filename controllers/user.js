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

router
    .route('/getUserData')
    .post(async (req,res)=>{
        let query = await userModel.findOne({uid:req.body.uid}).catch(err=>{console.log(err);})
        res.send(query);
    })

router
    .route('/createNewUser')
    .post(async (req,res)=>{
        const user = {
            uid:req.body.uid,
            username:req.body.username,
            data:{
              trainings:[],
              body:{
                bodyfat:[],
                weight:[]
              }
            },
            settings:{
              darkmode:false,
              layout:'defaut'
            }
        };
        console.log(user);
        userModel.create(user)
        .catch(err=>{
          console.log(err);
        });
    })

module.exports = router;