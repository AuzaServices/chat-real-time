document.addEventListener("DOMContentLoaded", function () {
    // 🔄 Verifica se o usuário selecionou um serviço antes de carregar a página
    if (!localStorage.getItem("selectedService")) {
        window.location.href = "index.html"; // 🔄 Redireciona para a tela de seleção
        return;
    }

    const mainContainer = document.querySelector(".grid-container");
    const selectedService = localStorage.getItem("selectedService");

    if (!selectedService) {
        mainContainer.innerHTML = "<p>Nenhum serviço selecionado. <a href='index.html'>Voltar</a></p>";
        return;
    }

    // **Remove o rodapé apenas na tela dos profissionais**
    const footer = document.querySelector("footer");
    if (footer) {
        footer.parentNode.removeChild(footer);
    }

    // **Lista fictícia com profissionais, cada um com seu WhatsApp**
    const professionals = [
        
        //Pedreiro 🧱🔨
        { service: "pedreiro", name: "Carlos Silva", age: 45, stars: "⭐⭐⭐", comment: "Experiente em reformas e construção.", whatsapp: "5585991340651" },
        { service: "pedreiro", name: "João Ferreira", age: 38, stars: "⭐⭐⭐⭐⭐", comment: "Ótima qualidade e compromisso.", whatsapp: "5585991340652" },
        { service: "pedreiro", name: "Roberto Alves", age: 50, stars: "⭐⭐⭐⭐", comment: "Construção pesada e reformas estruturais.", whatsapp: "5585991340653" },
        { service: "pedreiro", name: "Fernando Martins", age: 42, stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável.", whatsapp: "5585991340654" },
        { service: "pedreiro", name: "Paulo Souza", age: 39, stars: "⭐⭐⭐", comment: "Bom acabamento e rapidez.", whatsapp: "5585991340655" },
        { service: "pedreiro", name: "Ricardo Mendes", age: 44, stars: "⭐⭐⭐⭐", comment: "Especialista em reformas rápidas.", whatsapp: "5585991340656" },
        { service: "pedreiro", name: "Lucas Oliveira", age: 35, stars: "⭐⭐⭐⭐⭐", comment: "Muito detalhista e eficiente.", whatsapp: "5585991340657" },
        { service: "pedreiro", name: "José Lima", age: 47, stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "5585991340658" },
        { service: "pedreiro", name: "Marcelo Nunes", age: 41, stars: "⭐⭐⭐⭐", comment: "Experiente em grandes projetos.", whatsapp: "5585991340659" },
        { service: "pedreiro", name: "Rafael Costa", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Ótima comunicação e execução de obra.", whatsapp: "5585991340660" },
    
        //Servente 🏗️ 
        { service: "servente", name: "Antonio Souza", age: 33, stars: "⭐⭐⭐", comment: "Rápido e organizado na obra.", whatsapp: "5585991340661" },
        { service: "servente", name: "Bruno Oliveira", age: 29, stars: "⭐⭐⭐⭐⭐", comment: "Ótima disposição e trabalho eficiente.", whatsapp: "5585991340662" },
        { service: "servente", name: "Eduardo Martins", age: 35, stars: "⭐⭐⭐⭐", comment: "Especialista em apoio na construção.", whatsapp: "5585991340663" },
        { service: "servente", name: "Gabriel Lima", age: 31, stars: "⭐⭐⭐⭐", comment: "Experiência em grandes obras.", whatsapp: "5585991340664" },
        { service: "servente", name: "Lucas Pereira", age: 28, stars: "⭐⭐⭐", comment: "Trabalho ágil e organizado.", whatsapp: "5585991340665" },
        { service: "servente", name: "Mateus Ribeiro", age: 36, stars: "⭐⭐⭐⭐", comment: "Sempre pronto para ajudar no serviço.", whatsapp: "5585991340666" },
        { service: "servente", name: "Samuel Nunes", age: 32, stars: "⭐⭐⭐⭐⭐", comment: "Excelente suporte ao mestre de obras.", whatsapp: "5585991340667" },
        { service: "servente", name: "Thiago Costa", age: 34, stars: "⭐⭐⭐⭐", comment: "Trabalho eficiente e rápido.", whatsapp: "5585991340668" },
        { service: "servente", name: "Vinícius Rocha", age: 30, stars: "⭐⭐⭐⭐", comment: "Ótima disposição e organização.", whatsapp: "5585991340669" },
        { service: "servente", name: "Wagner Melo", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Ótima disposição e organização.", whatsapp: "5585991340669" },

        //Bombeiro Hidráulico 💧
        { service: "bombeiro-hidraulico", name: "Alexandre Souza", age: 42, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em manutenção e instalação hidráulica.", whatsapp: "5585991340681" },
        { service: "bombeiro-hidraulico", name: "Bruno Almeida", age: 39, stars: "⭐⭐⭐⭐", comment: "Experiência em reparos e vazamentos.", whatsapp: "5585991340682" },
        { service: "bombeiro-hidraulico", name: "Carlos Mendes", age: 45, stars: "⭐⭐⭐⭐", comment: "Atuação rápida em emergências hidráulicas.", whatsapp: "5585991340683" },
        { service: "bombeiro-hidraulico", name: "Diego Martins", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Instalação e revisão de encanamentos.", whatsapp: "5585991340684" },
        { service: "bombeiro-hidraulico", name: "Fernando Costa", age: 40, stars: "⭐⭐⭐", comment: "Ótima solução para problemas de pressão da água.", whatsapp: "5585991340685" },
        { service: "bombeiro-hidraulico", name: "Gustavo Pereira", age: 43, stars: "⭐⭐⭐⭐", comment: "Experiente em sistemas hidráulicos comerciais.", whatsapp: "5585991340686" },
        { service: "bombeiro-hidraulico", name: "Henrique Rocha", age: 38, stars: "⭐⭐⭐⭐⭐", comment: "Trabalho detalhado e confiável em tubulações.", whatsapp: "5585991340687" },
        {  service: "bombeiro-hidraulico", name: "José Lima", age: 41, stars: "⭐⭐⭐⭐", comment: "Excelência em reparos e manutenção de água.", whatsapp: "5585991340688" },
        { service: "bombeiro-hidraulico", name: "Ricardo Nunes", age: 35, stars: "⭐⭐⭐⭐", comment: "Instalação eficiente de torneiras e bombas hidráulicas.", whatsapp: "5585991340689" },
        { service: "bombeiro-hidraulico", name: "Thiago Silva", age: 44, stars: "⭐", comment: "Instalação eficiente de torneiras e bombas hidráulicas.", whatsapp: "5585991340689" },

        //Pintores 🎨
        { service: "pintor", name: "Luis Carlos", age: 34, stars: "⭐⭐⭐⭐⭐", comment: "Pintura Simples, em Gesso, Reparo, Pinturas em Geral.", whatsapp: "5585991757150" },
        { service: "pintor", name: "Bruno Costa", age: 38, stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e acabamento impecável.", whatsapp: "5585991340692" },
        { service: "pintor", name: "Carlos Mendes", age: 45, stars: "⭐⭐⭐⭐", comment: "Pintura interna e externa com qualidade.", whatsapp: "5585991340693" },
        { service: "pintor", name: "Diego Martins", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Experiência com tintas especiais e texturas.", whatsapp: "5585991340694" },
        { service: "pintor", name: "Fernando Almeida", age: 42, stars: "⭐⭐⭐", comment: "Serviço rápido e eficiente para reformas.", whatsapp: "5585991340695" },
        { service: "pintor", name: "Gustavo Pereira", age: 39, stars: "⭐⭐⭐⭐", comment: "Trabalho detalhado e pintura decorativa.", whatsapp: "5585991340696" },
        { service: "pintor", name: "Henrique Rocha", age: 36, stars: "⭐⭐⭐⭐⭐", comment: "Pintura de fachadas e grandes superfícies.", whatsapp: "5585991340697" },
        { service: "pintor", name: "José Lima", age: 41, stars: "⭐⭐⭐⭐", comment: "Especialista em revitalização de ambientes.", whatsapp: "5585991340698" },
        { service: "pintor", name: "Ricardo Nunes", age: 35, stars: "⭐⭐⭐⭐", comment: "Aplicação de vernizes e pinturas industriais.", whatsapp: "5585991340699" },
        { service: "pintor", name: "Thiago Silva", age: 44, stars: "⭐⭐⭐⭐⭐", comment: "Aplicação de vernizes e pinturas industriais.", whatsapp: "5585991340699" },

        //Capinadores 🌿
        { service: "capinador", name: "Alan Souza", age: 41, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em limpeza de terrenos e roçagem.", whatsapp: "5585991340701" },
        { service: "capinador", name: "Bruno Costa", age: 37, stars: "⭐⭐⭐⭐", comment: "Rapidez e eficiência na remoção de mato alto.", whatsapp: "5585991340702" },
        { service: "capinador", name: "Carlos Mendes", age: 44, stars: "⭐⭐⭐⭐", comment: "Capina manual e mecanizada para áreas urbanas.", whatsapp: "5585991340703" },
        { service: "capinador", name: "Diego Martins", age: 39, stars: "⭐⭐⭐⭐⭐", comment: "Ótima organização e limpeza de terrenos.", whatsapp: "5585991340704" },
        { service: "capinador", name: "Fernando Almeida", age: 42, stars: "⭐⭐⭐", comment: "Trabalho eficiente em lotes e quintais.", whatsapp: "5585991340705" },
        { service: "capinador", name: "Gustavo Pereira", age: 38, stars: "⭐⭐⭐⭐", comment: "Experiência em controle de vegetação indesejada.", whatsapp: "5585991340706" },
        { service: "capinador", name: "Henrique Rocha", age: 36, stars: "⭐⭐⭐⭐⭐", comment: "Capina detalhada para áreas de difícil acesso.", whatsapp: "5585991340707" },
        { service: "capinador", name: "José Lima", age: 40, stars: "⭐⭐⭐⭐", comment: "Serviço limpo e rápido, sem resíduos.", whatsapp: "5585991340708" },
        { service: "capinador", name: "Ricardo Nunes", age: 35, stars: "⭐⭐⭐⭐", comment: "Remoção de plantas invasoras e ervas daninhas.", whatsapp: "5585991340709" },
        { service: "capinador", name: "Thiago Silva", age: 43, stars: "⭐⭐⭐⭐⭐", comment: "Remoção de plantas invasoras e ervas daninhas.", whatsapp: "5585991340709" },

        //Eletricistas ⚡
        { service: "eletricista", name: "Roberto Evangelista", age: 39, stars: "⭐⭐⭐⭐⭐", comment: "Experiência na área de Eletricidade", whatsapp: "5585981737165" },
        { service: "eletricista", name: "Bruno Almeida", age: 39, stars: "⭐⭐⭐⭐", comment: "Manutenção e reparos elétricos eficientes.", whatsapp: "5585991340712" },
        { service: "eletricista", name: "Carlos Mendes", age: 45, stars: "⭐⭐⭐⭐", comment: "Experiência em circuitos e sistemas elétricos.", whatsapp: "5585991340713" },
        { service: "eletricista", name: "Diego Martins", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Instalações industriais e comerciais.", whatsapp: "5585991340714" },
        { service: "eletricista", name: "Fernando Costa", age: 40, stars: "⭐⭐⭐", comment: "Reparos elétricos rápidos e seguros.", whatsapp: "5585991340715" },
        { service: "eletricista", name: "Gustavo Pereira", age: 43, stars: "⭐⭐⭐⭐", comment: "Experiência com sistemas de energia renovável.", whatsapp: "5585991340716" },
        { service: "eletricista", name: "Henrique Rocha", age: 38, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em instalações elétricas complexas.", whatsapp: "5585991340717" },
        { service: "eletricista", name: "José Lima", age: 41, stars: "⭐⭐⭐⭐", comment: "Segurança e eficiência na manutenção elétrica.", whatsapp: "5585991340718" },
        { service: "eletricista", name: "Ricardo Nunes", age: 35, stars: "⭐⭐⭐⭐", comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "5585991340719" },
        { service: "eletricista", name: "Thiago Silva", age: 44, stars: "⭐⭐⭐⭐⭐", comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "5585991340719" },

        //Montadores de Móveis 🛠️
        { service: "montador-de-moveis", name: "Anderson Souza", age: 40, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em montagem de móveis planejados.", whatsapp: "5585991340721" },
        { service: "montador-de-moveis", name: "Bruno Costa", age: 38, stars: "⭐⭐⭐⭐", comment: "Montagem rápida e acabamento impecável.", whatsapp: "5585991340722" },
        { service: "montador-de-moveis", name: "Carlos Mendes", age: 45, stars: "⭐⭐⭐⭐", comment: "Experiência com móveis modernos e convencionais.", whatsapp: "5585991340723" },
        { service: "montador-de-moveis", name: "Diego Martins", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Montagem eficiente e sem complicações.", whatsapp: "5585991340724" },
        { service: "montador-de-moveis", name: "Fernando Almeida", age: 42, stars: "⭐⭐⭐", comment: "Especialista em ajustes e instalações.", whatsapp: "5585991340725" },
        { service: "montador-de-moveis", name: "Gustavo Pereira", age: 39, stars: "⭐⭐⭐⭐", comment: "Trabalho detalhado e instalação precisa.", whatsapp: "5585991340726" },
        { service: "montador-de-moveis", name: "Henrique Rocha", age: 36, stars: "⭐⭐⭐⭐⭐", comment: "Montagem de armários e cozinhas planejadas.", whatsapp: "5585991340727" },
        { service: "montador-de-moveis", name: "José Lima", age: 41, stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e eficiente em montagem de móveis.", whatsapp: "5585991340728" },
        { service: "montador-de-moveis", name: "Ricardo Nunes", age: 35, stars: "⭐⭐⭐⭐", comment: "Experiência com móveis de grandes marcas.", whatsapp: "5585991340729" },
        { service: "montador-de-moveis", name: "Thiago Silva", age: 44, stars: "⭐⭐⭐", comment: "Experiência com móveis de grandes marcas.", whatsapp: "5585991340729" },

        //Caminhoneiros de Frete 🚚
        { service: "caminhao-de-frete", name: "André Souza", age: 45, stars: "⭐⭐⭐⭐⭐", comment: "Fretes rápidos e seguros em toda a região.", whatsapp: "5585991340731" },
        { service: "caminhao-de-frete", name: "Bruno Costa", age: 38, stars: "⭐⭐⭐⭐", comment: "Transporte de cargas leves e pesadas.", whatsapp: "5585991340732" },
        { service: "caminhao-de-frete", name: "Carlos Mendes", age: 50, stars: "⭐⭐⭐⭐", comment: "Especialista em mudanças residenciais e comerciais.", whatsapp: "5585991340733" },
        { service: "caminhao-de-frete", name: "Diego Martins", age: 42, stars: "⭐⭐⭐⭐⭐", comment: "Transporte seguro com rastreamento em tempo real.", whatsapp: "5585991340734" },
        { service: "caminhao-de-frete", name: "Fernando Almeida", age: 40, stars: "⭐⭐⭐", comment: "Atendimento ágil e preços competitivos.", whatsapp: "5585991340735" },
        { service: "caminhao-de-frete", name: "Gustavo Pereira", age: 47, stars: "⭐⭐⭐⭐", comment: "Experiência com transporte de cargas especiais.", whatsapp: "5585991340736" },
        { service: "caminhao-de-frete", name: "Henrique Rocha", age: 39, stars: "⭐⭐⭐⭐⭐", comment: "Logística eficiente para grandes transportes.", whatsapp: "5585991340737" },
        { service: "caminhao-de-frete", name: "José Lima", age: 44, stars: "⭐⭐⭐⭐", comment: "Mudanças e fretes com compromisso e qualidade.", whatsapp: "5585991340738" },
        { service: "caminhao-de-frete", name: "Ricardo Nunes", age: 36, stars: "⭐⭐⭐⭐", comment: "Especialista em transporte de longa distância.", whatsapp: "5585991340739" },
        { service: "caminhao-de-frete", name: "Thiago Silva", age: 48, stars: "⭐⭐⭐⭐", comment: "Especialista em transporte de longa distância.", whatsapp: "5585991340739" },
    
        //Diaristas 🧹
        { service: "diarista", name: "Ana Souza", age: 40, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em limpeza completa e organização.", whatsapp: "5585991340741" },
        { service: "diarista", name: "Bruna Costa", age: 38, stars: "⭐⭐⭐⭐", comment: "Limpeza detalhada e eficiente em residências.", whatsapp: "5585991340742" },
        { service: "diarista", name: "Camila Mendes", age: 45, stars: "⭐⭐⭐⭐", comment: "Ótima com produtos especiais para higienização.", whatsapp: "5585991340743" },
        { service: "diarista", name: "Daniela Martins", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Organização impecável e serviço rápido.", whatsapp: "5585991340744" },
        { service: "diarista", name: "Fernanda Almeida", age: 42, stars: "⭐⭐⭐", comment: "Especialista em limpeza pós-obra e profunda.", whatsapp: "5585991340745" },
        { service: "diarista", name: "Gabriela Pereira", age: 39, stars: "⭐⭐⭐⭐", comment: "Trabalho detalhado e limpeza pesada.", whatsapp: "5585991340746" },
        { service: "diarista", name: "Helena Rocha", age: 36, stars: "⭐⭐⭐⭐⭐", comment: "Limpeza de estofados e higienização profunda.", whatsapp: "5585991340747" },
        { service: "diarista", name: "Isabela Lima", age: 41, stars: "⭐⭐⭐⭐", comment: "Especialista em organização de ambientes.", whatsapp: "5585991340748" },
        { service: "diarista", name: "Larissa Nunes", age: 35, stars: "⭐⭐⭐⭐", comment: "Ótima experiência em limpeza comercial.", whatsapp: "5585991340749" },
        { service: "diarista", name: "Tatiane Silva", age: 44, stars: "⭐⭐", comment: "Ótima experiência em limpeza comercial.", whatsapp: "5585991340749" },

        //Vidraceiro 🔨🪟
        { service: "vidraceiro", name: "Carlos Mendes", age: 45, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em instalação de vidros temperados.", whatsapp: "5585991340750" },
        { service: "vidraceiro", name: "Lucas Oliveira", age: 38, stars: "⭐⭐⭐⭐", comment: "Excelência em corte e encaixe de vidro sob medida.", whatsapp: "5585991340751" },
        { service: "vidraceiro", name: "Fernando Silva", age: 42, stars: "⭐⭐⭐⭐⭐", comment: "Trabalha com vidros laminados e segurança máxima.", whatsapp: "5585991340752" },
        { service: "vidraceiro", name: "André Souza", age: 37, stars: "⭐⭐⭐⭐", comment: "Especialista em manutenção e troca de esquadrias de vidro.", whatsapp: "5585991340753" },
        { service: "vidraceiro", name: "Diego Rocha", age: 39, stars: "⭐⭐⭐⭐⭐", comment: "Montagem de portas e janelas de vidro com precisão.", whatsapp: "5585991340754" },
        { service: "vidraceiro", name: "Rafael Lima", age: 41, stars: "⭐⭐⭐", comment: "Limpeza e polimento de vidros com acabamento impecável.", whatsapp: "5585991340755" },
        { service: "vidraceiro", name: "Marcelo Costa", age: 36, stars: "⭐⭐⭐⭐", comment: "Vidraçaria personalizada para ambientes residenciais e comerciais.", whatsapp: "5585991340756" },
        { service: "vidraceiro", name: "João Nunes", age: 43, stars: "⭐⭐⭐⭐⭐", comment: "Instalação de box para banheiro e divisórias de vidro.", whatsapp: "5585991340757" },
        { service: "vidraceiro", name: "Pedro Almeida", age: 35, stars: "⭐⭐⭐⭐", comment: "Corte preciso e entrega rápida de vidros sob medida.", whatsapp: "5585991340758" },
        { service: "vidraceiro", name: "Gabriel Santos", age: 40, stars: "⭐⭐⭐", comment: "Instalação de box para banheiro e divisórias de vidro.", whatsapp: "5585991340757" },
        
        //Churrasqueiro🔥🍖
        { service: "churrasqueiro", name: "João Batista", age: 45, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cortes nobres e churrasco argentino.", whatsapp: "5585991340760" },
        { service: "churrasqueiro", name: "Carlos Ribeiro", age: 38, stars: "⭐⭐⭐⭐", comment: "Domina churrasco gaúcho e assados perfeitos.", whatsapp: "5585991340761" },
        { service: "churrasqueiro", name: "Fernando Oliveira", age: 42, stars: "⭐⭐⭐⭐⭐", comment: "Técnicas especiais de defumação para carnes saborosas.", whatsapp: "5585991340762" },
        { service: "churrasqueiro", name: "André Souza", age: 37, stars: "⭐⭐⭐⭐", comment: "Especialista em costela fogo de chão e acompanhamentos.", whatsapp: "5585991340763" },
        { service: "churrasqueiro", name: "Diego Rocha", age: 39, stars: "⭐⭐⭐⭐⭐", comment: "Experiência com eventos grandes e rodízio completo.", whatsapp: "5585991340764" },
        { service: "churrasqueiro", name: "Rafael Lima", age: 41, stars: "⭐⭐⭐", comment: "Preparação de carnes artesanais e cortes especiais.", whatsapp: "5585991340765" },
        { service: "churrasqueiro", name: "Marcelo Costa", age: 36, stars: "⭐⭐⭐⭐", comment: "Churrasco tradicional com temperos diferenciados.", whatsapp: "5585991340766" },
        { service: "churrasqueiro", name: "João Nunes", age: 43, stars: "⭐⭐⭐⭐⭐", comment: "Domina picanha na brasa e linguiças especiais.", whatsapp: "5585991340767" },
        { service: "churrasqueiro", name: "Pedro Almeida", age: 35, stars: "⭐⭐⭐⭐", comment: "Experiência com espetinhos variados e carnes nobres.", whatsapp: "5585991340768" },
        { service: "churrasqueiro", name: "Gabriel Santos", age: 40, stars: "⭐⭐⭐", comment: "Churrasco tradicional com temperos diferenciados.", whatsapp: "5585991340766" },
    
        //Piscineiro 💦🏊‍♂️
        { service: "piscineiro", name: "Carlos Mendes", age: 45, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em tratamento químico e limpeza profunda.", whatsapp: "5585991340770" },
        { service: "piscineiro", name: "Lucas Oliveira", age: 38, stars: "⭐⭐⭐⭐", comment: "Experiência em manutenção de piscinas residenciais e comerciais.", whatsapp: "5585991340771" },
        { service: "piscineiro", name: "Fernando Silva", age: 42, stars: "⭐⭐⭐⭐⭐", comment: "Controle de pH e produtos químicos para água cristalina.", whatsapp: "5585991340772" },
        { service: "piscineiro", name: "André Souza", age: 37, stars: "⭐⭐⭐⭐", comment: "Limpeza de filtros e inspeção de bombas hidráulicas.", whatsapp: "5585991340773" },
        { service: "piscineiro", name: "Diego Rocha", age: 39, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em remoção de algas e resíduos orgânicos.", whatsapp: "5585991340774" },
        { service: "piscineiro", name: "Rafael Lima", age: 41, stars: "⭐⭐⭐", comment: "Manutenção preventiva para evitar problemas futuros.", whatsapp: "5585991340775" },
        { service: "piscineiro", name: "Marcelo Costa", age: 36, stars: "⭐⭐⭐⭐", comment: "Limpeza detalhada e troca de areia do filtro.", whatsapp: "5585991340776" },
        { service: "piscineiro", name: "João Nunes", age: 43, stars: "⭐⭐⭐⭐⭐", comment: "Tratamento especial para piscinas de uso frequente.", whatsapp: "5585991340777" },
        { service: "piscineiro", name: "Pedro Almeida", age: 35, stars: "⭐⭐⭐⭐", comment: "Experiência com piscinas aquecidas e climatizadas.", whatsapp: "5585991340778" },
        { service: "piscineiro", name: "Gabriel Santos", age: 40, stars: "⭐⭐⭐", comment: "Limpeza rápida e eficiente para eventos e clubes.", whatsapp: "5585991340779" },
        
        //Técnico em Refrigeração ❄️💨
        { service: "tecnico-em-refrigeração", name: "Maycon", age: 22, stars: "⭐⭐⭐", comment: "Experiência de 2 anos, trabalho com máquinas Split, piso teto e Cassete.", whatsapp: "5585994088415" },
        { service: "tecnico-em-refrigeração", name: "Lucas Oliveira", age: 38, stars: "⭐⭐⭐⭐", comment: "Experiência com sistemas industriais de climatização.", whatsapp: "5585991340781" },
        { service: "tecnico-em-refrigeração", name: "Fernando Silva", age: 42, stars: "⭐⭐⭐⭐⭐", comment: "Reparo e limpeza de sistemas de refrigeração comercial.", whatsapp: "5585991340782" },
        { service: "tecnico-em-refrigeração", name: "André Souza", age: 37, stars: "⭐⭐⭐⭐", comment: "Manutenção preventiva de equipamentos de refrigeração.", whatsapp: "5585991340783" },
        { service: "tecnico-em-refrigeração", name: "Diego Rocha", age: 39, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em gás refrigerante e carga térmica.", whatsapp: "5585991340784" },
        { service: "tecnico-em-refrigeração", name: "Rafael Lima", age: 41, stars: "⭐⭐⭐", comment: "Instalação de sistemas split e central de ar.", whatsapp: "5585991340785" },
        { service: "tecnico-em-refrigeração", name: "Marcelo Costa", age: 36, stars: "⭐⭐⭐⭐", comment: "Manutenção corretiva para equipamentos industriais.", whatsapp: "5585991340786" },
        { service: "tecnico-em-refrigeração", name: "João Nunes", age: 43, stars: "⭐⭐⭐⭐⭐", comment: "Diagnóstico de falhas e eficiência energética.", whatsapp: "5585991340787" },
        { service: "tecnico-em-refrigeração", name: "Pedro Almeida", age: 35, stars: "⭐⭐⭐⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "5585991340788" },
        { service: "tecnico-em-refrigeração", name: "Gabriel Santos", age: 40, stars: "⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "5585991340788" },
    
        //Metalurgico 🔩⚙️
        { service: "metalúrgico", name: "Carlos Mendes", age: 45, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em soldagem e corte industrial.", whatsapp: "5585991340790" },
        { service: "metalúrgico", name: "Lucas Oliveira", age: 38, stars: "⭐⭐⭐⭐", comment: "Experiência em fabricação de peças metálicas sob medida.", whatsapp: "5585991340791" },
        { service: "metalúrgico", name: "Fernando Silva", age: 42, stars: "⭐⭐⭐⭐⭐", comment: "Trabalha com fundição e tratamento térmico de metais.", whatsapp: "5585991340792" },
        { service: "metalúrgico", name: "André Souza", age: 37, stars: "⭐⭐⭐⭐", comment: "Especialista em corte a plasma e moldagem de aço.", whatsapp: "5585991340793" },
        { service: "metalúrgico", name: "Diego Rocha", age: 39, stars: "⭐⭐⭐⭐⭐", comment: "Montagem e manutenção de estruturas metálicas.", whatsapp: "5585991340794" },
        { service: "metalúrgico", name: "Rafael Lima", age: 41, stars: "⭐⭐⭐", comment: "Tratamento superficial e acabamento de metais.", whatsapp: "5585991340795" },
        { service: "metalúrgico", name: "Marcelo Costa", age: 36, stars: "⭐⭐⭐⭐", comment: "Soldagem MIG, TIG e elétrica para projetos industriais.", whatsapp: "5585991340796" },
        { service: "metalúrgico", name: "João Nunes", age: 43, stars: "⭐⭐⭐⭐⭐", comment: "Fundição de metais não ferrosos e técnicas avançadas.", whatsapp: "5585991340797" },
        { service: "metalúrgico", name: "Pedro Almeida", age: 35, stars: "⭐⭐⭐⭐", comment: "Especialista em corte laser e estampagem.", whatsapp: "5585991340798" },
        { service: "metalúrgico", name: "Gabriel Santos", age: 40, stars: "⭐⭐⭐", comment: "Reparo e manutenção de componentes metálicos.", whatsapp: "5585991340799" },
        
        //Cuidador de Animais 🐶🐱
        { service: "cuidador-de-animais", name: "Ana Souza", age: 40, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cuidados e alimentação de pets.", whatsapp: "5585991340800" },
        { service: "cuidador-de-animais", name: "Bruna Costa", age: 38, stars: "⭐⭐⭐⭐", comment: "Passeios e entretenimento para cães e gatos.", whatsapp: "5585991340801" },
        { service: "cuidador-de-animais", name: "Camila Mendes", age: 45, stars: "⭐⭐⭐⭐", comment: "Excelência no trato com animais de todas as idades.", whatsapp: "5585991340802" },
        { service: "cuidador-de-animais", name: "Daniela Martins", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Experiência com cuidados especiais e administração de medicamentos.", whatsapp: "5585991340803" },
        { service: "cuidador-de-animais", name: "Fernanda Almeida", age: 42, stars: "⭐⭐⭐", comment: "Treinamento básico e socialização de filhotes.", whatsapp: "5585991340804" },
        { service: "cuidador-de-animais", name: "Gabriela Pereira", age: 39, stars: "⭐⭐⭐⭐", comment: "Higiene e banho de pets com técnicas especializadas.", whatsapp: "5585991340805" },
        { service: "cuidador-de-animais", name: "Helena Rocha", age: 36, stars: "⭐⭐⭐⭐⭐", comment: "Supervisão constante e ambiente seguro para pets.", whatsapp: "5585991340806" },
        { service: "cuidador-de-animais", name: "Isabela Lima", age: 41, stars: "⭐⭐⭐⭐", comment: "Cuidados personalizados para cada tipo de animal.", whatsapp: "5585991340807" },
        { service: "cuidador-de-animais", name: "Larissa Nunes", age: 35, stars: "⭐⭐⭐⭐", comment: "Ótima experiência com animais idosos e necessidades especiais.", whatsapp: "5585991340808" },
        { service: "cuidador-de-animais", name: "Tatiane Silva", age: 44, stars: "⭐⭐", comment: "Ótima experiência com animais idosos e necessidades especiais.", whatsapp: "5585991340808" },
    
        //Cabeleireiro a Domicilio ✂️💖
        { service: "cabeleireiro-a-domicilio", name: "Ana Souza", age: 40, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cortes modernos e coloração.", whatsapp: "5585991340810" },
        { service: "cabeleireiro-a-domicilio", name: "Bruna Costa", age: 38, stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e reconstrução capilar.", whatsapp: "5585991340811" },
        { service: "cabeleireiro-a-domicilio", name: "Camila Mendes", age: 45, stars: "⭐⭐⭐⭐", comment: "Especialista em penteados para eventos e casamentos.", whatsapp: "5585991340812" },
        { service: "cabeleireiro-a-domicilio", name: "Daniela Martins", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Cortes personalizados e estilo exclusivo.", whatsapp: "5585991340813" },
        { service: "cabeleireiro-a-domicilio", name: "Fernanda Almeida", age: 42, stars: "⭐⭐⭐", comment: "Tratamentos naturais para cabelos danificados.", whatsapp: "5585991340814" },
        { service: "cabeleireiro-a-domicilio", name: "Gabriela Pereira", age: 39, stars: "⭐⭐⭐⭐", comment: "Luzes, mechas e técnicas avançadas de cor.", whatsapp: "5585991340815" },
        { service: "cabeleireiro-a-domicilio", name: "Helena Rocha", age: 36, stars: "⭐⭐⭐⭐⭐", comment: "Progressiva, botox capilar e alisamentos naturais.", whatsapp: "5585991340816" },
        { service: "cabeleireiro-a-domicilio", name: "Isabela Lima", age: 41, stars: "⭐⭐⭐⭐", comment: "Cuidados capilares para cabelos cacheados e crespos.", whatsapp: "5585991340817" },
        { service: "cabeleireiro-a-domicilio", name: "Larissa Nunes", age: 35, stars: "⭐⭐⭐⭐", comment: "Ótima experiência com cortes infantis e masculinos.", whatsapp: "5585991340818" },
        { service: "cabeleireiro-a-domicilio", name: "Tatiane Silva", age: 44, stars: "⭐⭐", comment: "Ótima experiência com cortes infantis e masculinos.", whatsapp: "5585991340818" },
    
        //Manicure a Domicilio 💅✨
        { service: "manicure-a-domicilio", name: "Ana Souza", age: 40, stars: "⭐⭐⭐⭐⭐", comment: "Especialista em unhas decoradas e esmaltação profissional.", whatsapp: "5585991340820" },
        { service: "manicure-a-domicilio", name: "Bruna Costa", age: 38, stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e cuidado especial para as unhas.", whatsapp: "5585991340821" },
        { service: "manicure-a-domicilio", name: "Camila Mendes", age: 45, stars: "⭐⭐⭐⭐", comment: "Experiência em unhas de gel, acrílico e fibra de vidro.", whatsapp: "5585991340822" },
        { service: "manicure-a-domicilio", name: "Daniela Martins", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Alongamento de unhas e técnicas de nail art personalizadas.", whatsapp: "5585991340823" },
        { service: "manicure-a-domicilio", name: "Fernanda Almeida", age: 42, stars: "⭐⭐⭐", comment: "Esmaltação clássica e cuidados com cutículas.", whatsapp: "5585991340824" },
        { service: "manicure-a-domicilio", name: "Gabriela Pereira", age: 39, stars: "⭐⭐⭐⭐", comment: "Especialista em francesinha e técnicas de spa para mãos.", whatsapp: "5585991340825" },
        { service: "manicure-a-domicilio", name: "Helena Rocha", age: 36, stars: "⭐⭐⭐⭐⭐", comment: "Tratamentos naturais para fortalecimento das unhas.", whatsapp: "5585991340826" },
        { service: "manicure-a-domicilio", name: "Isabela Lima", age: 41, stars: "⭐⭐⭐⭐", comment: "Unhas minimalistas, com detalhes delicados e sofisticados.", whatsapp: "5585991340827" },
        { service: "manicure-a-domicilio", name: "Larissa Nunes", age: 35, stars: "⭐⭐⭐⭐", comment: "Aplicação de esmaltes hipoalergênicos e técnicas modernas.", whatsapp: "5585991340828" },
        { service: "manicure-a-domicilio", name: "Tatiane Silva", age: 44, stars: "⭐⭐⭐", comment: "Aplicação de esmaltes hipoalergênicos e técnicas modernas.", whatsapp: "5585991340828" },
    
        //Designer 💅✨
        { service: "designer", name: "Mondesson Linardis", age: 29, stars: "⭐⭐⭐⭐", comment: "3 anos de experiência em design e redes sociais, tenho uma gráfica há 5 meses.", whatsapp: "5585991774021" },
    
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
            <a class="whatsapp-button" href="https://wa.me/${professional.whatsapp}" target="_blank">
                Contato via WhatsApp
            </a>
        `;

        mainContainer.appendChild(card);
    });
});