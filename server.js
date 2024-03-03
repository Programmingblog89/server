const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const db = require('./db')

const adminLogin = require('./controllers/admin/loginController')
const cscController = require('./controllers/cscController');
const vendorController = require('./controllers/admin/vendorController');
const customerController = require('./controllers/admin/customerController');
const categoriesController = require('./controllers/admin/categoriesController');

app.use('/uploads', express.static('./uploads'));

app.get('/', function (req, res) {
    res.send('Hello World');
})

//Register form
app.post('/signUp', adminLogin.adminSignUp)

//login
app.post('/login', adminLogin.login)

//admin name
app.get('/adminName/:id', adminLogin.adminName)

//Update profile
app.put('/updateProfile/:userId', adminLogin.updateProfile)

app.get('/countries', cscController.countries)
app.get('/states/:countryId', cscController.state)
app.get('/cities/:stateId', cscController.cities)

//Add vendor
app.post('/addVendor', vendorController.addVendor)
app.get('/fetch_all_vendors', vendorController.fetchAllVendor)

//Update vendor name
app.put('/vendor/:id', vendorController.updVendor)

//vendor contact updates
app.put('/contact-vendors/:id', vendorController.contactVendorUpd)

//vendor address update
app.put('/vendor-address/:id', vendorController.vendorAdr)

//customer add
app.post('/addCustomer', customerController.addCustomer)
app.get('/fetch_all_customers', customerController.fetchAllCustomer)
app.put('/customer/:id', customerController.updCustomer)
app.put('/contact-customer/:id', customerController.contactCustomerUpd)
app.put('/customer-address/:id', customerController.customerAdr)

//categories
app.post('/add-categories', categoriesController.addCategories)
app.get('/fetch-categories', categoriesController.fetchAllCategories)
app.get('/edit-categories/:id', categoriesController.editCategories)




app.listen(3001, () => {
  console.log(`Shopping backend Running...`);
})