const mongoose=require("mongoose");

const customerSchema= mongoose.Schema({
    name:{type: String, required:true},
    phone: {type: String , required:true , unique:true},
    email: {type: String , required:true , unique:true},
    plan: {type: String , required:true},
    startDate:{type: String , required:true},
    endDate:{type: String , required:true}
});

module.exports = mongoose.model('Customer', customerSchema);