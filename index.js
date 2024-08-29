const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

let storedData = []; // Stocker les 7 dernières données reçues dans un tableau

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Endpoint pour recevoir les données du script Python
app.post('/api/receive_data', (req, res) => {
    const { username, followers_count, timestamp } = req.body;

    if (!username || !followers_count || !timestamp) {
        return res.status(400).json({ error: 'Données manquantes' });
    }

    // Ajouter les nouvelles données à la liste
    storedData.push({
        username: username,
        followers_count: followers_count,
        timestamp: timestamp
    });

    // Limiter la liste aux 7 dernières entrées
    if (storedData.length > 7) {
        storedData.shift(); // Supprimer la plus ancienne entrée si la liste dépasse 7 éléments
    }

    console.log('Données stockées:', storedData);

    // Répondre avec un statut de succès
    res.status(200).json({ message: 'Données reçues et stockées avec succès' });
});

// Endpoint pour récupérer les données stockées
app.get('/api/get_data', (req, res) => {
    if (storedData.length === 0) {
        return res.status(404).json({ error: 'Aucune donnée disponible' });
    }

    res.status(200).json(storedData);
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
