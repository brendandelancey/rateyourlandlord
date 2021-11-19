const path = require('path');
require('dotenv').config()
const secrets = require("./secrets");

console.log("111111111111");
// databaseConfig();

function databaseConfig(key) {
    const deploy = true;

    const secret = key;

    const deployment = secret
    console.log(deployment);
    console.log("bbbbbbbbbbb");

    const development = process.env.DATABASE_DEVELOPMENT
    const pub_key = process.env.ID_RSA_PUB
    pub_key="LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUNDZ0tDQWdFQThzR0UwWWgyNm1kd2l5Ty9mSWcrRG9XNWwzR01aUzZRUG5JSjMreDdaRzRrcDZpNWkyV1oKWXlTTWVJOWlWUkZnUitqZW44b2dPanRLZWhETk1IZ0d5enVZV0dURDVUc293WTRTbzVtR3I4NGd0bDJ1ODhRNAprb05TL3lFeUsyZklQUS9MeFpaN2I2ZDJNMnRaakZJc3pDaXh2WnYrblBYRWJibjJqN3lHcnVyL0tORk54VWdECkQxS0FKWjV4dy9OYk0rd05mcVR0b20xdFRIRXJVb0Z2bzhkQ0dYdnRLcWpIb1VERUxEZm82aTRBV3hxN2JFV0IKa2t4NW15anAzWXRzbXFKRHF4T0FKdGsyK0JEeWFrNmo4U2ZCMjVtM1lBcDJOcmxES0YvSndGT3RJRnNYVURkTgpGR2VrR3o0SENEZjg2S1pYaEU3ajU1clR3ZlpFQWJONzIxZGVJLytEYlovaURLOUVsTWgxYlpMbFJoQTRUYlZkCjhKYlc5SHFmVVlZMjdRaFRDU1RLYTh0QkFYS2hnZkpsRXg3SzltNGlxZVBkMXBCNktaanhqYjZJUzhmT1BjSjQKd0c3YlFmQXBQaG44WXVjT05kdjhJZjhqVm1rN2VML0grbEN6bXpBUDNUV0l4eitmZ1hwQndneGxVMHUwenBLVgpPLzcvdnZMYmVCWGczYjlGdzZISCtWb1FUNWI1MVpJREpLUlFXUGQ2T1BUb2dBVU9MVFlhZnd0WVRJMUN3dXdzClJ2SUNrc1JaWmJmMlJrVVNTcXdrMUNtUmkwTGdhajdVQ1puVHBOb0JGa01BZnpvZkwrdDB3THRDZkpweU5wMUYKMGIzQXplRytFbmNzQmZKeS9mZGtCYzZ4UVJqME9YL0JjaGdOcmtLUUZuWE0wZHQ2TkM0RHljTUNBd0VBQVE9PQotLS0tLUVORCBSU0EgUFVCTElDIEtFWS0tLS0tCg=="
    const buff = Buffer.from(pub_key, 'base64');
    const pub_key_string = buff.toString('utf-8');
    // module.exports = {
    //     mongoURI: "mongodb://localhost:27017/meven_auth",
    //     secret: 'yoursecret'
    // };
    //MongoURI should be saved as a .env
    //mongodb+srv://Admin:<password>@cluster0.lguyp.mongodb.net/<dbname>?retryWrites=true&w=majority
    //Check original tutorial to see if how he saves the later db is how you think he will
    // const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
    //const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
    // const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
    const PUB_KEY = pub_key_string;
    if(deploy === true){
        return {mongo:deployment , secretKey:PUB_KEY};
    }
    else{
        return  {mongo:development , secretKey:PUB_KEY};
    }



}
console.log("qqqqqqqqqqqq");

console.log("AAAA");
module.exports = function(secret){
    var result=databaseConfig(secret)
    return{    
        mongoURI: result.mongo,
        secret: result.secretKey
}
};
