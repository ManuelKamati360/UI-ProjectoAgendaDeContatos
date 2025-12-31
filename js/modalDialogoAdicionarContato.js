// ------------------ Modal Adicionar ------------------

// Botão de manipulação do modal "Adicionar Contato"...
const btnAdd = document.querySelector("#btn-adicionar-contato");

// Evento do botão "Add +"...
btnAdd.onclick = function() {
    abrirModalAdicionar(".modal#adicionar");
}

// Função para abrir o modal...
function abrirModalAdicionar(id) {
    const modal = document.querySelector(id);
    modal.showModal();
    
    // Evento dos botões "Cancelar"...
    const btnCancelar = modal.querySelector(".btn-cancelar");
    btnCancelar.onclick = function() {
        modal.close();
    };
}
