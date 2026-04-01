import { getMe, updateUser } from './api.js';

async function carregarPerfil() {
  try {
    const user = await getMe();
    if (!user) {
      alert('Faça login primeiro');
      window.location.href = 'index.html';
      return;
    }

    document.getElementById('nome').value = user.nome;
    document.getElementById('email').value = user.email;
    document.getElementById('nomeAtual').textContent = user.nome;
    document.getElementById('emailAtual').textContent = user.email;
    document.getElementById('perfilInfo').style.display = 'block';
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar perfil');
  }
}

document.getElementById('editForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  if (!nome || !email) {
    alert('Preencha todos os campos');
    return;
  }

  const userData = { nome, email };

  try {
    const response = await updateUser(userData);
    alert('Perfil atualizado com sucesso!');
    carregarPerfil(); // Reload info
  } catch (error) {
    console.error(error);
    alert('Erro ao atualizar perfil');
  }
});

window.onload = carregarPerfil;

