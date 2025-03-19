// get the ids of the trending shows
const { getTrending, getID } = require('./api');


function getIds(name, time){
    return getTrending(name, time).then((data) => {
        let ids = [];
        for (let i = 0; i < data.results.length; i++) {
            ids.push(data.results[i].id);
        }
        return ids;
    });
}

function getShows(name, time){
    return getIds(name, time).then((ids) => {
        let shows = [];
        for (let i = 0; i < ids.length; i++) {
            console.log(getID(ids[i], name));
            shows.push(getID(ids[i], name));
        }
        return shows;
    });
}

let shows = getShows('tv', 'week');
// console.log(shows[0].id);