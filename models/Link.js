const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  username: {type: String, required: true}  
})

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;
