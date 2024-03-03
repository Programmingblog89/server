const addCustomerModel = require('../../models/admin/addCustomerModel')

//Add Customer
module.exports.addCustomer = async(req, res) => {
    try{
        const data = req.body;
        const newCustomer = new addCustomerModel(data);
        const savedCustomer = await newCustomer.save();
        console.log('Data saved');
        res.status(200).json(savedCustomer);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}

//Fetch all Customer
module.exports.fetchAllCustomer = async(req, res) =>{
    try{
        const records = await addCustomerModel.find().populate('added_by');
        res.json(records);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}

//Update Customer name and active
module.exports.updCustomer = async(req, res) =>{
    const { id } = req.params;
    const { customer_username, customer_status } = req.body;
    try{
        // Find the vendor by ID and update its details
        const updatedCustomer = await addCustomerModel.findByIdAndUpdate(id, { customer_username, customer_status,
        }, { new: true });
        res.json(updatedCustomer);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}

//Customer Contact Update
module.exports.contactCustomerUpd = async(req, res) =>{
    const { id } = req.params;
    const { customer_first_name, customer_last_name, customer_email, customer_mobile } = req.body;
    try{
        // Find the cusotmer by ID and update its details
        const updatedContCustomer = await addCustomerModel.findByIdAndUpdate(id, { customer_first_name, customer_last_name, customer_email, customer_mobile
        }, { new: true });
        res.json(updatedContCustomer);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}

//Customer Address Update
module.exports.customerAdr = async(req, res) =>{
    const { id } = req.params;
    const { customer_address_1, customer_address_2, customer_zipcode, customer_country, customer_state, customer_city } = req.body;
    try{
        // Find the customer by ID and update its details
        const updatedAdrCustomer = await addCustomerModel.findByIdAndUpdate(id, { customer_address_1, customer_address_2, customer_zipcode, customer_country, customer_state, customer_city
        }, { new: true });
        res.json(updatedAdrCustomer);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}