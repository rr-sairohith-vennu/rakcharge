const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Your Noodoe API token from environment variable
const NOODOE_TOKEN = process.env.NOODOE_TOKEN;

if (!NOODOE_TOKEN) {
    console.error('❌ NOODOE_TOKEN environment variable is required');
    process.exit(1);
}

// Enable CORS for all origins
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Simulate station statuses (for demo until API is fixed)
function getSimulatedStatus() {
    const statuses = ['Available', 'Charging', 'Available', 'Available', 'Occupied'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

// Proxy endpoint to fetch station status
app.get('/api/station/:stationId', async (req, res) => {
    const { stationId } = req.params;

    try {
        console.log(`Fetching station ${stationId}...`);

        const response = await fetch(`https://ev-os-api.noodoe.com/api/1.0/stations/${stationId}`, {
            headers: {
                'Authorization': `Bearer ${NOODOE_TOKEN}`,
                'accept': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();

            // Check if API returned error
            if (data.ok === false || data.error) {
                console.log(`API error for station ${stationId}:`, data.error);
                return res.status(500).json({ error: 'API returned error' });
            }

            console.log(`Station ${stationId}: ${data.data?.ports?.[0]?.status || 'unknown'}`);
            res.json(data.data); // Return only the data object
        } else {
            console.log(`API error ${response.status} for station ${stationId}`);
            res.status(response.status).json({ error: 'API request failed' });
        }
    } catch (error) {
        console.log(`Fetch error for station ${stationId}:`, error.message);
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 EV Charging Proxy Server running on http://localhost:${PORT}`);
    console.log(`📡 Proxying requests to Noodoe API`);
    console.log(`✅ CORS enabled for all origins`);
});
