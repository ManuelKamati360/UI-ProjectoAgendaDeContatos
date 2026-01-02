
// Função para atualizar o total de cards exibidos, após adicionar, editar e deletar algum contato...
function atualizarTotalCards() {
  const tagTotalCards = document.getElementById("total-de-contatos");
  if (tagTotalCards) {
    tagTotalCards.textContent = listaContatos.length;
  }
}

// Função para exportar a lista de contatos em formato PDF...
function exportarContatosParaPDF() {
  // Implementação futura
}

// Expondo as funções para outros scripts...
window.utils = { 
  atualizarTotalCards, 
  exportarContatosParaPDF 
};