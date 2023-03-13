const productModel = require('../../database/models/product');

module.exports = function(req, res)
{
   return new Promise(function(resolve, reject)
   {
       productModel.find({})
       .then(function(data)
       {
            if(data.length)
                resolve(data);
            else
                throw new Error('no data found');    
       }) 
       .catch(function(err)
       {
        reject(err);
       })
   })
}