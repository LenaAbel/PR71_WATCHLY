const Person = require('../../database/src/models/person');
const Favorite = require('../../database/src/models/favorite');

const chalk = require('chalk');
const bcrypt = require('bcrypt');

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
        profile_picture: 'assets/img/default-person.jpg'
    });
    person.save().then(() => console.log(chalk.green(`User ${data[0]} added`)));
}

async function getUserPicture(personId) {
    try {
        const user = await Person.findByPk(personId, {
            attributes: ['profile_picture']
        });
        return user ? user.profile_picture : null;
    } catch (error) {
        console.error('Error fetching user picture:', error);
        throw error;
    }
}

module.exports = { createUsers, getUserPicture };
