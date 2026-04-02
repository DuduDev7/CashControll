from flask import Blueprint, request, jsonify, session
from models import db, Income

incomes_bp = Blueprint('incomes', __name__, url_prefix='/api/incomes')


@incomes_bp.route('', methods=['GET'])
def list_incomes():
    user_id = session.get('user_id')

    if user_id:
        incomes = Income.query.filter_by(user_id=user_id).all()
    else:
        incomes = Income.query.all()

    result = [
        {
            'id': i.id,
            'description': i.description,
            'value': i.value,
            'date': i.date,
            'user_id': i.user_id
        }
        for i in incomes
    ]

    return jsonify(result)




@incomes_bp.route('', methods=['POST'])
def create_income():
    data = request.get_json() or {}

    description = data.get('description')
    value = data.get('value', 0)
    date = data.get('date')
    user_id = session.get('user_id')

    income = Income(
        description=description,
        value=float(value or 0),
        date=date,
        user_id=user_id
    )

    db.session.add(income)
    db.session.commit()

    return jsonify({
        'id': income.id,
        'description': income.description,
        'value': income.value,
        'date': income.date,
        'user_id': income.user_id
    }), 201


@incomes_bp.route('/<int:id>', methods=['PUT'])
def update_income(id):
    user_id = session.get('user_id')
    data = request.get_json() or {}
    
    income = Income.query.filter_by(id=id, user_id=user_id).first()
    
    if not income:
        return jsonify({'error': 'Rendimento não encontrado'}), 404
    
    income.description = data.get('description', income.description)
    income.value = float(data.get('value', income.value))
    income.date = data.get('date', income.date)
    
    db.session.commit()
    
    return jsonify({
        'id': income.id,
        'description': income.description,
        'value': income.value,
        'date': income.date
    })






@incomes_bp.route('/total')
def total_incomes():
    user_id = session.get('user_id')

    query = Income.query
    if user_id:
        query = query.filter_by(user_id=user_id)

    total = sum(i.value for i in query.all())

    return jsonify({'total': total})


@incomes_bp.route('/<int:id>', methods=['DELETE'])
def delete_income(id):
    user_id = session.get('user_id')
    
    income = Income.query.filter_by(id=id, user_id=user_id).first()
    
    if not income:
        return jsonify({'error': 'Rendimento não encontrado'}), 404
    
    db.session.delete(income)
    db.session.commit()
    
    return jsonify({'message': 'Rendimento deletado'})


