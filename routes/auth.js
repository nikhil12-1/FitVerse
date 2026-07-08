const express=require("express");
const authController=require("../controller/authcontroller.js");
const router=express.Router();

router.post('/login',authController.Login);
router.post('/register',authController.Register);
router.post('/search',authController.Search);

module.exports=router;