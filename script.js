// Inicializa os dados padrão
const defaultData = {
    data1: "Dados do bloco 1",
    data2: "Dados do bloco 2",
    data3: "Dados do bloco 3"
};

// Função para carregar os dados do localStorage ou definir dados padrão
function loadData() {
    const data1 = localStorage.getItem('data1') || defaultData.data1;
    const data2 = localStorage.getItem('data2') || defaultData.data2;
    const data3 = localStorage.getItem('data3') || defaultData.data3;

    const textarea1 = document.getElementById('data1');
    const textarea2 = document.getElementById('data2');
    const textarea3 = document.getElementById('data3');

    if (textarea1 && textarea2 && textarea3) {
        textarea1.value = data1;
        textarea2.value = data2;
        textarea3.value = data3;
    }
}

// Habilita a edição das caixas de texto
function enableEditing() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.disabled = false;
    });
}

// Salva as alterações no localStorage
function saveData() {
    const data1 = document.getElementById('data1').value;
    const data2 = document.getElementById('data2').value;
    const data3 = document.getElementById('data3').value;

    localStorage.setItem('data1', data1);
    localStorage.setItem('data2', data2);
    localStorage.setItem('data3', data3);

    alert("Dados salvos com sucesso!");
}

// Verifica a integridade dos dados
function checkIntegrity() {
    const currentData = {
        data1: localStorage.getItem('data1') || defaultData.data1,
        data2: localStorage.getItem('data2') || defaultData.data2,
        data3: localStorage.getItem('data3') || defaultData.data3
    };

    let message = "DADOS ÍNTEGROS"; // Mensagem padrão

    // Verifica se os dados atuais são iguais aos dados padrão
    if (currentData.data1 !== defaultData.data1 || 
        currentData.data2 !== defaultData.data2 || 
        currentData.data3 !== defaultData.data3) {
        message = "DADOS COMPROMETIDOS"; // Mensagem se houver alteração
    }

    // Redireciona para a página de status com a mensagem
    window.location.href = `status.html?status=${encodeURIComponent(message)}`;
}

// Função para excluir blocos
function deleteBlock() {
    // Alerta de confirmação antes de excluir
    if (confirm("Tem certeza que deseja excluir os dados do bloco?")) {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.value = ''; // Limpa os dados dos blocos
            textarea.disabled = true; // Desabilita a edição após a exclusão
        });
        alert("Blocos de dados excluídos.");
    }
}

// Carrega os dados ao abrir as páginas
window.onload = loadData;

/// Código para o efeito Matrix Rain
document.addEventListener('DOMContentLoaded', () => {
    const matrixContainer = document.createElement('div');
    matrixContainer.classList.add('matrix-rain');
    document.body.appendChild(matrixContainer);

    // Função para criar uma coluna de caracteres
    function createMatrixColumn() {
        const column = document.createElement('div');
        column.classList.add('matrix-column');

        // Gerar caracteres aleatórios para a coluna
        let columnText = '';
        for (let i = 0; i < 30; i++) { // Define o tamanho da coluna
            columnText += (Math.random() > 0.5 ? '0' : '1') + '<br>'; // Gera '0' ou '1' e adiciona quebra de linha
        }

        column.innerHTML = columnText; // Usa innerHTML para permitir a quebra de linha

        // Configura uma velocidade aleatória para a queda
        column.style.animationDuration = `${Math.random() * 3 + 4}s`; // Duração da animação
        column.style.animationDelay = `${Math.random() * 5}s`; // Atraso da animação

        return column;
    }

    // Adiciona múltiplas colunas
    for (let i = 0; i < 10; i++) {
        const column = createMatrixColumn();
        column.style.position = 'absolute'; // Necessário para cada coluna ser posicionada corretamente
        column.style.left = `${i * 10}%`; // Distribui as colunas pela largura da tela
        column.style.bottom = '100%'; // Começa fora da tela
        matrixContainer.appendChild(column);
    }

    // Adiciona a animação de queda
    const style = document.createElement('style');
    style.innerHTML = `
        .matrix-column {
            color: #00ff41; /* Cor dos caracteres */
            font-family: monospace; /* Fonte monoespaçada */
            opacity: 0.8; /* Um pouco de transparência */
            animation: fall linear infinite; /* Animação de queda */
        }

        @keyframes fall {
            to {
                transform: translateY(100vh); /* A coluna cai pela altura da tela */
            }
        }

        .matrix-rain {
            position: fixed; /* Mantém o contêiner fixo na tela */
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none; /* Para evitar que interações afetem a chuva de caracteres */
        }
    `;
    document.head.appendChild(style);
});
