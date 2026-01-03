
// Função para atualizar o total de cards exibidos, após adicionar, editar e deletar algum contato...
function atualizarTotalCards() {
  const tagTotalCards = document.getElementById("total-de-contatos");
  if (tagTotalCards) {
    tagTotalCards.textContent = listaContatos.length;
  }
}

// Função para exportar a lista de contatos em formato PDF...
exportarContatosParaPDF = function (contatos) {
  if (!Array.isArray(contatos) || contatos.length === 0) {
    alert("Nenhum contato disponível para exportar.");
    return;
  }

  const jsPDF = window.jspdf.jsPDF;
  const doc = new jsPDF();

  // Definição do estilo para o título...
  doc.setFont("times", "bold");
  doc.setFontSize(20);
  doc.setTextColor(28, 80, 125); // azul
  doc.text("LISTA DE CONTATOS", 105, 20, { align: "center" });
  doc.setLineWidth(2);
  doc.line(15, 22, 195, 22);

  // Definição dos dados que irão na tabela...
  const dados = contatos
  //  Ordena alfabeticamente pelo nome
  .sort((a, b) => a.nome.localeCompare(b.nome))
  //  Depois mapeia para o formato da tabela
  .map(c => [
    c.nome,
    c.telefone,
    c.email,
    `${c.endereco}, ${c.cidade}, ${c.estado}`
  ]);

  // Definição da estrutura da tabela para o PDF...
  doc.autoTable({
    head: [["Nome", "Telefone", "Email", "Endereço"]],
    body: dados,
    startY: 30,
    theme: "grid",
    styles: { fontSize: 10, halign: "justify" },
    headStyles: { fillColor: [28, 80, 125], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 240, 240] }
  });

  // Rodapé da tabela...
  const data = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.setLineWidth(2);
  doc.line(15, 22, 195, 22);
  doc.text(`Exportado em: ${data}`, 15, 285);

  // Salva o PDF com nome padrão...
  doc.save("agenda-de-contatos.pdf");
};


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

