document.addEventListener("DOMContentLoaded", function () {
    // Elementos
    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");
    const totalPesoElement = document.getElementById("total-peso");
    const pesosInputs = document.querySelectorAll(".peso");
    const shareButton = document.querySelector(".share-button");

    // Event Listeners
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => showTab(index));
    });

    pesosInputs.forEach(input => {
        const ingrediente = input.getAttribute("data-ingrediente");
        const peso = localStorage.getItem(ingrediente);

        if (peso !== null) {
            input.value = peso;
        }

        input.addEventListener("change", function () {
            const peso = this.value;
            localStorage.setItem(ingrediente, peso);
            updateTotalPeso();
        });
    });

    document.getElementById("calcular-total").addEventListener("click", updateTotalPeso);

    document.getElementById("limpar-inputs").addEventListener("click", limparInputs);

    shareButton.addEventListener("click", compartilhar);

    // Funções
    function showTab(tabIndex) {
        tabs.forEach(tab => tab.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));

        tabs[tabIndex].classList.add("active");
        tabContents[tabIndex].classList.add("active");
    }

    function updateTotalPeso() {
        let totalPeso = 0;

        pesosInputs.forEach(input => {
            const peso = parseFloat(input.value);
            totalPeso += peso;
        });

        totalPesoElement.textContent = `Total Peso: ${totalPeso.toFixed(2)} kg`;
    }

    function limparInputs() {
        pesosInputs.forEach(input => {
            const ingrediente = input.getAttribute("data-ingrediente");
            localStorage.removeItem(ingrediente);
            input.value = 0;
        });

        updateTotalPeso();
    }

    shareButton.addEventListener("onclick", compartilhar);


    // Função para compartilhar os detalhes da lista de ingredientes
    function compartilhar() {
        // Obtém a lista de ingredientes ativa
        const activeTabContent = document.querySelector('.tab-contents.active .tab-content.active');
        if (!activeTabContent) return;

        // Obtém o título da lista (classe da UL)
        const listaTitulo = activeTabContent.querySelector('ul').classList[0];

        // Obtém todos os itens da lista de ingredientes
        const ingredientes = activeTabContent.querySelectorAll('li');

        // Cria um array para armazenar os detalhes dos ingredientes
        const detalhesIngredientes = [];

        ingredientes.forEach((item) => {
            const ingrediente = item.querySelector('input').getAttribute('data-ingrediente');
            const peso = item.querySelector('input').value;
            detalhesIngredientes.push(`${ingrediente}: ${peso}`);
        });

        // Cria o texto a ser compartilhado
        const textoCompartilhado = `${listaTitulo}\n${detalhesIngredientes.join('\n')}`;

        // Exibe o texto compartilhado em um alerta (substitua isso pela lógica real de compartilhamento)
        alert('Detalhes da Lista de Ingredientes:\n\n' + textoCompartilhado);
    }

    // Associe a função de compartilhamento ao botão "Compartilhar"
    const botaoCompartilhar = document.querySelector('.share-button');
    botaoCompartilhar.addEventListener('click', compartilhar);



});
