document.addEventListener("DOMContentLoaded", function () {
    const mainContainer = document.querySelector(".grid-container");
    const selectedService = localStorage.getItem("selectedService");

    if (!selectedService) {
        mainContainer.innerHTML = "<p>Nenhum serviço selecionado. <a href='index.html'>Voltar</a></p>";
        return;
    }

    document.addEventListener("DOMContentLoaded", function () {
        const footer = document.querySelector("footer"); // Seleciona o rodapé
    
        // **Remove o rodapé apenas na tela dos profissionais**
        if (footer) {
            footer.parentNode.removeChild(footer);
        }
    });
    
    // **Lista fictícia com 10 profissionais por serviço**
    const professionals = [
        // 🏗️ Pedreiros
        { service: "pedreiro", name: "Carlos Silva", age: 45, stars: "⭐⭐⭐", comment: "Experiente em reformas e construção." },
        { service: "pedreiro", name: "João Ferreira", age: 38, stars: "⭐⭐⭐⭐⭐", comment: "Ótima qualidade e compromisso." },
        { service: "pedreiro", name: "Roberto Alves", age: 50, stars: "⭐⭐⭐⭐", comment: "Construção pesada e reformas estruturais." },
        { service: "pedreiro", name: "Fernando Martins", age: 42, stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável." },
        { service: "pedreiro", name: "Paulo Souza", age: 39, stars: "⭐⭐⭐", comment: "Bom acabamento e rapidez." },
        { service: "pedreiro", name: "Ricardo Mendes", age: 44, stars: "⭐⭐⭐⭐", comment: "Especialista em reformas rápidas." },
        { service: "pedreiro", name: "Lucas Oliveira", age: 35, stars: "⭐⭐⭐⭐⭐", comment: "Muito detalhista e eficiente." },
        { service: "pedreiro", name: "José Lima", age: 47, stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado." },
        { service: "pedreiro", name: "Marcelo Nunes", age: 41, stars: "⭐⭐⭐⭐", comment: "Experiente em grandes projetos." },
        { service: "pedreiro", name: "Rafael Costa", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Ótima comunicação e execução de obra." },

        // 🔨 Serventes
        { service: "servente", name: "Ana Costa", age: 22, stars: "⭐⭐⭐⭐", comment: "Auxiliar de obra dedicada e competente." },
        { service: "servente", name: "Rafaela Dias", age: 29, stars: "⭐⭐⭐⭐⭐", comment: "Trabalho ágil e eficiente." },
        { service: "servente", name: "Mariana Lopes", age: 31, stars: "⭐⭐⭐⭐", comment: "Organizada e detalhista." },
        { service: "servente", name: "Beatriz Souza", age: 27, stars: "⭐⭐⭐⭐⭐", comment: "Ótima capacidade de adaptação." },
        { service: "servente", name: "Cristina Ferreira", age: 24, stars: "⭐⭐⭐", comment: "Muito dedicada e ." },
        { service: "servente", name: "Júlia Mendes", age: 26, stars: "⭐⭐⭐⭐", comment: "Agilidade na execução dos trabalhos." },
        { service: "servente", name: "Tatiane Lima", age: 30, stars: "⭐⭐⭐⭐", comment: "Confiável e disciplinada." },
        { service: "servente", name: "Carla Oliveira", age: 28, stars: "⭐⭐⭐⭐⭐", comment: "Trabalho excelente em equipe." },
        { service: "servente", name: "Amanda Nunes", age: 32, stars: "⭐⭐⭐⭐", comment: "Ótima capacidade técnica." },
        { service: "servente", name: "Vanessa Costa", age: 25, stars: "⭐⭐⭐⭐⭐", comment: "Sempre disposta e atenciosa." },

        // 🚰 Bombeiros Hidráulicos
        { service: "bombeiro-hidraulico", name: "Fernando Souza", age: 41, stars: "⭐⭐⭐⭐", comment: "Especialista em sistemas hidráulicos." },
        { service: "bombeiro-hidraulico", name: "Diego Mendes", age: 35, stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado." },
        { service: "bombeiro-hidraulico", name: "Guilherme Silva", age: 40, stars: "⭐⭐⭐⭐", comment: "Instalação rápida e sem falhas." },
        { service: "bombeiro-hidraulico", name: "Leonardo Costa", age: 38, stars: "⭐⭐⭐⭐⭐", comment: "Ótimo atendimento e execução." },
        { service: "bombeiro-hidraulico", name: "Tiago Oliveira", age: 36, stars: "⭐⭐⭐", comment: "Profissional confiável e experiente." },
        { service: "bombeiro-hidraulico", name: "Rogério Lima", age: 42, stars: "⭐⭐⭐⭐", comment: "Especialista em redes de água." },
        { service: "bombeiro-hidraulico", name: "Eduardo Mendes", age: 33, stars: "⭐⭐⭐⭐⭐", comment: "Montagem de encanamento impecável." },
        { service: "bombeiro-hidraulico", name: "Renato Ferreira", age: 44, stars: "⭐⭐⭐⭐", comment: "Execução de trabalho precisa e organizada." },
        { service: "bombeiro-hidraulico", name: "Alex Nunes", age: 37, stars: "⭐⭐⭐⭐", comment: "Especialpontualista em consertos emergenciais." },
        { service: "bombeiro-hidraulico", name: "Samuel Costa", age: 39, stars: "⭐⭐⭐⭐⭐", comment: "Trabalho eficiente e seguro." },

        // 🎨 Pintores
        { service: "pintor", name: "Márcio Oliveira", age: 47, stars: "⭐⭐⭐⭐", comment: "Acabamento impecável e ótimas técnicas." },
        { service: "pintor", name: "Lucas Almeida", age: 33, stars: "⭐⭐⭐⭐⭐", comment: "Trabalho limpo e detalhado." },
        { service: "pintor", name: "Fernando Lima", age: 42, stars: "⭐⭐⭐⭐", comment: "Especialista em pintura residencial." },
        { service: "pintor", name: "Rogério Costa", age: 39, stars: "⭐⭐⭐⭐⭐", comment: "Ótima combinação de cores e acabamento." },
        { service: "pintor", name: "Carlos Mendes", age: 35, stars: "⭐⭐⭐", comment: "Pintura rápida e eficiente." },
        { service: "pintor", name: "Tiago Oliveira", age: 38, stars: "⭐⭐⭐⭐", comment: "Pintura externa e interna com qualidade." },
        { service: "pintor", name: "Diego Nunes", age: 40, stars: "⭐⭐⭐⭐⭐", comment: "Uso de materiais de alta resistência." },
        { service: "pintor", name: "Renato Souza", age: 45, stars: "⭐⭐⭐⭐", comment: "Texturas e efeitos modernos." },
        { service: "pintor", name: "Eduardo Martins", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Pintura personalizada e artística." },
        { service: "pintor", name: "Samuel Pereira", age: 41, stars: "⭐⭐⭐⭐", comment: "Me garanto no que faço" },

        //  🌿 Capinadores
        { service: "capinador", name: "Roberto Lima", age: 39, stars: "⭐⭐⭐", comment: "Especialista em capinação e limpeza." },
        { service: "capinador", name: "Fernanda Moreira", age: 31, stars: "⭐⭐⭐⭐", comment: "Trabalho eficiente e rápido." },
        { service: "capinador", name: "Gustavo Ferreira", age: 36, stars: "⭐⭐⭐⭐⭐", comment: "Capina e manutenção de terrenos." },
        { service: "capinador", name: "João Henrique", age: 40, stars: "⭐⭐⭐⭐", comment: "Remoção de mato alto com precisão." },
        { service: "capinador", name: "Diego Souza", age: 38, stars: "⭐⭐⭐", comment: "Capinação rápida e eficaz." },
        { service: "capinador", name: "Tatiane Oliveira", age: 33, stars: "⭐⭐⭐⭐", comment: "Limpeza de terrenos abandonados." },
        { service: "capinador", name: "Marcos Nunes", age: 41, stars: "⭐⭐⭐⭐⭐", comment: "Cuida da remoção de plantas invasoras." },
        { service: "capinador", name: "Paula Lima", age: 29, stars: "⭐⭐⭐⭐", comment: "Trabalho detalhista e cuidadoso." },
        { service: "capinador", name: "Ricardo Santos", age: 35, stars: "⭐⭐⭐⭐", comment: "Garantia de serviço bem feito." },
        { service: "capinador", name: "Amanda Costa", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Profissional experiente em áreas verdes." },

        //  ⚡ Eletricistas

        { service: "eletricista", name: "Marcos Sousa", age: 45, stars: "⭐⭐⭐⭐⭐", comment: "Serviços elétricos de qualidade." },
        { service: "eletricista", name: "Paula Andrade", age: 34, stars: "⭐⭐⭐⭐", comment: "Profissional confiável e experiente." },
        { service: "eletricista", name: "Gustavo Ferreira", age: 38, stars: "⭐⭐⭐⭐⭐", comment: "Instalações elétricas seguras e eficientes." },
        { service: "eletricista", name: "Roberto Lima", age: 42, stars: "⭐⭐⭐⭐", comment: "Manutenção preventiva e corretiva." },
        { service: "eletricista", name: "Tiago Nunes", age: 36, stars: "⭐⭐⭐", comment: "Especialista em rede elétrica residencial." },
        { service: "eletricista", name: "Ana Souza", age: 29, stars: "⭐⭐⭐⭐", comment: "Ótimo atendimento e precisão no trabalho." },
        { service: "eletricista", name: "Fernando Costa", age: 40, stars: "⭐⭐⭐⭐⭐", comment: "Experiência em automação elétrica." },
        { service: "eletricista", name: "Lucas Mendes", age: 37, stars: "⭐⭐⭐⭐", comment: "Instalação de sistemas fotovoltaicos." },
        { service: "eletricista", name: "Ricardo Oliveira", age: 35, stars: "⭐⭐⭐⭐", comment: "Execução rápida e confiável." },
        { service: "eletricista", name: "Vanessa Martins", age: 31, stars: "⭐⭐⭐⭐⭐", comment: "Ótima em trabalhos elétricos." },

        // 🏠 Montadores de Móveis

        { service: "montador-de-moveis", name: "Ricardo Alves", age: 30, stars: "⭐⭐⭐⭐", comment: "Montagem rápida e eficiente." },
        { service: "montador-de-moveis", name: "Juliana Martins", age: 29, stars: "⭐⭐⭐⭐⭐", comment: "Ótima organização e trabalho detalhado." },
        { service: "montador-de-moveis", name: "Fernando Souza", age: 35, stars: "⭐⭐⭐⭐", comment: "Experiente em móveis planejados." },
        { service: "montador-de-moveis", name: "Thiago Lima", age: 40, stars: "⭐⭐⭐⭐⭐", comment: "Montagem impecável, sem erros." },
        { service: "montador-de-moveis", name: "Gustavo Nunes", age: 38, stars: "⭐⭐⭐", comment: "Rápido e confiável na entrega do serviço." },
        { service: "montador-de-moveis", name: "Paula Costa", age: 31, stars: "⭐⭐⭐⭐", comment: "Excelência em montagem de móveis residenciais." },
        { service: "montador-de-moveis", name: "Diego Oliveira", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em móveis sob medida." },
        { service: "montador-de-moveis", name: "Amanda Santos", age: 33, stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e organizado." },
        { service: "montador-de-moveis", name: "Lucas Mendes", age: 36, stars: "⭐⭐⭐⭐", comment: "Instalação precisa e sem desperdício." },
        { service: "montador-de-moveis", name: "Renato Pereira", age: 39, stars: "⭐⭐⭐", comment: "Melhor montador da Região" },

        // 🚚 Caminhões de Frete

        { service: "caminhao-de-frete", name: "José Oliveira", age: 50, stars: "⭐⭐⭐⭐", comment: "Transporte seguro e eficiente." },
        { service: "caminhao-de-frete", name: "Amanda Costa", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Fretes rápidos e confiáveis." },
        { service: "caminhao-de-frete", name: "Rodrigo Lima", age: 45, stars: "⭐⭐⭐⭐", comment: "Especialista em transporte de cargas pesadas." },
        { service: "caminhao-de-frete", name: "Fernando Nunes", age: 42, stars: "⭐⭐⭐⭐⭐", comment: "Fretes intermunicipais com segurança." },
        { service: "caminhao-de-frete", name: "Lucas Pereira", age: 38, stars: "⭐⭐⭐", comment: "Melhor custo-benefício para fretes." },
        { service: "caminhao-de-frete", name: "Ricardo Mendes", age: 40, stars: "⭐⭐⭐⭐", comment: "Atendimento rápido e eficiente." },
        { service: "caminhao-de-frete", name: "Tatiane Lima", age: 35, stars: "⭐⭐⭐⭐⭐", comment: "Transporte de móveis com cuidado especial." },
        { service: "caminhao-de-frete", name: "Gustavo Ferreira", age: 44, stars: "⭐⭐⭐⭐", comment: "Especialista em mudanças residenciais." },
        { service: "caminhao-de-frete", name: "Paula Andrade", age: 39, stars: "⭐⭐⭐⭐", comment: "Serviço de entrega rápida e segura." },
        { service: "caminhao-de-frete", name: "Diego Santos", age: 41, stars: "⭐⭐⭐", comment: "Mais de 100 fretes realizados" },

        // 🧹 Diaristas

        { service: "diarista", name: "Maria Silva", age: 42, stars: "⭐⭐⭐⭐⭐", comment: "Limpeza impecável e dedicação." },
        { service: "diarista", name: "Carlos Mendes", age: 28, stars: "⭐⭐⭐⭐", comment: "Cuida dos detalhes na limpeza." },
        { service: "diarista", name: "Fernanda Oliveira", age: 35, stars: "⭐⭐⭐⭐", comment: "Ótima organização e agilidade." },
        { service: "diarista", name: "Ana Costa", age: 40, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em limpeza profunda." },
        { service: "diarista", name: "Rafaela Nunes", age: 37, stars: "⭐⭐⭐", comment: "Bom custo-benefício e eficiência." },
        { service: "diarista", name: "João Ferreira", age: 32, stars: "⭐⭐⭐⭐", comment: "Cuidadoso com móveis e superfícies." },
        { service: "diarista", name: "Tatiane Lima", age: 30, stars: "⭐⭐⭐⭐⭐", comment: "Trabalho impecável e detalhista." },
        { service: "diarista", name: "Diego Santos", age: 29, stars: "⭐⭐⭐⭐", comment: "Atendimento rápido e confiável." },
        { service: "diarista", name: "Paula Andrade", age: 41, stars: "⭐⭐⭐⭐", comment: "Especialista em organização de ambientes." },
        { service: "diarista", name: "Ricardo Pereira", age: 39, stars: "⭐⭐⭐⭐⭐", comment: "Organização e limpeza em primeiro lugar" },

    ];

    // **Filtra os profissionais de acordo com o serviço escolhido**
    const filteredProfessionals = professionals.filter(professional => professional.service === selectedService);

    if (filteredProfessionals.length === 0) {
        mainContainer.innerHTML = "<p>Nenhum profissional encontrado para este serviço.</p>";
        return;
    }

    mainContainer.innerHTML = ""; // Limpa a mensagem inicial

    filteredProfessionals.forEach(professional => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${professional.name}</h3>
            <p>Idade: ${professional.age} anos</p>
            <p>Avaliação: ${professional.stars}</p>
            <p>${professional.comment}</p>
        `;

        mainContainer.appendChild(card);
    });
});