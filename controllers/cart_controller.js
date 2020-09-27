


const Cart = require("./../models/cart")
const formidable = require("formidable");
const _ = require("lodash");

exports.createCart = (req,res) =>{

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  
  form.parse(req, (err, fields) => {

  const { product,name, price, count } = fields;
  
  if (!name || !product || !price || !count) {
    return res.status(400).json({
    error: "Please include all fields"
    });
  }
  
  let cart = new Cart(fields);
  
  console.log(cart);

  cart.save((err, cart) => {
  if (err) {
        res.status(400).json({
        error: err.message
      });
  }
    res.json(cart);
  });

  });
}


exports.getItemsFromCart = (req, res) => {
  Cart.find().exec((err,items) => {
    if (err) {
      return res.status(400).json({
        error: "NO Items In Cart"
      });
    }
    res.json(items);
  });
};


exports.removeItemFromCart = (req,res)=>{
    Cart.findOneAndRemove({_id:req.body.id}).exec((err,item) => {
        if(err)
        {
          return res.status(400).json({
            error:"Failed To Remove Item From Cart"
          })
        }
        res.json(item);
    });
}