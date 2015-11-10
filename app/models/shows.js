// app/models/shows.js
var mongoose = require('mongoose');

// define the schema for our user model
var showSchema = mongoose.Schema({
        title       : String,
        rating      : Number,
        description : String,
        year        : Number,
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Show', showSchema);

