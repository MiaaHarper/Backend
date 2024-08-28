const express = require('express');
const app = express();

// Middleware pour parser les données JSON du corps de la requête
app.use(express.json());

// Route pour recevoir les données du script Python
app.post('/api/receive_data', (req, res) => {
    const { username, followers_count } = req.body;

    if (!username || !followers_count) {
        return res.status(400).json({ message: "Le nom d'utilisateur et le nombre d'abonnés sont requis." });
    }

    // Affiche les données reçues dans la console
    console.log(`Données reçues: Nom d'utilisateur - ${username}, Nombre d'abonnés - ${followers_count}`);

    // Répond au client que les données ont été reçues avec succès
    res.status(200).json({ message: "Données reçues avec succès." });
});

// Démarre le serveur sur le port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port ${PORT}`);
});
