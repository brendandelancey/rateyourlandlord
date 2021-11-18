const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const fs = require("fs").promises;
const retrieveSecrets = require("./retrieveSecrets");
const secrets = require("./config/secrets");



// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();



/**
 * -------------- GENERAL SETUP ----------------
 */

// Initialize the app by creating an express aplication named -> "app"
const app = express();


// require('./config/database');

// Middleware
// From Data Middleware
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: false 
}));

// Json Body Middleware
// support parsing of application/json type post data
app.use(bodyParser.json());
//BodyParser: Handles HTTP POST request in Express.js version 4 and above, 
//you need to install middleware module called body-parser.
//body-parser extracts the entire body portion of an incoming 
//request stream and exposes it on req.body


// Cors Middleware
app.use(cors());
//Cor s: Cross-origin resource sharing (CORS) allows AJAX requests to skip 
//the Same-origin policy and access resources from remote hosts.

// Setting up the static directory
//app.use(express.static(path.join(__dirname, 'public')));//*May have to recreate this collection of files
//Static Directory: Static files are files that clients download as they are 
//from the server. Create a new directory, public. 
//Express, by default does not allow you to serve static files. You need
// to enable it using the following built-in middleware

// require('./config/secrets');

// app.get("/", (req, res) => {
// 	return res.status(200).json({
// 		SECRET_1: process.env.SECRET_1,
// 		SECRET_2: process.env.SECRET_2,
//         DATABASE_DEPLOYMENT: process.env.DATABASE_DEPLOYMENT,
//         ID_RSA_PRIV: process.env.ID_RSA_PRIV


// 	});
// });

// app.listen(80, async () => {
// 	try {
// 		//get secretsString:
// 		const secretsString = await retrieveSecrets();

// 		//write to .env file at root level of project:
// 		await fs.writeFile(".env", secretsString);

// 		//configure dotenv package
// 		dotenv.config();

// 		console.log("Server running on port 4000");
// 	} catch (error) {
// 		//log the error and crash the app
// 		console.log("Error in setting environment variables", error);
// 		process.exit(-1);
// 	}
// });

// asyncCall("test-secret");
require('./config/secrets');

/**
 * -------------- Database ----------------
 */
//Used to point to config database file
require('./config/database');


/** 
 * -------------- Model ----------------
 */

// Must first load the models
require('./model/User');


/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

//Use the passport Middleware
app.use(passport.initialize());
//Bring in the Passport Stradegy
require('./config/passport')(passport);




/**
 * -------------- ROUTES ----------------
 */
// Bring in the Users route
const users = require('./routes/api/users');
//**Created
const rating = require('./routes/api/rating');
const initialpost = require('./routes/api/initialpost');
const search = require('./routes/api/search');

app.use('/api/users',users);
app.use('/api/rating', rating);
app.use('/api/initialpost', initialpost);
app.use('/api/search', search);
//** 

//**Will most likely have to change this so that incorrect request get errors
//Generally * is for finding all other requests beside the ones you have defined
//and labling them as 404 errors -> may leave it












//**After testing */
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// })










//These are to be changed -> post, put, delete
// app.get('/users/users', (req, res) => {
//     return res.send('GET HTTP method on user resource');
// });
   
// app.post('/api/users', (req, res) => {
//     return res.send('POST HTTP method on user resource');
//   });
   
// app.put('/api/users/:userId', (req, res) => {
//     return res.send(`PUT HTTP method on user/${req.params.userId} resource`,);
//   });
   
// app.delete('/api/users:userId', (req, res) => {
//     return res.send(`DELETE HTTP method on user/${req.params.userId} resource`,);
//   });


/**
 * -------------- SERVER ----------------
 */
//Probably should hide the port in a "".env" file using 
//"dotenv" thats what the .env.Port is for
var deployment=true;
const port=process.env.PORT_DEPLOYMENT

var PORT;
deployment? PORT=port: PORT=5000

app.listen(PORT, () => {
 console.log(`Server started on port ${PORT}`);
})