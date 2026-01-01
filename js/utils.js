// Contando os cards existentes no painel central
const totalCards = listaContatos.length;

// Localizando a tag onde o total de cards será exibido
const tagTotalCards = document.getElementById("total-cards-contatos");

// Exibindo o total de cards na tag específica
tagTotalCards.textContent = totalCards;

