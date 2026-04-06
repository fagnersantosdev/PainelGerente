// array de dados de avaliações
let avaliacoes = [
    { cliente: "Ana", nota: 5 },
    { cliente: "João", nota: 2 },
    { cliente: "Maria", nota: 4 },
    { cliente: "Pedro", nota: 1 },
    { cliente: "Lucas", nota: 5 }
];

// Array de Funcionários
let listaDeFuncionarios = [];

// --- 1. FUNÇÃO DO RELATÓRIO ---
function gerarRelatorio() {
    let quantidadePositivas = 0;
    let quantidadeNegativas = 0;

    for (let i = 0; i < avaliacoes.length; i++) {
        if (avaliacoes[i].nota >= 4) {
            quantidadePositivas++;
        } else {
            quantidadeNegativas++;
        }
    }

    document.getElementById("quadro-relatorios").innerHTML = 
    "<h2>Relatório de Avaliações</h2>"+
    "<p>Avaliações Positivas: " + quantidadePositivas + "</p>" +
    "<p>Avaliações Negativas: " + quantidadeNegativas + "</p>";

    document.getElementById("quadro-relatorios").classList.remove("escondido");
    document.getElementById("quadro-cadastro").classList.add("escondido");
    document.getElementById("quadro-lista").classList.add("escondido");
}

// --- 2. FUNÇÃO PARA ABRIR A TELA DE CADASTRO ---
function mostrarQuadroCadastro() {
    document.getElementById("quadro-cadastro").classList.remove("escondido");
    document.getElementById("quadro-lista").classList.add("escondido");
    document.getElementById("quadro-relatorios").classList.add("escondido");
}

// --- 3. FUNÇÃO DA LISTA DE FUNCIONÁRIOS (Mudei o nome para atualizarLista!) ---
function atualizarListaFuncionarios() {
    let listaHTML = "<h2>Lista de Funcionários</h2><ul>";
    for (let i = 0; i < listaDeFuncionarios.length; i++) {
        listaHTML += "<li>" + listaDeFuncionarios[i].nome + " - " + listaDeFuncionarios[i].cargo + "</li>";
    }
    listaHTML += "</ul>";
    
    document.getElementById("quadro-lista").innerHTML = listaHTML;

    document.getElementById("quadro-lista").classList.remove("escondido");
    document.getElementById("quadro-cadastro").classList.add("escondido");
    document.getElementById("quadro-relatorios").classList.add("escondido");
} // <- OLHA A CHAVE FECHANDO AQUI!

// --- 4. FUNÇÃO PARA SALVAR O FUNCIONÁRIO ---
function salvarFuncionario() {
    let nomeDigitado = document.getElementById("inputNome").value;
    let cargoDigitado = document.getElementById("inputCargo").value;
    let salarioFuncionario = document.getElementById("inputSalario").value;
    let dataAdmissao = document.getElementById("inputData").value;
    let departamentoFuncionario = document.getElementById("inputDepartamento").value;
    let emailFuncionario = document.getElementById("inputEmail").value;
    let telefoneFuncionario = document.getElementById("inputTelefone").value;
    let enderecoFuncionario = document.getElementById("inputEndereco").value;

    switch (true) {
        case nomeDigitado === "":
            alert("Por favor, preencha o nome do funcionário.");
            return;
        case cargoDigitado === "":
            alert("Por favor, preencha o cargo do funcionário.");
            return;
        case salarioFuncionario === "":
            alert("Por favor, preencha o salário do funcionário.");
            return;
        case dataAdmissao === "":
            alert("Por favor, preencha a data de admissão do funcionário.");
            return;
        case departamentoFuncionario === "":
            alert("Por favor, preencha o departamento do funcionário.");
            return;
        case emailFuncionario === "":
            alert("Por favor, preencha o email do funcionário.");
            return;
        case telefoneFuncionario === "":
            alert("Por favor, preencha o telefone do funcionário.");
            return;
        case enderecoFuncionario === "":
            alert("Por favor, preencha o endereço do funcionário.");
            return;
    }

    let novoFuncionario = {
        nome: nomeDigitado,
        cargo: cargoDigitado,
        salario: salarioFuncionario,
        dataAdmissao: dataAdmissao,
        departamento: departamentoFuncionario,
        email: emailFuncionario,
        telefone: telefoneFuncionario,
        endereco: enderecoFuncionario
    };
    
    listaDeFuncionarios.push(novoFuncionario);

    document.getElementById("inputNome").value = "";
    document.getElementById("inputCargo").value = "";
    document.getElementById("inputSalario").value = "";
    document.getElementById("inputData").value = "";
    document.getElementById("inputDepartamento").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputTelefone").value = "";
    document.getElementById("inputEndereco").value = "";

    alert("Funcionário " + nomeDigitado + " cadastrado com sucesso!");
    
    // Agora chamamos a função com o nome correto para exibir a lista e fechar o cadastro!
    atualizarListaFuncionarios(); 
}