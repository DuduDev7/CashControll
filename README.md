# CashControll

CashControll é uma aplicação web desenvolvida para **controle financeiro pessoal**, permitindo que usuários registrem e acompanhem suas **receitas e despesas** de forma simples e organizada.

O sistema foi construído com uma arquitetura separando **frontend e backend**, utilizando **Flask no backend** e **JavaScript puro no frontend**, consumindo uma API REST.

---

# Demonstração

Interface simples para controle financeiro diário.

Principais telas do sistema:

* Login de usuário
* Dashboard financeiro
* Registro de receitas
* Registro de despesas
* Histórico financeiro

*(adicione screenshots aqui futuramente)*

---

# Tecnologias Utilizadas

Backend

* Python
* Flask
* SQLite
* SQLAlchemy

Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)

Ferramentas

* Git
* GitHub

---

# Funcionalidades

✔ Cadastro de usuários
✔ Autenticação de login
✔ Registro de receitas
✔ Registro de despesas
✔ Visualização de histórico financeiro
✔ Dashboard com resumo financeiro
✔ API REST para comunicação frontend/backend

---

# Estrutura do Projeto

```
CashControll
│
├── Back-End
│   ├── routes
│   │   ├── auth.py
│   │   ├── expenses.py
│   │   └── incomes.py
│   │
│   ├── app.py
│   ├── database.py
│   ├── models.py
│   ├── requirements.txt
│   └── run.py
│
├── css
│   └── style.css
│
├── js
│   ├── api.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── expenses.js
│   ├── histoIncomes.js
│   └── incomes.js
│
├── index.html
├── dashboard.html
├── expenses.html
├── incomes.html
└── cadastro.html
```

---

# Arquitetura

O projeto segue uma separação simples entre **Frontend e Backend**.

Frontend

* Interface do usuário
* HTML, CSS e JavaScript
* Consome endpoints da API

Backend

* API REST com Flask
* Responsável por autenticação
* Manipulação de dados financeiros
* Persistência em banco SQLite

Componentes principais:

routes
Responsáveis pelos endpoints da API (login, despesas, receitas).

models
Define as entidades do banco de dados.

database
Configuração e conexão com o banco SQLite.

---

# Como Rodar o Projeto

## 1. Clonar o repositório

```
git clone https://github.com/seu-usuario/cashcontroll.git
```

## 2. Acessar o diretório

```
cd cashcontroll
```

## 3. Instalar dependências

```
pip install -r Back-End/requirements.txt
```

## 4. Criar arquivo de ambiente

Copie o arquivo `.env.example` e renomeie para `.env`.

```
cp Back-End/.env.example Back-End/.env
```

## 5. Rodar o servidor

```
python Back-End/run.py
```

O sistema estará disponível em:

```
http://localhost:5000
```

---

# Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de:

* praticar desenvolvimento **full stack**
* aplicar conceitos de **APIs REST**
* trabalhar com **persistência de dados**
* organizar um projeto com **separação de responsabilidades**

---

# Melhorias Futuras

* gráficos financeiros
* exportação de relatórios
* autenticação com JWT
* deploy em nuvem
* versão mobile responsiva

---

# Autor

Eduardo Oliveira
