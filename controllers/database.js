
const { query } = require('express');
const express = require('express');
const fs = require('fs');
const { Schema } = require('mongoose');
const router = express.Router();
const mongoose = require('mongoose');
const usersModel = require('../models/users.js');
const uri = process.env.MONGODB_CONNECTION_URI;

mongoose.connect(uri)
  .then(()=>{console.log('connected.');})
  .catch((err)=>{console.log(err);})

router.route('/login')
    .post(async (req,res)=>{
        // Search if user already in db.
        let doesUserExist = await usersModel.find({uid:req.body.uid}).catch(err=>{console.log(err)});
        doesUserExist = Boolean(doesUserExist.length);

        // Templating user
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
        
        // Add user if it doesnt exists.
        if(!doesUserExist){
          usersModel.create(user)
          .catch(err=>{
            console.log(err);
          });
        }

        res.sendStatus(201);
    });
  
router
    .route('/getUserData')
    .post(async (req,res)=>{
      let cursor = await usersModel.find({uid:req.body.uid}).catch(err=>{console.log(err);})
      if(cursor.length){res.send(cursor[0]);}
    });

async function addNewUserToDatabase(collection,user){
  let new_user = {
    uid:user.uid,
    user:user.username,
    settings:{
        darkmode:false,
        layout:'default',
    },
    data:{
        trainings:[],
        body:{
            weight:[],
            bodyfat:[],
        },
    }
  }
  await collection.insertOne(new_user);
}

module.exports = router;