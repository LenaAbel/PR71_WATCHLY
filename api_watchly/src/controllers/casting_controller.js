const Show = require('../../database/src/models/shows');
const Casting = require('../../database/src/models/casting');
const Play = require('../../database/src/models/play');
const { getCast, getTitle, getTmdbIdFromTitle } = require('../../database/src/tmdb/tmdb_api');
const chalk = require('chalk');

// 👇 Cette fonction à créer une fois dans ton fichier :
function splitFullName(fullName) {
    const parts = fullName.trim().split(' ');
    const surname = parts.pop();
    const name = parts.join(' ') || surname; // fallback if only one name
    return { name, surname };
}

async function addCastingForAllShows() {
    const shows = await Show.findAll();

    for (const show of shows) {
        const mediaType = show.is_movie ? 'movie' : 'tv';
        const tmdbId = await getTmdbIdFromTitle(show.name, mediaType);
        if (!tmdbId) continue;

        const castData = await getCast(tmdbId, mediaType);
        if (!castData?.cast) continue;

        console.log(chalk.cyan(`🎭 Adding cast for "${show.name}"...`));

        for (const member of castData.cast.slice(0, 10)) {
            try {
                const { name, surname } = splitFullName(member.name);

                const [cast] = await Casting.findOrCreate({
                    where: { name, surname, is_actor: true },
                });

                await Play.findOrCreate({
                    where: {
                        cast_id: cast.cast_id,
                        show_id: show.show_id,
                    },
                    defaults: {
                        role: member.character || 'Unknown',
                    }
                });

            } catch (err) {
                console.error(chalk.red(`❌ Failed to add cast "${member.name}" for "${show.name}": ${err.message}`));
            }
        }
    }

    console.log(chalk.green('✅ Casting + Play associations completed for all shows.'));
}


module.exports = { addCastingForAllShows };
