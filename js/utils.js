// Ajustar telefone no formato (código) número para edição
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
