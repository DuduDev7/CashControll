from flask import Blueprint, request, jsonify
from models import Despesa
from routes.auth import token_required

expenses_bp = Blueprint('expenses', __name__, url_prefix='/api/expenses')

@expenses_bp.route('', methods=['GET'])
@token_required
def listar_despesas(user_id):
    """Lista todas as despesas do usuário"""
    despesas = Despesa.listar_por_usuario(user_id)
    return jsonify({'despesas': despesas}), 200

@expenses_bp.route('/<int:expense_id>', methods=['GET'])
@token_required
def obter_despesa(user_id, expense_id):
    """Obtém uma despesa específica"""
    despesa = Despesa.obter_por_id(expense_id, user_id)
    
    if not despesa:
        return jsonify({'error': 'Despesa não encontrada'}), 404
    
    return jsonify(despesa), 200

@expenses_bp.route('', methods=['POST'])
@token_required
def criar_despesa(user_id):
    """Cria uma nova despesa"""
    data = request.get_json()
    
    if not data or not data.get('descricao') or not data.get('valor') or not data.get('categoria') or not data.get('data'):
        return jsonify({'error': 'Dados incompletos'}), 400
    
    try:
        despesa = Despesa.criar(
            user_id=user_id,
            descricao=data['descricao'],
            valor=float(data['valor']),
            categoria=data['categoria'],
            data=data['data'],
            observacao=data.get('observacao', '')
        )
        
        return jsonify({
            'message': 'Despesa criada com sucesso',
            'despesa': despesa
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@expenses_bp.route('/<int:expense_id>', methods=['PUT'])
@token_required
def atualizar_despesa(user_id, expense_id):
    """Atualiza uma despesa"""
    data = request.get_json()
    
    # Verifica se a despesa pertence ao usuário
    despesa = Despesa.obter_por_id(expense_id, user_id)
    if not despesa:
        return jsonify({'error': 'Despesa não encontrada'}), 404
    
    try:
        Despesa.atualizar(
            expense_id=expense_id,
            user_id=user_id,
            descricao=data.get('descricao', despesa['descricao']),
            valor=float(data.get('valor', despesa['valor'])),
            categoria=data.get('categoria', despesa['categoria']),
            data=data.get('data', despesa['data']),
            observacao=data.get('observacao', despesa['observacao'])
        )
        
        return jsonify({
            'message': 'Despesa atualizada com sucesso'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@expenses_bp.route('/<int:expense_id>', methods=['DELETE'])
@token_required
def deletar_despesa(user_id, expense_id):
    """Deleta uma despesa"""
    despesa = Despesa.obter_por_id(expense_id, user_id)
    
    if not despesa:
        return jsonify({'error': 'Despesa não encontrada'}), 404
    
    Despesa.deletar(expense_id, user_id)
    
    return jsonify({'message': 'Despesa deletada com sucesso'}), 200
