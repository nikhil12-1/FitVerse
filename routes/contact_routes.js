const express = require("express");
const contact=require("../controller/contact_controller.js");
const router=express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const verifyAdminToken = require("../middleware/verifyAdminToken.js");

//only for customer
router.post('/',verifyToken,contact.create);

//For admin
router.get('/',verifyToken,verifyAdminToken,contact.display);
router.put('/:id',verifyToken,verifyAdminToken,contact.update);
router.delete('/:id',verifyToken,verifyAdminToken,contact.delete);
router.get('/:id',verifyToken,verifyAdminToken,contact.find);

module.exports=router;