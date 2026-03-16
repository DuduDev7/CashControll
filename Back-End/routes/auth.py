from flask import Blueprint, request, jsonify
from models import Usuario
import jwt
from functools import wraps
from datetime import datetime, timedelta
import os

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

SECRET_KEY = os.getenv('SECRET_KEY', 'sua_chave_secreta_aqui')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'error': 'Token ausente'}), 401
        
        try:
            token = token.replace('Bearer ', '')
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user_id = data['user_id']
        except:
            return jsonify({'error': 'Token inválido'}), 401
        
        return f(user_id, *args, **kwargs)
    
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    """Registra um novo usuário"""
    data = request.get_json()
    
    if not data or not data.get('user_name') or not data.get('user_email') or not data.get('user_password'):
        return jsonify({'error': 'Dados incompletos'}), 400
    
    user = Usuario.criar(
        user_name=data['user_name'],
        user_email=data['user_email'],
        user_password=data['user_password']
    )
    
    if not user:
        return jsonify({'error': 'Email já registrado'}), 400
    
    # Gera token JWT
    token = jwt.encode(
        {
            'user_id': user['user_id'],
            'exp': datetime.utcnow() + timedelta(days=30)
        },
        SECRET_KEY,
        algorithm='HS256'
    )
    
    return jsonify({
        'message': 'Usuário registrado com sucesso',
        'user': user,
        'token': token
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    """Faz login de um usuário"""
    data = request.get_json()
    
    if not data or not data.get('user_email') or not data.get('user_password'):
        return jsonify({'error': 'Email e senha são obrigatórios'}), 400
    
    user = Usuario.autenticar(
        user_email=data['user_email'],
        user_password=data['user_password']
    )
    
    if not user:
        return jsonify({'error': 'Email ou senha incorretos'}), 401
    
    # Gera token JWT
    token = jwt.encode(
        {
            'user_id': user['user_id'],
            'exp': datetime.utcnow() + timedelta(days=30)
        },
        SECRET_KEY,
        algorithm='HS256'
    )
    
    return jsonify({
        'message': 'Login realizado com sucesso',
        'user': user,
        'token': token
    }), 200

@auth_bp.route('/profile', methods=['GET'])
@token_required
def profile(user_id):
    """Obtém o perfil do usuário autenticado"""
    user = Usuario.obter_por_id(user_id)
    
    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404
    
    return jsonify(user), 200
