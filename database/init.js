const mongoose = require('mongoose');

module.exports=function(){
  mongoose.connect('mongodb+srv://app:1234@cluster0.cowmwqt.mongodb.net/E-Commerce?retryWrites=true&w=majority')
  .then(function(){
    console.log('MongoDb is connected');
  })
  .catch(function(){
    console.log('MongoDb connection error');
  })
}