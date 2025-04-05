require('dotenv').config(); 
const axios = require('axios');

async function fetchTMDB(url, model) {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/" + url, {
            headers: {
                Authorization: 'Bearer ' + process.env.API_KEYS,
            },
        });
        if (response.status !== 200) {
            console.error('Error fetching ' + model + ' data:', response.data);
            return;
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching ' + model + ' data:', error);
    }

}

module.exports = { fetchTMDB };