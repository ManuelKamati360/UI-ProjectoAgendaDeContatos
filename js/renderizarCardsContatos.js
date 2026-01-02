// renderizarContatos.js

// 🔹 Variável local para armazenar contatos
let listaContatos = [];

// 🔹 Inicialização: carrega contatos da API e renderiza
document.addEventListener("DOMContentLoaded", function () {
  window.api.carregarContatos()
    .then(data => {
      listaContatos = Array.isArray(data) ? data : [data]; // normaliza
      exibirCards();
    })
    .catch(error => console.error("Erro ao carregar contatos:", error));

  // 🔹 Integração da barra de pesquisa
  const form = document.getElementById("frm-buscar-contato");
  const input = document.getElementById("item-txt-caixa-de-busca");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const termo = input.value.trim();
  console.log("Termo digitado:", termo);

  let url;

  if (!termo) {
    url = "http://localhost:8080/AgendaDeContactos/api/contatos/";
  } else if (/^\d+$/.test(termo)) {
    url = `http://localhost:8080/AgendaDeContactos/api/contatos/${termo}`;
  } else {
    url = `http://localhost:8080/AgendaDeContactos/api/contatos?search=${encodeURIComponent(termo)}`;
  }

  // Mostra spinner
  document.getElementById("loading-spinner").style.display = "block";

  console.log("URL final da requisição:", url);

  fetch(url)
    .then(response => {
      if (response.status === 404) {
        document.getElementById("conteiner-painel-central").innerHTML =
          "<p>Nenhum contato encontrado.</p>";
        return null;
      }
      if (!response.ok) throw new Error("Erro na pesquisa");
      return response.json();
    })
    .then(data => {
      if (!data) return;
      listaContatos = Array.isArray(data) ? data : [data];
      exibirCards();
    })
    .catch(error => console.error(error))
    .finally(() => {
      // Esconde spinner
      document.getElementById("loading-spinner").style.display = "none";
    });
});

});

// 🔹 Função para renderizar os cards de todos os contatos...
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

// 🔹 Função para abrir modal de informações ao clicar no link do card
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

// 🔹 Getter para obter contato por ID
function getContatoPorId(id) {
  return listaContatos.find(c => c.id == id);
}

// Exporta para uso externo, se necessário
window.getContatoPorId = getContatoPorId;
// window.exibirCards = exibirCards;
