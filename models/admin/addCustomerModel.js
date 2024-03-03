const mongoose = require('mongoose');
const AdminLogin = require('./adminLoginModel');
const addVendorSchema = new mongoose.Schema({
    customer_username:{
        type:String,
        required: true,
    },
    customer_first_name:{
        type: String,
        required: true,
    },
    customer_last_name:{
        type: String,
        required: true,
    },
    customer_email:{
        type:String,
        required: true,
    },
    customer_mobile:{
        type:String,
        required: true,
    },
    customer_status:{
        type: String,
        enum: ["active", "inactive"],
        required: true,
    },
    customer_address_1:{
        type: String,
        required:true,
    },
    customer_address_2:{
        type: String,
        required: true,
    },
    customer_zipcode:{
        type: String,
        required: true,
    },
    customer_country:{
        type:String,
        required: true,
    },
    customer_state:{
        type:String,
        required: true,
    },
    customer_city:{
        type:String,
        required: true
    },
    added_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminLogin',
        required:true
    }
});

const AddCustomer = mongoose.model("AddCustomer", addVendorSchema);
module.exports = AddCustomer;