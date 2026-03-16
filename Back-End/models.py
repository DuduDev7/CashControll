from datetime import datetime
from database import get_db
import hashlib

class Usuario:
    @staticmethod
    def criar(user_name, user_email, user_password):
        """Cria um novo usuário"""
        conn = get_db()
        cursor = conn.cursor()
        
        # Hash da senha
        password_hash = hashlib.sha256(user_password.encode()).hexdigest()
        
        try:
            cursor.execute('''
                INSERT INTO usuarios (user_name, user_email, user_password)
                VALUES (?, ?, ?)
            ''', (user_name, user_email, password_hash))
            conn.commit()
            user_id = cursor.lastrowid
            conn.close()
            return {'user_id': user_id, 'user_name': user_name, 'user_email': user_email}
        except sqlite3.IntegrityError:
            conn.close()
            return None
    
    @staticmethod
    def autenticar(user_email, user_password):
        """Autentica um usuário"""
        conn = get_db()
        cursor = conn.cursor()
        
        password_hash = hashlib.sha256(user_password.encode()).hexdigest()
        
        cursor.execute('''
            SELECT user_id, user_name, user_email FROM usuarios
            WHERE user_email = ? AND user_password = ?
        ''', (user_email, password_hash))
        
        user = cursor.fetchone()
        conn.close()
        
        if user:
            return dict(user)
        return None
    
    @staticmethod
    def obter_por_id(user_id):
        """Obtém um usuário pelo ID"""
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('SELECT user_id, user_name, user_email FROM usuarios WHERE user_id = ?', (user_id,))
        user = cursor.fetchone()
        conn.close()
        
        return dict(user) if user else None

class Receita:
    @staticmethod
    def criar(user_id, descricao, valor, data, observacao=''):
        """Cria uma nova receita"""
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO receitas (user_id, descricao, valor, data, observacao)
            VALUES (?, ?, ?, ?, ?)
        ''', (user_id, descricao, valor, data, observacao))
        
        conn.commit()
        income_id = cursor.lastrowid
        conn.close()
        
        return {
            'income_id': income_id,
            'user_id': user_id,
            'descricao': descricao,
            'valor': valor,
            'data': data,
            'observacao': observacao
        }
    
    @staticmethod
    def listar_por_usuario(user_id):
        """Lista todas as receitas de um usuário"""
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT income_id, user_id, descricao, valor, data, observacao, created_at
            FROM receitas
            WHERE user_id = ?
            ORDER BY data DESC
        ''', (user_id,))
        
        receitas = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return receitas
    
    @staticmethod
    def obter_por_id(income_id, user_id):
        """Obtém uma receita específica"""
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT income_id, user_id, descricao, valor, data, observacao
            FROM receitas
            WHERE income_id = ? AND user_id = ?
        ''', (income_id, user_id))
        
        receita = cursor.fetchone()
        conn.close()
        
        return dict(receita) if receita else None
    
    @staticmethod
    def atualizar(income_id, user_id, descricao, valor, data, observacao=''):
        """Atualiza uma receita"""
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE receitas
            SET descricao = ?, valor = ?, data = ?, observacao = ?
            WHERE income_id = ? AND user_id = ?
        ''', (descricao, valor, data, observacao, income_id, user_id))
        
        conn.commit()
        conn.close()
        
        return True
    
    @staticmethod
    def deletar(income_id, user_id):
        """Deleta uma receita"""
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('DELETE FROM receitas WHERE income_id = ? AND user_id = ?', (income_id, user_id))
        conn.commit()
        conn.close()
        
        return True

class Despesa:
    @staticmethod
    def criar(user_id, descricao, valor, categoria, data, observacao=''):
        """Cria uma nova despesa"""
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO despesas (user_id, descricao, valor, categoria, data, observacao)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (user_id, descricao, valor, categoria, data, observacao))
        
        conn.commit()
        expense_id = cursor.lastrowid
        conn.close()
        
        return {
            'expense_id': expense_id,
            'user_id': user_id,
            'descricao': descricao,
            'valor': valor,
            'categoria': categoria,
            'data': data,
            'observacao': observacao
        }
    
    @staticmethod
    def listar_por_usuario(user_id):
        """Lista todas as despesas de um usuário"""
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT expense_id, user_id, descricao, valor, categoria, data, observacao, created_at
            FROM despesas
            WHERE user_id = ?
            ORDER BY data DESC
        ''', (user_id,))
        
        despesas = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return despesas
    
    @staticmethod
    def obter_por_id(expense_id, user_id):
        """Obtém uma despesa específica"""
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT expense_id, user_id, descricao, valor, categoria, data, observacao
            FROM despesas
            WHERE expense_id = ? AND user_id = ?
        ''', (expense_id, user_id))
        
        despesa = cursor.fetchone()
        conn.close()
        
        return dict(despesa) if despesa else None
    
    @staticmethod
    def atualizar(expense_id, user_id, descricao, valor, categoria, data, observacao=''):
        """Atualiza uma despesa"""
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE despesas
            SET descricao = ?, valor = ?, categoria = ?, data = ?, observacao = ?
            WHERE expense_id = ? AND user_id = ?
        ''', (descricao, valor, categoria, data, observacao, expense_id, user_id))
        
        conn.commit()
        conn.close()
        
        return True
    
    @staticmethod
    def deletar(expense_id, user_id):
        """Deleta uma despesa"""
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('DELETE FROM despesas WHERE expense_id = ? AND user_id = ?', (expense_id, user_id))
        conn.commit()
        conn.close()
        
        return True

import sqlite3
