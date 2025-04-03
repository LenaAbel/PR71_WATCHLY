const Person = require('../models/person');
const auth = require('../middleware/auth_middleware');
const bcrypt = require('bcrypt');

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
        res.json(user);
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
        auth.register(req, res);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

exports.login = async (req, res) => {
    try {
        auth.login(req, res);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const user = await Person.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updates = {
            username: req.body.username,
            name: req.body.firstname,
            surname: req.body.lastname,
            mail: req.body.email,
        };

        // Only hash and update password if provided
        if (req.body.password && req.body.password.trim() !== '') {
            updates.password = await bcrypt.hash(req.body.password, 10);
        }

        await user.update(updates);

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user.person_id,
                username: user.username,
                firstname: user.name,
                lastname: user.surname,
                email: user.mail,
                is_admin: user.is_admin
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};