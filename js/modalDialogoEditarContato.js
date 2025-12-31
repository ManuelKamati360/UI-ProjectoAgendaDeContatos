// ------------------ Modal Editar ------------------

function abrirModalEditar(id) {
  const contato = getContatoPorId(id);

  if (!contato) return;

  // Preenche os campos do modal com os dados do contato
  document.getElementById("id-nome-modalEditar").value = contato.nome;
  document.getElementById("id-pais-modalEditar").value = contato.pais || ""; 
  
  const { codigo, numero } = separarTelefoneCompleto(contato.telefone || "");
  document.getElementById("id-pais-modalEditar").value = codigo;
  document.getElementById("id-telefone-modalEditar").value = numero;


  document.getElementById("id-email-modalEditar").value = contato.email || "";
  document.getElementById("id-datanascimento-modalEditar").value = formatarDataParaInput(contato.dataNascimento || "");
  document.getElementById("id-endereco-modalEditar").value = contato.endereco || "";
  document.getElementById("id-cidade-modalEditar").value = contato.cidade || "";
  document.getElementById("id-estado-modalEditar").value = contato.estado || "";

  // Armazena o ID do contato no botão "Salvar" para uso ao salvar a modificação...
  document.getElementById("id-btn-salvar-modalEditar").setAttribute("data-id", id); 

  // Abre o modal
  const modal = document.getElementById("id-modal-editar");
  modal.showModal();
}

// Evento do botão "Cancelar" do modal Editar
document.querySelector("#id-btn-cancelar-modalEditar").addEventListener("click", function () {
  document.getElementById("id-modal-editar").close();
});


// ------------------ Validação de dados ------------------
function validarFormularioEditar() {
  const nome = document.getElementById("id-nome-modalEditar").value.trim();
  const pais = document.getElementById("id-pais-modalEditar").value;
  const telefone = document.getElementById("id-telefone-modalEditar").value.trim();
  const email = document.getElementById("id-email-modalEditar").value.trim();
  const dataNascimento = document.getElementById("id-datanascimento-modalEditar").value;
  const endereco = document.getElementById("id-endereco-modalEditar").value.trim();
  const cidade = document.getElementById("id-cidade-modalEditar").value.trim();
  const estado = document.getElementById("id-estado-modalEditar").value.trim();

  // Validações básicas
  if (!nome || !pais || !telefone || !email || !dataNascimento || !endereco || !cidade || !estado) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return null;
  }

  // Validação de telefone: 9 dígitos
  if (!/^\d{9}$/.test(telefone)) {
    alert("O telefone deve conter exatamente 9 dígitos.");
    return null;
  }

  // Validação de e-mail simples
  if (!email.includes("@") || !email.includes(".")) {
    alert("E-mail inválido.");
    return null;
  }

  // Retorna objeto válido
  return {
    nome,
    telefone: `(${pais}) ${telefone}`,
    email,
    dataNascimento,
    endereco,
    cidade,
    estado
  };
}


// ------------------ Funções auxiliares ------------------

function separarTelefoneCompleto(telefoneCompleto) {
  const regex = /\((\+\d+)\)\s*([\d\- ]+)/;
  const match = telefoneCompleto.match(regex);
  if (match) {
    const codigo = match[1]; // "+244"
    const numero = match[2].replace(/[\s\-]/g, ""); // remove espaços e hífens
    return { codigo, numero };
  }
  return { codigo: "", numero: "" };
}


// Ajustar data para o formato YYYY-MM-DD do input type="date"
function formatarDataParaInput(dataString) {
  const meses = {
    jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
    jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12"
  };

  const regex = /([a-z]{3})\.?\s+(\d{1,2}),\s+(\d{4})/i;
  const match = dataString.match(regex);

  if (match) {
    const mes = meses[match[1].toLowerCase()];
    const dia = match[2].padStart(2, "0");
    const ano = match[3];
    return `${ano}-${mes}-${dia}`;
  }

  return ""; // se falhar, retorna vazio
}
