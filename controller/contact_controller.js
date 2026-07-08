const express=require('express');

module.exports={
    display:async(req,res)=>{
        try{
            const contacts=await Contact.find();
            res.status(200).json(contacts);
        }catch(error){
            res.status(500).json({error:error.message});
        }
    },
    create:async(req,res)=>{
        try{
            const new_contacts=await Contact.create(req.body);
            res.status(200).json(new_contacts);
        }catch(error){
            res.status(500).json({error:error.message});
        }
    },
    update:async(req,res)=>{
        try{
            const updated_contacts=await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(updated_contacts);
        }catch(error){
            res.status(500).json({error:error.message});
        }
    },
    delete:async(req,res)=>{
        try{
            const deleted_contacts=await Contact.findByIdAndDelete(req.params.id);
            res.status(200).json(deleted_contacts);
        }catch(error){
            res.status(500).json({error:error.message});
        }
    },
    find:async(req,res)=>{
        try{
            const find_contacts=await Contact.findById(req.params.id);
            res.status(200).json(find_contacts);
        }catch(error){
            res.status(500).json({error:error.message});
        }
    }
}