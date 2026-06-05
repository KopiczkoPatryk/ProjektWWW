const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;
const API_KEY = `WEDGmnIQmpQb_d5Weoy4GF3UFv8avjNq`;

app.use(cors());

let bazaGier = [];

async function zainicjalizujBaze() {
    try {
        const response = await fetch('https://steamspy.com/api.php?request=all');
        
        if (response.ok) {
            const data = await response.json();
            bazaGier = Object.values(data).map(gra => ({
                appid: gra.appid,
                name: gra.name
            }));

            for (let i = bazaGier.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [bazaGier[i], bazaGier[j]] = [bazaGier[j], bazaGier[i]];
            }
        }
    } catch (err) {
        console.error("Błąd pobierania bazy danych:", err);
    }
}
zainicjalizujBaze();

app.get('/api/game/:id', async (req, res) => {
    const gameId = req.params.id;
    const url = `https://api.gg.deals/v1/prices/by-steam-app-id/?ids=${gameId}&key=${API_KEY}&region=pl`;
    try {
        const response = await fetch(url);
        if (!response.ok) return res.status(response.status).json({ error: 'Błąd GG.deals' });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

app.get('/api/steam-games', (req, res) => {
    if (bazaGier.length === 0) {
        return res.status(503).json({ error: 'Baza danych się ładuje, odśwież za chwilę.' });
    }
    res.json(bazaGier);
});

app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});