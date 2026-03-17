from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from database import init_db
from routes.auth import auth_bp
from routes.incomes import incomes_bp
from routes.expenses import expenses_bp
import os

# Caminho da raiz do projeto (onde estão os HTML)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

app = Flask(
    __name__,
    static_folder=BASE_DIR,
    static_url_path=""
)

CORS(app)

# Configurações
app.config['JSON_SORT_KEYS'] = False

# Inicializa o banco de dados
init_db()

# Registra os blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(incomes_bp)
app.register_blueprint(expenses_bp)

# Página inicial
@app.route("/")
def index():
    return send_from_directory(BASE_DIR, "index.html")

# Rotas para páginas HTML
@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory(BASE_DIR, path)

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'API está rodando com sucesso'}), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Rota não encontrada'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Erro interno do servidor'}), 500