const axios = require('axios');

async function getAttractionDetails(xid) {
    try {
        const apiKey = '5ae2e3f221c38a28845f05b62bb98161614be6591b54356a6b90cc8d'; // Replace with your OpenTripMap API key
        const detailsUrl = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${apiKey}`;

        const response = await axios.get(detailsUrl);

        if (response.status !== 200) {
            throw new Error('Failed to fetch attraction details. Server responded with status: ' + response.status);
        }

        return response.data;
    } catch (error) {
        throw new Error('Error fetching attraction details: ' + error.message);
    }
}

async function getAttractions(latitude, longitude, radius, filters = []) {
    try {
        const apiKey = '5ae2e3f221c38a28845f05b62bb98161614be6591b54356a6b90cc8d'; // Replace with your OpenTripMap API key

        const attractionsUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lat=${latitude}&lon=${longitude}&limit=10&apikey=${apiKey}`;

        const attractionsResponse = await axios.get(attractionsUrl);

        if (attractionsResponse.status !== 200) {
            throw new Error('Failed to fetch attractions. Server responded with status: ' + attractionsResponse.status);
        }

        const attractions = await Promise.all(attractionsResponse.data.features.map(async feature => {
            const { xid, name, kinds} = feature.properties;
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

// Example usage:
const latitude = 32.8328; // Latitude of La Jolla
const longitude = -117.2713; // Longitude of La Jolla
const radius = 10000; // Specify the radius in meters
const filters = ['restaurants', 'amusement parks', 'zoos']; // Specify filters if needed

getAttractions(latitude, longitude, radius, filters)
    .then(attractions => {
        console.log('Attractions:', attractions);
    })
    .catch(error => {
        console.error('Error fetching attractions:', error.message);
    });
