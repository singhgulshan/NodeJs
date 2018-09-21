const mongoose = require('mongoose');  
const VideoSchema = new mongoose.Schema({  
  
    name: String,
    author: String,
    discription: String,
    location: String
});
mongoose.model('Video', VideoSchema);

module.exports = mongoose.model('Video');