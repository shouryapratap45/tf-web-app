const getAllProducts = require('../../services/products/getAllProducts');

module.exports = function(req, res)
{
    getAllProducts()
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json(err);
    })
}