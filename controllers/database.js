
const express = require('express');
const fs = require('fs');
const router = express.Router();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_CONNECTION_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

router.route('/login')
    .post(async (req,res)=>{
        let doesUserExist = false;

        // MongoDB conection.
        await client.connect();
        const db = client.db('users');
        const collection = db.collection('users');

        // Checks if user already exists in db.
        let query = await collection.find({'uid':req.body.uid});
        await query.forEach(console.dir);
        if(query){doesUserExist = true;}

        // Add user if it doesnt exists.
        if(!doesUserExist){
          addNewUserToDatabase(collection,req.body);
        }

        await client.close();
        res.send('ok');
    });
  
router
    .route('/getUserData')
    .post(async (req,res)=>{

      // Connection and init
      await client.connect();
      console.log('here');
      const db = client.db('users');
      const collection = db.collection('users');
      
      // Find user and its data
      let cursor = await collection.find({uid:req.body.uid});
      if(cursor){
        let user = cursor.forEach(console.dir);
        console.log(user);
        res.send(cursor.forEach(console.dir))
      }

      // End of the requests
      await client.close();
      res.end();
    })

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