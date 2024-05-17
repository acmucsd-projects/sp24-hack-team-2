const mongoose = require('mongoose');
const User = require('./userSchema');
const Trip = require('./tripSchema');
const Entry = require('./entrySchema');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Error connecting to MongoDB database:', error);
    }
};

module.exports = { connectToDatabase, User, Trip, Entry };