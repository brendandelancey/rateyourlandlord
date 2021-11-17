const AWS = require("aws-sdk");

module.exports = () => {
	//configure AWS SDK

	const region = "us-east-2";
    AWS.config.update({ region: region })
	const client = new AWS.SecretsManager();

    //TODO Needs to be adjusted for my secrets
	const SecretId = "test-secret";
	return new Promise((resolve, reject) => {
		//retrieving secrets from secrets manager
		client.getSecretValue({ SecretId }, (err, data) => {
			if (err) {
				reject(err);
			} else {
				//parsing the fetched data into JSON
				const secretsJSON = JSON.parse(data.SecretString);
                console.log(secretsJSON);

				// creating a string to store write to .env file
				// .env file shall look like this :
				// SECRET_1 = sample_secret_1
				// SECRET_2 = sample_secret_2
				let secretsString = "";
				Object.keys(secretsJSON).forEach((key) => {
					secretsString += `${key}=${secretsJSON[key]}\n`;
				});
                console.log(secretsString);
				resolve(secretsString);
			} 
		});
	});
};