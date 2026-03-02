//nome(começo do dashboard)
function nomeBemVindo() {
  let usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  document.getElementById('nomeBemVindo').innerHTML = 'Olá, ' + usuario.nome;
}