// array de dados (Poderia vir de um banco de dados real!)
let avaliacoes = [
    { cliente: "Ana", nota: 5 },
    { cliente: "João", nota: 2 },
    { cliente: "Maria", nota: 4 },
    { cliente: "Pedro", nota: 1 },
    { cliente: "Lucas", nota: 5 }
];

// A função que o botão do HTML vai chamar
function gerarRelatorio() {
    
    // Suas variáveis zeradas
    let quantidadePositivas = 0;
    let quantidadeNegativas = 0;

    // O seu loop e o seu if/else impecáveis!
    for (let i = 0; i < avaliacoes.length; i++) {
        if (avaliacoes[i].nota >= 4) {
            quantidadePositivas++;
        } else {
            quantidadeNegativas++;
        }
    }

    document.getElementById("pos").innerText = quantidadePositivas;
    document.getElementById("neg").innerText = quantidadeNegativas;
}

// Função para salvar o funcionário no Array
function salvarFuncionario() {
    // 1. Pega o que o usuário digitou usando o ".value"
    let nomeDigitado = document.getElementById("inputNome").value;
    let cargoDigitado = document.getElementById("inputCargo").value;
    let salarioFuncionario = document.getElementById("inputSalario").value;
    let dataAdmissao = document.getElementById("inputData").value;
    let departamentoFuncionario = document.getElementById("inputDepartamento").value;
    let emailFuncionario = document.getElementById("inputEmail").value;
    let telefoneFuncionario = document.getElementById("inputTelefone").value;
    let enderecoFuncionario = document.getElementById("inputEndereco").value;

    // 2. Verificamos se ele não deixou em branco
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

    // 4. Limpando os inputs para o próximo cadastro e damos um aviso
    document.getElementById("inputNome").value = "";
    document.getElementById("inputCargo").value = "";
    document.getElementById("inputSalario").value = "";
    document.getElementById("inputData").value = "";
    document.getElementById("inputDepartamento").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputTelefone").value = "";
    document.getElementById("inputEndereco").value = "";

    alert("Funcionário " + nomeDigitado + " cadastrado com sucesso!");
    
    // Esconde o formulário de novo
    mostrarQuadroCadastro(); 
    
}

function listadeFuncionarios() {
    // Função para exibir a lista de funcionários
    let listaHTML = "<h2>Lista de Funcionários</h2><ul>";
    for (let i = 0; i < listaDeFuncionarios.length; i++) {
        listaHTML += "<li>" + listaDeFuncionarios[i].nome + " - " + listaDeFuncionarios[i].cargo + "</li>";
    }
    listaHTML += "</ul>";
    document.getElementById("resultados").innerHTML = listaHTML;

}