const categoriesModel = require('./../../models/admin/addCategoriesModel');

module.exports.addCategories = async(req, res) =>{
    try{
        const data = req.body;
        const newCategories = new categoriesModel(data);
        const savedCategories = await newCategories.save();
        console.log('Data saved');
        res.status(200).json(savedCategories);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}

//Fetch categories
module.exports.fetchAllCategories = async(req, res) =>{
    try{
        const records = await categoriesModel.find();
        res.json(records);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}

//Edit categories
module.exports.editCategories = async(req, res) =>{
    const { id } = req.params;
    const { categories_name, categories_description, categories_status } = req.body;
    try{
        // Find the vendor by ID and update its details
        const updatedCategories = await categoriesModel.findByIdAndUpdate(id, { categories_name, categories_description, categories_status
        }, { new: true });
        res.json(updatedCategories);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}