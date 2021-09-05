
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

router.get('/advanced', async (req,res) => {
    //Advanced search
    
    var objectofIPs= {
        landlordfirstname: req.query.firstname,
        landlordlastname: req.query.lastname,
        street: req.query.street,
        city: req.query.city,
        province: req.query.province,
        country: req.query.country
    }
    Object.keys(objectofIPs).forEach(key => objectofIPs[key] === undefined || objectofIPs[key] === "" && delete objectofIPs[key])

    console.log("Advanced New Object: "+ JSON.stringify(objectofIPs));
    
    const object= await InitialPost.find(objectofIPs);

    try {

      console.log("Advanced Objects Found: "+ JSON.stringify(object));
      
      if (object.length===0){
        res.send(null);
        console.log("Nothing Found &&&&&&&&&&&")
        console.log("Null Objects: "+ JSON.stringify(object));
      }
      else{
        res.send(object);
        console.log("Objects Found");
        console.log("Advanced SUCCESS Objects: "+ JSON.stringify(object));
      }
      
      } catch (err) {
        res.status(500).send(err);
        console.log("FAILURE");
      }



});


// ! Need to check if properties are empty cause the search to fail

router.get('/address', async (req,res) => {
  // ! Data validation needed
    //Address search
    // if (req.body.street && req.body.city && req.body.province && req.body.country)
    // {
      // console.log(req.body.street)

      console.log("New Address Call:");

      // console.log("Backend Street: "+  req.query.street);
      // console.log("Backend City: "+ req.query.city);
      // console.log("Backend Province: "+ req.query.province);
      // console.log("Backend Country: "+ req.query.country);

      var objectofIPs=
      { 
        street: req.query.street,
        city: req.query.city,
        province: req.query.province,
        country: req.query.country
      }
      // Removes Empty Parameters, these searches should be aloud to be variable
      Object.keys(objectofIPs).forEach(key => objectofIPs[key] === undefined && delete objectofIPs[key])

      console.log("New Object: "+ JSON.stringify(objectofIPs));
      
      const object= await InitialPost.find(objectofIPs);

      try {

        console.log(" Objects Found: "+ JSON.stringify(object));
        
        if (object.length===0){
          res.send(null);
          console.log("Nothing Found &&&&&&&&&&&")
          console.log("Null Objects: "+ JSON.stringify(object));
        }
        else{
          res.send(object);
          console.log("Objects Found");
          console.log("SUCCESS Objects: "+ JSON.stringify(object));
        }
        
        } catch (err) {
          res.status(500).send(err);
          console.log("FAILURE");
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
      console.log("Backend Firstname: "+  req.query.firstname);
      console.log("Backend Lastname: "+ req.query.lastname);

      const objectofIPs=
      { 
        landlordfirstname: req.query.firstname,
        landlordlastname: req.query.lastname,
        //Note: Not sure if needed
        // city: req.body.city
      }
      // Removes Empty Parameters, these searches should be aloud to be variable
      Object.keys(objectofIPs).forEach(key => objectofIPs[key] === undefined && delete objectofIPs[key])
      console.log("New Object: "+ JSON.stringify(objectofIPs));
      
      const object= await InitialPost.find(objectofIPs);

      try {

        console.log(" Objects Found: "+ JSON.stringify(object));
        
        if (object.length===0){
          res.send(null);
          console.log("Nothing Found &&&&&&&&&&&")
          console.log("Null Objects: "+ JSON.stringify(object));
        }
        else{
          res.send(object);
          console.log("Objects Found");
          console.log("SUCCESS Objects: "+ JSON.stringify(object));
        }
        
        } catch (err) {
          res.status(500).send(err);
          console.log("FAILURE");
        }
    // }
    // else{
    //   return res.status(400).json({error:"Error finding landlord"});
    // }
});

module.exports = router;