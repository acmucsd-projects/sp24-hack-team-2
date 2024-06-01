const express = require('express');
const router = express.Router();
const { createJournalEntry, updateJournalEntry, deleteJournalEntry} = require('../controllers/entryController');

// Route to create a journal entry
router.post('/create', createJournalEntry);

// Route to update a journal entry
router.put('/update/:id', updateJournalEntry);

// Route to delete a journal entry
router.delete('/delete/:id', deleteJournalEntry);

module.exports = router;