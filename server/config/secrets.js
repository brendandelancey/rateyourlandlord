const fs = require("fs").promises;
const retrieveSecrets = require("../secretsManager");

console.log("*******************Secrets");
// async function asyncCall(secretName)  {
//     const params = secretName
// try {
//     //get secretsString:
//     const secretsString = await secretRetrieve(params);

//     //write to .env file at root level of project:

//     console.log("kkkkkkkkkkkkkkklkkkkkkkkkkkkkkkkkkkkkkkkkkk");
//     console.log(secretsString);
//     //TODO Needs write privilages
//     await fs.open("./../../.env", secretsString,'w', function(err, result) {
//         if(err){
//             console.log('error', err)
//         console.log("fail");}
//       });

//       fs.open("./aaaaaaaaaaa.js", "aaaaaa",'w', function(err, result) {
//         if(err){
//             console.log('error', err)
//         console.log("fail");}
//       });

//     //configure dotenv  package
//     dotenv.config();

//     console.log("Server running on port 4000");
// } catch (error) {
//     //log the error and crash the app
//     console.log("Error in setting environment variables", error);
//     process.exit(-1);
// }
// };
// module.exports = { asyncCall };




const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

const sm = new AWS.SecretsManager()

async function asyncCall (key) {
  const params = {
    SecretId: key
  }

  try {
    const secret = await sm.getSecretValue(params).promise()
    console.log("First: "+secret)
    


    const secretsJSON = JSON.parse(secret.SecretString);
    console.log(secretsJSON);

	
	let secretsString = "";
	Object.keys(secretsJSON).forEach((key) => {
		secretsString += `${key}=${secretsJSON[key]}\n`;
	});
    console.log("Second: "+secretsString);
    // return secretsString;

    await fs.open("./../../.env", secretsString,'w', function(err, result) {
        if(err){
            console.log('error', err)
        console.log("fail");}
      });
  } catch (err) {
    console.error('Could not retrieve secret', err)
  }
}

if (process.argv.length < 3) {
  console.log('Please provide a secret key')
  process.exit(0)
}
console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeee");
const keyArg = process.argv[2]
console.log(keyArg);
secretRetrieve(keyArg)
console.log("qqqqqqqqqqqqqqqqqqqq");

module.exports = { asyncCall };