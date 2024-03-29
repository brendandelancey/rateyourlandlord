// // //Will be named post.js(this needs to be renamed) or review.js
const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;
const Rating = require('../../model/Rating');
const InitialPost = require('../../model/InitialPost');
const jwtDecode = require("jwt-decode");

// ! May change this to async await syntax

router.get('/',  async (req,res) => {
    // const IP_Object= await InitialPost.find({id: req.params.id})

    // const objectofRatings= await Rating.find({IPid: req.params.id})

    //   try {
    //       res.send(IP_Object+objectofRatings);
    //     } catch (err) {
    //       res.status(500).send(err);
    //     } 
    const IPidRatings=
    {
        IPid: req.query.IPid
    }
 // console.log("New get ratings Call:");
 // console.log(req.query.IPid);
    const object = await Rating.find(IPidRatings);
        // Query by ID of Initial Post
        
    try {

     // console.log(" Objects Found: "+ JSON.stringify(object));
        
        if (object.length===0){
            res.send(null);
         // console.log("Nothing Found &&&&&&&&&&&")
         // console.log("Null Objects: "+ JSON.stringify(object));
        }
        else{
            res.send(object);
         // console.log("Objects Found");
         // console.log("SUCCESS Objects: "+ JSON.stringify(object));
        }
        
        } catch (err) {
            res.status(500).send(err);
         // console.log("FAILURE");
        }
});

router.post('/', (req,res) => {
    // ! Data Evaluation needed
    InitialPost.findOne({
        // Query by ID of Initial Post
        id: req.body.IPid

    }).then(IP =>{
        if (!IP){
            return res.status(404).json({
                msg: "Landlord could not be found",
                success: false
            });
        }
        else {
           
            // New Average Rating
            const oldAverage= IP.ratingAverage
            const oldTotal= IP.ratingNumber
         
            IP.ratingAverage = (+(oldTotal* oldAverage) + +req.body.rating)/(oldTotal+1)
            // New Total Ratings
            IP.ratingNumber= IP.ratingNumber+1
           

            InitialPost.updateOne(
                {"id" : req.body.IPid},
                {$set: {
                    id: IP.id, 
                    landlordfirstname: IP.landlordfirstname,
                    landlordlastname: IP.landlordlastname,
                    street: IP.street,
                    ratingNumber: IP.ratingNumber,
                    ratingAverage: IP.ratingAverage,
                    city: IP.city,
                    province: IP.province,
                    country: IP.country
            }
        
            }).then(()=>{
                const newRating= new Rating({
    
                    IPid: req.body.IPid,//This should be the same as the IP from above 
                    review: req.body.review,
                    rating: req.body.rating,
                    // username:req.body.username,//Not sure what it does if no username, but its not required
                    // username:jwtDecode(req.headers.authorization).username//this should be same as username of user posting -> token?
                });
       
                newRating.save() 
                .then(()=>{
                    return res.status(200).json({status:"ok"})
                }).catch(()=>{
                    return res.status(400).json({error:"Error creating an review for this landlord"});
                }) 
                
            }).catch(()=>{
                return res.status(400).json({error:"Error updating landlord rating average"});
            });     
            
        }
    }).catch(()=>{
    return res.status(400).json({error:"Error in finding landlord"});
    })
    
});


module.exports = router;