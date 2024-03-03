const mongoose = require('mongoose');
const AdminLoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'vendor', 'affiliate', 'sub-affiliate' ,'user'],
    },
    images: {
        type: String,
        data: Buffer,
    }
})

const AdminLogin = mongoose.model('AdminLogin', AdminLoginSchema);
module.exports = AdminLogin;