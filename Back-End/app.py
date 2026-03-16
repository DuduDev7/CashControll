from flask import Flask, jsonify, request
from flask_cors import CORS
from database import init_db
from routes.auth import auth_bp
from routes.incomes import incomes_bp
from routes.expenses import expenses_bp
import os

app = Flask(__name__)
CORS(app)

# Configurações
app.config['JSON_SORT_KEYS'] = False

# Inicializa o banco de dados
init_db()

# Registra os blueprints (rotas)
app.register_blueprint(auth_bp)
app.register_blueprint(incomes_bp)
app.register_blueprint(expenses_bp)

@app.route('/api/health', methods=['GET'])
def health():
    """Verifica se a API está funcionando"""
    return jsonify({'status': 'ok', 'message': 'API está rodando com sucesso'}), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Rota não encontrada'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Erro interno do servidor'}), 500

if __name__ == '__main__':
    # Debug e reloader ativados
    app.run(debug=True, host='127.0.0.1', port=5000)
