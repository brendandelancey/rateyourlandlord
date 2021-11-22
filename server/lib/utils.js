const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
// const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

// const priv_key = process.env.ID_RSA_PRIV
const priv_key ="LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlKS0FJQkFBS0NBZ0VBOHNHRTBZaDI2bWR3aXlPL2ZJZytEb1c1bDNHTVpTNlFQbklKMyt4N1pHNGtwNmk1CmkyV1pZeVNNZUk5aVZSRmdSK2plbjhvZ09qdEtlaEROTUhnR3l6dVlXR1RENVRzb3dZNFNvNW1Hcjg0Z3RsMnUKODhRNGtvTlMveUV5SzJmSVBRL0x4Wlo3YjZkMk0ydFpqRklzekNpeHZadituUFhFYmJuMmo3eUdydXIvS05GTgp4VWdERDFLQUpaNXh3L05iTSt3TmZxVHRvbTF0VEhFclVvRnZvOGRDR1h2dEtxakhvVURFTERmbzZpNEFXeHE3CmJFV0Jra3g1bXlqcDNZdHNtcUpEcXhPQUp0azIrQkR5YWs2ajhTZkIyNW0zWUFwMk5ybERLRi9Kd0ZPdElGc1gKVURkTkZHZWtHejRIQ0RmODZLWlhoRTdqNTVyVHdmWkVBYk43MjFkZUkvK0RiWi9pREs5RWxNaDFiWkxsUmhBNApUYlZkOEpiVzlIcWZVWVkyN1FoVENTVEthOHRCQVhLaGdmSmxFeDdLOW00aXFlUGQxcEI2S1pqeGpiNklTOGZPClBjSjR3RzdiUWZBcFBobjhZdWNPTmR2OElmOGpWbWs3ZUwvSCtsQ3ptekFQM1RXSXh6K2ZnWHBCd2d4bFUwdTAKenBLVk8vNy92dkxiZUJYZzNiOUZ3NkhIK1ZvUVQ1YjUxWklESktSUVdQZDZPUFRvZ0FVT0xUWWFmd3RZVEkxQwp3dXdzUnZJQ2tzUlpaYmYyUmtVU1Nxd2sxQ21SaTBMZ2FqN1VDWm5UcE5vQkZrTUFmem9mTCt0MHdMdENmSnB5Ck5wMUYwYjNBemVHK0VuY3NCZkp5L2Zka0JjNnhRUmowT1gvQmNoZ05ya0tRRm5YTTBkdDZOQzREeWNNQ0F3RUEKQVFLQ0FnQkhUT0dtN1c4SUFDUEZLbFhHelBsMUtIL1BaSEY1RW9rWlhrTmFPc292UUU2UjAvUFRacDc3eUxOZApnYmUvQnFDQjNucnM4ZUF2V2xUUXIzaWxBTXYyQzJYK3FISUZOVEFPVVoxVjRmVDJWQk8xbktTVFFwSGZMcVZFCi9Fb1JCNlYva2RFbkVzRGtsWW9aSmpHaURrek1GalBHWGpnVmYvWVd5R1VMNkxLaVU3Rm9Hcm05OVIyNDlXRmcKS3o1ODhGQmNXcnZIODhjOFN1bXNaeHp6V2NNaGxwZnFoa1N0bis4cWhLeFoxSDRic2pFMmtRNTFpYUM2Q0s0NwpEWFJMTnZWS0lkakFPYlVOTkFWNkxQZ1drMHlCdTB5c0pHVUExM0hMTnZUcnVkNjNGNXlsQVR4Q3VrdHdiOVI2CmoraGUySnIyOWt5RU51dW5qZ2tlVWllOVhDdEhPZHByVFpuTWZDNldYeWdibkt3UlJGL1NLc2k3N1IwVVBsQkUKSmdNT3BvV21OWkV1NXlIcnE4aUI3c1FwMkUyNTNyQ0dwaFRvQ1RwTG1kR2tFbTVIWmxnR01KM0l3YnZmUUdKRApUazYyMm9TZ1RIZ2lZNmRaRGIvRVZNaHFncVdmN05IQmh2U2FmdXN1SVZQKzBjYk5Sd1BFM2dtZWNHWDRqZGE0CndROEd0UWpDbkVFL0JFLzU5cnJ5Sk13RWpoZC95d2VqTENGSGp4akwvS0ZpUEY5ZFlqZWpBeDNnaHk4MWh6bC8KbHdCaXM2M1N0aURwbUtZdFdvYlVZN3lCN21tenJPS1dkaUFYNEdDVURGdElkRlVEelU0RVlaVWtMcGpOZ3hWTQowM1hFRXhlbXBNYzJodnFlRkN4c05NcGJTT3VkelM3aHZDSnpXYnp2Q2lZakpYeUcyUUtDQVFFQSs3RGhqYWprCk5kRTB0dFUzOU1nRGtIQlNtaHVMeW0vbjFheVh3WXZIUXFmMVlOaDdqYjliYitvbzdGcHZzQjNsaXE1OWE3YlIKWmMxNmx4dkFJbWQwd0VGdlpOR2E0TU00Z3doU3NHY212RHM5TVNWTFFLSmVVL3E1QWc1S1k1TnMxQ0JycVVZZwpiOHV0Yk5zeGxWTFp4cElKSG50VzRieEUwSERuK013NWFGVmtNbUs1b1dwRk4zaUZjcnRRUi8xNWtKeXc3OTZNCkV6TlJVa21NVm9pUXZ1WEdpMVF5cDlqWlNvaUdMLzc3NzdwQTV4Uzh1bkIvdEQ1WDhtWHpQb1QwZTZXc3c0eWgKTDNXSkZyZVNycnFIYTJjUDNuRVVvMmg3YzE4VnlJWUZSTUJtaGk3MFcxOUpmOUlmK1pzSHZrZmp2eld1d0Rsagptekg4a0d2YzFHc0FaUUtDQVFFQTl1bDZKRy9CTzJ5Q1RKWlIwV0dBZ1p4MDBRYytNSElYcUc5a3FMTzQ4MHJyCkFPemE2SklpbUIxMmMzOWkyTlUybHd1TkptT0V5TWFGK05qT3h1QmNGLzMvN1d1cS9NYys5UkxRei8xa0lKSW0KVWpMU3NvV013UTFGTGt4Z3FGc1dNczYxaVBlbmVTQU1OaFhFMXI5dzZjUXU1dlVUWXZYNDM1aUc4YWhCNktydQp2by9mMWIzWFhuNmRsQ2dOcFhmUmlDSGFPWWNyK3B6ZXVTL1BXNkhRUmk3ZHpOUXlFUVUwZzZYWXRJbThoRTYyCjk4YTg3ODQ4c2p2WkN6clU2TVljWW9XS2ZjSFlzaUhNS3BHVzhEeUVLQnVPLzdzMUtFREoyYm1kczlFSEFGYXEKbWh4VnRMMTZCdFhlTW5QQWt3SVFrR1pHcklrQStOZ0cwYXVNcFVtN0J3S0NBUUJXRmxvUHFnVGtvM24wVDFtawpVQVZvRWdNdTB0MHRrTGtyVEsxYmRnUGh1TEVsUHVhRHhUL3hONVpud1VjU1ppZHRGK0d1UmdtNVdGN2w4SWYzClBJdWlkcjh6TEw1Y3dtbEI2RWJnTDJnQVdnTEVISTF3dmhpbGdNeG05NXhhRXNMV2k0QkhsY1RpZURnSlU2L1IKODFTcHBxbVgwM2dVSGVFcnFuS3RscXpNRXVrQ2t1SUxZOTNvNjBBNXpmZlhwOHM4dTF1SnNBVVpUQ1Ewa1JOLwpSWmE4dExzRVRQaEdrTlZCdVJDc3VmcFNOTktlTjJtV0c0U1NrZ0JpMkp3cWRpOXBXM0dNTVQyd2pmTWw0Z1E1CjMzTVNPVjRrSjJsM3V2VCtzVGN5THlUK0x4RGlOSTAvODRlZ1FLN1BJVWUwdmNJWVZMUkE2MkEyWlJLT0UxYWwKRVRSQkFvSUJBUURXVUwveElvT1NCZFJ2ajhhQ3ZHUGpuSjhVMUhtWmFWNjVsNzdDWkFVMFFDSU5Vb21NZDFQSgp2MEVTYlU2cU1SOUtLZitoZzU0OCszeE1ERHduQ1pWR1NmVTc2a21uVVhhSEdJYmhFZXM0RGtOdTg2aEl4bnp2CkVJcXM3aVN6M1NRK2c0ZTAxR21zVERIdFBDWDMxSUc0bHMyek1LUmNNRzZOL2dHYmZsVi9FK2RZeHQ4ZDBzTSsKeFI0WC9GQWtBUVdCYVFqWENFb1hKTlI1MzFMWUVYTUxpQ0NEYXVmdU9CdGw3YTFVdjMwL1JtZXdWL09sSHRrMgpSNVpVRmdPNTdFTzFESDZ5TzNEUTVWOG16K280cWY1NEpidVFvN2szTUUxRVM4WGp6NXFKSTdDL1JicnF2OUJNCllKU1dMRHpLSFcrdE51ay9WMGZkdHZ6c1AwQThNK3cvQW9JQkFDYWVBaWdFSVpXUzJyeUFYSkF3QjBuelVhejIKZ1BTWjlNcW1ROHYyU0FBRkYrVHdCcEEzemlkYU5wTWlaZy9ybG93b3VROTFGaTVDS25TZllDQ2Y0ZXFCY004dgpYMWh6NVFFRVZveXo4WTdQMmJweFlFekZSTFdWMW5WSGFwbm1uZlZMMGNYc1kyVU43UUdnUWpadXN5VDZiZ1R6Ci82ZUxFRWxYcGloMHNEeGJjRUZDOXpaVzhXS096eUNRR1JvVFhsZEQ1OGR1TCtaeWlrSGtTQitXZHBsbU04OUQKUzYyUzE5T3NrR01KeEgydzV4Z3NreWhUQjkzc2o0RGZYS0NNWjJza0haUXI0MjkyTmV1OTBydHZQbW55bDdKTwpTd1lvdnZUOU1yNlVPUXA2MnBNVzE0V3FiWHhjSXo1TWU5STFYZWhPeXZuVjNYRjhhaUNCZXhnYzk2MD0KLS0tLS1FTkQgUlNBIFBSSVZBVEUgS0VZLS0tLS0K"
const buff = Buffer.from(priv_key, 'base64');
const priv_key_string = buff.toString('utf-8');

const PRIV_KEY = priv_key_string;
/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 * 
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 * 
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
// function validPassword(password, hash, salt) {
//     var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
//     return hash === hashVerify;
// }

/**
 * 
 * @param {*} password - The password string that the user inputs to the password field in the register form
 * 
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 * 
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
//  */
// function genPassword(password) {
//     var salt = crypto.randomBytes(32).toString('hex');
//     var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
//     return {
//       salt: salt,
//       hash: genHash
//     };
// }


/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {
  const _id = user._id;

  const expiresIn = '1d';

  //******REVIEW KEEPING USERNAME AND EMAIL AND NAME IN AN UNSECURE TOKEN */
  const payload = {
    sub: _id,
    iat: Date.now(),
    username: user.username,
    name: user.name,
    email: user.email
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

module.exports.issueJWT = issueJWT;