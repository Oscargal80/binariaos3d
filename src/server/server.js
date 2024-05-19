// src/server/server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/ipinfo', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const response = await axios.get(`http://ipinfo.io/${ip}/json`);
    res.json({
      ip: ip,
      location: response.data.loc,
      organization: response.data.org
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching IP details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
