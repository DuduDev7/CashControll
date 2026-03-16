//cadastro
async function cadastrar() {
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

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: nome,
        user_email: email,
        user_password: senha
      })
    })

    const result = await response.json()

    if (!response.ok) {
      document.getElementById('resultado').innerHTML = result.error || 'Erro ao cadastrar'
      return
    }

    // Salva o token
    localStorage.setItem('token', result.token)
    localStorage.setItem('user', JSON.stringify(result.user))

    document.getElementById('resultado').innerHTML = '✅ Cadastro realizado com sucesso! Redirecionando...'
    
    setTimeout(() => {
      window.location.href = 'dashboard.html'
    }, 1500)
  } catch (error) {
    console.error('Erro:', error)
    document.getElementById('resultado').innerHTML = 'Erro ao conectar com o servidor'
  }
}

//login
async function login() {
  let email = document.getElementById('email').value
  let senha = document.getElementById('senha').value

  if (email === '' || senha === '') {
    document.getElementById('resultado').innerHTML = 'Email e senha são obrigatórios'
    return
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_email: email,
        user_password: senha
      })
    })

    const result = await response.json()

    if (!response.ok) {
      document.getElementById('resultado').innerHTML = result.error || 'Erro ao fazer login'
      return
    }

    // Salva o token e dados do usuário
    localStorage.setItem('token', result.token)
    localStorage.setItem('user', JSON.stringify(result.user))

    document.getElementById('resultado').innerHTML = '✅ Login realizado com sucesso! Redirecionando...'
    
    setTimeout(() => {
      window.location.href = 'dashboard.html'
    }, 1000)
  } catch (error) {
    console.error('Erro:', error)
    document.getElementById('resultado').innerHTML = 'Erro ao conectar com o servidor'
  }
}

// logout
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = 'index.html'
}
