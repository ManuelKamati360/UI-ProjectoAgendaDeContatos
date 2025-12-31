
// Função para rednderização dos cards de contatos...
function exibirCards() {
  const container = document.getElementById("conteiner-painel-central");
  container.innerHTML = ""; // limpa antes de renderizar os cards...

  listaContatos.forEach(contato => {
    // Criar elemento div do card
    const card = document.createElement("div");
    card.classList.add("card-contato");

    // Template interno do card
    card.innerHTML = `
      <a href="./pages/info-contato.html" class="card-contato-link" target="_self">
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

    // Adicionar card ao container
    container.appendChild(card);

    // Integração do "Botão Editar"
    card.querySelector(".btn-editar-contato").addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        abrirModalEditar(id);
    });

    // Integração do "Botão Deletar"
    card.querySelector(".btn-deletar-contato").addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        abrirModalDeletar(id);
    });

  });
}