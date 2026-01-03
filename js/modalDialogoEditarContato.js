// modalDialogoEditar.js

//  1. Injeta o HTML do modal no DOM
function criarModalEditar() {
  const modalHTML = `
    <dialog class="modal" id="id-modal-editar">
      <div class="conteiner-modalDialogo">
        <div class="header">
          <h1>Agenda De Contatos</h1>
        </div>

        <form action="" method="post" class="form-modalDialogo" id="form-editar">
          <label for="id-nome">Nome</label>
          <input type="text" name="nome" id="id-nome-modalEditar" maxlength="45" placeholder="Digite o nome completo..." autocomplete="off" autofocus required>
          
          <div class="conteiner-codigo-pais">
            <label for="id-pais" class="item-paises">País</label>
            <select name="pais" id="id-pais-modalEditar" class="item-paises" required>
              <option value="" disabled selected>Selecione</option>
              <option value="+244">Angola (+244)</option>
              <option value="+351">Portugal (+351)</option>
              <option value="+55">Brasil (+55)</option>
              <option value="+258">Moçambique (+258)</option>
              <option value="+238">Cabo Verde (+238)</option>
              <option value="+245">Guiné-Bissau (+245)</option>
              <option value="+853">Macau (+853)</option>
            </select>
            <label for="id-telefone" class="item-paises" id="telefone">Telefone</label>
            <input type="tel" maxlength="9" name="telefone" id="id-telefone-modalEditar" class="item-paises" placeholder="Digite o número de telefone..." autocomplete="off" required>
          </div>

          <label for="id-email">E-mail</label>
          <input type="email" name="email" id="id-email-modalEditar" placeholder="Digite o endereço de e-mail..." autocomplete="off" required>

          <label for="id-datanascimento">Data de nascimento</label>
          <input type="date" name="dataNascimento" id="id-datanascimento-modalEditar" required>

          <label for="id-endereco">Endereço</label>
          <input type="text" name="endereco" id="id-endereco-modalEditar" maxlength="45" placeholder="Digite o seu endereço..." required>

          <label for="id-cidade">Cidade</label>
          <input type="text" name="cidade" id="id-cidade-modalEditar" maxlength="45" placeholder="Digite a sua cidade..." required>

          <label for="id-estado">Estado</label>
          <input type="text" name="estado" id="id-estado-modalEditar" maxlength="45" placeholder="Digite o seu estado..." required>
          
          <div class="butoes">
            <input type="button" value="Salvar" id="id-btn-salvar-modalEditar">
            <input type="button" value="Cancelar" class="btn-cancelar" id="id-btn-cancelar-modalEditar">
          </div>
        </form>
      </div> 
    </dialog>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

//  2. Funções auxiliares para formatar data e telefone
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

//  3. Abrir e preencher o modal
function abrirModalEditar(contato) {
  const modal = document.getElementById("id-modal-editar");
  if (!modal) return;

  document.getElementById("id-nome-modalEditar").value = contato.nome || "";
  document.getElementById("id-email-modalEditar").value = contato.email || "";
  document.getElementById("id-endereco-modalEditar").value = contato.endereco || "";
  document.getElementById("id-cidade-modalEditar").value = contato.cidade || "";
  document.getElementById("id-estado-modalEditar").value = contato.estado || "";
  document.getElementById("id-datanascimento-modalEditar").value = formatarDataParaInput(contato.dataNascimento || "");

  const { codigo, numero } = separarTelefoneCompleto(contato.telefone || "");
  document.getElementById("id-pais-modalEditar").value = codigo;
  document.getElementById("id-telefone-modalEditar").value = numero;

  modal.setAttribute("data-id", contato.id);
  modal.showModal();
}

//  4. Validar formulário
function validarFormularioEditar() {
  const nome = document.getElementById("id-nome-modalEditar").value.trim();
  const pais = document.getElementById("id-pais-modalEditar").value;
  const telefone = document.getElementById("id-telefone-modalEditar").value.trim();
  const email = document.getElementById("id-email-modalEditar").value.trim();
  const dataNascimento = document.getElementById("id-datanascimento-modalEditar").value;
  const endereco = document.getElementById("id-endereco-modalEditar").value.trim();
  const cidade = document.getElementById("id-cidade-modalEditar").value.trim();
  const estado = document.getElementById("id-estado-modalEditar").value.trim();

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

//  5. Inicializar modal (criar + listeners)
document.addEventListener("DOMContentLoaded", function () {
  criarModalEditar();

  // Botão cancelar
  document.getElementById("id-btn-cancelar-modalEditar").addEventListener("click", function () {
    document.getElementById("id-modal-editar").close();
  });

  // Botão salvar → delega para consumo-api.js
  document.getElementById("id-btn-salvar-modalEditar").addEventListener("click", function () {
    const dadosValidados = validarFormularioEditar();
    if (!dadosValidados) return;

    const idContato = document.getElementById("id-modal-editar").getAttribute("data-id");
    // Chama função global da API
    if (window.api && window.api.atualizarContato) {
      window.api.atualizarContato(idContato, dadosValidados)
        .then(() => {
          alert("Contato atualizado com sucesso!");
          location.reload();  // atualiza a pagina... cards e contador
          document.getElementById("id-modal-editar").close();
        })
        .catch(() => alert("Erro ao atualizar contato."));
    }
  });
});

//  Exporta funções para uso externo
window.modalEditar = { abrirModalEditar };
