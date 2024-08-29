const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importation du module cors

const app = express(); // Création de l'application express
const PORT = process.env.PORT || 3000;

app.use(cors()); // Utilisation du middleware cors

// Initialiser un objet pour stocker les données des vidéos TikTok
let storedData = {};

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Endpoint pour recevoir les données du script Python
app.post('/api/receive_data', (req, res) => {
    const { title, play_count, digg_count, comment_count, share_count, download_count, timestamp } = req.body;

    // Vérifier que toutes les données nécessaires sont présentes
    if (title === undefined || play_count === undefined || digg_count === undefined || comment_count === undefined || share_count === undefined || download_count === undefined || timestamp === undefined) {
        console.error('Données manquantes:', req.body);  // Ajouter cette ligne pour déboguer
        return res.status(400).json({ error: 'Données manquantes' });
    }

    // Utiliser une clé constante pour écraser les anciennes données
    const videoKey = 'latest_video';  // Clé unique pour stocker les données les plus récentes

    // Stocker les données de la vidéo avec la clé constante
    storedData[videoKey] = {
        title: title || '',
        play_count: play_count || '',
        digg_count: digg_count || '',
        comment_count: comment_count || '',
        share_count: share_count || '',
        download_count: download_count || '',
        timestamp: timestamp || ''
    };

    console.log('Données stockées:', storedData);

    // Répondre avec un statut de succès
    res.status(200).json({ message: 'Données reçues et stockées avec succès' });
});

// Endpoint pour récupérer les données stockées
app.get('/api/get_data', (req, res) => {
    if (Object.keys(storedData).length === 0) {
        return res.status(404).json({ error: 'Aucune donnée disponible' });
    }
    res.status(200).json(storedData);
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});

