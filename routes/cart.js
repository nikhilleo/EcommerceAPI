var express = require("express");
var router = express.Router();


const {createCart,getItemsFromCart,removeItemFromCart} = require("./../controllers/cart_controller")
const { isSignedIn, isAuthenticated} =require("./../controllers/auth");

router.post('/:userid/cart' , isSignedIn,isAuthenticated,createCart);

router.get('/:userid/getcart',isSignedIn,isAuthenticated,getItemsFromCart);

router.delete('/:userid/removefromcart',isSignedIn,isAuthenticated,removeItemFromCart);

module.exports = router;