
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




// ! May be moving this into initial post since this is technically where it belongs

// router.get('/advanced', async (req,res) => {
//     //Advanced search
//     if (req.body.landlordname && req.body.street && req.body.city && req.body.province && req.body.country)
//     {
//         const objectofIPs= await InitialPost.find({
//             landlordname: req.body.landlordname,
//             street: req.body.street,
//             city: req.body.city,
//             province: req.body.province,
//             country: req.body.country
//         });
//         try {
//             res.send(objectofIPs);
//           } catch (err) {
//             res.status(500).send(err);
//           }
//     }
//     else{
//       return res.status(400).json({error:"Error finding landlord using advanced search"});
//     }
// });


// ! Need to check if properties are empty cause the search to fail

router.get('/address', async (req,res) => {
  // ! Data validation needed
    //Address search
    // if (req.body.street && req.body.city && req.body.province && req.body.country)
    // {
      // console.log(req.body.street)
      const objectofIPs=
      { 
        street: req.body.street,
        city: req.body.city,
        province: req.body.province,
        country: req.body.country
      }
      // Removes Empty Parameters, these searches should be aloud to be variable
      Object.keys(objectofIPs).forEach(key => objectofIPs[key] === undefined && delete objectofIPs[key])

      const object= await InitialPost.find(objectofIPs  
      );
      try {
          res.send(object);
        } catch (err) {
          res.status(500).send(err);
        }
    // } 
    // else{
    //   return res.status(400).json({error:"Error finding landlord by address"});
    // }
});
router.get('/landlord', async (req,res) => {
  // ! Data validation needed
    //Landlord search
    // if (req.body.landlordfirstname && req.body.city)
    // {
      const objectofIPs=
      { 
        landlordfirstname: req.body.landlordfirstname,
        landlordlastname: req.body.landlordlastname,
        //Note: Not sure if needed
        // city: req.body.city
      }
      // Removes Empty Parameters, these searches should be aloud to be variable
      Object.keys(objectofIPs).forEach(key => objectofIPs[key] === undefined && delete objectofIPs[key])
     
      const object= await InitialPost.find(objectofIPs
      );
      try {
          res.send(object);
        } catch (err) {
          res.status(500).send(err);
        }
    // }
    // else{
    //   return res.status(400).json({error:"Error finding landlord"});
    // }
});

module.exports = router;