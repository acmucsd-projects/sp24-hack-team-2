const mongoose = require('mongoose');
const { Schema } = mongoose;

const TripSchema = new Schema({
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    tripID: Number,
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    budget: Number,
    destination: String,
    itinerary: [{
        type: Schema.Types.ObjectId
    }]
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;