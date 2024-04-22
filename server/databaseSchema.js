import mongoose, { mongo } from 'mongoose';
const { Schema } = mongoose;

// To add an additional key later:  Schema#add

const UserSchema = new Schema ({
    userID: Number,
    username: String,
    email: String,
    password: String,   // hashed
    trips: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Trip'
    }],
    
});

// Figure out the types of things you need for each data object
const tripSchema = new Schema({
    startDate: { type: Date, default: Date.now},
    endDate: { type: Date, default: Date.now},
    tripID: Number,
    userID: { type: Number, ref: 'User' },
    budget: Number,
    destination: String,
    itinerary: [{
        type: Schema.Types.ObjectId
    }]
  });

const journalEntry = new Schema ({
    title: String, // String is shorthand for {type: String}
    user: User,
    trip: Trip,
    date: { type: Date, default: Date.now },
    content: String
});

const User = mongoose.model('User', UserSchema);
const Trip = mongoose.model('Trip', tripSchema);
const Entry = mongoose.model('Entry', journalEntry);

module.exports = {
    User,
    Trip,
    Entry
};