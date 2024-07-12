const axios = require('axios');

const fsqGetAllCourts = async (radius, longitude, latitude) => {

    try {
        const response = await axios.get(process.env.FOURSQUARE_PLACES_COURTS_BASE_URL, {
            headers: {
                accept: 'application/json',
                Authorization: process.env.FOURSQUARE_DEV_API_KEY
            }
        });
        console.log(response.data);

        return response.data;
        
    } catch (err) {
        console.error(`Error fetching Foursquare courts: ${err.message}`);
        throw err;
    }
    
}

module.exports = {
    fsqGetAllCourts
}