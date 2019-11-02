const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const config = require("../config");

router.post('/register',(req,res,next) => {
    const {email,password} = req.body
    User.findOne({email}).then(result => {
      console.log(result);
      let newuser;
      if (!result) {
        bcrypt.hash(req.body.password, 10).then(hash => {
          newUser = new User({
            email: req.body.email,
            password: hash,
          })
        console.log(newUser);
        newUser.save().then(result => {
              res.status(201).json({
                message: "User signup successfully"
              });
            })
            .catch(err => {
              console.log(err)
              res.status(500).json({
                message: "User signup failed"
              });
            });
        }).catch(err =>{
        	console.log(err);
        	res.status(400).json({
        		message:"Unknown error occured"
        	});
        });
      } else {
        res.status(401).json({ message: "User with this email id and name already exists" });
      }
});
});

router.post('/login',(req,res,next) => {
    let fetchedUser;
    return User.findOne({ email: req.body.email })
      .then(user => {
        console.log(req.body);
        if (!user) {
          return res.status(401).json({ message: "Invalid email or password" });
        } else {
          console.log("hello");
          fetchedUser = user;
          return bcrypt.compare(req.body.password, user.password);
        }
      })
      .then(result => {
        console.log(result);
        if (!result) {
          return res.status(401).json({ message: "Wrong Credentials" });
        } else {
          const token = jwt.sign(
            {
              useremail: fetchedUser.email,
              userId: fetchedUser._id 
            },
            config.JWT_KEY,
            { expiresIn: "2400h" }
          );
          res.status(200).json({
            token: token,
            expiresIn: "3600",
            userId: fetchedUser._id,
            message:"Logged in successfully"
          });
          console.log(token);
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(401).json({
          message: "Invalid details"
        });
      });
})
module.exports = router;