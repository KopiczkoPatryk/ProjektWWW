const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;
const API_KEY = `YbDL7pP0HuGma_udF5JQMBbslZHngZgk`;

app.use(cors());

app.get('/api/game/:id', async (req, res) => {
    const gameId = req.params.id;
    const url = `https://api.gg.deals/v1/prices/by-steam-app-id/?ids=${gameId}&key=${API_KEY}&region=pl`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Błąd GG.deals' });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera lokalnego' });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});