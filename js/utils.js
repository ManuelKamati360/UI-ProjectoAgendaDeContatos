
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
window.utils = window.utils || {};

// Função para gerar QR-code...
window.utils.gerarQRCode = function (elementId, texto) {
  const container = document.getElementById(elementId);
  if (!container || !texto || texto.length > 950) {
    console.warn("QR-code não gerado: texto muito longo ou inválido.");
    container.innerHTML = "<small>QR indisponível</small>";
    return;
  }

  // Converte para UTF-8 corretamente
  const utf8Texto = decodeURIComponent(encodeURIComponent(texto));

  // Cria QR com a nova lib
  const qr = qrcode(0, 'H'); // versão automática, correção alta
  qr.addData(utf8Texto);
  qr.make();

  // Renderiza como SVG (mais nítido e escalável que img)
container.innerHTML = qr.createSvgTag(2, 2);
};

