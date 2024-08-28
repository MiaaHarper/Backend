from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/receive_data', methods=['POST'])
def receive_data():
    # Récupère les données JSON envoyées
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    username = data.get("username")
    followers_count = data.get("followers_count")

    if username is None or followers_count is None:
        return jsonify({"error": "Missing username or followers_count"}), 400

    # Traitement des données (ici, on les affiche simplement)
    print(f"Received data - Username: {username}, Followers Count: {followers_count}")

    # Réponse au client
    return jsonify({"status": "success", "message": "Data received successfully"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
