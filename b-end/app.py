from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/home")
def home():
    return jsonify({
        'message': 'As Salam'
    })


if __name__ == "__main__":
    app.run(debug=True)
