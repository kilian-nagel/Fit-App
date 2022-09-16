const express = require('express');
const router = express.Router();
const fs = require('fs');

router
    .route('/updateUserData')
    .put((req,res)=>{
        console.log('hello')
        training = req.body.training;

        fs.readFile('./models/users.json',(err,data)=>{
            if (err) throw err

            let users = JSON.parse(data);
            for(let user of users){
                if(user.uid === req.body.user.uid){
                    user.data.trainings.push(training);
                }
            }

            users = JSON.stringify(users,null,'\t');
            fs.writeFile('./models/users.json',users,(err)=>{
                if(err) throw err;
            })
        })

    })

module.exports = router;