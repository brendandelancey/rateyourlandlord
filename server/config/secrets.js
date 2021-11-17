const fs = require("fs").promises;
const retrieveSecrets = require("../secretsManager");

console.log("*******************Secrets");
async function asyncCall()  {
try {
    //get secretsString:
    const secretsString = await retrieveSecret();

    //write to .env file at root level of project:
    await fs.writeFile(".env", secretsString, function(err, result) {
        if(err){console.log('error', err)}
      });

    //configure dotenv package
    dotenv.config();

    console.log("Server running on port 4000");
} catch (error) {
    //log the error and crash the app
    console.log("Error in setting environment variables", error);
    process.exit(-1);
}
};
module.exports = { asyncCall };