const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialiser un objet pour stocker les données pour chaque jour de la semaine
let storedData = {
    Lundi: [],
    Mardi: [],
    Mercredi: [],
    Jeudi: [],
    Vendredi: [],
    Samedi: [],
    Dimanche: []
};

// Fonction pour obtenir le jour actuel en français
function getCurrentDay() {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const today = new Date();
    return days[today.getDay()];
}

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Endpoint pour recevoir les données du script Python
app.post('/api/receive_data', (req, res) => {
    const { username, followers_count, timestamp } = req.body;

    if (!username || !followers_count || !timestamp) {
        return res.status(400).json({ error: 'Données manquantes' });
    }

    // Obtenir le jour actuel
    const currentDay = getCurrentDay();

    // Ajouter les nouvelles données pour le jour actuel
    storedData[currentDay].push({
        username: username,
        followers_count: followers_count,
        timestamp: timestamp
    });

    // Limiter les entrées à 7 par jour (en conservant les plus récentes)
    if (storedData[currentDay].length > 7) {
        storedData[currentDay].shift(); // Supprimer la plus ancienne entrée pour ce jour
    }

    console.log(`Données stockées pour ${currentDay}:`, storedData[currentDay]);

    // Répondre avec un statut de succès
    res.status(200).json({ message: 'Données reçues et stockées avec succès' });
});

// Endpoint pour récupérer les données stockées
app.get('/api/get_data', (req, res) => {
    const currentDay = getCurrentDay();
    if (storedData[currentDay].length === 0) {
        return res.status(404).json({ error: `Aucune donnée disponible pour ${currentDay}` });
    }

    res.status(200).json(storedData[currentDay]);
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
