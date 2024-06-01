const Entry = require('../database_schema/entrySchema');
const Trip = require('../database_schema/tripSchema');
const User = require('../database_schema/userSchema');

const createJournalEntry = async (req, res) => {
    try {
        const { userID, tripDestination, title, content } = req.body;

        // Find user by Firebase UID
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find trip by userId and destination
        const trip = await Trip.findOne({ userID: user._id, destination: tripDestination });
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        const entry = new Entry({
            title,
            user: user._id,
            trip: trip._id,
            content
        });

        await entry.save();

        res.status(201).json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateJournalEntry = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        // Validate input
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        // Update the journal entry
        const updatedEntry = await Entry.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: "Journal entry not found" });
        }

        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteJournalEntry = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEntry = await Entry.findByIdAndDelete(id);

        if (!deletedEntry) {
            return res.status(404).send({ message: "Journal entry not found" });
        }

        res.status(200).json({ message: "Journal entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createJournalEntry, updateJournalEntry, deleteJournalEntry };