// renderizarContatos.js

//  Variável local para armazenar contatos
let listaContatos = [];

//  Inicialização: carrega contatos da API e renderiza
document.addEventListener("DOMContentLoaded", function () {
  window.api.carregarContatos()
    .then(data => {
      listaContatos = Array.isArray(data) ? data : [data]; // normaliza
      exibirCards();
    })
    .catch(error => console.error("Erro ao carregar contatos:", error));

  //  Integração da barra de pesquisa
  const form = document.getElementById("frm-buscar-contato");
  const input = document.getElementById("item-txt-caixa-de-busca");

  // Evento de submit (quando clica em Buscar)
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    buscarContatos(input.value.trim());
  });

  // Evento de input (quando apaga ou altera manualmente o termo)
  input.addEventListener("input", function () {
    if (this.value.trim() === "") {
      buscarContatos(""); // recarrega todos
    }
  });
});

// Exporta a lista de contatos para pdf
document.addEventListener("DOMContentLoaded", function () {
  const btnExportar = document.getElementById("btn-exportar");
  if (btnExportar) {
    btnExportar.addEventListener("click", function () {
      window.utils.exportarContatosParaPDF(listaContatos);
    });
  }
});

//  Função centralizada de busca
function buscarContatos(termo) {
  let url;

  if (!termo) {
    url = "http://localhost:8080/AgendaDeContactos/api/contatos/";
  } else {
    url = `http://localhost:8080/AgendaDeContactos/api/contatos?search=${encodeURIComponent(termo)}`;
  }

  const container = document.getElementById("conteiner-painel-central");
  container.innerHTML = "<p id='msg-carregando'>Carregando...</p>";

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Erro na pesquisa");
      return response.json();
    })
    .then(data => {
      listaContatos = Array.isArray(data) ? data : [data];
      exibirCards();
    })
    .catch(error => {
      console.error("Erro ao buscar contatos:", error);
      container.innerHTML = "<p style='color:red;' id='msg-contato-inexistente'>Contato(s) não encontrado(s)!<br>Tente novamente...";
    });
}

//  Função para renderizar os cards de todos os contatos...
function exibirCards() {
  const container = document.getElementById("conteiner-painel-central");
  container.innerHTML = "";

  // Normaliza lista antes de iterar
  const contatos = Array.isArray(listaContatos) ? listaContatos : [listaContatos];

  if (!contatos || contatos.length === 0) {
    container.innerHTML = "<p>Nenhum contato encontrado.</p>";
    return;
  }

  contatos.forEach(contato => {
    const card = document.createElement("div");
    card.classList.add("card-contato");

    card.innerHTML = `
      <a href="#" class="card-contato-link" data-id="${contato.id}">
        <div class="card-contato-logo">
          <label>${contato.nome.charAt(0)}</label>
        </div>
        <div class="card-contato-info">
          <p><b>Nome:</b> <label>${contato.nome}</label></p>
          <p><b>Tel:</b> <label>${contato.telefone}</label></p>
        </div>
      </a>
      <div class="card-contato-acoes">
        <button type="button" class="btn-editar-contato" data-id="${contato.id}"></button>
        <button type="button" class="btn-deletar-contato" data-id="${contato.id}"></button>
      </div>
    `;

    container.appendChild(card);

    // Link do card → abre modal info
    card.querySelector(".card-contato-link").addEventListener("click", abrirInfoPorLink);

    // Botão editar
    card.querySelector(".btn-editar-contato").addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const contato = getContatoPorId(id);
      if (contato && window.modalEditar) {
        window.modalEditar.abrirModalEditar(contato);
      }
    });

    // Botão deletar
    card.querySelector(".btn-deletar-contato").addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const contato = getContatoPorId(id);
      if (contato && window.modalDeletar) {
        window.modalDeletar.abrirModalDeletar(contato);
      }
    });
  });

  window.utils.atualizarTotalCards();
}

//  Função para abrir modal de informações ao clicar no link do card
function abrirInfoPorLink(event) {
  event.preventDefault();
  const id = event.currentTarget.getAttribute("data-id");
  const contato = listaContatos.find(c => c.id == id);
  if (contato && window.modalInfo && typeof window.modalInfo.abrirModalInfoContato === "function") {
    window.modalInfo.abrirModalInfoContato(contato);
  } else {
    console.warn("Modal de informações não está disponível.");
  }
}

//  Getter para obter contato por ID
function getContatoPorId(id) {
  return listaContatos.find(c => c.id == id);
}

// Exporta para uso externo, se necessário
window.getContatoPorId = getContatoPorId;
// window.exibirCards = exibirCards;
