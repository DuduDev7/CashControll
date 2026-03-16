#!/usr/bin/env python3
"""
🚀 CashControll - Servidor Combinado
Execute este arquivo para rodar a aplicação completa
"""

import os
import sys
import subprocess
import threading
import time
from http.server import HTTPServer, SimpleHTTPRequestHandler

# Configurações
FRONTEND_PORT = 8000
BACKEND_PORT = 5000

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Adiciona headers CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

def run_frontend_server():
    """Roda servidor frontend na pasta raiz"""
    # Vai para a pasta raiz do projeto (CashControll/)
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(project_root)
    
    server_address = ('127.0.0.1', FRONTEND_PORT)
    httpd = HTTPServer(server_address, MyHTTPRequestHandler)
    
    print(f"""
    ╔═══════════════════════════════════════════════════════════╗
    ║          🌐 Servidor Frontend Iniciado                   ║
    ╠═══════════════════════════════════════════════════════════╣
    ║  URL: http://127.0.0.1:{FRONTEND_PORT}                    ║
    ║  Login: http://127.0.0.1:{FRONTEND_PORT}/index.html       ║
    ║  Cadastro: http://127.0.0.1:{FRONTEND_PORT}/cadastro.html ║
    ║  Dashboard: http://127.0.0.1:{FRONTEND_PORT}/dashboard.html║
    ╚═══════════════════════════════════════════════════════════╝
    """)
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass

def run_backend_server():
    """Roda servidor backend"""
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    
    print(f"""
    ╔═══════════════════════════════════════════════════════════╗
    ║          ⚙️  Servidor Backend Iniciado                    ║
    ╠═══════════════════════════════════════════════════════════╣
    ║  API: http://127.0.0.1:{BACKEND_PORT}                     ║
    ║  Database: {os.path.join(backend_dir, 'database.db')}     ║
    ╚═══════════════════════════════════════════════════════════╝
    """)
    
    try:
        # Inicia o app.py na pasta Back-End
        subprocess.run([sys.executable, 'app.py'], cwd=backend_dir)
    except KeyboardInterrupt:
        pass

def main():
    print("""
    ╔══════════════════════════════════════════════════════════════╗
    ║                    💰 CashControll v1.0                      ║
    ║            Sistema de Controle Financeiro Pessoal           ║
    ╠══════════════════════════════════════════════════════════════╣
    ║  Iniciando aplicação...                                     ║
    ║                                                              ║
    ║  Pressione CTRL+C para parar                               ║
    ╚══════════════════════════════════════════════════════════════╝
    """)
    
    # Inicia backend em thread separada
    backend_thread = threading.Thread(target=run_backend_server, daemon=True)
    backend_thread.start()
    
    # Aguarda um pouco para backend inicializar
    time.sleep(3)
    
    # Inicia frontend (bloqueia a thread principal)
    run_frontend_server()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n✓ Aplicação encerrada com sucesso!")
        sys.exit(0)
