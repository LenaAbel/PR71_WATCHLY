const Person = require('../../database/src/models/person');
const Favorite = require('../../database/src/models/favorite');
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const personService = require('../services/person_services');


async function addUsers(){
    try {
        await personService.createUsers();
    }
    catch (err) {
        console.error(chalk.red(`❌ Failed to add users: ${err.message}`));
    }
}

async function getPersonByUsername(username){
    return await Person.findOne({ where: { username } });
}

async function getPersonById(id){
    return await personService.getPersonById(id);
}

async function getPersonByEmail(mail){
    return await Person.findOne({ where: { mail } });
}

async function getAdmins(){
    return await Person.findAll({ where: { is_admin: 1 } });
}

async function getAllUsers(){
    return await Person.findAll();
}

async function getPersonByIdWithFavorites(id){
    return await Person.findByPk(id, { include: 'favorites' });
}

module.exports = { addUsers , getPersonByUsername, getPersonById, getPersonByEmail, getAdmins, getAllUsers, getPersonByIdWithFavorites };
