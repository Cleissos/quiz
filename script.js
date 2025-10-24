// questions é um array de objetos; cada objeto representa uma pergunta com:
// question: texto da pergunta.
// answers: array de alternativas — cada alternativa tem id, text e correct (booleano indicando se é a correta).
const questions = [
    {
        question: "Qual destas tecnologias é usada para criar páginas web dinâmicas?",
        answers: [
            {id:1, text:"HTML", correct:false},
            {id:2, text:"CSS", correct:false},
            {id:3, text:"JavaScript",correct:true},
            {id:4, text:"PNG", correct:false}
        ]
    },
    {
        question: "Qual empresa criou o sistema operacional Windows?",
        answers: [
            {id:1, text:"Apple", correct:false},
            {id:2, text:"Microsoft", correct:true},
            {id:3, text:"Google",correct:false},
            {id:4, text:"IBM", correct:false}
        ]
    },
    {
        question: "O que significa a sigla “CPU” em um computador?",
        answers: [
            {id:1, text:"Central Power Unit", correct:false},
            {id:2, text:"Central Processing Unit", correct:true},
            {id:3, text:"Control Program Utility",correct:false},
            {id:4, text:"Core Peripheral Unit", correct:false}
        ]
    },
    {
        question: "Qual protocolo é usado para transferir páginas da web pela Internet?",
        answers: [
            {id:1, text:"FTP", correct:false},
            {id:2, text:"SMTP", correct:false},
            {id:3, text:"HTTP",correct:true},
            {id:4, text:"IP", correct:false}
        ]
    },
    {
        question: "Qual destas linguagens é usada principalmente para estilizar páginas web?",
        answers: [
            {id:1, text:"Java", correct:false},
            {id:2, text:"CSS", correct:true},
            {id:3, text:"Python",correct:false},
            {id:4, text:"C++", correct:false}
        ]
    },
    {
        question: "Qual dispositivo é utilizado para armazenar dados permanentemente em um computador?",
        answers: [
            {id:1, text:"RAM", correct:false},
            {id:2, text:"Cache", correct:false},
            {id:3, text:"HD (ou SSD)",correct:true},
            {id:4, text:"Processador", correct:false}
        ]
    },
    {
        question: "O que é um “browser”?",
        answers: [
            {id:1, text:"Um tipo de vírus", correct:false},
            {id:2, text:"Um servidor de e-mails", correct:false},
            {id:3, text:"Um software para criar aplicativos",correct:false},
            {id:4, text:"Um programa usado para navegar na internet", correct:true}
        ]
    },
    {
        question: "Qual destas linguagens é usada principalmente no desenvolvimento de aplicativos Android?",
        answers: [
            {id:1, text:"Swift", correct:false},
            {id:2, text:"Java", correct:true},
            {id:3, text:"C#",correct:false},
            {id:4, text:"PHP", correct:false}
        ]
    },
    {
        question: "O que significa a sigla “URL”?",
        answers: [
            {id:1, text:"Universal Reset Link", correct:false},
            {id:2, text:"User Resource Locator", correct:false},
            {id:3, text:"Uniform Resource Locator",correct:true},
            {id:4, text:"United Remote Login", correct:false}
        ]
    },
    {
        question: "Qual é a função principal de um sistema operacional?",
        answers: [
            {id:1, text:"Executar páginas da web", correct:false},
            {id:2, text:"Gerenciar os recursos e hardware do computador", correct:true},
            {id:3, text:"Traduzir códigos de programação",correct:false},
            {id:4, text:"Criar documentos de texto", correct:false}
        ]
    },
    
]

// questionElement — elemento onde o texto da pergunta será exibido.
const questionElement = document.getElementById('question');

// answerButtons — container onde os botões de alternativa serão criados (appendChild).
const answerButtons = document.getElementById('answer-buttons');

// nextButton — botão “Próxima” (ou “Play Again” no fim).
const nextButton = document.getElementById('next-btn');


// currentQuestionIndex — índice da pergunta atual no array (0 = primeira).
let currentQuestionIndex = 0;
// score — contador de acertos.
let score = 0;


// Inicializa/reeseta o quiz.
// Zera índice e pontuação.
// Ajusta texto do botão nextButton para “Próxima”.
// Chama showQuestion() para renderizar a primeira pergunta.
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";
    showQuestion();
}

// Esconde o botão “Próxima”.
// Remove todos os filhos de answerButtons (limpa botões de alternativa anteriores).
// Garante que a área de respostas fique pronta para a próxima pergunta.
function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Limpa o estado (via resetState()).
// Busca a pergunta corrente.
// Exibe número e texto da pergunta no questionElement.
// Para cada alternativa:
// Cria um <button>, define seu texto (innerHTML), coloca o id na propriedade dataset do botão (data-id), adiciona uma classe (btn) e registra o handler selectAnswer.
// Adiciona o botão ao container answerButtons.
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;
        button.classList.add('btn');
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    })
}

// O que faz: trata o clique numa alternativa.
// answers = ... → pega o array de alternativas da pergunta atual.
// Atenção: aqui answers foi usado sem let/const — isso cria (acidentalmente) uma variável global. Melhor usar const answers = ....
// correctAnswer — encontra a alternativa marcada correct == true. Usa filter(...)[0] para pegar a primeira.
// selectedBtn — botão clicado (e.target).
// isCorrect — compara selectedBtn.dataset.id com o id da alternativa correta.
// Observação: dataset.id é string; correctAnswer.id pode ser número. A comparação com == funciona por coerção, mas é melhor converter (parseInt) e usar ===.
// Se correto: adiciona classe correct ao botão e incrementa score.
// Se incorreto: adiciona classe incorrect.
// Depois, desabilita todos os botões (evita múltiplos cliques).
// Exibe o botão nextButton para avançar.
function selectAnswer(e) {
    answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.filter((answer) => answer.correct == true)[0];

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id;

    if(isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    }else {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true;
    })

    nextButton.style.display = "block";
}

// Limpa estado.
// Mostra mensagem final com número de acertos e total de perguntas.
// Ajusta o nextButton para “Play Again” e o exibe — ao clicar, startQuiz() será chamado (veja o listener).
function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}`;
    nextButton.innerHTML = "Jogar Novamente";
    nextButton.style.display = "block";
}

// Incrementa o índice de pergunta.
// Se ainda houver perguntas, chama showQuestion() para a próxima.
// Se não houver mais, chama showScore().
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else {
        showScore();
    }
}

// Quando clicado:
// Se currentQuestionIndex < quetions.length chama handleNextButton() (segue para próxima ou mostra score).
// Caso contrário (quando já passou do fim e está na tela de resultado), chama startQuiz() para reiniciar o quiz.
// Observação: o fluxo funciona com o currentQuestionIndex sendo incrementado até igualar quetions.length (ex.: 4 perguntas → índice vai 0,1,2,3; depois vira 4 e chama showScore()).
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
});

// Começa o quiz ao carregar o script.
startQuiz();