// modalDialogoDeletar.js

// 🔹 1. Injeta o HTML do modal no DOM
function criarModalDeletar() {
  const modalHTML = `
    <dialog class="modal" id="id-modal-deletar">
      <div class="conteiner-modalDialogo">
        <div class="header">
          <h1>Agenda De Contatos</h1>
        </div>

        <form action="" method="post" class="form-modalDialogo" id="form-modalDeletar">
          <label for="id-nome-modalDeletar">Nome</label>
          <input type="text" name="nome" id="id-nome-modalDeletar" maxlength="45" readonly>

          <div class="conteiner-codigo-pais">
            <label for="id-pais-modalDeletar" class="item-paises">País</label>
            <select name="pais" id="id-pais-modalDeletar" class="item-paises" disabled>
              <option value="" disabled selected>Selecione</option>
              <option value="+244">Angola (+244)</option>
              <option value="+351">Portugal (+351)</option>
              <option value="+55">Brasil (+55)</option>
              <option value="+258">Moçambique (+258)</option>
              <option value="+238">Cabo Verde (+238)</option>
              <option value="+245">Guiné-Bissau (+245)</option>
              <option value="+853">Macau (+853)</option>
            </select>
            <label for="id-telefone-modalDeletar" class="item-paises">Telefone</label>
            <input type="tel" name="telefone" id="id-telefone-modalDeletar" class="item-paises" readonly>
          </div>

          <label for="id-email-modalDeletar">E-mail</label>
          <input type="email" name="email" id="id-email-modalDeletar" readonly>

          <label for="id-datanascimento-modalDeletar">Data de nascimento</label>
          <input type="date" name="dataNascimento" id="id-datanascimento-modalDeletar" readonly>

          <label for="id-endereco-modalDeletar">Endereço</label>
          <input type="text" name="endereco" id="id-endereco-modalDeletar" readonly>

          <label for="id-cidade-modalDeletar">Cidade</label>
          <input type="text" name="cidade" id="id-cidade-modalDeletar" readonly>

          <label for="id-estado-modalDeletar">Estado</label>
          <input type="text" name="estado" id="id-estado-modalDeletar" readonly>

          <div class="butoes">
            <input type="button" value="Deletar" id="id-btn-deletar-modalDeletar">
            <input type="button" value="Cancelar" id="id-btn-cancelar-modalDeletar" class="btn-cancelar">
          </div>
        </form>
      </div>
    </dialog>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

// 🔹 2. Funções auxiliares para formatar data e telefone
function formatarDataParaInput(dataString) {
  const meses = { jan:"01", feb:"02", mar:"03", apr:"04", may:"05", jun:"06",
                  jul:"07", aug:"08", sep:"09", oct:"10", nov:"11", dec:"12" };
  const regex = /([a-z]{3})\.?\s+(\d{1,2}),\s+(\d{4})/i;
  const match = dataString.match(regex);
  if (match) {
    const mes = meses[match[1].toLowerCase()];
    const dia = match[2].padStart(2, "0");
    const ano = match[3];
    return `${ano}-${mes}-${dia}`;
  }
  return "";
}

function separarTelefoneCompleto(telefoneCompleto) {
  const regex = /\((\+\d+)\)\s*([\d\- ]+)/;
  const match = telefoneCompleto.match(regex);
  if (match) {
    const codigo = match[1];
    const numero = match[2].replace(/[\s\-]/g, "");
    return { codigo, numero };
  }
  return { codigo: "", numero: "" };
}

// 3. Preencher modal com dados do contato
function abrirModalDeletar(contato) {
  const modal = document.getElementById("id-modal-deletar");
  if (!modal) return;

  document.getElementById("id-nome-modalDeletar").value = contato.nome || "";
  document.getElementById("id-email-modalDeletar").value = contato.email || "";
  document.getElementById("id-endereco-modalDeletar").value = contato.endereco || "";
  document.getElementById("id-cidade-modalDeletar").value = contato.cidade || "";
  document.getElementById("id-estado-modalDeletar").value = contato.estado || "";
  document.getElementById("id-datanascimento-modalDeletar").value = formatarDataParaInput(contato.dataNascimento || "");

  const { codigo, numero } = separarTelefoneCompleto(contato.telefone || "");
  document.getElementById("id-pais-modalDeletar").value = codigo;
  document.getElementById("id-telefone-modalDeletar").value = numero;

  modal.setAttribute("data-id", contato.id);
  modal.showModal();
}

// Inicializar modal
document.addEventListener("DOMContentLoaded", function () {
  criarModalDeletar();

  // Botão cancelar
  document.getElementById("id-btn-cancelar-modalDeletar").addEventListener("click", function () {
    document.getElementById("id-modal-deletar").close();
  });

  // Botão deletar
  document.getElementById("id-btn-deletar-modalDeletar").addEventListener("click", function () {
    const idContato = document.getElementById("id-modal-deletar").getAttribute("data-id");

    if (window.api && window.api.deletarContato) {
      window.api.deletarContato(idContato)
        .then(() => {
          alert("Contato deletado com sucesso!");
          location.reload();  // atualiza a pagina... cards e contador
          document.getElementById("id-modal-deletar").close();
        })
        .catch(() => alert("Erro ao deletar contato."));
    }
  });
});

// Exporta função para uso externo
window.modalDeletar = { abrirModalDeletar };
