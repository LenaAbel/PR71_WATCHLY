const express = require('express');
const router = express.Router();
const personController = require('../controllers/person_controller');

/**
 * @swagger
 * /api/persons:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
    try {
        const users = await personController.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

/**
 * @swagger
 * /api/persons/admins:
 *   get:
 *     summary: Get all admin users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all admin users
 *       500:
 *         description: Server error
 */
router.get('/admins', async (req, res) => {
    try {
        const admins = await personController.getAdmins();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch admins' });
    }
});

/**
 * @swagger
 * /api/persons/username/{username}:
 *   get:
 *     summary: Get user by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/persons/email/{email}:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/persons/id/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/persons/id/{id}/favorites:
 *   get:
 *     summary: Get user favorites by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User favorites found
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
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
