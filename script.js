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
// --- NOVO ARRAY PARA AS NOTAS DA EQUIPE ---
let avaliacoesDesempenho = [];

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
    document.getElementById("quadro-avaliacoes").classList.add("escondido");
}

// --- 2. FUNÇÃO PARA ABRIR A TELA DE CADASTRO ---
function mostrarQuadroCadastro() {
    document.getElementById("quadro-cadastro").classList.remove("escondido");
    document.getElementById("quadro-lista").classList.add("escondido");
    document.getElementById("quadro-relatorios").classList.add("escondido");
    document.getElementById("quadro-avaliacoes").classList.add("escondido");
}

// --- 3. FUNÇÃO DA LISTA DE FUNCIONÁRIOS ---
function atualizarListaFuncionarios() {
    let listaHTML = "<h2>Lista de Funcionários</h2><ul>";
    for (let i = 0; i < listaDeFuncionarios.length; i++) {
        listaHTML += "<li>" + listaDeFuncionarios[i].nome + " - " + listaDeFuncionarios[i].cargo + " <button onclick='deletarFuncionario(" + i + ")'>❌ Demitir</button></li>";
    }
    listaHTML += "</ul>";
    
    document.getElementById("quadro-lista").innerHTML = listaHTML;

    document.getElementById("quadro-lista").classList.remove("escondido");
    document.getElementById("quadro-cadastro").classList.add("escondido");
    document.getElementById("quadro-relatorios").classList.add("escondido");
    document.getElementById("quadro-avaliacoes").classList.add("escondido");
} 

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

// --- FUNÇÃO PARA DEMITIR (DELETAR) UM FUNCIONÁRIO ---
// A variável "posicao" recebe aquele número "i" do botão!
function deletarFuncionario(posicao) {
    
    // 1. Pergunta de segurança
    let temCerteza = confirm("Tem certeza que deseja demitir o(a) " + listaDeFuncionarios[posicao].nome + "?");
    
    // 2. Se clicar em "OK", o confirm devolve true.
    if (temCerteza === true) {
        
        // 3. O splice vai na posição exata e arranca 1 item de lá
        listaDeFuncionarios.splice(posicao, 1);
        
        // 4. Como o Array encolheu, desenha a lista na tela de novo!
        atualizarListaFuncionarios();
        
        // Bônus: Um alert para confirmar a ação
        alert("Funcionário removido do sistema.");
    }
}


// --- FUNÇÃO PARA ABRIR A TELA (E PREENCHER OS NOMES) ---
function mostrarQuadroAvaliacoes() {
    // Mostra o quadro de avaliações e esconde o resto
    document.getElementById("quadro-avaliacoes").classList.remove("escondido");
    document.getElementById("quadro-cadastro").classList.add("escondido");
    document.getElementById("quadro-lista").classList.add("escondido");
    document.getElementById("quadro-relatorios").classList.add("escondido");


    // Pegar a caixa de seleção (dropdown)
    let select = document.getElementById("selectFuncionario");
    
    // Limpar ela (para não duplicar os nomes se o gerente clicar duas vezes)
    select.innerHTML = '<option value="">Selecione um funcionário...</option>';

    // Loop na LISTA DE FUNCIONÁRIOS para criar as opções
    for (let i = 0; i < listaDeFuncionarios.length; i++) {
        // Exemplo do que ele cria: <option value="João">João</option>
        select.innerHTML += '<option value="' + listaDeFuncionarios[i].nome + '">' + listaDeFuncionarios[i].nome + '</option>';
    }
}

// --- FUNÇÃO PARA SALVAR A NOTA ---
function salvarAvaliacao() {
    let nomeSelecionado = document.getElementById("selectFuncionario").value;
    let notaDigitada = document.getElementById("inputNota").value;

    
    if (nomeSelecionado === "") {
        alert("Por favor, selecione um funcionário.");
        return;
    }
    if (notaDigitada < 1 || notaDigitada > 5 || notaDigitada === "") {
        alert("A nota deve ser um número entre 1 e 5.");
        return;
    }

    // Cria o objeto e empurra pro novo array
    let novaAvaliacao = {
        funcionario: nomeSelecionado,
        nota: Number(notaDigitada) // O "Number" garante que o JS salve como número e não como texto
    };
    avaliacoesDesempenho.push(novaAvaliacao);

    // Limpa a nota digitada
    document.getElementById("inputNota").value = "";
    
    // Chama a função para desenhar a lista na tela
    atualizarListaAvaliacoes();
}

// --- FUNÇÃO PARA DESENHAR O HISTÓRICO NA TELA ---
function atualizarListaAvaliacoes() {
    let historicoHTML = "<ul>";
    
    for (let i = 0; i < avaliacoesDesempenho.length; i++) {
        
        // TRUQUE NINJA: Um mini-loop para desenhar estrelinhas no lugar de números
        let estrelas = "";
        for (let j = 0; j < avaliacoesDesempenho[i].nota; j++) {
            estrelas += "⭐";
        }

        historicoHTML += "<li><strong>" + avaliacoesDesempenho[i].funcionario + "</strong> recebeu: " + estrelas + "</li>";
    }
    
    historicoHTML += "</ul>";
    
    // Injeta na tela
    document.getElementById("historico-avaliacoes").innerHTML = historicoHTML;
}


