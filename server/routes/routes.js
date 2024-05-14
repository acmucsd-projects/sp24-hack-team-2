const express = require('express');
const router = express.Router();

const {getCoordinates, getAttractions } = require('../travel');
const { getEvents } = require('../events');

// Define your API routes
router.get('/attractions', async (req, res) => {
    try {
        const { name, country, radius, filters } = req.query;
        const coords = await getCoordinates(name, country);
        const latitude = coords.lat;
        const longitude = coords.lon;
        const attractions = await getAttractions(latitude, longitude, radius, filters.split(','));
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/events', async (req, res) => {
    try {
        // getEvents(timeInterval, budgetPerPerson, category, latitude, longitude, radius, startDate, endDate)
        const {timeInterval, budgetPerPerson, category, latitude, longitude, radius, startDate, endDate} = req.query;
        const events = await getEvents(timeInterval, budgetPerPerson, category, latitude, longitude, radius, startDate, endDate);
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;