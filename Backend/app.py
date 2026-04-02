from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from models import db, init_db
from routes.auth import auth_bp
from routes.incomes import incomes_bp
from routes.expenses import expenses_bp
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

app = Flask(
    __name__,
    static_folder=BASE_DIR,
    static_url_path=""
)

CORS(app, supports_credentials=True)

app.config['JSON_SORT_KEYS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'secret'

# 🔥 CORREÇÃO AQUI
db.init_app(app)

with app.app_context():
    init_db()

# Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(incomes_bp)
app.register_blueprint(expenses_bp)

@app.route("/")
def index():
    return send_from_directory(BASE_DIR, "index.html")

@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory(BASE_DIR, path)

@app.route('/api/health')
def health():
    return jsonify({'status': 'ok'})

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Rota não encontrada'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Erro interno do servidor'}), 500


if __name__ == "__main__":
    app.run(debug=True)