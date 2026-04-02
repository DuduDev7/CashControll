from flask import Blueprint, request, jsonify, session
from models import db, Expense

expenses_bp = Blueprint('expenses', __name__, url_prefix='/api/expenses')


@expenses_bp.route('', methods=['GET'])
def list_expenses():
    user_id = session.get('user_id')

    if user_id:
        expenses = Expense.query.filter_by(user_id=user_id).all()
    else:
        expenses = Expense.query.all()

    result = [
        {
            'id': e.id,
            'description': e.description,
            'value': e.value,
            'date': e.date,
            'tipo': e.tipo,
            'user_id': e.user_id
        }
        for e in expenses
    ]

    return jsonify(result)




@expenses_bp.route('', methods=['POST'])
def create_expense():
    data = request.get_json() or {}

    description = data.get('description')
    value = data.get('value', 0)
    date = data.get('date')
    tipo = data.get('tipo', 'geral')
    user_id = session.get('user_id')

    expense = Expense(
        description=description,
        value=float(value or 0),
        date=date,
        tipo=tipo,
        user_id=user_id
    )

    db.session.add(expense)
    db.session.commit()

    return jsonify({
        'id': expense.id,
        'description': expense.description,
        'value': expense.value,
        'date': expense.date,
        'tipo': expense.tipo,
        'user_id': expense.user_id
    }), 201


@expenses_bp.route('/<int:id>', methods=['PUT'])
def update_expense(id):
    user_id = session.get('user_id')
    data = request.get_json() or {}
    
    expense = Expense.query.filter_by(id=id, user_id=user_id).first()
    
    if not expense:
        return jsonify({'error': 'Despesa não encontrada'}), 404
    
    expense.description = data.get('description', expense.description)
    expense.value = float(data.get('value', expense.value))
    expense.date = data.get('date', expense.date)
    expense.tipo = data.get('tipo', expense.tipo)
    
    db.session.commit()
    
    return jsonify({
        'id': expense.id,
        'description': expense.description,
        'value': expense.value,
        'date': expense.date,
        'tipo': expense.tipo
    })






@expenses_bp.route('/total')
def total_expenses():
    user_id = session.get('user_id')

    query = Expense.query
    if user_id:
        query = query.filter_by(user_id=user_id)

    total = sum(e.value for e in query.all())

    return jsonify({'total': total})


@expenses_bp.route('/<int:id>', methods=['DELETE'])
def delete_expense(id):
    user_id = session.get('user_id')
    
    expense = Expense.query.filter_by(id=id, user_id=user_id).first()
    
    if not expense:
        return jsonify({'error': 'Despesa não encontrada'}), 404
    
    db.session.delete(expense)
    db.session.commit()
    
    return jsonify({'message': 'Despesa deletada'})


