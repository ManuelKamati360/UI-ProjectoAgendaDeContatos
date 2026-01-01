// utils.js
function atualizarTotalCards() {
  const tagTotalCards = document.getElementById("total-de-contatos");
  if (tagTotalCards) {
    tagTotalCards.textContent = listaContatos.length;
  }
}

// expõe a função para outros scripts
window.utils = { atualizarTotalCards };
