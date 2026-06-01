// Seleção dos elementos do DOM
const form = document.getElementById('cadastroForm');
const nomeInput = document.getElementById('nome');
const idadeInput = document.getElementById('idade');

const nomeErro = document.getElementById('nomeErro');
const idadeErro = document.getElementById('idadeErro');
const feedbackGeral = document.getElementById('feedbackGeral');

// Evento de submissão do formulário
form.addEventListener('submit', function(event) {
    // Previne o comportamento padrão de recarregar a página
    event.preventDefault(); 
    
    // Inicializa o status de validação como verdadeiro
    let formularioValido = true;

    // 1. VALIDAÇÃO DO NOME (Mínimo 3 caracteres limpos)
    const nomeValor = nomeInput.value.trim();
    if (nomeValor.length < 3) {
        nomeErro.textContent = "O nome deve ter pelo menos 3 caracteres.";
        nomeInput.classList.add('invalido');
        nomeInput.classList.remove('valido');
        formularioValido = false;
    } else {
        nomeErro.textContent = ""; // Limpa o erro
        nomeInput.classList.add('valido');
        nomeInput.classList.remove('invalido');
    }

    // 2. VALIDAÇÃO DA IDADE (Entre 14 e 19 anos)
    const idadeValor = parseInt(idadeInput.value, 10);
    if (isNaN(idadeValor) || idadeValor < 14 || idadeValor > 19) {
        idadeErro.textContent = "A idade deve estar entre 14 e 19 anos.";
        idadeInput.classList.add('invalido');
        idadeInput.classList.remove('valido');
        formularioValido = false;
    } else {
        idadeErro.textContent = ""; // Limpa o erro
        idadeInput.classList.add('valido');
        idadeInput.classList.remove('invalido');
    }

    // 3. EXIBIÇÃO DO FEEDBACK GERAL
    if (formularioValido) {
        // Sucesso
        feedbackGeral.textContent = "Sucesso! Seu cadastro foi enviado.";
        feedbackGeral.className = "feedback-geral sucesso";
        
        // Opcional: Limpa o formulário após o sucesso
        form.reset();
        nomeInput.classList.remove('valido');
        idadeInput.classList.remove('valido');
    } else {
        // Erro Geral
        feedbackGeral.textContent = "Por favor, corrija os erros no formulário antes de enviar.";
        feedbackGeral.className = "feedback-geral erro";
    }
});

// Limpa os estilos de erro assim que o usuário volta a digitar (Melhoria de UX)
nomeInput.addEventListener('input', () => {
    if (nomeInput.value.trim().length >= 3) {
        nomeErro.textContent = "";
        nomeInput.classList.remove('invalido');
    }
});

idadeInput.addEventListener('input', () => {
    const idade = parseInt(idadeInput.value, 10);
    if (!isNaN(idade) && idades >= 14 && idade <= 19) {
        idadeErro.textContent = "";
        idadeInput.classList.remove('invalido');
    }
});
