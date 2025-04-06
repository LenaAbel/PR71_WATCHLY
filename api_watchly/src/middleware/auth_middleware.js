const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { log } = require('console');
const Person = require('../models/person');

async function register(req, res) {
    try {
        const { name, surname, username, email, password } = req.body;

        const existingPerson = await Person.findOne({ where: { mail: email } });
        if (existingPerson) {
            return res.status(400).json({ message: 'Person already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const defaultProfilePicture = 'assets/img/default-person.jpg';

        const newUser = await Person.create({
            name,
            surname,
            username,
            mail: email,
            password: hashedPassword,
            is_admin: 0,
            profile_picture: defaultProfilePicture
        });

        res.status(201).json({ 
            message: 'Person registered successfully', 
            user: {
                id: newUser.person_id,
                username: newUser.username,
                firstname: newUser.name,
                lastname: newUser.surname,
                email: newUser.mail,
                is_admin: newUser.is_admin,
                profile_picture: defaultProfilePicture
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const person = await Person.findOne({ 
            where: {mail: email},
            attributes: ['person_id', 'username', 'name', 'surname', 'mail', 'password', 'is_admin', 'profile_picture']
        });

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
                is_admin: person.is_admin,
                profile_picture: person.profile_picture 
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

async function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get fresh user data including profile picture
        const user = await Person.findOne({
            where: { person_id: decoded.id },
            attributes: ['person_id', 'username', 'name', 'surname', 'mail', 'is_admin', 'profile_picture']
        });

        if (!user) {
            return res.status(404).json({ message: 'User no longer exists in the database' });
        }
        
        req.userId = decoded.id;
        req.user = user; // Add full user object to request
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}

module.exports = { register, login, verifyToken };