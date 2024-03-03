const mongoose = require('mongoose');
const AdminLogin = require('./adminLoginModel');
const addVendorSchema = new mongoose.Schema({
    vendor_name:{
        type: String,
        required: true,
    },
    vendor_username:{
        type:String,
        required: true,
    },
    vendor_first_name:{
        type: String,
        required: true,
    },
    vendor_last_name:{
        type: String,
        required: true,
    },
    vendor_email:{
        type:String,
        required: true,
    },
    vendor_mobile:{
        type:String,
        required: true,
    },
    vendor_status:{
        type: String,
        enum: ["active", "inactive"],
        required: true,
    },
    vendor_address_1:{
        type: String,
        required:true,
    },
    vendor_address_2:{
        type: String,
        required: true,
    },
    vendor_zipcode:{
        type: String,
        required: true,
    },
    vendor_country:{
        type:String,
        required: true,
    },
    vendor_state:{
        type:String,
        required: true,
    },
    vendor_city:{
        type:String,
        required: true
    },
    added_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminLogin',
        required:true
    }
});

const AddVendor = mongoose.model("AddVendor", addVendorSchema);
module.exports = AddVendor;