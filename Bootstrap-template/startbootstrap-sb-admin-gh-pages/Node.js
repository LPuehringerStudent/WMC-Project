const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const JD_API = 'https://api.jdoodle.com/v1/execute';
const CLIENT_ID = '349209f0fee7f36c833651ac492781f0';
const CLIENT_SECRET = 'bba68b199b90065fd1ff1f6323223e591a8c99bc7dff062a2ba5e4c523c389da';

app.post('/api/compile', async (req, res) => {
    try {
        const response = await axios.post(JD_API, {
            ...req.body,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Proxy running on port 3000'));