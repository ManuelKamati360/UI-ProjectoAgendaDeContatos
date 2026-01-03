// consumo-api.js

//  Variável global para armazenar contatos
let contatos = [];

//  Função GET → carregar todos os contatos
function carregarContatos() {
  return fetch("http://localhost:8080/AgendaDeContactos/api/contatos")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar contatos.");
      return response.json();
    })
    .then(data => {
      contatos = data;
      return contatos;
    });
}

//  Função PUT → atualizar contato
function atualizarContato(id, dados) {
  return fetch(`http://localhost:8080/AgendaDeContactos/api/contatos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  }).then(response => {
    if (!response.ok) throw new Error("Erro ao atualizar contato.");
    return response.json();
  });
}

//  Função POST → adicionar contato
function adicionarContato(dados) {
  return fetch("http://localhost:8080/AgendaDeContactos/api/contatos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  }).then(response => {
    if (!response.ok) throw new Error("Erro ao adicionar contato.");
    return response.json();
  });
}

//  Função DELETE → remover contato
function deletarContato(id) {
  return fetch(`http://localhost:8080/AgendaDeContactos/api/contatos/${id}`, {
    method: "DELETE"
  }).then(response => {
    if (!response.ok) throw new Error("Erro ao deletar contato.");
    return response.text(); // evita erro se não houver corpo
  });
}

//  Exporta funções para uso nos modais
window.api = {
  carregarContatos,
  atualizarContato,
  adicionarContato,
  deletarContato
};
