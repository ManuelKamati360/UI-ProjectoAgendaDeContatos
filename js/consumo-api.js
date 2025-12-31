// Variável global de acesso à lista de contatos
let listaContatos = [];

// Requisição GET para obter lista de contatos
fetch("http://localhost:8080/AgendaDeContactos/api/contatos")
  .then(response => response.json())
  .then(data => {
    listaContatos = data; // guarda os dados
    exibirCards();   // chama função para renderizar
  })
  .catch(error => console.error("Erro:", error));


  
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


// Função/getter para obter contato por ID
window.getContatoPorId = function(id) {
  return listaContatos.find(c => c.id == id);
};


// Requisição POST para adicionar contato

// Requisição PUT para editar contato
document.addEventListener("DOMContentLoaded", function () {
  const btnSalvar = document.getElementById("id-btn-salvar-modalEditar");
  if (!btnSalvar) {
    console.warn("Botão 'Salvar' não encontrado.");
    return;
  }

  btnSalvar.addEventListener("click", function (event) {
    event.preventDefault();

    const dadosValidados = validarFormularioEditar();
    if (!dadosValidados) return;

    const idContato = document.getElementById("editar").getAttribute("data-id");

    fetch(`http://localhost:8080/AgendaDeContactos/api/contatos/${idContato}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosValidados)
    })
    .then(response => {
      if (!response.ok) throw new Error("Erro ao atualizar contato.");
      return response.json();
    })
    .then(() => {
      alert("Contato atualizado com sucesso!");
      document.getElementById("editar").close();
      location.reload();
    })
    .catch(error => {
      console.error(error);
      alert("Falha ao salvar as alterações.");
    });
  });
});


// Requisição DELETE para deletar contato


// (Essas funções podem ser implementadas conforme necessário)