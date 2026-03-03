//cadastro

function cadastrar() {
  let nome = document.getElementById('nome').value
  let email = document.getElementById('email').value
  let senha = document.getElementById('senha').value
  let confirmarSenha = document.getElementById('confirmarSenha').value

  if (nome === '' || email === '' || senha === '' || confirmarSenha === '') {
    document.getElementById('resultado').innerHTML = 'Tem campo vazio'
    return
  }

  if (senha !== confirmarSenha) {
    document.getElementById('resultado').innerHTML = 'A senha está diferente'
    return
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios'))

  if (!usuarios) {
    usuarios = []
  }

  let existe = usuarios.find(u => u.email === email)

  if (existe) {
    document.getElementById('resultado').innerHTML = 'Email já cadastrado'
    return
  }

  let novoUsuario = {
    nome: nome,
    email: email,
    senha: senha
  }

  usuarios.push(novoUsuario)
  localStorage.setItem('usuarios', JSON.stringify(usuarios))

  document.getElementById('resultado').innerHTML =
    'Cadastro realizado com sucesso'
}

//login

function login() {
  let email = document.getElementById('email').value
  let senha = document.getElementById('senha').value

  let usuarios = JSON.parse(localStorage.getItem('usuarios'))

  if (!usuarios) {
    document.getElementById('resultado').innerHTML = 'Nenhum usuário cadastrado'
    return
  }

  let usuario = usuarios.find(u => u.email === email)

  if (!usuario) {
    document.getElementById('resultado').innerHTML = 'Usuário não encontrado'
    return
  }

  if (usuario.senha !== senha) {
    document.getElementById('resultado').innerHTML = 'Senha incorreta'
    return
  }

  localStorage.setItem('logado', 'true')
  localStorage.setItem('usuarioLogado', JSON.stringify(usuario))

  window.location.href = 'dashboard.html'
}

//logout

function logout() {
  localStorage.removeItem('logado')
  localStorage.removeItem('usuarioLogado')
  window.location.href = 'index.html'
}
