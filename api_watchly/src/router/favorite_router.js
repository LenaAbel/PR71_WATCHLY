const express = require('express');
const favoriteController = require('../controllers/favorite_controller');
const favoriteServices = require('../services/favorite_services'); 

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
router.get('/user/:personId', async (req, res) => {
    return favoriteController.getFavoritesByPersonId(req, res);
});

/**
 * @swagger
 * /favorites/show/{showId}:
 *   get:
 *     summary: Retrieve a list of favorite items for a specific show
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the show
 *     responses:
 *       200:
 *         description: A list of favorite items for the show
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
 *       404:
 *         description: Show not found
 *       500:
 *         description: Failed to fetch favorites for the show
 */
router.get('/show/:showId', async (req, res) => {
    return favoriteController.getFavoritesByShowId(req, res);
});

/**
 * @swagger
 * /favorites/user/{personId}/show/{showId}:
 *   get:
 *     summary: Retrieve a favorite item by person ID and show ID
 *     parameters:
 *       - in: path
 *         name: personId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the person
 *       - in: path
 *         name: showId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the show
 *     responses:
 *       200:
 *         description: Favorite item found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The favorite item ID
 *                 name:
 *                   type: string
 *                   description: The name of the favorite item
 *       404:
 *         description: Favorite item not found
 *       500:
 *         description: Failed to fetch favorite item
 */
router.get('/user/:personId/show/:showId', async (req, res) => {
    return favoriteController.getFavoritesByPersonIdAndShowId(req, res);
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
        console.log('Raw request body:', req.body);
        // Handle nested body structure if present
        const favoriteData = req.body.body || req.body;
        req.body = favoriteData;
        return await favoriteController.addFavorite(req, res);
    } catch (error) {
        console.error('Router error:', error);
        return res.status(500).json({ error: 'Internal server error' });
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
    return favoriteController.removeFavorite(req, res);
});

router.delete('/user/:personId/show/:showId', async (req, res) => {
    try {
        const result = await favoriteServices.deleteFavorite(req.params.personId, req.params.showId);
        if (result) {
            res.status(200).json({ message: 'Favorite deleted successfully' });
        } else {
            res.status(404).json({ message: 'Favorite not found' });
        }
    } catch (error) {
        console.error('Error deleting favorite:', error);
        res.status(500).json({ error: 'Failed to delete favorite' });
    }
});

module.exports = router;