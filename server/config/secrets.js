const fs = require("fs").promises;
const retrieveSecrets = require("../secretsManager");

console.log("*******************Secrets");
async function asyncCall(secretName)  {
    const params = secretName
try {
    //get secretsString:
    const secretsString = await secretRetrieve(params);

    //write to .env file at root level of project:

    console.log("kkkkkkkkkkkkkkklkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    console.log(secretsString);
    //TODO Needs write privilages
    await fs.open("./../../.env", secretsString,'w', function(err, result) {
        if(err){
            console.log('error', err)
        console.log("fail");}
      });

      fs.open("./aaaaaaaaaaa.js", "aaaaaa",'w', function(err, result) {
        if(err){
            console.log('error', err)
        console.log("fail");}
      });

    //configure dotenv  package
    dotenv.config();

    console.log("Server running on port 4000");
} catch (error) {
    //log the error and crash the app
    console.log("Error in setting environment variables", error);
    process.exit(-1);
}
};
module.exports = { asyncCall };