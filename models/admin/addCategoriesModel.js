const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    categories_name:{
        type:String,
        required: true,
    },
    categories_description:{
        type:String,
        required: true,
    },
    categories_status:{
        type:String,
        enum:["active", "inactive"],
        required: true,
    }
})

const AddCategories = mongoose.model('AddCategories', categoriesSchema);
module.exports = AddCategories;