const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialiser un objet pour stocker les données pour chaque jour de la semaine
let storedData = {
    'Lundi': null,
    'Mardi': null,
    'Mercredi': null,
    'Jeudi': null,
    'Vendredi': null,
    'Samedi': null,
    'Dimanche': null
};

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Endpoint pour recevoir les données du script Python
app.post('/api/receive_data', (req, res) => {
    const { username, followers_count, timestamp, day } = req.body;

    if (!username || !followers_count || !timestamp || !day) {
        console.error('Données manquantes:', req.body);  // Ajouter cette ligne pour déboguer
        return res.status(400).json({ error: 'Données manquantes' });
    }

    // Vérifiez si le jour est valide
    if (!storedData.hasOwnProperty(day)) {
        console.error('Jour invalide:', day);  // Ajouter cette ligne pour déboguer
        return res.status(400).json({ error: 'Jour invalide' });
    }

    // Mettre à jour les données pour le jour reçu
    storedData[day] = {
        username: username,
        followers_count: followers_count,
        timestamp: timestamp
    };

    console.log('Données stockées:', storedData);

    // Répondre avec un statut de succès
    res.status(200).json({ message: 'Données reçues et stockées avec succès' });
});

// Endpoint pour récupérer les données stockées
app.get('/api/get_data', (req, res) => {
    res.status(200).json(storedData);
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
