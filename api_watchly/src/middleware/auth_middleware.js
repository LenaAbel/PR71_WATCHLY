const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { log } = require('console');
const Person = require('../models/person');

async function register(req, res) {
    try {
        console.log(req.body);
        const { name, surname, username, email, password } = req.body;

        const existingPerson = await Person.findOne({ where: { mail: email } });
        if (existingPerson) {
            return res.status(400).json({ message: 'Person already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Person.create({
            name,
            surname,
            username,
            mail: email,
            password: hashedPassword,  // You may want to hash the password before saving
        });
        await newUser.save();

        res.status(201).json({ message: 'Person registered successfully', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const person = await Person.findOne({ where: {mail: email} });
        if (!person) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, person.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: person.person_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ 
            message: 'Login successful', 
            token,
            user: {
                id: person.person_id, 
                username: person.username,
                firstname: person.name,
                lastname: person.surname,
                email: person.mail,
                is_admin: person.is_admin
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

async function verifyToken (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = { register, login, verifyToken };