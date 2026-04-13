# 📊 Painel de Gestão de RH - Single Page Application (SPA)

Um sistema web interativo para gestão de recursos humanos, criado do zero utilizando HTML, CSS e JavaScript puro (Vanilla JS). O projeto simula o painel de um gerente, permitindo o cadastro, visualização, demissão e avaliação de funcionários em tempo real, sem a necessidade de recarregar a página.

## 🚀 Funcionalidades

- **Navegação Dinâmica (SPA):** Transição entre telas (Cadastro, Lista, Avaliações e Relatórios) gerenciada por JavaScript, alterando a exibição via DOM.
- **Cadastro de Funcionários:** Formulário completo com validação de campos vazios utilizando a técnica de *Early Return* (Fail Fast).
- **Listagem e Remoção (CRUD):** Geração dinâmica de listas no HTML com botão integrado para remoção de itens específicos do Array (`.splice()`).
- **Avaliação de Desempenho:** Sistema de notas (1 a 5 estrelas) atrelado aos funcionários cadastrados dinamicamente.
- **Geração de Relatórios:** Cálculo automático da média de desempenho da equipe com base nas notas registradas.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica e criação das telas.
- **CSS3:** Estilização do painel, botões e classes de controle de exibição (`display: none`).
- **JavaScript (Vanilla):** Toda a regra de negócio, manipulação do DOM e gestão de estado na memória do navegador.

## 🧠 Conceitos de Lógica Aplicados

Este projeto foi construído para consolidar os seguintes fundamentos de programação:
- Manipulação de **Arrays** e **Objetos**.
- Estruturas de Repetição (`for`) e Condicionais (`if/else`, `switch`).
- Criação e invocação de **Funções** com passagem de parâmetros.
- Manipulação direta do DOM (`getElementById`, `innerHTML`, `classList`).
- Relacionamento de dados em memória (Inputs do HTML alimentando Arrays no JS).

## 💻 Como Executar o Projeto

Como o projeto foi desenvolvido em Vanilla JS e não possui dependências externas (como Node.js ou bancos de dados), rodá-lo é extremamente simples:

1. Faça o clone deste repositório:
   ```bash
   git clone [https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git](https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git)

2. Abra a pasta do projeto no seu computador.
3. Dê um duplo clique no arquivo index.html para abri-lo diretamente no seu navegador padrão.

Desenvolvido com dedicação por [Fagner Santos / www.linkedin.com/in/fagner-santos-b33859181] 💡
