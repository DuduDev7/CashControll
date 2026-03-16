from flask import Blueprint, request, jsonify
from models import Receita
from routes.auth import token_required

incomes_bp = Blueprint('incomes', __name__, url_prefix='/api/incomes')

@incomes_bp.route('', methods=['GET'])
@token_required
def listar_receitas(user_id):
    """Lista todas as receitas do usuário"""
    receitas = Receita.listar_por_usuario(user_id)
    return jsonify({'receitas': receitas}), 200

@incomes_bp.route('/<int:income_id>', methods=['GET'])
@token_required
def obter_receita(user_id, income_id):
    """Obtém uma receita específica"""
    receita = Receita.obter_por_id(income_id, user_id)
    
    if not receita:
        return jsonify({'error': 'Receita não encontrada'}), 404
    
    return jsonify(receita), 200

@incomes_bp.route('', methods=['POST'])
@token_required
def criar_receita(user_id):
    """Cria uma nova receita"""
    data = request.get_json()
    
    if not data or not data.get('descricao') or not data.get('valor') or not data.get('data'):
        return jsonify({'error': 'Dados incompletos'}), 400
    
    try:
        receita = Receita.criar(
            user_id=user_id,
            descricao=data['descricao'],
            valor=float(data['valor']),
            data=data['data'],
            observacao=data.get('observacao', '')
        )
        
        return jsonify({
            'message': 'Receita criada com sucesso',
            'receita': receita
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@incomes_bp.route('/<int:income_id>', methods=['PUT'])
@token_required
def atualizar_receita(user_id, income_id):
    """Atualiza uma receita"""
    data = request.get_json()
    
    # Verifica se a receita pertence ao usuário
    receita = Receita.obter_por_id(income_id, user_id)
    if not receita:
        return jsonify({'error': 'Receita não encontrada'}), 404
    
    try:
        Receita.atualizar(
            income_id=income_id,
            user_id=user_id,
            descricao=data.get('descricao', receita['descricao']),
            valor=float(data.get('valor', receita['valor'])),
            data=data.get('data', receita['data']),
            observacao=data.get('observacao', receita['observacao'])
        )
        
        return jsonify({
            'message': 'Receita atualizada com sucesso'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@incomes_bp.route('/<int:income_id>', methods=['DELETE'])
@token_required
def deletar_receita(user_id, income_id):
    """Deleta uma receita"""
    receita = Receita.obter_por_id(income_id, user_id)
    
    if not receita:
        return jsonify({'error': 'Receita não encontrada'}), 404
    
    Receita.deletar(income_id, user_id)
    
    return jsonify({'message': 'Receita deletada com sucesso'}), 200
