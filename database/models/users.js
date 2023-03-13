const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
});

const userModel=new mongoose.model("user", userSchema);

module.exports=userModel;