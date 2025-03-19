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

async function getShows(name, time){
    const ids = await getIds(name, time);
    let shows = [];
    for (let i = 0; i < ids.length; i++) {
        shows.push(await getID(ids[i], name));
    }
    return shows;
}

(async () => {
    let shows = await getShows('tv', 'week');
    console.log(shows); // Utilize the resolved value of shows
})();