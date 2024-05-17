const Trip = require('../database_schema/tripSchema');
const User = require('../database_schema/userSchema');

const createTripItinerary = async (req, res) => {
    try {
        const { firebaseUID, startDate, endDate, tripID, budget, destination, itinerary } = req.body;

        // Find user by Firebase UID
        const user = await User.findOne({ firebaseUID });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const trip = new Trip({
            startDate,
            endDate,
            tripID,
            userID: user._id,
            budget,
            destination,
            itinerary
        });

        await trip.save();

        // Update the user's trips array
        user.trips.push(trip._id);
        await user.save();

        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTripItinerary };