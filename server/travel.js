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

async function getAttractions(city, country, radius, filters = [], sortBy = 'name', sortOrder = 'asc', maxBudget) {
    try {
        const apiKey = OpenTripMapAPI;

        const coords = await getLocationData(city, country);
        const latitude = coords.lat;
        const longitude = coords.lon;

        let kindsFilter = '';
        if (filters.length > 0) {
            kindsFilter = `&kinds=${filters.join(',')}`;
        }

        const attractionsUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lat=${latitude}&lon=${longitude}&limit=100&apikey=${apiKey}${kindsFilter}`;

        console.log(`Requesting attractions from: ${attractionsUrl}`);
        const attractionsResponse = await axios.get(attractionsUrl);

        if (attractionsResponse.status !== 200) {
            throw new Error('Failed to fetch attractions. Server responded with status: ' + attractionsResponse.status);
        }

        let attractions = await Promise.all(attractionsResponse.data.features.map(async feature => {
            const { xid, name, kinds } = feature.properties;
            try {
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
                    cost: Math.floor(Math.random() * 100) // Dummy cost value, replace with actual cost if available
                };
            } catch (err) {
                console.error(`Error fetching details for ${xid}: ${err.message}`);
                return null;
            }
        }));

        attractions = attractions.filter(attraction => attraction !== null);

        // Apply budget filter
        if (maxBudget) {
            attractions = attractions.filter(attraction => attraction.cost <= maxBudget);
        }

        // Apply sorting
        if (sortBy && sortOrder) {
            attractions = attractions.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a[sortBy] > b[sortBy] ? 1 : -1;
                } else {
                    return a[sortBy] < b[sortBy] ? 1 : -1;
                }
            });
        }

        console.log(`Filtered and sorted attractions: ${JSON.stringify(attractions, null, 2)}`);
        return attractions;
    } catch (error) {
        console.error('Error fetching attractions: ', error.message);
        throw new Error('Error fetching attractions: ' + error.message);
    }
}

module.exports = { getLocationData, getAttractions };
