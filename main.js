// Controle de Estado do Jogo Fictício
let saldo = 1000;
const opcoesRoleta = [
    { multiplicador: 0, texto: "X0" },
    { multiplicador: 2, texto: "X2" },
    { multiplicador: 0.5, texto: "X0.5" },
    { multiplicador: 3, texto: "X3" },
    { multiplicador: 0, texto: "X0" },
    { multiplicador: 1.5, texto: "X1.5" }
];

// Elementos da Interface
const form = document.getElementById('jogoForm');
const valorInput = document.getElementById('valorPontos');
const erroPontos = document.getElementById('erroPontos');
const saldoTela = document.getElementById('saldoAtual');
const roleta = document.getElementById('roleta');
const btnGirar = document.getElementById('btnGirar');
const feedbackResultado = document.getElementById('feedbackResultado');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const pontosInseridos = parseInt(valorInput.value, 10);

    // Validação básica do saldo e da entrada
    if (isNaN(pontosInseridos) || pontosInseridos <= 0) {
        erroPontos.textContent = "Insira uma quantidade de pontos válida.";
        return;
    }

    if (pontosInseridos > saldo) {
        erroPontos.textContent = "Pontos insuficientes para realizar a rodada.";
        return;
    }

    // Limpa erros anteriores se tudo estiver válido
    erroPontos.textContent = "";
    btnGirar.disabled = true;
    feedbackResultado.classList.remove('visivel');

    // Deduz os pontos iniciais temporariamente para a simulação
    saldo -= pontosInseridos;
    saldoTela.textContent = saldo;

    // Lógica do giro (graus aleatórios + voltas inteiras)
    const totalOpcoes = opcoesRoleta.length;
    const indiceSorteado = Math.floor(Math.random() * totalOpcoes);
    const grausPorOpcao = 360 / totalOpcoes;
    
    // Calcula o ângulo para alinhar a fatia sorteada com o indicador de topo
    const anguloDestino = 360 - (indiceSorteado * grausPorOpcao);
    const voltasExtras = 5 * 360; // Força a roleta a girar várias vezes
    const rotacaoTotal = voltasExtras + anguloDestino;

    // Reseta a rotação para evitar problemas em giros consecutivos
    roleta.style.transition = 'none';
    roleta.style.transform = 'rotate(0deg)';
    
    // Força o navegador a processar o reset antes de iniciar a animação
    setTimeout(() => {
        roleta.style.transition = 'transform 4s cubic-bezier(0.1, 0.8, 0.3, 1)';
        roleta.style.transform = `rotate(${rotacaoTotal}deg)`;
    }, 50);

    // Aguarda a conclusão da animação de giro (4 segundos)
    setTimeout(() => {
        const resultado = opcoesRoleta[indiceSorteado];
        const pontosGanhos = Math.floor(pontosInseridos * resultado.multiplicador);
        
        // Atualiza o saldo final com base no multiplicador obtido
        saldo += pontosGanhos;
        saldoTela.textContent = saldo;

        // Exibe o feedback visual baseado no resultado da rodada fictícia
        feedbackResultado.classList.add('visivel');
        if (resultado.multiplicador > 1) {
            feedbackResultado.style.backgroundColor = "#2ecc71";
            feedbackResultado.style.color = "#fff";
            feedbackResultado.textContent = `Parabéns! Caiu em ${resultado.texto}. Você recebeu ${pontosGanhos} pontos!`;
        } else if (resultado.multiplicador === 1) {
            feedbackResultado.style.backgroundColor = "#f1c40f";
            feedbackResultado.style.color = "#000";
            feedbackResultado.textContent = `Empate! Caiu em ${resultado.texto}. Seus pontos retornaram.`;
        } else {
            feedbackResultado.style.backgroundColor = "#e74c3c";
            feedbackResultado.style.color = "#fff";
            feedbackResultado.textContent = `Caiu em ${resultado.texto}. Você perdeu os pontos investidos nessa rodada.`;
        }

        btnGirar.disabled = false;
    }, 4050);
});