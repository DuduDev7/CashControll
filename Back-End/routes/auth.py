from flask import Blueprint, jsonify, request, session
from models import db, User

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}

    nome = data.get("nome")
    email = data.get("email")
    senha = data.get("senha")

    if not nome or not email or not senha:
        return jsonify({"error": "Campos obrigatórios"}), 400

    # Verifica se já existe
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email já cadastrado"}), 400

    user = User(nome=nome, email=email, senha=senha)

    db.session.add(user)
    db.session.commit()

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "nome": user.nome,
        "email": user.email
    })


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}

    email = data.get("email")
    senha = data.get("senha")

    if not email or not senha:
        return jsonify({"error": "Campos obrigatórios"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or user.senha != senha:
        return jsonify({"error": "Credenciais inválidas"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "nome": user.nome,
        "email": user.email
    })


@auth_bp.route("/logout", methods=["POST"])
def logout():
    session.pop("user_id", None)
    return jsonify({"message": "Logout realizado"})




@auth_bp.route("/me")
def me():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify(None)

    user = User.query.get(user_id)

    if not user:
        return jsonify(None)

    return jsonify({
        "id": user.id,
        "nome": user.nome,
        "email": user.email
    })


@auth_bp.route("/me", methods=["PUT"])
def update_me():
    user_id = session.get("user_id")
    
    if not user_id:
        return jsonify({"error": "Não autorizado"}), 401
    
    data = request.get_json() or {}
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404
    
    nome = data.get("nome", user.nome)
    email = data.get("email", user.email)
    
    # Verificar se email já existe (exceto pro próprio user)
    if email != user.email and User.query.filter_by(email=email).first():
        return jsonify({"error": "Email já em uso"}), 400
    
    user.nome = nome
    user.email = email
    
    db.session.commit()
    
    return jsonify({
        "id": user.id,
        "nome": user.nome,
        "email": user.email,
        "message": "Perfil atualizado"
    })


