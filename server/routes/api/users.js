const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys").secret;
const User = require("../../model/User");
const utils = require("../../lib/utils");
const jwtDecode = require("jwt-decode");
const { deleteOne } = require("../../model/User");
//Should these routes be asycned
//**Note:Removed use from app.js paths may be broken,
//       may need to include a leadding period
/**
 * @route POST api/users/register -> sending data
 * @desc Register the User
 * @access Public
 */
router.post("/register", (req, res) => {
  //switch to normal
  let { name, username, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    res.status(400).send({
      msg: "Password do not match.",
    });
    return;
  }

  //   Check for the unique Username
  User.findOne({
    username: username,
  })
    .then((user) => {
      if (user) {
        console.log("11111111111111");
        res.status(400).send({
          msg: "Username is already taken.",
        });
        return;
      } else {
        User.findOne({
          email: email,
        })
          .then((user) => {
            if (user) {
              console.log("222222222222222");
              res.status(400).send({
                msg: "Email is already registred. Did you forgot your password.",
              });
              return;
            } else {
              console.log("Here");
              // The data is valid and new we can register the user
              let newUser = new User({
                name,
                username,
                password,
                email,
              });
              console.log(newUser);
              // Hash the password
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  console.log(newUser.password);
                  console.log(salt);
                  //   if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then((user) => {
                      const jwt = utils.issueJWT(user);
                      res.status(201).json({
                        success: true,
                        user: user,
                        token: jwt.token,
                        expiresIn: jwt.expires,
                      });
                    })
                    .catch((err) => {
                      console.error(err), console.log("cccccccccccccccccc");
                    });
                });
              });
            }
          })
          .catch((err) => {
            console.error(err), console.log("bbbbbbbbbbbbbbbbbbb");
            return;
          });
      }
    })
    .catch((err) => {
      console.error(err), console.log("aaaaaaaaaaaaaaa");
      return;
    });
  console.log("here");
  //   // Check for the Unique Email
});
// });
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err) throw err;
//         newUser.password = hash;
//         newUser.save().then(user => {
//             return res.status(201).json({
//                 success: true,
//                 msg: "Hurry! User is now registered."
//             });
//         });
//     });
// }

//------------------> Will be redesigning this to include sessions and put it
/**
 * @route POST api/users/login
 * @desc Signing in the User
 * @access Public
 */
router.post("/login", (req, res) => {
  console.log("111111111111");
  console.log(req.body.username);
  console.log(req.body.password);
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (!user) {
        console.log("Fail");
        return res.status(404).json({
          msg: "Username is not found.",
          success: false,
        });
      } else {
        console.log("Here");
        // If there is user we are now going to compare the password
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
          if (isMatch) {
            const tokenObject = utils.issueJWT(user);
            console.log("Success");

            res.status(200).json({
              success: true,
              user: user,
              token: tokenObject.token,
              expiresIn: tokenObject.expires,
            });
            return;

            // User's password is correct and we need to send the JSON Token for that user
            // const payload = {
            //     _id: user._id,
            //     username: user.username,
            //     name: user.name,
            //     email: user.email
            // }
            // //Sign token using package
            // jwt.sign(payload, key, {
            //     expiresIn: 604800
            // }, (err, token) => {
            //     res.status(200).json({
            //         success: true,
            //         token: `Bearer ${token}`,
            //         user: user,
            //         msg: "Hurry! You are now logged in."
            //     });
            // })
          } else {
            console.log("Fail2");
            return res.status(401).json({
              msg: "Incorrect password.",
              success: false,
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log("Fail3");
      console.error(err), console.log("aaaaaaaaaaaaaaa");
      return;
    });
});

//-------------------------------------------------------> Learn sessions
/**
 * @route POST api/users/profile
 * @desc Return the User's Data ->*may add this to session.js later
 * @access Private
 */
// router.get('/profile', passport.authenticate('jwt', {
//     session: false
// }), (req, res) =>{
//     //How you retrieve data stored in a JWT token
//     res.send(jwtDecode(req.headers.authorization).username);

// res.status(200).json({success:true,msg:'You are Authorized'})
// });
router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    User.findOne({
      username: req.body.username,
    });
    // .then((user) => {
    //   if (!user) {
    //     console.log("Fail");
    //     return res.status(404).json({
    //       msg: "Username is not found.",
    //       success: false,
    //     });
    return res.json({
      user: req.user,
    });
  }
);
module.exports = router;
