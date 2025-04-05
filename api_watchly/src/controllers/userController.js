const Person = require('../models/person');
const auth = require('../middleware/auth_middleware');
const bcrypt = require('bcrypt');
const Picture = require('../../database/src/models/picture'); 
const personServices = require('../services/person_services');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Person.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await Person.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({
            id: user.person_id,
            username: user.username,
            firstname: user.name,       // must be the real DB value
            lastname: user.surname,
            email: user.mail,
            is_admin: user.is_admin,
            profile_picture: user.profile_picture // real value from DB, not default!
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = await Person.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await Person.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await Person.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

exports.register = async (req, res) => {
    try {
        const existingUser = await Person.findOne({ where: { mail: req.body.email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        auth.register(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await Person.findOne({ where: { mail: req.body.email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found with this email' });
        }
        auth.login(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getDefaultProfilePictures = async (req, res) => {
    try {
        const pictures = await Picture.findAll({
            where: { type: 'profile' },
            attributes: ['picture_id', 'link', 'type']
        });
        if (!pictures || pictures.length === 0) {
            return res.status(404).json({ message: 'No profile pictures found' });
        }
        res.json(pictures);
    } catch (error) {
        console.error('Error fetching profile pictures:', error);
        res.status(500).json({ message: 'Error fetching profile pictures', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        let user = await Person.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a base update object with the current profile picture
        const updates = {
            username: req.body.username || user.username,
            name: req.body.firstname || user.name,
            surname: req.body.lastname || user.surname,
            mail: req.body.email || user.mail,
            profile_picture: user.profile_picture || 'assets/img/default-person.jpg'
        };

        // Only update profile picture if a new one is selected
        if (req.body.profilePictureId) {
            const picture = await Picture.findByPk(req.body.profilePictureId);
            if (picture) {
                updates.profile_picture = picture.link;
            }
        }

        // Update user using update method instead of raw query
        await Person.update(updates, {
            where: { person_id: req.userId }
        });

        // Fetch updated user data
        user = await Person.findByPk(req.userId);

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user.person_id,
                username: user.username,
                firstname: user.name,
                lastname: user.surname,
                email: user.mail,
                is_admin: user.is_admin,
                profile_picture: user.profile_picture
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ 
            message: 'Error updating profile', 
            error: error.message
        });
    }
};

exports.getUserPicture = async (req, res) => {
    try {
        const profilePicture = await personServices.getUserPicture(req.params.id);
        if (!profilePicture) {
            return res.status(404).json({ message: 'User or profile picture not found' });
        }
        res.json({ profile_picture: profilePicture });
    } catch (error) {
        console.error('Error fetching user picture:', error);
        res.status(500).json({ message: 'Error fetching user picture', error });
    }
};