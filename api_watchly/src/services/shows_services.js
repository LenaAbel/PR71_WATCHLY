// get the ids of the trending shows
const { getTrending, getID } = require('../../database/src/tmdb/api');
const Show = require('../../database/src/models/shows.js');
const { Sequelize } = require('sequelize');
const path = require('path');
const { get } = require('http');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../database/data/watchlyDB'),
});

async function getIds(name, time) {
    const data = await getTrending(name, time);
    let ids = [];
    for (let i = 0; i < data.results.length; i++) {
        ids.push(data.results[i].id);
    }
    return ids;
}

async function getShows(name, time) {
    const ids = await getIds(name, time);
    let shows = [];
    for (let i = 0; i < ids.length; i++) {
        const show = await getID(ids[i], name);
        shows.push(show);
    }
    return shows;
}


function getShowIdFromDB(show){
    return Show.findOne({
        where: {
            name: show.name,
            description: show.overview,
        }
    });
}

let shows = getShows('tv', 'week');
// console.log(shows[0].id);

module.exports = {
    getIds,
    getShows,
    getShowIdFromDB
}