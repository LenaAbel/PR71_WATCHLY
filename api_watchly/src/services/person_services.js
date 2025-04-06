const Person = require('../../database/src/models/person');
const Favorite = require('../../database/src/models/favorite');

const chalk = require('chalk');
const bcrypt = require('bcrypt');
const Shows = require('../../database/src/models/shows');
const { Show } = require('../../database/src/models/associations');
const Illustrated = require('../../database/src/models/illustrated');
const Picture = require('../../database/src/models/picture');
Person.hasMany(Favorite, { foreignKey: 'person_id', as: 'favorites' });


async function createUsers(){
    const users = [
        ['jdoe', 'John', 'Doe', 0, 'jdoe@example.com', 'password123'],
        ['asmith', 'Alice', 'Smith', 1, 'asmith@example.com', 'adminpass'],
        ['bwayne', 'Bruce', 'Wayne', 1, 'bwayne@example.com', 'batman123'],
        ['ckent', 'Clark', 'Kent', 0, 'ckent@example.com', 'superman'],
        ['pparker', 'Peter', 'Parker', 0, 'pparker@example.com', 'spidey'],
        ['tsmith', 'Tony', 'Stark', 1, 'tstark@example.com', 'ironman'],
        ['nromanoff', 'Natasha', 'Romanoff', 0, 'nromanoff@example.com', 'blackwidow'],
        ['sdiaz', 'Sara', 'Diaz', 0, 'sdiaz@example.com', 'mypassword'],
    ];
        console.log(chalk.cyan(`\n 👤 Processing ${users.length} users...`));
     
    for (const user of users) {
        await addPerson(user);
    }
} 


async function addPerson(data){
const hashedPassword = await bcrypt.hash(data[5], 10);
const person = Person.build({
    username: data[0],
    name: data[1],
    surname: data[2],
    is_admin: data[3],
    mail: data[4],
    password: hashedPassword,
});
person.save().then(() => console.log(chalk.green(`User ${data[0]} added`)));
}

async function getPersonById(id) {
    return await Person.findByPk(id, 
        { 
            attributes: ['username', 'mail'],
        include: 
            {
                model: Shows,
                through: {
                    model: Favorite,
                },
                include: {
                    model: Illustrated,
                    include: {
                        model: Picture,
                        attributes: ['link'],
                    },
                },
            }
        }
    ).then(person => {
        if (!person) return null;

        const shows = person.Shows.map(show => {
            const thumbnail = show.Illustrateds?.[0]?.Picture?.link || null;
            const { Illustrateds, ...showData } = show.toJSON();
            return { ...showData, thumbnail };
        })
        const { Shows, ...personData } = person.toJSON();
        return { ...personData, shows };
    });
}

module.exports = { createUsers, getPersonById };
