const adminLoginModel = require('../../models/admin/adminLoginModel')
const jwt = require('jsonwebtoken')
const { upload } = require('./uploadImage')

//Register admin
module.exports.adminSignUp = async(req, res) => {
    try{
        const data = req.body;
        const newadminSignUp = new adminLoginModel(data);
        const savedSignUp = await newadminSignUp.save();
        console.log('Data saved');
        res.status(200).json(savedSignUp);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
}

//admin login
module.exports.login = async(req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!email) {
        return res.send({ code: 400, message: 'Username Required.' })
    } else if (!password) {
        return res.send({ code: 400, message: 'Password Required.' })
    }else{
        //main login api logic
        const isEmailExists = await adminLoginModel.findOne({ email: email })
        if(isEmailExists){
            console.log(isEmailExists.email, "isEmailExists")

            const token = jwt.sign({
                // expAfter: Math.floor(Date.now() / 1000) + (60 * 60),
                email: isEmailExists.email,
                password: isEmailExists.password,
                type: isEmailExists.type,
            }, 'MYKEY', { expiresIn: '1h' });

            if(isEmailExists.password === req.body.password){
                return res.send({ code: 200, message: "Login successful", token: token, userId: isEmailExists._id })
            }else{
                return res.send({ code: 404, message: 'Password wrong' })
            }
        }else{
            return res.send({ code: 404, message: 'Name Not Found' })
        }
    }
}

//Admin name
module.exports.adminName = async (req, res) => {
    const adminId = req.params.id;
    try {
        // Find admin by ID in MongoDB
        const admin = await adminLoginModel.findById(adminId);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Return the admin name
        res.json({ adminName: admin.name, adminRole: admin.role, adminEmail: admin.email, desc: admin.description, adminUsername: admin.username, adminImage: admin.images }); // Assuming the field name is 'name'
        // console.log(admin.name);
        // console.log(admin.role);
    } catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).json({ error: 'Server error' });
    }
}


//Update Admin Profile
module.exports.updateProfile = async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, email, about, username } = req.body;
      console.log(req.body);
  
      // Handle file upload
      upload(req, res, async (err) => {
        if (err) {
          console.error('Error uploading file:', err);
          return res.status(500).json({ error: 'Error uploading file' });
        }
        
        // Check if there's a file uploaded
        if (req.file) {
          req.body.images = req.file.filename;
        }
  
        const updatedUser = await adminLoginModel.findByIdAndUpdate(
          userId,
          { name, email, about, username, images: req.body.images }, // Utilize the extracted variables
          { new: true }
        );
  
        res.json(updatedUser);
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  