const express=require("express");
const customer=require("../controller/customer_controller.js");
const router=express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const verifyAdminToken = require("../middleware/verifyAdminToken.js");

router.get('/', verifyToken, verifyAdminToken, customer.display);
router.post('/',verifyToken, customer.create);
router.put('/:id',verifyToken, customer.update);
router.delete('/:id',verifyToken, customer.delete);
router.get('/:id',customer.find);

module.exports=router;