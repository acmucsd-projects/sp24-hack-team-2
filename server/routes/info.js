const express = require('express');
const router = express.Router();
const { getLocationData, getAttractions } = require('../travel');
const { getEvents } = require('../events');

// Route to get attractions
router.get('/attractions', async (req, res) => {
    try {
        const { city, country, radius, filters, sortBy, sortOrder, maxBudget } = req.query;
        const parsedFilters = filters ? filters.split(',') : [];
        const attractions = await getAttractions(city, country, radius, parsedFilters, sortBy, sortOrder, maxBudget);
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
});

// Route to get events
router.get('/events', async (req, res) => {
    try {
        const { timeInterval, budgetPerPerson, category, city, country, radius, startDate, endDate, sortBy, sortOrder } = req.query;
        const coords = await getLocationData(city, country);
        const latitude = coords.lat;
        const longitude = coords.lon;

        const events = await getEvents(timeInterval, budgetPerPerson, category, latitude, longitude, radius, startDate, endDate, sortBy, sortOrder);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
});

module.exports = router;