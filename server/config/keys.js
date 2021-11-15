const path = require('path');
const fs = require('fs');
const deploy=false;
require('dotenv').config()
const deployment = process.env.DATABASE_DEPLOYMENT
const development = process.env.DATABASE_DEVELOPMENT

const pub_key = process.env.ID_RSA_PUB
const buff = Buffer.from(pub_key, 'base64');
const pub_key_string = buff.toString('utf-8');
// module.exports = {
//     mongoURI: "mongodb://localhost:27017/meven_auth",
//     secret: 'yoursecret'
// };
//MongoURI should be saved as a .env
//mongodb+srv://Admin:<password>@cluster0.lguyp.mongodb.net/<dbname>?retryWrites=true&w=majority
//Check original tutorial to see if how he saves the later db is how you think he will
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
//const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
// const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
const PUB_KEY = pub_key_string;


if (deploy=== true) {
    module.exports = {
        mongoURI: deployment,
        secret: PUB_KEY
    };
} else {
    module.exports = {
        mongoURI: development,
        secret: PUB_KEY
    };
}