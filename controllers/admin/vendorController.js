const addVendorModel = require('../../models/admin/addVendorModel')

//Add Vendor
module.exports.addVendor = async(req, res) => {
    try{
        const data = req.body;
        const newVendor = new addVendorModel(data);
        const savedVendor = await newVendor.save();
        console.log('Data saved');
        res.status(200).json(savedVendor);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}

//Fetch all vendor
module.exports.fetchAllVendor = async(req, res) =>{
    try{
        const records = await addVendorModel.find().populate('added_by');
        res.json(records);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}

//Update vendor name and active
module.exports.updVendor = async(req, res) =>{
    const { id } = req.params;
    const { vendor_name, vendor_status } = req.body;
    try{
        // Find the vendor by ID and update its details
        const updatedVendor = await addVendorModel.findByIdAndUpdate(id, { vendor_name, vendor_status,
        }, { new: true });
        res.json(updatedVendor);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}

//Vendor Contact Update
module.exports.contactVendorUpd = async(req, res) =>{
    const { id } = req.params;
    const { vendor_first_name, vendor_last_name, vendor_email, vendor_mobile } = req.body;
    try{
        // Find the vendor by ID and update its details
        const updatedContVendor = await addVendorModel.findByIdAndUpdate(id, { vendor_first_name, vendor_last_name, vendor_email, vendor_mobile
        }, { new: true });
        res.json(updatedContVendor);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}

//Vendor Address Update
module.exports.vendorAdr = async(req, res) =>{
    const { id } = req.params;
    const { vendor_address_1, vendor_address_2, vendor_zipcode, vendor_country, vendor_state, vendor_city } = req.body;
    try{
        // Find the vendor by ID and update its details
        const updatedAdrVendor = await addVendorModel.findByIdAndUpdate(id, { vendor_address_1, vendor_address_2, vendor_zipcode, vendor_country, vendor_state, vendor_city
        }, { new: true });
        res.json(updatedAdrVendor);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}