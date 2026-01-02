
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

// utils.js

window.utils = window.utils || {};

window.utils.gerarQRCode = function (elementId, texto) {
  const container = document.getElementById(elementId);
  if (!container || !texto || texto.length > 950) {
    console.warn("QR-code não gerado: texto muito longo ou inválido.");
    console.log("Texto: " + texto);
    console.log("Tamanho do texto: " + texto.length);
    container.innerHTML = "<small>QR indisponível</small>";
    return;
  }

  // Converte para UTF-8 
  const utf8Texto = unescape(encodeURIComponent(texto));

  container.innerHTML = "";
  new QRCode(container, {
    text: utf8Texto,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
};

