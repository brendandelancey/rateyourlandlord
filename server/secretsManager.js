const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

const sm = new AWS.SecretsManager()

async function secretRetrieve (key) {
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
    return secretsString;
  } catch (err) {
    console.error('Could not retrieve secret', err)
  }
}

if (process.argv.length < 3) {
  console.log('Please provide a secret key')
  process.exit(0)
}

const keyArg = process.argv[2]
console.log(keyArg);
secretRetrieve(keyArg)
print("qqqqqqqqqqqqqqqqqqqq");