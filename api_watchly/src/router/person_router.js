const express = require('express');
const router = express.Router();
const personController = require('../controllers/person_controller');

// GET all persons
router.get('/', async (req, res) => {
    try {
        const users = await personController.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// GET only admins
router.get('/admins', async (req, res) => {
    try {
        const admins = await personController.getAdmins();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch admins' });
    }
});

// GET by username
router.get('/username/:username', async (req, res) => {
    try {
        const user = await personController.getPersonByUsername(req.params.username);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user by username' });
    }
});

// GET by email
router.get('/email/:email', async (req, res) => {
    try {
        const user = await personController.getPersonByEmail(req.params.email);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user by email' });
    }
});

// GET by ID
router.get('/id/:id', async (req, res) => {
    try {
        const user = await personController.getPersonById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user by ID' });
    }
});

// GET by ID with favorites
router.get('/id/:id/favorites', async (req, res) => {
    try {
        const user = await personController.getPersonByIdWithFavorites(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user by ID with favorites' });
    }
});

module.exports = router;
