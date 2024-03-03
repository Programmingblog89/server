const Country = require('../models/countryModel')
// API endpoint to fetch countries
module.exports.countries = async (req, res) => {
    try {
        const countries = await Country.find({}, 'name');
        res.json(countries);
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}


// API endpoint to fetch states by country
module.exports.state = async (req, res) => {
    const { countryId } = req.params;
    try {
        const country = await Country.findById(countryId);
        if (!country) {
          return res.status(404).json({ message: 'Country not found' });
        }
        res.json(country.states);
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports.cities = async (req, res) => {
    const { stateId } = req.params;
    try {
        const country = await Country.findOne({ 'states.name': stateId });
        if (!country) {
            return res.status(404).json({ message: 'State not found' });
        }
      
        const state = country.states.find(state => state.name === stateId); //state within the country
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }

        res.json(state.cities); //return cities of state
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


