const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const OpenTripMapAPI = process.env.OPENTRIPMAP_API_KEY;

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getAttractionDetails(xid, retries = 3) {
    try {
        const apiKey = OpenTripMapAPI;
        const detailsUrl = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${apiKey}`;

        const response = await axios.get(detailsUrl);

        if (response.status !== 200) {
            throw new Error('Failed to fetch attraction details. Server responded with status: ' + response.status);
        }

        return response.data;
    } catch (error) {
        if (retries > 0 && error.response && error.response.status === 429) {
            await delay(1000); // wait for 1 second before retrying
            return getAttractionDetails(xid, retries - 1);
        } else {
            throw new Error('Error fetching attraction details: ' + error.message);
        }
    }
}

async function getLocationData(city, country = '') {
    try {
        const apiKey = OpenTripMapAPI;
        const coordinatesUrl = `https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&country=${country}&apikey=${apiKey}`;

        const coordinateResponse = await axios.get(coordinatesUrl);

        if (coordinateResponse.status !== 200) {
            throw new Error('Failed to fetch coordinates. Server responded with status: ' + coordinateResponse.status);
        }

        return coordinateResponse.data;
    } catch (error) {
        throw new Error('Error fetching coordinates: ' + error.message);
    }
}

async function getAttractions(city, country, radius, filters = []) {
    try {
        const apiKey = OpenTripMapAPI;

        const coords = await getLocationData(city, country);
        const latitude = coords.lat;
        const longitude = coords.lon;

        let kindsFilter = '';
        if (filters.length > 0) {
            kindsFilter = `&kinds=${filters.join(',')}`;
        }

        const attractionsUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lat=${latitude}&lon=${longitude}&limit=10&apikey=${apiKey}${kindsFilter}`;

        const attractionsResponse = await axios.get(attractionsUrl);

        if (attractionsResponse.status !== 200) {
            throw new Error('Failed to fetch attractions. Server responded with status: ' + attractionsResponse.status);
        }

        const attractions = await Promise.all(attractionsResponse.data.features.map(async feature => {
            const { xid, name, kinds } = feature.properties;
            const attractionDetails = await getAttractionDetails(xid);
            return {
                name,
                address: attractionDetails?.address || 'Address not available',
                preview: attractionDetails?.image || 'Preview image not available',
                description: attractionDetails?.wikipedia_extracts?.text || 'Description not available',
                population: attractionDetails?.population || 'Population not available',
                tags: kinds || 'Tags not available',
                latitude: attractionDetails?.point?.lat || 'Latitude not available',
                longitude: attractionDetails?.point?.lon || 'Longitude not available',
            };
        }));

        return attractions;
    } catch (error) {
        throw new Error('Error fetching attractions: ' + error.message);
    }
}

// const city = 'LaJolla';
// const country = 'us';
// const radius = 10000; // Specify the radius in meters
// const filters = ['restaurants', 'amusement parks', 'zoos']; // Specify filters if needed

// getAttractions(city, country, radius, filters)
//     .then(attractions => {
//         console.log('Attractions:', attractions);
//     })
//     .catch(error => {
//         console.error('Error fetching attractions:', error.message);
//     });

module.exports = {getLocationData, getAttractions};