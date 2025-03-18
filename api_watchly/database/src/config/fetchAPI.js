require('dotenv').config(); 
const axios = require('axios');

async function fetchTMDB(url, model) {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/" + url, {
            headers: {
                Authorization: 'Bearer ' + process.env.API_KEYS,
            },
        });
        console.log(model + ' data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching ' + model + ' data:', error);
    }

}

module.exports = { fetchTMDB };