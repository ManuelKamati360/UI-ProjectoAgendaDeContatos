// modalDialogoInfoContato.js

function criarModalInfoContato() {
  const modalHTML = `
    <dialog class="modal" id="id-modal-info">
      <div class="conteiner-modalDialogo">
        <div class="header">
          <h1>Agenda De Contatos</h1>
        </div>

        <div class="conteiner-info-contato">
          <div class="perfil">
            <div class="icone-perfil" id="id-icone-inicial">?</div>
          </div>

          <div class="dados-contato">
            <label id="id-nome-info"></label>
            <label id="id-telefone-info"></label>
            <label id="id-email-info"></label>
            <label id="id-data-info"></label>
            <label id="id-endereco-info"></label>
            <label id="id-cidade-info"></label>
            <label id="id-estado-info"></label>
          </div>

          <div class="qr-container">
            <label>Escaneie para obter o contato!</label>
            <div id="id-qr-info"></div>
          </div>

          <div class="butoes">
            <input type="button" value="Fechar" id="id-btn-fechar-info" class="btn-cancelar">
          </div>
        </div>
      </div>
    </dialog>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

// Abrir modal com dados
function abrirModalInfoContato(contato) {
    document.getElementById("id-nome-info").innerHTML = `<b>Nome:</b> ${contato.nome}`;
    document.getElementById("id-telefone-info").innerHTML = `<b>Telefone:</b> ${contato.telefone}`;
    document.getElementById("id-email-info").innerHTML = `<b>Email:</b> ${contato.email}`;
    document.getElementById("id-data-info").innerHTML = `<b>Aniversário:</b> ${contato.dataNascimento}`;
    document.getElementById("id-endereco-info").innerHTML = `<b>Endereço:</b> ${contato.endereco}`;
    document.getElementById("id-cidade-info").innerHTML = `<b>Cidade:</b> ${contato.cidade}`;
    document.getElementById("id-estado-info").innerHTML = `<b>Estado:</b> ${contato.estado}`;

    document.getElementById("id-icone-inicial").textContent = contato.nome?.charAt(0).toUpperCase() || "?";

    // Objecto de dados para o QR-code...
    const textoQR = [
        contato.nome,
        contato.telefone,
        contato.email,
        contato.dataNascimento,
        `${contato.endereco},${contato.cidade},${contato.estado}`
    ].join(" | ");

    window.utils.gerarQRCode("id-qr-info", textoQR);

    document.getElementById("id-modal-info").showModal();
}

// Inicializar
document.addEventListener("DOMContentLoaded", function () {
  criarModalInfoContato();

  document.getElementById("id-btn-fechar-info").addEventListener("click", function () {
    document.getElementById("id-modal-info").close();
  });
});

// Expor função
window.modalInfo = { abrirModalInfoContato };
