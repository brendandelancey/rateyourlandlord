const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the User Schema
const InitialPostSchema = new Schema({
    landlordfirstname: {
        type: String,
        required: true
    },
    landlordlastname: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
     //Always Equals the review(s) it is associated with,
    // this IS unique among initial posts
    //I may just use the preset id value
    id:{
        type: String,
        required: true
    },
    ratingNumber: {
        type: Number,
        required: true
    },
    ratingAverage: {
        type: Number,
        required: true
    },
 
});


//These are just examples for template
// function getAll() {
//     return messages.find();
// }
 
// function create(message) {
//     if (!message.username) message.username = 'Anonymous';
 
//     const result = Joi.validate(message, schema);
//     if (result.error == null) {
//         message.created = new Date();
//         return messages.insert(message);
//     } else {
//         return Promise.reject(result.error);
//     }
// }

module.exports = InitialPost = mongoose.model('initialpost', InitialPostSchema);