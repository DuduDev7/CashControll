import { addIncome } from './api.js'

const form = document.getElementById('incomeForm')

form.addEventListener('submit', async function (e) {
  e.preventDefault()

  const valor = document.getElementById('valor').value
  const fonte = document.getElementById('fonte').value
  const data = document.getElementById('data').value
  const observacao = document.getElementById('observacao').value

  if (!valor || !fonte || !data) {
    alert('Preencha todos os campos')
    return
  }

  if (Number(valor) <= 0) {
    alert('Valor inválido')
    return
  }

  const income = {
    description: fonte,
    value: Number(valor),
    date: data,
    observacao: observacao
  }

  try {
    await addIncome(income)

    alert('Receita adicionada!')

    form.reset()

    window.location.href = 'histoIncomes.html'
  } catch (error) {
    console.error(error)
    alert('Erro ao adicionar receita')
  }
})