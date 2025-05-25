document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("selectedService")) {
        window.location.href = "index.html";
        return;
    }

    const mainContainer = document.querySelector(".grid-container");
    const selectedService = localStorage.getItem("selectedService");

    if (!selectedService) {
        mainContainer.innerHTML = "<p>Nenhum serviço selecionado. <a href='index.html'>Voltar</a></p>";
        return;
    }

    const footer = document.querySelector("footer");
    if (footer) {
        footer.parentNode.removeChild(footer);
    }

    // **Lista de profissionais**
    const professionals = [

        //Pedreiro 🧱🔨
        { service: "pedreiro", name: "Leonardo", age: 28, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Pedreiro, Mestre de obra profissional. Entendo de projetos.", whatsapp: "5585988559085" },
        { service: "pedreiro", name: "Edilcimar Frazão", age: 53, city: "Fortaleza - CE", stars: "⭐⭐", comment: "Área de acabamento da constr. civil, PVC, Gesso, Porcel/Cerâmica.", whatsapp: "5585992363266" },
        { service: "pedreiro", name: "Alberto", age: 33, city: "Fortaleza - CE", stars: "⭐⭐", comment: "Área de Construção. Dedicação, Qualidade e Compromisso", whatsapp: "5585994312887" },
        { service: "pedreiro", name: "Adonias", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável. Serviços em Geral", whatsapp: "5585992726761" },
        //
        { service: "pedreiro", name: "Paulo Souza", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Bom acabamento e rapidez.", whatsapp: "558599134065" },
        { service: "pedreiro", name: "Ricardo Mendes", age: 44, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em reformas rápidas.", whatsapp: "558599340656" },
        { service: "pedreiro", name: "Lucas Oliveira", age: 35, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Muito detalhista e eficiente.", whatsapp: "558599340657" },
        { service: "pedreiro", name: "José Lima", age: 47, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "558599134068" },
        { service: "pedreiro", name: "Marcelo Nunes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em grandes projetos.", whatsapp: "558599140659" },
        { service: "pedreiro", name: "Rafael Costa", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Ótima comunicação e execução de obra.", whatsapp: "558599140660" },


        //Servente 🏗️ 
        { service: "servente", name: "André Santos", age: 30, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ágil e eficiente na obra.", whatsapp: "5585991340671" },
        { service: "servente", name: "Eduardo Lima", age: 28, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Sempre disponível para ajudar.", whatsapp: "5585991340672" },
        { service: "servente", name: "Gabriel Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Responsável e organizado.", whatsapp: "5585991340673" },
        { service: "servente", name: "Ricardo Souza", age: 29, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Execução rápida e precisa.", whatsapp: "5585991340674" },
        { service: "servente", name: "Matheus Oliveira", age: 32, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência na área de construção.", whatsapp: "5585991340675" },
        { service: "servente", name: "Felipe Mendes", age: 27, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Trabalho de qualidade e dedicação.", whatsapp: "5585991340676" },
        { service: "servente", name: "Thiago Ferreira", age: 33, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Muito ágil na preparação dos materiais.", whatsapp: "5585991340677" },
        { service: "servente", name: "Lucas Nunes", age: 31, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Sempre comprometido com o trabalho.", whatsapp: "5585991340678" },
        { service: "servente", name: "Pedro Silva", age: 26, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo suporte aos pedreiros.", whatsapp: "5585991340679" },
        { service: "servente", name: "Vinícius Ramos", age: 34, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo suporte aos pedreiros.", whatsapp: "5585991340679" },
        
        //Bombeiro Hidráulico 💧
        { service: "bombeiro-hidraulico", name: "Alberto Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em encanamentos e reparos hidráulicos.", whatsapp: "5585991340681" },
        { service: "bombeiro-hidraulico", name: "Carlos Nogueira", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiente em instalações de água e esgoto.", whatsapp: "5585991340682" },
        { service: "bombeiro-hidraulico", name: "Eduardo Ferreira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Bom trabalho com manutenções emergenciais.", whatsapp: "5585991340683" },
        { service: "bombeiro-hidraulico", name: "Renato Costa", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ágil e eficiente em instalações prediais.", whatsapp: "5585991340684" },
        { service: "bombeiro-hidraulico", name: "Fernando Oliveira", age: 36, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Execução precisa em tubulações de água.", whatsapp: "5585991340685" },
        { service: "bombeiro-hidraulico", name: "Luciano Mendes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Profissional dedicado e detalhista.", whatsapp: "5585991340686" },
        { service: "bombeiro-hidraulico", name: "Gustavo Ramos", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "5585991340687" },
        { service: "bombeiro-hidraulico", name: "Marcos Lima", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Perito em redes hidráulicas e pressurização.", whatsapp: "5585991340688" },
        { service: "bombeiro-hidraulico", name: "Vinícius Silva", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento rápido e eficiente.", whatsapp: "5585991340689" },
        { service: "bombeiro-hidraulico", name: "Rodrigo Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "5585991340687" },
        
        //Pintores 🎨
        { service: "pintor", name: "Luis Carlos", age: 34, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Pintura simples, em gesso, Reparo em pintura, pinturas em geral", whatsapp: "5585991757150" },
        //
        { service: "pintor", name: "Antonio Nunes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho impecável e acabamento fino.", whatsapp: "5585991340692" },
        { service: "pintor", name: "Marcos Oliveira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Bom custo-benefício e rapidez.", whatsapp: "5585991340693" },
        { service: "pintor", name: "Ricardo Lima", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em técnicas avançadas de pintura.", whatsapp: "5585991340694" },
        { service: "pintor", name: "Fernando Souza", age: 36, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Excelência em pintura decorativa.", whatsapp: "5585991340695" },
        { service: "pintor", name: "Leonardo Mendes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima aplicação de tintas especiais.", whatsapp: "5585991340696" },
        { service: "pintor", name: "Gustavo Ramos", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho limpo e bem organizado.", whatsapp: "5585991340697" },
        { service: "pintor", name: "Matheus Silva", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Qualidade garantida em pintura interna e externa.", whatsapp: "5585991340698" },
        { service: "pintor", name: "Vinícius Costa", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Detalhista e comprometido com prazos.", whatsapp: "5585991340699" },
        { service: "pintor", name: "Rodrigo Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Detalhista e comprometido com prazos.", whatsapp: "5585991340699" },
        { service: "pintor", name: "José Antunes", age: 43, city: "Horizonte - CE", stars: "⭐", comment: "Detalhista", whatsapp: "55859913409" },
        
        //Capinadores 🌿
        { service: "capinador", name: "Anderson Santos", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em limpeza de terrenos e áreas verdes.", whatsapp: "5585991340701" },
        { service: "capinador", name: "Bruno Oliveira", age: 42, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho eficiente na remoção de vegetação.", whatsapp: "5585991340702" },
        { service: "capinador", name: "Carlos Mendes", age: 36, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Ótimo para manutenção de espaços agrícolas.", whatsapp: "5585991340703" },
        { service: "capinador", name: "Daniel Costa", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em limpeza de terrenos urbanos.", whatsapp: "5585991340704" },
        { service: "capinador", name: "Eduardo Nunes", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Rápido e eficiente na capinação de grandes áreas.", whatsapp: "5585991340705" },
        { service: "capinador", name: "Felipe Ramos", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "5585991340706" },
        { service: "capinador", name: "Gabriel Silva", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Sempre comprometido com a qualidade do serviço.", whatsapp: "5585991340707" },
        { service: "capinador", name: "Henrique Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em áreas de difícil acesso.", whatsapp: "5585991340708" },
        { service: "capinador", name: "Igor Ferreira", age: 37, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para manutenção frequente.", whatsapp: "5585991340709" },
        { service: "capinador", name: "João Nunes", age: 45, city: "Horizonte - CE", stars: "⭐", comment: "Ótima opção para manutenção frequente.", whatsapp: "5585991340709" },
        
        //Eletricistas ⚡
        { service: "eletricista", name: "Roberto Evangelista", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência na área de Eletricidade.", whatsapp: "5585981737165" },
        //
        { service: "eletricista", name: "Bruno Almeida", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção e reparos elétricos eficientes.", whatsapp: "5585991340712" },
        { service: "eletricista", name: "Carlos Mendes", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiência em circuitos e sistemas elétricos.", whatsapp: "5585991340713" },
        { service: "eletricista", name: "Diego Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Instalações industriais e comerciais.", whatsapp: "5585991340714" },
        { service: "eletricista", name: "Fernando Costa", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Reparos elétricos rápidos e seguros.", whatsapp: "5585991340715" },
        { service: "eletricista", name: "Gustavo Pereira", age: 43, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiência com sistemas de energia renovável.", whatsapp: "5585991340716" },
        { service: "eletricista", name: "Henrique Rocha", age: 38, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em instalações elétricas complexas.", whatsapp: "5585991340717" },
        { service: "eletricista", name: "José Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Segurança e eficiência na manutenção elétrica.", whatsapp: "5585991340718" },
        { service: "eletricista", name: "Ricardo Nunes", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "5585991340719" },
        { service: "eletricista", name: "Thiago Silva", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "5585991340719" },
        
        //Montadores de Móveis 🛠️
        { service: "montador-de-moveis", name: "Naldo", age: 51, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "29 anos de experiência na área. Experiência com móveis de loja.", whatsapp: "5585992038039" }, 
        { service: "montador-de-moveis", name: "Felipe Araújo", age: 30, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Montagens em Geral.", whatsapp: "5588920007471" },
        //
        { service: "montador-de-moveis", name: "Carlos", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em móveis residenciais e comerciais.", whatsapp: "5585991340723" },
        { service: "montador-de-moveis", name: "Diego Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo acabamento e dedicação.", whatsapp: "5585991340724" },
        { service: "montador-de-moveis", name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Montagem profissional e organização impecável.", whatsapp: "5585991340725" },
        { service: "montador-de-moveis", name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "5585991340726" },
        { service: "montador-de-moveis", name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com todos os tipos de móveis.", whatsapp: "5585991340727" },
        { service: "montador-de-moveis", name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Precisão na montagem e ajustes personalizados.", whatsapp: "5585991340728" },
        { service: "montador-de-moveis", name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Montagem ágil sem erros.", whatsapp: "5585991340729" },
        { service: "montador-de-moveis", name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com todos os tipos de móveis.", whatsapp: "5585991340727" },
        

        //Mudanças e Carretos 🚛📦
        { service: "mudanças-e-carretos", name: "Marcio", age: 45, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Fretes rápidos e seguros para qualquer destino.", whatsapp: "5585991979580" },
        { service: "mudanças-e-carretos", name: "Fernando", age: 52, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Transporte de cargas com total cuidado e eficiência.", whatsapp: "5585991450130" },
        { service: "mudanças-e-carretor", name: "Duilio", age: 48, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em mudanças.", whatsapp: "5585992767286" },
        { service: "mudanças-e-carretos", name: "Vinicius", age: 26, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Frete residencial com atendimento ágil.", whatsapp: "5585992324911" },
        { service: "mudanças-e-carretos", name: "Primo Fretes", age: 54, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Serviço confiável.", whatsapp: "5585991557742" },
        { service: "mudanças-e-carretos", name: "Cristiano", age: 47, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Carregamento seguro e entrega rápida.", whatsapp: "5585992962940" },
        //
        { service: "mudanças-e-carretos", name: "Henrique Rocha", age: 41, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Motorista experiente em rotas urbanas e rurais.", whatsapp: "5585991340737" },
        { service: "mudanças-e-carretos", name: "José Lima", age: 44, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento pontual e profissional.", whatsapp: "5585991340738" },
        { service: "mudanças-e-carretos", name: "Ricardo Nunes", age: 40, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em transporte de mercadorias frágeis.", whatsapp: "5585991340739" },
        { service: "mudanças-e-carretos", name: "Thiago Silva", age: 46, city: "Horizonte - CE", stars: "⭐⭐", comment: "Especialista em transporte de mercadorias frágeis.", whatsapp: "5585991340739" },
            
        //Diaristas 🧹
        { service: "diarista", name: "Andreza Lima", age: 28, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiênte em limpezas detalhadas, pontual e organizada.", whatsapp: "5585992333281" },
        { service: "diarista", name: "Beatriz Lima", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em casas e escritórios.", whatsapp: "5585991340742" },
        { service: "diarista", name: "Carlos Mendes", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Pontualidade e eficiência garantidas.", whatsapp: "5585991340743" },
        { service: "diarista", name: "Daniela Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em limpezas detalhadas.", whatsapp: "5585991340744" },
        { service: "diarista", name: "Eduarda Nunes", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Cuidadosa com materiais e objetos.", whatsapp: "5585991340745" },
        { service: "diarista", name: "Fernanda Ramos", age: 37, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza rápida e eficiente.", whatsapp: "5585991340746" },
        { service: "diarista", name: "Gabriela Silva", age: 41, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Organização e atenção aos detalhes.", whatsapp: "5585991340747" },
        { service: "diarista", name: "Helena Lima", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Profissional dedicada e comprometida.", whatsapp: "5585991340748" },
        { service: "diarista", name: "Isabela Ferreira", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para limpeza profunda.", whatsapp: "5585991340749" },
        { service: "diarista", name: "Juliana Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para limpeza profunda.", whatsapp: "5585991340749" },
        
        //Vidraceiro 🔨🪟
        { service: "vidraceiro", name: "André Sousa", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Instalação de vidros temperados e laminados.", whatsapp: "5585991340751" },
        { service: "vidraceiro", name: "Bruno Ferreira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho impecável em box e janelas.", whatsapp: "5585991340752" },
        { service: "vidraceiro", name: "Carlos Mendes", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em vidros decorativos e estruturais.", whatsapp: "5585991340753" },
        { service: "vidraceiro", name: "Diego Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Montagem precisa e acabamento fino.", whatsapp: "5585991340754" },
        { service: "vidraceiro", name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho detalhado e resistência garantida.", whatsapp: "5585991340755" },
        { service: "vidraceiro", name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em portas de vidro e espelhos.", whatsapp: "5585991340756" },
        { service: "vidraceiro", name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em fechamento de sacadas e fachadas.", whatsapp: "5585991340757" },
        { service: "vidraceiro", name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Instalação segura e eficiente.", whatsapp: "5585991340758" },
        { service: "vidraceiro", name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para projetos personalizados.", whatsapp: "5585991340759" },
        { service: "vidraceiro", name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para projetos personalizados.", whatsapp: "5585991340759" },
                
        //Churrasqueiro🔥🍖
        { service: "churrasqueiro", name: "Anderson Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em churrasco tradicional e cortes nobres.", whatsapp: "5585991340761" },
        { service: "churrasqueiro", name: "Bruno Ferreira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Churrasco com sabor único e tempero especial.", whatsapp: "5585991340762" },
        { service: "churrasqueiro", name: "Carlos Yuri", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em eventos e festas.", whatsapp: "5585991340763" },
        { service: "churrasqueiro", name: "Diego Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Técnicas avançadas de grelhados.", whatsapp: "5585991340764" },
        { service: "churrasqueiro", name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Carnes sempre no ponto perfeito.", whatsapp: "5585991340765" },
        { service: "churrasqueiro", name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento especial para grandes churrascos.", whatsapp: "5585991340766" },
        { service: "churrasqueiro", name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cortes argentinos e uruguaios.", whatsapp: "5585991340767" },
        { service: "churrasqueiro", name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Tempero secreto e qualidade garantida.", whatsapp: "5585991340768" },
        { service: "churrasqueiro", name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo atendimento e carnes selecionadas.", whatsapp: "5585991340769" },
        { service: "churrasqueiro", name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo atendimento e carnes selecionadas.", whatsapp: "5585991340769" },
            
        //Piscineiro 💦🏊‍♂️
        { service: "piscineiro", name: "Marcos Vinicius", age: 45, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em manutenção e tratamento de piscinas.", whatsapp: "5585991340830" },
        { service: "piscineiro", name: "Lucas Oliveira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza completa e cuidados com produtos químicos.", whatsapp: "5585991340831" },
        { service: "piscineiro", name: "Fernando Silva", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em piscinas residenciais e comerciais.", whatsapp: "5585991340832" },
        { service: "piscineiro", name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Verificação de filtros e sistemas de bombeamento.", whatsapp: "5585991340833" },
        { service: "piscineiro", name: "Diego Rocha", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Tratamento especializado contra algas e bactérias.", whatsapp: "5585991340834" },
        { service: "piscineiro", name: "Rafael Lima", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Teste e equilíbrio do pH da água.", whatsapp: "5585991340835" },
        { service: "piscineiro", name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Instalação e manutenção de aquecedores de piscina.", whatsapp: "5585991340836" },
        { service: "piscineiro", name: "João Nunes", age: 43, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Reparos em azulejos e revestimentos.", whatsapp: "5585991340837" },
        { service: "piscineiro", name: "Pedro Almeida", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza de bordas e áreas externas.", whatsapp: "5585991340838" },
        { service: "piscineiro", name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Limpeza de bordas e áreas externas.", whatsapp: "5585991340838" },
            
        // Técnico em Refrigeração ❄️💨
        { service: "tecnico-em-refrigeracao", name: "Maycon", age: 22, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Experiência de 2 anos, trabalho com máquinas Split, piso teto e Cassete.", whatsapp: "5585994088415" },
        { service: "tecnico-em-refrigeracao", name: "Matheus Alves", age: 21, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "4 anos de Exp. na área de Ar Condicionado. Split e Máquinas de lavar.", whatsapp: "5585992081178" },
        //
        { service: "tecnico-em-refrigeracao", name: "Fernando Silva", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Reparo e limpeza de sistemas de refrigeração comercial.", whatsapp: "5585991340782" },
        { service: "tecnico-em-refrigeracao", name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção preventiva de equipamentos de refrigeração.", whatsapp: "5585991340783" },
        { service: "tecnico-em-refrigeracao", name: "Diego Rocha", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em gás refrigerante e carga térmica.", whatsapp: "5585991340784" },
        { service: "tecnico-em-refrigeracao", name: "Rafael Lima", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Instalação de sistemas split e central de ar.", whatsapp: "5585991340785" },
        { service: "tecnico-em-refrigeracao", name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção corretiva para equipamentos industriais.", whatsapp: "5585991340786" },
        { service: "tecnico-em-refrigeracao", name: "João Nunes", age: 43, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Diagnóstico de falhas e eficiência energética.", whatsapp: "5585991340787" },
        { service: "tecnico-em-refrigeracao", name: "Pedro Almeida", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "5585991340788" },
        { service: "tecnico-em-refrigeracao", name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "5585991340789" },
                
        // Metalúrgico 🔩⚙️
        { service: "metalurgico", name: "Gabriel", age: 35, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em fabricação de peças metálicas sob medida.", whatsapp: "5585992768448" },
        //
        { service: "metalurgico", name: "Lucas Oliveira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em soldagem e corte industrial.", whatsapp: "5585991340791" },
        { service: "metalurgico", name: "Fernando Silva", age: 42, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalha com fundição e tratamento térmico de metais.", whatsapp: "5585991340792" },
        { service: "metalurgico", name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em corte a plasma e moldagem de aço.", whatsapp: "5585991340793" },
        { service: "metalurgico", name: "Diego Rocha", age: 39, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Montagem e manutenção de estruturas metálicas.", whatsapp: "5585991340794" },
        { service: "metalurgico", name: "Rafael Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Tratamento superficial e acabamento de metais.", whatsapp: "5585991340795" },
        { service: "metalurgico", name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Soldagem MIG, TIG e elétrica para projetos industriais.", whatsapp: "5585991340796" },
        { service: "metalurgico", name: "João Nunes", age: 43, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Fundição de metais não ferrosos e técnicas avançadas.", whatsapp: "5585991340797" },
        { service: "metalurgico", name: "Pedro Almeida", age: 35, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em corte laser e estampagem.", whatsapp: "5585991340798" },
        { service: "metalurgico", name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Reparo e manutenção de componentes metálicos.", whatsapp: "5585991340799" },
                
        // Cuidador de Animais 🐶🐱
        { service: "cuidador-de-animais", name: "Ana Souza", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cuidados e alimentação de pets.", whatsapp: "5585991340800" },
        { service: "cuidador-de-animais", name: "Antônia Almeida", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Passeios e entretenimento para cães e gatos.", whatsapp: "5585991340801" },
        { service: "cuidador-de-animais", name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Excelência no trato com animais de todas as idades.", whatsapp: "5585991340802" },
        { service: "cuidador-de-animais", name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com cuidados especiais e administração de medicamentos.", whatsapp: "5585991340803" },
        { service: "cuidador-de-animais", name: "Fernanda Almeida", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Treinamento básico e socialização de filhotes.", whatsapp: "5585991340804" },
        { service: "cuidador-de-animais", name: "Gabriela Pereira", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Higiene e banho de pets com técnicas especializadas.", whatsapp: "5585991340805" },
                
        //Cabeleireiro a Domicilio ✂️💖
        { service: "cabeleireiro-a-domicilio", name: "Anna Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cortes modernos e coloração.", whatsapp: "5585991340810" },
        { service: "cabeleireiro-a-domicilio", name: "Bruna Costa", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e reconstrução capilar.", whatsapp: "5585991340811" },
        { service: "cabeleireiro-a-domicilio", name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em penteados para eventos e casamentos.", whatsapp: "5585991340812" },
        { service: "cabeleireiro-a-domicilio", name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Cortes personalizados e estilo exclusivo.", whatsapp: "5585991340813" },
        { service: "cabeleireiro-a-domicilio", name: "Fernanda Almeida", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Tratamentos naturais para cabelos danificados.", whatsapp: "5585991340814" },

        // Manicure a Domicílio 💅✨
        { service: "manicure-a-domicilio", name: "Ana Souza", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em unhas decoradas e esmaltação profissional.", whatsapp: "5585991340820" },
        { service: "manicure-a-domicilio", name: "Bruna Costa", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e cuidado especial para as unhas.", whatsapp: "5585991340821" },
        { service: "manicure-a-domicilio", name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Experiência em unhas de gel, acrílico e fibra de vidro.", whatsapp: "5585991340822" },
        { service: "manicure-a-domicilio", name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Alongamento de unhas e técnicas de nail art personalizadas.", whatsapp: "5585991340823" },

        // Designer 🎨✨
        { service: "designer", name: "Mondesson Linardis", age: 29, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "3 anos de experiência em design e redes sociais, tenho uma gráfica há 5 meses.", whatsapp: "5585991774021" },

        // Adestamento
        { service: "adestramento", name: "César Freire", age: 41, city: "Aquiraz - CE", stars: "⭐⭐⭐⭐", comment: "Adestrador de cães há 10 anos. Hospedagem, Taxi Dog, DayCare/Creche", whatsapp: "5585991661174" },
        
    ];

    // **Defina os profissionais destacados**
    const highlightedProfessionals = ["Felipe Araújo","Andreza Lima","César Freire","Matheus Alves","Adonias","Roberto Evangelista","Gabriel","Fernando","Cristiano","Marcio","Primo Fretes","Vinicius","Maycon"]; // Adicione os nomes dos profissionais que devem ser destacados

    const filteredProfessionals = professionals.filter(professional => professional.service === selectedService);

if (filteredProfessionals.length === 0) {
    
    mainContainer.innerHTML = `
        <div style="margin-left: 61px; text-align: center; max-width: 350px;">
            <img src="css/lupa.png" alt="Busca" style="width: 80px; height: 80px;">
            <p class="no-wrap-text" style="color: darkred;">Nenhum profissional cadastrado.</p>
        </div>
    `;
    return;
}

    mainContainer.innerHTML = "";

    filteredProfessionals.forEach(professional => {
    const card = document.createElement("div");

    // Verifica se o profissional está na lista de destaques
    if (highlightedProfessionals.includes(professional.name)) {
        card.classList.add("card", "highlighted");
    } else {
        card.classList.add("card");
    }

    const message = "Olá, vim por meio da Auza Services, gostaria de realizar um orçamento de serviço.";
    const whatsappLink = `https://api.whatsapp.com/send?phone=${professional.whatsapp}&text=${encodeURIComponent(message)}`;

    card.innerHTML = `
        <h3 class="${highlightedProfessionals.includes(professional.name) ? 'highlighted-name' : ''}">${professional.name}</h3>
        <p>${professional.city}</p>
        <p>Idade: ${professional.age} anos</p>
        <p>Avaliação: ${professional.stars}</p>
        <p>${professional.comment}</p>
        ${highlightedProfessionals.includes(professional.name) ? '<p class="destaque">Destaque</p>' : ''}
        <a class="whatsapp-button" href="${whatsappLink}" target="_blank">Contato via WhatsApp</a>
    `;

    // 🚀 Adiciona a funcionalidade de clique aqui!
    card.style.cursor = "pointer";
card.addEventListener("click", function () {
    const professionalName = encodeURIComponent(professional.name);
    window.open(`profissional.html?name=${professionalName}`, "_blank");
});

// 🚀 Corrige o problema do botão do WhatsApp sendo ignorado
    const whatsappButton = card.querySelector(".whatsapp-button");
    whatsappButton.addEventListener("click", function (event) {
        event.stopPropagation(); // 🚀 Isso impede que o clique no botão ative o evento do card!
 });


    mainContainer.appendChild(card);
});
        const card = document.createElement("div");


        const message = "Olá, vim por meio da Auza Services, gostaria de realizar um orçamento de serviço.";
        const whatsappLink = `https://api.whatsapp.com/send?phone=${professional.whatsapp}&text=${encodeURIComponent(message)}`;

        card.innerHTML = `
            <h3 class="${highlightedProfessionals.includes(professional.name) ? 'highlighted-name' : ''}">${professional.name}</h3>
            <p>${professional.city}</p>
            <p>Idade: ${professional.age} anos</p>
            <p>Avaliação: ${professional.stars}</p>
            <p>${professional.comment}</p>
            ${highlightedProfessionals.includes(professional.name) ? '<p class="destaque">Destaque</p>' : ''}
            <a class="whatsapp-button" href="${whatsappLink}" target="_blank">Contato via WhatsApp</a>
        `;

        mainContainer.appendChild(card);
    });

document.getElementById("continueButton").addEventListener("click", function() {
    let body = document.getElementById("mainBody");

    // Aplica a classe para remover completamente o fundo
    body.classList.add("no-background");

    // Como segurança extra, remove qualquer fundo diretamente
    body.style.backgroundImage = "none !important";
    body.style.backgroundColor = "white !important";

});

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const servico = params.get("servico"); // Obtém o serviço na URL

    if (servico) {
        // Modifica as meta tags conforme o serviço selecionado
        document.querySelector('meta[property="og:title"]').setAttribute("content", `${servico.charAt(0).toUpperCase() + servico.slice(1)} - Auza Services`);
        document.querySelector('meta[property="og:description"]').setAttribute("content", `Confira os melhores profissionais de ${servico}!`);
        document.querySelector('meta[property="og:image"]').setAttribute("content", `https://i.imgur.com/${servico}.png`); // Personalize a imagem de cada serviço
        document.querySelector('meta[property="og:url"]').setAttribute("content", `https://clientes2.onrender.com/serviços/${servico}.html`);
    }
});

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", function () {
        const professionalService = this.getAttribute("data-service"); // Obtém o serviço do atributo

        if (professionalService) {
            window.location.href = `services.html?servico=${professionalService}`; // 🚀 Agora passa o serviço na URL!
        }
    });
});