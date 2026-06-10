// ==========================================
// ESTADO DA APLICAÇÃO E COMPONENTES DE DADOS
// ==========================================

// Dados do Carrossel de Curiosidades
const curiosidadesData = [
    {
        titulo: "Drones Guardiões",
        texto: "Um único drone agrícola consegue analisar hectares de plantação em minutos, identificando pragas antes mesmo que elas fiquem visíveis ao olho humano."
    },
    {
        titulo: "Água Sob Medida",
        texto: "Com sensores de umidade instalados no solo profundo, a irrigação automatizada só liga se a planta realmente precisar. Economia pura de recursos hídricos!"
    },
    {
        titulo: "Florestas Protegidas",
        texto: "Graças às leis brasileiras e à tecnologia produtiva, o agronegócio moderno consegue produzir mais alimentos no mesmo espaço, blindando a vegetação nativa."
    }
];

// Dados do Quiz Educativo
const quizData = [
    {
        pergunta: "Qual tecnologia é usada no campo moderno para monitorar a saúde das plantações lá do alto?",
        opcoes: ["Submarinos autônomos", "Drones com câmeras térmicas", "Tratores a vapor", "Balões meteorológicos de papel"],
        correta: 1,
        explicacao: "Correto! Os drones sobrevoam as plantações gerando mapas de calor que mostram a saúde exata da lavoura."
    },
    {
        pergunta: "De onde vem a maior parte do algodão usado em roupas nas cidades?",
        opcoes: ["De laboratórios químicos", "Da reciclagem de plástico apenas", "De fazendas que utilizam manejo sustentável", "De minas de minério"],
        correta: 2,
        explicacao: "Isso mesmo! O campo fornece a matéria-prima natural (algodão) que veste a população urbana através do manejo sustentável da terra."
    }
];

// Dados do FAQ (Acordeão)
const faqData = [
    {
        pergunta: "Como o campo se conecta com a cidade?",
        resposta: "O campo produz os alimentos, fibras de roupas e biomassa de energia consumidos na cidade. Em contrapartida, as indústrias urbanas desenvolvem softwares, maquinários e pesquisas de ponta aplicados nas fazendas."
    },
    {
        pergunta: "O que é agricultura de precisão?",
        resposta: "É o uso de tecnologia avançada (GPS, Sensores e IA) para gerenciar plantações metro a metro, aplicando água e nutrientes na dosagem milimétrica necessária."
    }
];

// ==========================================
// RENDERIZAÇÃO DINÂMICA
// ==========================================

function initDynamicComponents() {
    // Renderizar Carrossel
    const carouselContainer = document.getElementById('carousel-container');
    if (carouselContainer) {
        carouselContainer.innerHTML = curiosidadesData.map(item => `
            <div class="carousel-item">
                <h3>${item.titulo}</h3>
                <p>${item.texto}</p>
            </div>
        `).join('');
    }

    // Renderizar Acordeão (FAQ)
    const faqContainer = document.getElementById('faq-accordion');
    if (faqContainer) {
        faqContainer.innerHTML = faqData.map((item, index) => `
            <div class="accordion-item">
                <button class="accordion-header" data-index="${index}">
                    ${item.pergunta} <span>+</span>
                </button>
                <div class="accordion-content" id="faq-content-${index}">
                    <p style="padding-bottom: 1.5rem;">${item.resposta}</p>
                </div>
            </div>
        `).join('');
    }
}

// ==========================================
// LÓGICA DE INTERAÇÃO (QUIZ & CARROSSEL)
// ==========================================

let currentSlide = 0;
function moveCarousel(direction) {
    const container = document.getElementById('carousel-container');
    const totalSlides = curiosidadesData.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
}

let currentQuestionIndex = 0;
function renderQuestion() {
    const container = document.getElementById('quiz-question-container');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-next-question');
    
    feedback.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    if (currentQuestionIndex >= quizData.length) {
        container.innerHTML = `<h3>🎉 Parabéns! Você completou a jornada agro-sustentável. Compartilhe o conhecimento na sua escola!</h3>`;
        return;
    }
    
    const q = quizData[currentQuestionIndex];
    container.innerHTML = `
        <h3>Pergunta ${currentQuestionIndex + 1}: ${q.pergunta}</h3>
        <div class="quiz-options">
            ${q.opcoes.map((opcao, idx) => `
                <button class="quiz-option-btn" onclick="checkAnswer(${idx})">${opcao}</button>
            `).join('')}
        </div>
    `;
}

window.checkAnswer = function(selectedIndex) {
    const q = quizData[currentQuestionIndex];
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-next-question');
    
    feedback.classList.remove('hidden');
    
    if (selectedIndex === q.correta) {
        feedback.className = "quiz-feedback correct";
        feedback.innerText = q.explicacao;
    } else {
        feedback.className = "quiz-feedback wrong";
        feedback.innerText = "Ops! Resposta incorreta. " + q.explicacao;
    }
    
    // Desabilitar opções após escolha
    const buttons = document.querySelectorAll('.quiz-option-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    nextBtn.classList.remove('hidden');
};

// ==========================================
// ACESSIBILIDADE (FONTES E CONTRASTE)
// ==========================================

let currentFontSize = 16;
function adjustFontSize(action) {
    if (action === 'increase' && currentFontSize < 24) {
        currentFontSize += 2;
    } else if (action === 'decrease' && currentFontSize > 12) {
        currentFontSize -= 2;
    }
    document.documentElement.style.fontSize = `${currentFontSize}px`;
}

// ==========================================
// EVENT LISTENERS E INICIALIZAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initDynamicComponents();
    renderQuestion();

    // Controles do Carrossel
    document.getElementById('prev-carousel').addEventListener('click', () => moveCarousel(-1));
    document.getElementById('next-carousel').addEventListener('click', () => moveCarousel(1));

    // Próxima Pergunta do Quiz
    document.getElementById('btn-next-question').addEventListener('click', () => {
        currentQuestionIndex++;
        renderQuestion();
    });

    // Lógica de abertura do Acordeão
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            const content = document.getElementById(`faq-content-${index}`);
            const isOpened = content.style.maxHeight && content.style.maxHeight !== '0px';
            
            // Fechar todos
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = '0px');
            document.querySelectorAll('.accordion-header span').forEach(s => s.innerText = '+');

            if (!isOpened) {
                content.style.maxHeight = content.scrollHeight + "px";
                button.querySelector('span').innerText = '-';
            }
        });
    });

    // Controles de Acessibilidade
    document.getElementById('btn-increase').addEventListener('click', () => adjustFontSize('increase'));
    document.getElementById('btn-decrease').addEventListener('click', () => adjustFontSize('decrease'));
    document.getElementById('btn-contrast').addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });
});
