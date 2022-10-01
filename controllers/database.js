
const express = require('express');
const fs = require('fs');
const router = express.Router();
const { MongoClient } = require('mongodb-legacy');
const uri = process.env.MONGODB_CONNECTION_URI;
const client = new MongoClient(uri);
const dbName = 'users';


router.route('/login')
    .post(async (req,res)=>{
      console.log('Req login');
        let doesUserExist = false;

        // MongoDB conection.
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('users');

        // Checks if user already exists in db.
        const query = {"uid":req.body.uid};
        const cursor = collection.find(query);
        const values = await cursor.toArray();

        if(values.body) {
          console.log('hey')
          doesUserExist=true
        };
        // Add user if it doesnt exists.
        if(!doesUserExist){
          console.log('user does not exists');
          addNewUserToDatabase(collection,req.body);
        }
    });
module.exports = router;

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