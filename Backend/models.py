from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    senha = db.Column(db.String(200), nullable=False)

    incomes = db.relationship('Income', backref='user', lazy=True)
    expenses = db.relationship('Expense', backref='user', lazy=True)


class Income(db.Model):
    __tablename__ = 'incomes'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(300))
    value = db.Column(db.Float, default=0.0)
    date = db.Column(db.String(50), default=lambda: datetime.utcnow().isoformat())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


class Expense(db.Model):
    __tablename__ = 'expenses'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(300))
    value = db.Column(db.Float, default=0.0)
    date = db.Column(db.String(50), default=lambda: datetime.utcnow().isoformat())
    tipo = db.Column(db.String(50), default='geral')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


def init_db():
    db.create_all()