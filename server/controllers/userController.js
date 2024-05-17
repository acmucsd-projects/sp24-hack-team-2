const User = require('../database_schema/userSchema');
const Trip = require('../database_schema/tripSchema');

const getUserWithTrips = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID and populate the trips field
        const user = await User.findById(userId).populate('trips');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUserWithTrips };
