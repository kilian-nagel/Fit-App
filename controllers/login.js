
const express = require('express');
const router = express.Router();
const fs = require('fs');

router
    .route('/login')
    .post((req,res)=>{
        let isUserValid = true;

        // Check if user already in database.
        fs.readFile('./models/users.json',(err,data)=>{
            if (err) throw err

            users = JSON.parse(data);
            for(let user of users){
                if(user.uid === req.body.uid){
                    isUserValid = false
                }
            }
        })

        // Adding user to database if all previous tests passsed
        fs.readFile('./models/users.json',(err,data)=>{
            if (err) throw err

            let users = JSON.parse(data);
            if(isUserValid){
                let user = {
                    username:req.body.username,
                    uid:req.body.uid,
                    mail:req.body.email,
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
                users.push(user);
                users = JSON.stringify(users,null,'\t');
                fs.writeFile('./models/users.json',users,err=>{
                    if(err) throw err;
                });
            }
        })

        res.send('ok');
        res.end();
    })

router
    .route('/getUserData/:uid')
    .get((req,res)=>{
        fs.readFile('./models/users.json',(err,data)=>{
            if (err) throw err

            users = JSON.parse(data);
            for(let user of users){
                if(user.uid === req.params.uid){
                    res.send(user);
                    return;
                }
            }
        })
    });
module.exports = router;