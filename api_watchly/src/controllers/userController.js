const Person = require('../models/person');
const auth = require('../middleware/auth_middleware');

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