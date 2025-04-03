const express = require('express');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favorite_controller');

const router = express.Router();

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Retrieve a list of favorite items
 *     responses:
 *       200:
 *         description: A list of favorite items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The favorite item ID
 *                   name:
 *                     type: string
 *                     description: The name of the favorite item
 *       500:
 *         description: Failed to fetch favorites
 */
router.get('/', async (req, res) => {
    try {
        const favorites = await getFavorites();
        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
});

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add a new favorite item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the favorite item
 *     responses:
 *       201:
 *         description: Favorite item added successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const favorite = await addFavorite(req.body);
        res.status(201).json(favorite);
    } catch (err) {
        res.status(400).json({ error: 'Failed to add favorite' });
    }
});

/**
 * @swagger
 * /favorites/{id}:
 *   delete:
 *     summary: Remove a favorite item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the favorite item to remove
 *     responses:
 *       200:
 *         description: Favorite item removed successfully
 *       404:
 *         description: Favorite item not found
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await removeFavorite(id);
        if (result) {
            res.status(200).json({ message: 'Favorite removed successfully' });
        } else {
            res.status(404).json({ error: 'Favorite not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
});

module.exports = router;