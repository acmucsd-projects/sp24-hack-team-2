const axios = require('axios');
const dotenv = require('dotenv');
const getCoordinates = require('./travel');

dotenv.config();
const YelpAPI = process.env.YELP_API_KEY;

// Function to get the start time based on the interval
function getStartTime(interval) {
    switch (interval.toLowerCase()) {
        case 'morning':
            return '06:00';
        case 'afternoon':
            return '12:00';
        case 'evening':
            return '18:00';
        default:
            throw new Error('Invalid time interval');
    }
}

// Function to check if a time is within the specified interval
function isInTimeInterval(eventTime, interval) {
    const startTime = getStartTime(interval);
    const eventDateTime = new Date(eventTime);
    const eventHour = eventDateTime.getUTCHours();

    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = startHour + 6;

    return eventHour >= startHour && eventHour < endHour;
}

// Function to check if the event cost is within the budget per person
function isWithinBudget(eventCost, budgetPerPerson) {
    // Assuming eventCost is the total cost for the event
    return eventCost <= budgetPerPerson;
}

// Function to fetch Yelp events
async function getEvents(timeInterval, budgetPerPerson, category, latitude, longitude, radius, startDate, endDate, sortBy = 'name', sortOrder = 'asc') {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + YelpAPI
        }
    };

    const startDateTimestamp = Math.floor(Date.parse(startDate) / 1000);
    const endDateTimestamp = Math.floor(Date.parse(endDate) / 1000);

    const apiUrl = `https://api.yelp.com/v3/events?categories=${category}&latitude=${latitude}&longitude=${longitude}&radius=${radius}&start_date=${startDateTimestamp}&end_date=${endDateTimestamp}`;

    try {
        const response = await axios.get(apiUrl, options);
        const responseData = response.data;

        // Filter events by time interval and budget per person
        let filteredEvents = responseData.events.filter(event => {
            const isInInterval = isInTimeInterval(event.time_start, timeInterval);
            const isWithinBudgetResult = isWithinBudget(event.cost, budgetPerPerson);

            return isInInterval && isWithinBudgetResult;
        });

        // Apply sorting
        if (sortBy && sortOrder) {
            filteredEvents = filteredEvents.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a[sortBy] > b[sortBy] ? 1 : -1;
                } else {
                    return a[sortBy] < b[sortBy] ? 1 : -1;
                }
            });
        }

        return filteredEvents;
    } catch (error) {
        console.error('Error fetching Yelp events:', error.message);
        throw new Error('Failed to fetch Yelp events');
    }
}

module.exports = { getEvents };
