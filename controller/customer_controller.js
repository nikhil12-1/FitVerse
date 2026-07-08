const custom=require("../model/customer.js");
const logger = require("../configs/logger.js");
module.exports={
    display:async(req,res)=>{
        try{
            const customers=await custom.find();
            res.status(200).json({message: customers});
        }catch(error){
            res.status(500).json({error:error.message});
        }
    },
    create:async(req,res)=>{
        try{
            const create_customer=await custom.create(req.body);
            logger.info("Customer created successfully");
            res.status(200).json({message: create_customer});
        }catch(error){
            logger.error("Error creating customer");
            res.status(500).json({error:error.message});
        }
    },
    update:async(req,res)=>{
        try{
            const update_customer=await custom.findByIdAndUpdate(req.params.id,req.body);
            logger.info("Customer updated successfully");
            res.status(200).json({message: update_customer});
        }catch(error){
            logger.error("Error updating customer");
            res.status(500).json({error:error.message});
        }
    },
    find:async(req,res)=>{
        try{
            const find_customer=await custom.findById(req.params.id);
            logger.info("Customer found successfully");
            res.status(200).json({message: find_customer});
        }catch(error){
            logger.error("Error finding customer");
            res.status(500).json({error:error.message});
        }
    },
    delete:async(req,res)=>{
        try{
            const delete_customer=await custom.findByIdAndDelete(req.params.id);
            logger.info("Customer deleted successfully");
            res.status(200).json({data: delete_customer,message:"deleted successfully"});
        }catch(error){
            logger.error("Error deleting customer");
            res.status(500).json({error:error.message});
        }
    }
};