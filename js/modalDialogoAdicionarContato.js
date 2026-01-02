// modalDialogoAdicionar.js

function criarModalAdicionar() {
  const modalHTML = `
    <dialog class="modal" id="id-modal-adicionar">
      <div class="conteiner-modalDialogo">
        <div class="header">
          <h1>Agenda De Contatos</h1>
        </div>

        <form action="" method="post" class="form-modalDialogo" id="form-modalAdicionar">
          <label for="id-nome-modalAdicionar">Nome</label>
          <input type="text" name="nome" id="id-nome-modalAdicionar" maxlength="45" placeholder="Digite o nome completo..." autocomplete="off" autofocus required>
          
          <div class="conteiner-codigo-pais">
            <label for="id-pais-modalAdicionar" class="item-paises">País</label>
            <select name="pais" id="id-pais-modalAdicionar" class="item-paises" required>
              <option value="" disabled selected>Selecione</option>
              <option value="+244">Angola (+244)</option>
              <option value="+351">Portugal (+351)</option>
              <option value="+55">Brasil (+55)</option>
              <option value="+258">Moçambique (+258)</option>
              <option value="+238">Cabo Verde (+238)</option>
              <option value="+245">Guiné-Bissau (+245)</option>
              <option value="+853">Macau (+853)</option>
            </select>
            <label for="id-telefone-modalAdicionar" class="item-paises">Telefone</label>
            <input type="tel" maxlength="9" name="telefone" id="id-telefone-modalAdicionar" class="item-paises" placeholder="Digite o número de telefone..." autocomplete="off" required>
          </div>

          <label for="id-email-modalAdicionar">E-mail</label>
          <input type="email" name="email" id="id-email-modalAdicionar" placeholder="Digite o endereço de e-mail..." autocomplete="off" required>

          <label for="id-datanascimento-modalAdicionar">Data de nascimento</label>
          <input type="date" name="dataNascimento" id="id-datanascimento-modalAdicionar" required>

          <label for="id-endereco-modalAdicionar">Endereço</label>
          <input type="text" name="endereco" id="id-endereco-modalAdicionar" maxlength="45" placeholder="Digite o seu endereço..." required>

          <label for="id-cidade-modalAdicionar">Cidade</label>
          <input type="text" name="cidade" id="id-cidade-modalAdicionar" maxlength="45" placeholder="Digite a sua cidade..." required>

          <label for="id-estado-modalAdicionar">Estado</label>
          <input type="text" name="estado" id="id-estado-modalAdicionar" maxlength="45" placeholder="Digite o seu estado..." required>
          
          <div class="butoes">
            <input type="button" value="Adicionar" id="id-btn-adicionar-modalAdicionar">
            <input type="button" value="Cancelar" id="id-btn-cancelar-modalAdicionar" class="btn-cancelar">
          </div>
        </form>
      </div> 
    </dialog>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

// Validar formulário de adicionar
function validarFormularioAdicionar() {
  const nome = document.getElementById("id-nome-modalAdicionar").value.trim();
  const pais = document.getElementById("id-pais-modalAdicionar").value;
  const telefone = document.getElementById("id-telefone-modalAdicionar").value.trim();
  const email = document.getElementById("id-email-modalAdicionar").value.trim();
  const dataNascimento = document.getElementById("id-datanascimento-modalAdicionar").value;
  const endereco = document.getElementById("id-endereco-modalAdicionar").value.trim();
  const cidade = document.getElementById("id-cidade-modalAdicionar").value.trim();
  const estado = document.getElementById("id-estado-modalAdicionar").value.trim();

  if (!nome || !pais || !telefone || !email || !dataNascimento || !endereco || !cidade || !estado) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return null;
  }
  if (!/^\d{9}$/.test(telefone)) {
    alert("O telefone deve conter exatamente 9 dígitos.");
    return null;
  }
  if (!email.includes("@") || !email.includes(".")) {
    alert("E-mail inválido.");
    return null;
  }

  return { nome, telefone: `(${pais}) ${telefone}`, email, dataNascimento, endereco, cidade, estado };
}

// Inicializar modal
document.addEventListener("DOMContentLoaded", function () {
  criarModalAdicionar();

  // Botão lateral que abre o modal
  document.getElementById("btn-adicionar-contato").addEventListener("click", function () {
    document.getElementById("id-modal-adicionar").showModal();
  });

  // Botão cancelar
  document.getElementById("id-btn-cancelar-modalAdicionar").addEventListener("click", function () {
    document.getElementById("id-modal-adicionar").close();
  });

  // Botão adicionar
  document.getElementById("id-btn-adicionar-modalAdicionar").addEventListener("click", function () {
    const dadosValidados = validarFormularioAdicionar();
    if (!dadosValidados) return;

    if (window.api && window.api.adicionarContato) {
      window.api.adicionarContato(dadosValidados)
        .then(() => {
          alert("Contato adicionado com sucesso!");
          location.reload();  // atualiza a pagina... cards e contador
          document.getElementById("id-modal-adicionar").close();
        })
        .catch(() => alert("Erro ao adicionar contato."));
    }
  });
});

// Exporta função se precisar abrir modal externamente
window.modalAdicionar = { abrir: () => document.getElementById("id-modal-adicionar").showModal() };
