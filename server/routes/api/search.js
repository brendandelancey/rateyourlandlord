
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


router.get('/advanced', async (req,res) => {
    //Advanced search
    if (req.body.landlordname && req.body.street && req.body.city && req.body.province && req.body.country)
    {
        const objectofIPs= await InitialPost.find({
            landlordname: req.body.landlordname,
            street: req.body.street,
            city: req.body.city,
            province: req.body.province,
            country: req.body.country
        });
        try {
            res.send(objectofIPs);
          } catch (err) {
            res.status(500).send(err);
          }
    }
});
router.get('/address', async (req,res) => {
    //Address search
    if (req.body.street && req.body.city && req.body.province && req.body.country)
    {
        const objectofIPs= await InitialPost.find({
            street: req.body.street,
            city: req.body.city,
            province: req.body.province,
            country: req.body.country
        });
        try {
            res.send(objectofIPs);
          } catch (err) {
            res.status(500).send(err);
          }
    } 
});
router.get('/landlord', async (req,res) => {
    //Landlord search
    if (req.body.landlordname && req.body.city)
    {
        const objectofIPs= await InitialPost.find({
            landlordname: req.body.landlordname,
            city: req.body.city
        });
        try {
            res.send(objectofIPs);
          } catch (err) {
            res.status(500).send(err);
          }
    }
});