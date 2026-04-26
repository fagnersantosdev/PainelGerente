// array de dados de avaliações
let avaliacoes = [
    { cliente: "Ana", nota: 5 },
    { cliente: "João", nota: 2 },
    { cliente: "Maria", nota: 4 },
    { cliente: "Pedro", nota: 1 },
    { cliente: "Lucas", nota: 5 }
];

// variáveis começam vazias
let listaDeFuncionarios = [];
let avaliacoesDesempenho = [];

// LER O LOCALSTORAGE QUANDO A PÁGINA ABRE ---
// Procura se já existe algo salvo com a chave "meusFuncionarios"
let funcionariosSalvos = localStorage.getItem("meusFuncionarios");

// Se existir algo salvo (!== null significa "se não for nulo")
if (funcionariosSalvos !== null) {
    // O texto volta para o Array!
    listaDeFuncionarios = JSON.parse(funcionariosSalvos);
}

// Procura se existem avaliações salvas
let avaliacoesSalvas = localStorage.getItem("minhasAvaliacoes");

if (avaliacoesSalvas !== null) {
    avaliacoesDesempenho = JSON.parse(avaliacoesSalvas);
}


// --- 1. FUNÇÃO DO RELATÓRIO (MODO SÊNIOR) ---
function gerarRelatorio() {
    let quadroRelatorios = document.getElementById("quadro-relatorios");

    if (avaliacoesDesempenho.length === 0) {
        quadroRelatorios.innerHTML = "<h2>📊 Relatório da Equipe</h2><p>Nenhuma avaliação foi registrada ainda.</p>";
    } else {
        
        // O .reduce() rola pelo array somando as notas. 
        // O "0" no final é o valor inicial do cofrinho.
        let somaDasNotas = avaliacoesDesempenho.reduce((cofrinho, avaliacaoAtual) => {
            return cofrinho + avaliacaoAtual.nota;
        }, 0);

        let media = somaDasNotas / avaliacoesDesempenho.length;

        quadroRelatorios.innerHTML = 
            "<h2>📊 Relatório de Desempenho</h2>" +
            "<p>Total de avaliações: <strong>" + avaliacoesDesempenho.length + "</strong></p>" +
            "<p>Média geral da equipe: <strong>" + media.toFixed(1) + " ⭐</strong></p>"; 
    }

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


// --- 3. FUNÇÃO DA LISTA DE FUNCIONÁRIOS (MODO SÊNIOR) ---
function atualizarListaFuncionarios() {
    
    // O .map() pega cada "funcionario" (e o seu "index" numérico) e transforma numa tag <li>!
    // O .join('') no final junta tudo num texto só, tirando as vírgulas.
    let itensDaLista = listaDeFuncionarios.map((funcionario, index) => {
        return "<li>" + funcionario.nome + " - " + funcionario.cargo + 
               " <button class='btn-deletar' onclick='deletarFuncionario(" + index + ")'>❌ Demitir</button></li>";
    }).join('');
    
    // Montamos o HTML final
    let listaHTML = "<h2>📋 Lista de Funcionários</h2><ul>" + itensDaLista + "</ul>";
    
    document.getElementById("quadro-lista").innerHTML = listaHTML;

    // A navegação continua igual
    document.getElementById("quadro-lista").classList.remove("escondido");
    document.getElementById("quadro-cadastro").classList.add("escondido");
    document.getElementById("quadro-relatorios").classList.add("escondido");
    document.getElementById("quadro-avaliacoes").classList.add("escondido");
}


// --- FUNÇÃO DE API ---
// A palavra 'async' avisa o JavaScript: "Calma, essa função vai demorar um pouco"
async function buscarCepDaInternet() {
    
    // 1. Pega o CEP que o gerente digitou
    let cepDigitado = document.getElementById("inputCep").value;

    // Se o CEP estiver vazio, não fazemos nada
    if (cepDigitado === "") {
        alert("Por favor, digite um CEP primeiro.");
        return;
    }

    // Troca o texto do botão para o gerente saber que estamos carregando
    document.getElementById("inputEndereco").value = "Buscando na internet...";

    try {
        // 2. (fetch)
        // O 'await' significa: "Pause o código AQUI e espere a resposta da internet chegar"
        let respostaDoServidor = await fetch("https://viacep.com.br/ws/" + cepDigitado + "/json/");
        
        // 3. (json)
        // Transforma a resposta da internet em um Objeto JS que a gente entende
        let dadosDoEndereco = await respostaDoServidor.json();

        // Se o CEP não existir, a API devolve um erro escondido
        if (dadosDoEndereco.erro) {
            document.getElementById("inputEndereco").value = "";
            alert("CEP não encontrado. Verifique os números.");
            return;
        }

        // 4. MÁGICA NA TELA!
        // Monta o endereço com as peças que vieram da API e joga no input
        document.getElementById("inputEndereco").value = 
            dadosDoEndereco.logradouro + ", Bairro: " + 
            dadosDoEndereco.bairro + " - " + 
            dadosDoEndereco.localidade + "/" + dadosDoEndereco.uf;

    } catch (erro) {
        // Se a internet cair no meio do caminho, o bloco 'catch' captura o erro para o site não quebrar
        document.getElementById("inputEndereco").value = "";
        alert("Erro ao conectar com a API dos Correios. Verifique sua internet.");
    }
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
    let cepFuncionario = document.getElementById("inputCep").value;
    let enderecoFuncionario = document.getElementById("inputEndereco").value;
    let numFucionario = document.getElementById("inputNumero").value;

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
        case cepFuncionario === "":
            alert("Por favor, preencha o CEP do funcionário.");
            return;
        case enderecoFuncionario === "":
            alert("Por favor, preencha o endereço do funcionário.");
            return;
        case numFucionario === "":
            alert("Por favor, preencha o número local do funcionário.");
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
        cep: cepFuncionario,
        endereco: enderecoFuncionario,
        numero: numFucionario
    };
    
    listaDeFuncionarios.push(novoFuncionario);

    document.getElementById("inputNome").value = "";
    document.getElementById("inputCargo").value = "";
    document.getElementById("inputSalario").value = "";
    document.getElementById("inputData").value = "";
    document.getElementById("inputDepartamento").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputTelefone").value = "";
    document.getElementById("inputCep").value = "";
    document.getElementById("inputEndereco").value = "";
    document.getElementById("inputNumero").value = "";

    alert("Funcionário " + nomeDigitado + " cadastrado com sucesso!");
    
    avaliacoesDesempenho.push(novaAvaliacao);
    salvarDadosNoNavegador(); // Salva as novas notas no navegador!
    atualizarListaFuncionarios(); // Atualiza a lista para mostrar o novo funcionário
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
        
        salvarDadosNoNavegador(); // Salva a lista atualizada (sem o demitido) no navegador!
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

    salvarDadosNoNavegador();
    
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

    salvarDadosNoNavegador();
}

// --- A FUNÇÃO QUE SALVA NO site - localStorage ---
function salvarDadosNoNavegador() {
    // Empacota o Array de funcionários em formato de texto e salva
    let listaEmTexto = JSON.stringify(listaDeFuncionarios);
    localStorage.setItem("meusFuncionarios", listaEmTexto);

    // Empacota o Array de avaliações e salva também
    let avaliacoesEmTexto = JSON.stringify(avaliacoesDesempenho);
    localStorage.setItem("minhasAvaliacoes", avaliacoesEmTexto);
}

