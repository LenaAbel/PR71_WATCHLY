const express = require('express');
const router = express.Router();
const showsController = require('../controllers/shows_controller');
const showsService = require('../services/shows_services');

/**
 * @swagger
 * /api/shows:
 *   get:
 *     summary: Get all shows
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: List of all shows
 */
router.get('/', showsController.getAll);

/**
 * @swagger
 * /api/shows/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: List of all movies
 */
router.get('/movies', showsController.getMovies);

/**
 * @swagger
 * /api/shows/tv:
 *   get:
 *     summary: Get all TV shows
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: List of all TV shows
 */
router.get('/tv', showsController.getTV);

/**
 * @swagger
 * /api/shows/search:
 *   get:
 *     summary: Search for shows
 *     tags: [Shows]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Invalid query
 */
router.get('/search', showsController.search);

/**
 * @swagger
 * /api/shows/{id}:
 *   get:
 *     summary: Get a show by ID
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Show ID
 *     responses:
 *       200:
 *         description: Show details
 *       404:
 *         description: Show not found
 */
router.get('/:id', showsController.getById);

/**
 * @swagger
 * /api/shows/{id}/trailer:
 *   get:
 *     summary: Get the trailer of a show by ID
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Show ID
 *     responses:
 *       200:
 *         description: Trailer details
 *       404:
 *         description: Trailer not found
 */
router.get("/:id/trailer", showsController.getTrailer);

/**
 * @swagger
 * /api/shows/{id}/rating:
 *   get:
 *     summary: Get the rating of a show by ID
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Show ID
 *     responses:
 *       200:
 *         description: Rating details
 *       404:
 *         description: Rating not found
 */
router.get('/:id/rating', showsController.getShowRating);


/**
 * @swagger
 * /api/shows/{id}/displayed:
 *   patch:
 *     summary: Update show display status
 *     description: Updates whether a show is displayed or not
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the show to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isDisplayed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Display status updated successfully
 *       404:
 *         description: Show not found
 *       500:
 *         description: Server error
 */
router.patch('/:id/displayed', async (req, res) => {
    try {
        const showId = req.params.id;
        const { isDisplayed } = req.body;
        
        if (isDisplayed === undefined) {
            return res.status(400).json({ error: 'isDisplayed parameter is required' });
        }
        
        await showsService.updateShowDisplayedStatus(showId, isDisplayed);
        res.status(200).json({ message: 'Show display status updated successfully' });
    } catch (error) {
        console.error('Error updating show display status:', error);
        res.status(500).json({ error: 'Failed to update show display status' });
    }
});

/**
 * @swagger
 * /api/shows/{id}/displayed:
 *   put:
 *     summary: Update show display status
 *     description: Updates whether a show is displayed or not
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the show to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_displayed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Show updated successfully
 *       404:
 *         description: Show not found
 *       500:
 *         description: Server error
 */
router.put('/:id/displayed', async (req, res) => {
  try {
    const showId = req.params.id;
    const { is_displayed } = req.body;
    
    await showsService.updateShowDisplayedStatus(showId, is_displayed);
    
    res.status(200).json({ 
      message: 'Show display status updated successfully',
      is_displayed
    });
  } catch (error) {
    console.error('Error updating show display status:', error);
    res.status(500).json({ error: 'Failed to update show display status' });
  }
});

// Support both PUT and PATCH for the same endpoint
router.patch('/:id/displayed', async (req, res) => {
  try {
    const showId = req.params.id;
    const { is_displayed } = req.body;
    
    await showsService.updateShowDisplayedStatus(showId, is_displayed);
    
    res.status(200).json({ 
      message: 'Show display status updated successfully',
      is_displayed
    });
  } catch (error) {
    console.error('Error updating show display status:', error);
    res.status(500).json({ error: 'Failed to update show display status' });
  }
});

module.exports = router;
