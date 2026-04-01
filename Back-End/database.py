# import psycopg2
# import os

# def get_db():
#     """Retorna conexão com PostgreSQL"""
#     conn = psycopg2.connect(
#         os.environ.get("DATABASE_URL"),
#         sslmode='require'
#     )
#     return conn


# def init_db():
#     """Inicializa o banco no PostgreSQL"""
#     conn = get_db()
#     cursor = conn.cursor()

#     # Tabela de usuários
#     cursor.execute('''
#         CREATE TABLE IF NOT EXISTS usuarios (
#             user_id SERIAL PRIMARY KEY,
#             user_name TEXT NOT NULL,
#             user_email TEXT UNIQUE NOT NULL,
#             user_password TEXT NOT NULL,
#             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#         )
#     ''')

#     # Tabela de receitas
#     cursor.execute('''
#         CREATE TABLE IF NOT EXISTS receitas (
#             income_id SERIAL PRIMARY KEY,
#             user_id INTEGER NOT NULL,
#             descricao TEXT NOT NULL,
#             valor DECIMAL NOT NULL,
#             data DATE NOT NULL,
#             observacao TEXT,
#             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#             FOREIGN KEY (user_id) REFERENCES usuarios (user_id) ON DELETE CASCADE
#         )
#     ''')

#     # Tabela de despesas
#     cursor.execute('''
#         CREATE TABLE IF NOT EXISTS despesas (
#             expense_id SERIAL PRIMARY KEY,
#             user_id INTEGER NOT NULL,
#             descricao TEXT NOT NULL,
#             valor DECIMAL NOT NULL,
#             categoria TEXT NOT NULL,
#             data DATE NOT NULL,
#             observacao TEXT,
#             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#             FOREIGN KEY (user_id) REFERENCES usuarios (user_id) ON DELETE CASCADE
#         )
#     ''')

#     conn.commit()
#     cursor.close()
#     conn.close()
    
#     print("✓ PostgreSQL conectado e tabelas criadas!")