const express = require('express');
const router = express.Router();
const { getLocationData, getAttractions } = require('../travel');
const { getEvents } = require('../events');
const { createJournalEntry } = require('../controllers/entryController');
const { createTripItinerary } = require('../controllers/tripController');
const { getUserWithTrips } = require('../controllers/userController');

// Existing routes
router.get('/attractions', async (req, res) => {
    try {
        const { city, country, radius, filters } = req.query;
        const attractions = await getAttractions(city, country, radius, filters.split(','));
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
});

router.get('/events', async (req, res) => {
    try {
        const {timeInterval, budgetPerPerson, category, city, country, radius, startDate, endDate} = req.query;
        const coords = await getLocationData(city, country);
        const latitude = coords.lat;
        const longitude = coords.lon;

        const events = await getEvents(timeInterval, budgetPerPerson, category, latitude, longitude, radius, startDate, endDate);
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.post('/journal-entry', createJournalEntry);
router.post('/trip-itinerary', createTripItinerary);

// New route to fetch user data including trips
router.get('/user/:id', getUserWithTrips);

module.exports = router;