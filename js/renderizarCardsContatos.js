// renderizarContatos.js

// 🔹 Variável local para armazenar contatos
let listaContatos = [];

// 🔹 Inicialização: carrega contatos da API e renderiza
document.addEventListener("DOMContentLoaded", function () {
  window.api.carregarContatos()
    .then(data => {
      listaContatos = data;
      exibirCards();
    })
    .catch(error => console.error("Erro ao carregar contatos:", error));
});

// 🔹 Função para renderizar os cards
function exibirCards() {
  const container = document.getElementById("conteiner-painel-central");
  container.innerHTML = "";

  listaContatos.forEach(contato => {
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

// Fora da função exibirCards
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