// //Will be named post.js(this needs to be renamed) or review.js
const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;
const InitialPost = require('../../model/InitialPost');
const Rating = require('../../model/Rating');
const jwtDecode = require("jwt-decode");

// ! May change this to async await syntax

//Note:This is were all the search requests are pushed through 
//     because the ratings will be stored in reference to the initial
//     posts.
//

//Get Initial Posts: Name and City-> This is initial posts and is where all the 
//                     searchable information is stored. If any 
//                     additional ratings are tied to this initial
//                     post than they will come up when the post
//                     is clicked on.
//Note: There Should Always be one additional rating to every post
//      if the last one is removed the initial post shoould be removed



//                    **Probably best solution is to post two types of
//                    objects seperately within function
router.post('/', (req,res) => {
    const id =uuid.v4();
    // ! Needs data validation
    const newInitialPost = new InitialPost({
      //? Could just use the objects id
        id: id, 
        landlordfirstname: req.body.landlordfirstname,
        landlordlastname: req.body.landlordlastname,
        street: req.body.street,
        ratingNumber: 1,
        ratingAverage: req.body.rating,
        city: req.body.city,
        province: req.body.province,
        country: req.body.country
    });

  
    
   

    // newRating.save();
    // res.send("IP",newInitialPost.id,"Rating",newRating.IPid);
 // console.log(newInitialPost)
    newInitialPost.save()
    .then(()=>{
      const newRating= new Rating({
    
        IPid: id,//This should be the same as the IP from above 
        review: req.body.review,
        rating: req.body.rating,
        username:req.body.username,//Not sure what it does if no username, but its not required
        // username:jwtDecode(req.headers.authorization).username//this should be same as username of user posting -> token?
      });

      newRating.save() 
      .then(()=>{
          return res.status(200).json({status:"ok"})
      }).catch(()=>{
          return res.status(400).json({error:"Error creating an review for this landlord"});
      }) 
    }).catch(()=>{
        return res.status(400).json({error:"Error creating an initial post"});
    })
    
});


// router.get('/searchresults/landlordratings/:id', async(req,res) => {
//     const IP_Object= await InitialPost.find({id: req.params.id});

//     const objectofRatings= await Rating.find({IPid: req.params.id});

//     try {
//         res.send(IP_Object+objectofRatings);
//       } catch (err) {
//         res.status(500).send(err);
//       }
        
// });



module.exports = router;