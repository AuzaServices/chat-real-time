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

    // 🔄 Implementação para o botão "Voltar" desaparecer ao rolar e reaparecer quando parar
    const voltarButton = document.getElementById("voltarButton");

    if (voltarButton) {
        let isScrolling;

        window.addEventListener("scroll", function () {
            voltarButton.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out";
            voltarButton.style.opacity = "0";
            voltarButton.style.transform = "translateY(20px)";

            clearTimeout(isScrolling);
            isScrolling = setTimeout(function () {
                voltarButton.style.opacity = "1";
                voltarButton.style.transform = "translateY(0)";
            }, 1000);
        });
    }

    // **Lista de profissionais**
    const professionals = [

        //AuzaPoli
        { id: 1, service: "auzapoli", name: "Fagner Lucena", age: 47, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Eletricista, Bombeiro Hidráulico, Manutenção Predial", whatsapp: "558598581919" },

        //Pedreiro 🧱🔨
        { id: 2, service: "pedreiro", name: "Leonardo", age: 28, city: "Fortaleza - CE", stars: "⭐⭐", comment: "Pedreiro, Mestre de obra profissional. Entendo de projetos.", whatsapp: "5585988559085" },
        { id: 3, service: "pedreiro", name: "Edilcimar Frazão", age: 53, city: "Fortaleza - CE", stars: "⭐⭐", comment: "Área de acabamento da constr. civil, PVC, Gesso, Porcel/Cerâmica.", whatsapp: "5585992363266" },
        { id: 4, service: "pedreiro", name: "Alberto", age: 33, city: "Fortaleza - CE", stars: "⭐⭐", comment: "Área de Construção. Dedicação, Qualidade e Compromisso", whatsapp: "5585994312887" },
        { id: 5, service: "pedreiro", name: "Adonias", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável. Serviços em Geral", whatsapp: "5585992726761" },
        { id: 6, service: "pedreiro", name: "Charles Gomes", age: 47, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "5 anos de experiência na área", whatsapp: "5585997225537" },
        //
        { id: 7, service: "pedreiro", name: "Ricardo Mendes", age: 44, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em reformas rápidas.", whatsapp: "558599340656" },
        { id: 8, service: "pedreiro", name: "Lucas Oliveira", age: 35, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Muito detalhista e eficiente.", whatsapp: "558599340657" },
        { id: 9, service: "pedreiro", name: "José Lima", age: 47, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "558599134068" },
        { id: 10, service: "pedreiro", name: "Marcelo Nunes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em grandes projetos.", whatsapp: "558599140659" },
        { id: 11, service: "pedreiro", name: "Rafael Costa", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Ótima comunicação e execução de obra.", whatsapp: "558599140660" },


        //Servente 🏗️ 
        { id: 12, name: "Micael Souza", service: "servente", age: 18, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Ajudante de Pedreiro.", whatsapp: "5585921741466" },
        //
        { id: 13, service: "servente", name: "Eduardo Lima", age: 28, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Sempre disponível para ajudar.", whatsapp: "55851340672" },
        { id: 14, service: "servente", name: "Gabriel Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Responsável e organizado.", whatsapp: "55859913406" },
        { id: 15, service: "servente", name: "Ricardo Souza", age: 29, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Execução rápida e precisa.", whatsapp: "55859913404" },
        { id: 16, service: "servente", name: "Matheus Oliveira", age: 32, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência na área de construção.", whatsapp: "55891340675" },
        { id: 17, service: "servente", name: "Felipe Mendes", age: 27, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Trabalho de qualidade e dedicação.", whatsapp: "55859913406" },
        { id: 18, service: "servente", name: "Thiago Ferreira", age: 33, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Muito ágil na preparação dos materiais.", whatsapp: "55859340677" },
        { id: 19, service: "servente", name: "Lucas Nunes", age: 31, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Sempre comprometido com o trabalho.", whatsapp: "55851340678" },
        { id: 20, service: "servente", name: "Pedro Silva", age: 26, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo suporte aos pedreiros.", whatsapp: "55859913406" },
        { id: 21, service: "servente", name: "Vinícius Ramos", age: 34, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo suporte aos pedreiros.", whatsapp: "55859913406" },
        
        //Bombeiro Hidráulico 💧
        { id: 22, service: "bombeiro-hidraulico", name: "Marcilano Costa", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Vazamentos, limpeza de caixa d'água e desentupimentos.", whatsapp: "5585992531487" },
        //
        { id: 23, service: "bombeiro-hidraulico", name: "Carlos Nogueira", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiente em instalações de água e esgoto.", whatsapp: "55851340682" },
        { id: 24, service: "bombeiro-hidraulico", name: "Eduardo Ferreira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Bom trabalho com manutenções emergenciais.", whatsapp: "55859940683" },
        { id: 25, service: "bombeiro-hidraulico", name: "Renato Costa", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ágil e eficiente em instalações prediais.", whatsapp: "55859913484" },
        { id: 26, service: "bombeiro-hidraulico", name: "Fernando Oliveira", age: 36, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Execução precisa em tubulações de água.", whatsapp: "55859940685" },
        { id: 27, service: "bombeiro-hidraulico", name: "Luciano Mendes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Profissional dedicado e detalhista.", whatsapp: "5585990686" },
        { id: 28, service: "bombeiro-hidraulico", name: "Gustavo Ramos", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "55859910687" },
        { id: 29, service: "bombeiro-hidraulico", name: "Marcos Lima", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Perito em redes hidráulicas e pressurização.", whatsapp: "55891340688" },
        { id: 30, service: "bombeiro-hidraulico", name: "Vinícius Silva", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento rápido e eficiente.", whatsapp: "55859913406" },
        { id: 31, service: "bombeiro-hidraulico", name: "Rodrigo Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "55859910687" },
        
        //Pintores 🎨
        { id: 32, service: "pintor", name: "Luis Carlos", age: 34, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Pintura simples, em gesso, Reparo em pintura, pinturas em geral", whatsapp: "5585991757150" },
        { id: 33, service: "pintor", name: "Daniel Souza", age: 27, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "2 anos na função de pintura e manutenção de serviços.", whatsapp: "5585994148055" },
        //
        { id: 34, service: "pintor", name: "Marcos Oliveira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Bom custo-benefício e rapidez.", whatsapp: "55859913403" },
        { id: 35, service: "pintor", name: "Ricardo Lima", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em técnicas avançadas de pintura.", whatsapp: "55991340694" },
        { id: 36, service: "pintor", name: "Fernando Souza", age: 36, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Excelência em pintura decorativa.", whatsapp: "55851340695" },
        { id: 37, service: "pintor", name: "Leonardo Mendes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima aplicação de tintas especiais.", whatsapp: "55859940696" },
        { id: 38, service: "pintor", name: "Gustavo Ramos", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho limpo e bem organizado.", whatsapp: "55859913407" },
        { id: 39, service: "pintor", name: "Matheus Silva", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Qualidade garantida em pintura interna e externa.", whatsapp: "55851340698" },
        { id: 40, service: "pintor", name: "Vinícius Costa", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Detalhista e comprometido com prazos.", whatsapp: "55859913699" },
        { id: 41, service: "pintor", name: "Rodrigo Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Detalhista e comprometido com prazos.", whatsapp: "55859913406" },
        { id: 42, service: "pintor", name: "José Antunes", age: 43, city: "Horizonte - CE", stars: "⭐", comment: "Detalhista", whatsapp: "55859913409" },
        
        //Capinadores 🌿
        { id: 42, service: "capinador", name: "Adriano Costa", age: 31, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Tenho experiência na área.", whatsapp: "5585992318130" },
        //
        { id: 43, service: "capinador", name: "Bruno Oliveira", age: 42, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho eficiente na remoção de vegetação.", whatsapp: "55859913407" },
        { id: 44, service: "capinador", name: "Carlos Mendes", age: 36, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Ótimo para manutenção de espaços agrícolas.", whatsapp: "55859913403" },
        { id: 45, service: "capinador", name: "Daniel Costa", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em limpeza de terrenos urbanos.", whatsapp: "55859913404" },
        { id: 46, service: "capinador", name: "Eduardo Nunes", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Rápido e eficiente na capinação de grandes áreas.", whatsapp: "55851340705" },
        { id: 47, service: "capinador", name: "Felipe Ramos", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "55859913407" },
        { id: 48, service: "capinador", name: "Gabriel Silva", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Sempre comprometido com a qualidade do serviço.", whatsapp: "55859340707" },
        { id: 49, service: "capinador", name: "Henrique Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em áreas de difícil acesso.", whatsapp: "55991340708" },
        { id: 50, service: "capinador", name: "Igor Ferreira", age: 37, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para manutenção frequente.", whatsapp: "55859913709" },
        { id: 51, service: "capinador", name: "João Nunes", age: 45, city: "Horizonte - CE", stars: "⭐", comment: "Ótima opção para manutenção frequente.", whatsapp: "55851340709" },
        
        //Eletricistas ⚡
        { id: 52, service: "eletricista", name: "Roberto Evangelista", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência na área de Eletricidade.", whatsapp: "5585981737165" },
        { id: 53, service: "eletricista", name: "Marcelo Lima", age: 30, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Eletricista Residencial e Predial.", whatsapp: "5585992726101" },
        //
        { id: 54, service: "eletricista", name: "Carlos Mendes", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiência em circuitos e sistemas elétricos.", whatsapp: "551340713" },
        { id: 55, service: "eletricista", name: "Diego Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Instalações industriais e comerciais.", whatsapp: "55851340714" },
        { id: 56, service: "eletricista", name: "Fernando Costa", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Reparos elétricos rápidos e seguros.", whatsapp: "55859913405" },
        { id: 57, service: "eletricista", name: "Gustavo Pereira", age: 43, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiência com sistemas de energia renovável.", whatsapp: "55859940716" },
        { id: 58, service: "eletricista", name: "Henrique Rocha", age: 38, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em instalações elétricas complexas.", whatsapp: "55891340717" },
        { id: 59, service: "eletricista", name: "José Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Segurança e eficiência na manutenção elétrica.", whatsapp: "55859913407" },
        { id: 60, service: "eletricista", name: "Ricardo Nunes", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "55859913419" },
        { id: 61, service: "eletricista", name: "Thiago Silva", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "55859940719" },
        
        //Montadores de Móveis 🛠️
        { id: 62, service: "montador-de-moveis", name: "Naldo", age: 51, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "29 anos de experiência na área. Experiência com móveis de loja.", whatsapp: "5585992038039" }, 
        { id: 63, service: "montador-de-moveis", name: "Felipe Araújo", age: 30, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Montagens em Geral.", whatsapp: "5588920007471" },
        { id: 64, service: "montador-de-moveis", name: "Robson", age: 27, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "9 anos de Experiência na área.", whatsapp: "5585994050965" },
        { id: 65, service: "montador-de-moveis", name: "Bergson Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "18 anos de experiência. Atendo em Fortaleza e Regiões metropolitanas", whatsapp: "5585994316980" },
        //
        { id: 66, service: "montador-de-moveis", name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Montagem profissional e organização impecável.", whatsapp: "55851340725" },
        { id: 67, service: "montador-de-moveis", name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "55859913407" },
        { id: 68, service: "montador-de-moveis", name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com todos os tipos de móveis.", whatsapp: "55851340727" },
        { id: 69, service: "montador-de-moveis", name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Precisão na montagem e ajustes personalizados.", whatsapp: "55859940728" },
        { id: 70, service: "montador-de-moveis", name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Montagem ágil sem erros.", whatsapp: "55859913409" },
        { id: 71, service: "montador-de-moveis", name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com todos os tipos de móveis.", whatsapp: "55859913407" },

        //Mudanças e Carretos 🚛📦
        { id: 72, service: "mudanças-e-carretos", name: "Marcio", age: 45, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Fretes rápidos e seguros para qualquer destino.", whatsapp: "5585991979580" },
        { id: 73, service: "mudanças-e-carretos", name: "Fernando", age: 52, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Transporte de cargas com total cuidado e eficiência.", whatsapp: "5585991450130" },
        { id: 74, service: "mudanças-e-carretor", name: "Duilio", age: 48, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em mudanças.", whatsapp: "5585992767286" },
        { id: 75, service: "mudanças-e-carretos", name: "Vinicius", age: 26, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Frete residencial com atendimento ágil.", whatsapp: "5585992324911" },
        { id: 76, service: "mudanças-e-carretos", name: "Primo Fretes", age: 54, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Serviço confiável.", whatsapp: "5585991557742" },
        { id: 77, service: "mudanças-e-carretos", name: "Cristiano", age: 47, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Carregamento seguro e entrega rápida.", whatsapp: "5585992962940" },
        //
        { id: 78, service: "mudanças-e-carretos", name: "Henrique Rocha", age: 41, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Motorista experiente em rotas urbanas e rurais.", whatsapp: "55859913737" },
        { id: 79, service: "mudanças-e-carretos", name: "José Lima", age: 44, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento pontual e profissional.", whatsapp: "55859913407" },
        { id: 80, service: "mudanças-e-carretos", name: "Ricardo Nunes", age: 40, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em transporte de mercadorias frágeis.", whatsapp: "55859940739" },
        { id: 81, service: "mudanças-e-carretos", name: "Thiago Silva", age: 46, city: "Horizonte - CE", stars: "⭐⭐", comment: "Especialista em transporte de mercadorias frágeis.", whatsapp: "55851340739" },
            
        //Diaristas 🧹
        { id: 82, service: "faxineira", name: "Andreza Lima", age: 28, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Experiênte em limpezas detalhadas, pontual e organizada.", whatsapp: "5585992333281" },
        { id: 83, service: "faxineira", name: "Alexandra Reis", age: 31, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Tenho experiência como Diarista á anos com competência", whatsapp: "5585992460837" },
        { id: 84, service: "faxineira", name: "Andrea Carneiro", age: 42, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "6 anos de experiência", whatsapp: "5585989282316" },
        { id: 85, service: "faxineira", name: "Daniele Ribeiro", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Bastante experiência na área", whatsapp: "5585991738251" },
        { id: 86, service: "faxineira", name: "Emília Costa", age: 39, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Tenho experiência na área.", whatsapp: "5585989506095" },
        { id: 87, service: "faxineira", name: "Emanuele Pereira", age: 46, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "10 anos de experiência em faxinas.", whatsapp: "5575998229065" },
        //
        { id: 88, service: "faxineira", name: "Gabriela Silva", age: 41, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Organização e atenção aos detalhes.", whatsapp: "55859340747" },
        { id: 89, service: "faxineira", name: "Helena Lima", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Profissional dedicada e comprometida.", whatsapp: "55859940748" },
        { id: 90, service: "faxineira", name: "Isabela Ferreira", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para limpeza profunda.", whatsapp: "55859913749" },
        { id: 91, service: "faxineira", name: "Juliana Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para limpeza profunda.", whatsapp: "55859913407" },
        
        //Vidraceiro 🔨🪟
        { id: 92, service: "vidraceiro", name: "André Sousa", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Instalação de vidros temperados e laminados.", whatsapp: "55851340751" },
        { id: 93, service: "vidraceiro", name: "Bruno Ferreira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho impecável em box e janelas.", whatsapp: "55859913452" },
        { id: 94, service: "vidraceiro", name: "Carlos Mendes", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em vidros decorativos e estruturais.", whatsapp: "55859940753" },
        { id: 95, service: "vidraceiro", name: "Diego Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Montagem precisa e acabamento fino.", whatsapp: "55859913407" },
        { id: 96, service: "vidraceiro", name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho detalhado e resistência garantida.", whatsapp: "55859340755" },
        { id: 97, service: "vidraceiro", name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em portas de vidro e espelhos.", whatsapp: "55859913407" },
        { id: 98, service: "vidraceiro", name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em fechamento de sacadas e fachadas.", whatsapp: "55851340757" },
        { id: 99, service: "vidraceiro", name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Instalação segura e eficiente.", whatsapp: "55859913407" },
        { id: 100, service: "vidraceiro", name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para projetos personalizados.", whatsapp: "55859913759" },
        { id: 101, service: "vidraceiro", name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para projetos personalizados.", whatsapp: "55859910759" },
                
        //Churrasqueiro🔥🍖
        { id: 102, service: "churrasqueiro", name: "Anderson Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em churrasco tradicional e cortes nobres.", whatsapp: "55859913461" },
        { id: 103, service: "churrasqueiro", name: "Bruno Ferreira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Churrasco com sabor único e tempero especial.", whatsapp: "55859910762" },
        { id: 104, service: "churrasqueiro", name: "Carlos Yuri", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em eventos e festas.", whatsapp: "55859913407" },
        { id: 105, service: "churrasqueiro", name: "Diego Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Técnicas avançadas de grelhados.", whatsapp: "55859913404" },
        { id: 106, service: "churrasqueiro", name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Carnes sempre no ponto perfeito.", whatsapp: "55859913765" },
        { id: 107, service: "churrasqueiro", name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento especial para grandes churrascos.", whatsapp: "55859913407" },
        { id: 108, service: "churrasqueiro", name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cortes argentinos e uruguaios.", whatsapp: "55859913467" },
        { id: 109, service: "churrasqueiro", name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Tempero secreto e qualidade garantida.", whatsapp: "55859913768" },
        { id: 110, service: "churrasqueiro", name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo atendimento e carnes selecionadas.", whatsapp: "55859910769" },
        { id: 111, service: "churrasqueiro", name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo atendimento e carnes selecionadas.", whatsapp: "55859940769" },
            
        //Piscineiro 💦🏊‍♂️
        { id: 112, service: "piscineiro", name: "Marcos Vinicius", age: 45, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em manutenção e tratamento de piscinas.", whatsapp: "55859913400" },
        { id: 113, service: "piscineiro", name: "Lucas Oliveira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza completa e cuidados com produtos químicos.", whatsapp: "55851340831" },
        { id: 114, service: "piscineiro", name: "Fernando Silva", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em piscinas residenciais e comerciais.", whatsapp: "55859940832" },
        { id: 115, service: "piscineiro", name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Verificação de filtros e sistemas de bombeamento.", whatsapp: "55859940833" },
        { id: 116, service: "piscineiro", name: "Diego Rocha", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Tratamento especializado contra algas e bactérias.", whatsapp: "55859340834" },
        { id: 117, service: "piscineiro", name: "Rafael Lima", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Teste e equilíbrio do pH da água.", whatsapp: "55859913408" },
        { id: 118, service: "piscineiro", name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Instalação e manutenção de aquecedores de piscina.", whatsapp: "55859910836" },
        { id: 119, service: "piscineiro", name: "João Nunes", age: 43, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Reparos em azulejos e revestimentos.", whatsapp: "55859940837" },
        { id: 120, service: "piscineiro", name: "Pedro Almeida", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza de bordas e áreas externas.", whatsapp: "55859913408" },
        { id: 121, service: "piscineiro", name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Limpeza de bordas e áreas externas.", whatsapp: "55859913408" },
            
        // Técnico em Refrigeração ❄️💨
        { id: 122, service: "tecnico-em-refrigeracao", name: "Maycon", age: 22, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Experiência de 2 anos, trabalho com máquinas Split, piso teto e Cassete.", whatsapp: "5585994088415" },
        { id: 123, service: "tecnico-em-refrigeracao", name: "Matheus Alves", age: 21, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "4 anos de Exp. na área de Ar Condicionado. Split e Máquinas de lavar.", whatsapp: "5585992081178" },
        { id: 124, service: "tecnico-em-refrigeracao", name: "Adriano", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Mecânico de ar condicionado instalação, manutenção e conserto.", whatsapp: "5585991368616" },
        //
        { id: 125, service: "tecnico-em-refrigeracao", name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção preventiva de equipamentos de refrigeração.", whatsapp: "55851340783" },
        { id: 126, service: "tecnico-em-refrigeracao", name: "Diego Rocha", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em gás refrigerante e carga térmica.", whatsapp: "55891340784" },
        { id: 127, service: "tecnico-em-refrigeracao", name: "Rafael Lima", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Instalação de sistemas split e central de ar.", whatsapp: "55859913407" },
        { id: 128, service: "tecnico-em-refrigeracao", name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção corretiva para equipamentos industriais.", whatsapp: "55859340786" },
        { id: 129, service: "tecnico-em-refrigeracao", name: "João Nunes", age: 43, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Diagnóstico de falhas e eficiência energética.", whatsapp: "55851340787" },
        { id: 130, service: "tecnico-em-refrigeracao", name: "Pedro Almeida", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "55859940788" },
        { id: 131, service: "tecnico-em-refrigeracao", name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "55859913407" },
                
        // Metalúrgico 🔩⚙️
        { id: 132, service: "metalurgico", name: "Gabriel", age: 35, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em fabricação de peças metálicas sob medida.", whatsapp: "5585992768448" },
        //
        { id: 133, service: "metalurgico", name: "Lucas Oliveira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em soldagem e corte industrial.", whatsapp: "55859913407" },
        { id: 134, service: "metalurgico", name: "Fernando Silva", age: 42, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalha com fundição e tratamento térmico de metais.", whatsapp: "55859940792" },
        { id: 135, service: "metalurgico", name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em corte a plasma e moldagem de aço.", whatsapp: "5991340793" },
        { id: 136, service: "metalurgico", name: "Diego Rocha", age: 39, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Montagem e manutenção de estruturas metálicas.", whatsapp: "55859910794" },
        { id: 137, service: "metalurgico", name: "Rafael Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Tratamento superficial e acabamento de metais.", whatsapp: "55859913407" },
        { id: 138, service: "metalurgico", name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Soldagem MIG, TIG e elétrica para projetos industriais.", whatsapp: "55859940796" },
        { id: 139, service: "metalurgico", name: "João Nunes", age: 43, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Fundição de metais não ferrosos e técnicas avançadas.", whatsapp: "55859340797" },
        { id: 140, service: "metalurgico", name: "Pedro Almeida", age: 35, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em corte laser e estampagem.", whatsapp: "55859913407" },
        { id: 141, service: "metalurgico", name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Reparo e manutenção de componentes metálicos.", whatsapp: "55859913407" },
                
        // Cuidador de Animais 🐶🐱
        { id: 142, service: "cuidador-de-animais", name: "Ana Souza", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cuidados e alimentação de pets.", whatsapp: "55859910800" },
        { id: 143, service: "cuidador-de-animais", name: "Antônia Almeida", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Passeios e entretenimento para cães e gatos.", whatsapp: "55859913401" },
        { id: 144, service: "cuidador-de-animais", name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Excelência no trato com animais de todas as idades.", whatsapp: "55859910802" },
        { id: 145, service: "cuidador-de-animais", name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com cuidados especiais e administração de medicamentos.", whatsapp: "55859940803" },
        { id: 146, service: "cuidador-de-animais", name: "Fernanda Almeida", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Treinamento básico e socialização de filhotes.", whatsapp: "55859913804" },
        { id: 147, service: "cuidador-de-animais", name: "Gabriela Pereira", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Higiene e banho de pets com técnicas especializadas.", whatsapp: "55859913405" },
                
        //Cabeleireiro a Domicilio ✂️💖
        { id: 148, service: "cabeleireiro-a-domicilio", name: "Francisco Romario", age: 31, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "3 anos de Experiência", whatsapp: "5585987494767" },
        //
        { id: 149, service: "cabeleireiro-a-domicilio", name: "Bruna Costa", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e reconstrução capilar.", whatsapp: "55859913401" },
        { id: 150, service: "cabeleireiro-a-domicilio", name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em penteados para eventos e casamentos.", whatsapp: "55891340812" },
        { id: 151, service: "cabeleireiro-a-domicilio", name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Cortes personalizados e estilo exclusivo.", whatsapp: "55859913813" },
        { id: 152, service: "cabeleireiro-a-domicilio", name: "Fernanda Almeida", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Tratamentos naturais para cabelos danificados.", whatsapp: "55859913404" },

        // Manicure a Domicílio 💅✨
        { id: 153, service: "manicure-a-domicilio", name: "Renata Rodrigues", age: 31, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "4 anos de experiência da área", whatsapp: "5585992272181" },
        //
        { id: 154, service: "manicure-a-domicilio", name: "Bruna Costa", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e cuidado especial para as unhas.", whatsapp: "55859913408" },
        { id: 155, service: "manicure-a-domicilio", name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Experiência em unhas de gel, acrílico e fibra de vidro.", whatsapp: "55859913408" },
        { id: 156, service: "manicure-a-domicilio", name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Alongamento de unhas e técnicas de nail art personalizadas.", whatsapp: "55859340823" },

        // Designer 🎨✨
        { id: 157, service: "designer", name: "Mondesson Linardis", age: 29, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "3 anos de experiência em design e redes sociais, tenho uma gráfica há 5 meses.", whatsapp: "5585991774021" },
        { id: 158, service: "designer", name: "Mateus Santos", age: 26, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência como designer na grafica Connect.com e designer Autônomo á 5 anos.", whatsapp: "5585992975877" },

        // Adestamento
        { id: 159, service: "adestramento", name: "César Freire", age: 41, city: "Aquiraz - CE", stars: "⭐⭐⭐⭐", comment: "Adestrador de cães há 10 anos. Hospedagem, Taxi Dog, DayCare/Creche", whatsapp: "5585991661174" },
         
        //Marceneiro
        { id: 160, service: "marceneiro", name: "Halison Santos", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "A mais de 12 anos ná área de Móveis Planejados", whatsapp: "5585991893493" },

        //Chaveiro
        { id: 161, service: "chaveiro", name: "André Batista", age: 50, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "10 anos de chaveiro / Técnico Mecânico", whatsapp: "5585992438122" },
   
        //Costureira  

    ];


    // **Defina os profissionais destacados**
    const highlightedProfessionals = ["Mateus Santos","Bruna Costa","Carlos Costa","Ana Souza","Lucas Oliveira","André Souza","Diego Rocha","Marcos Vinicius","Bruno Ferreira","Carlos Mendes","Eduarda Nunes","Fernanda Ramos","Gustavo Ramos","Diego Martins","Carlos Nogueira","José Lima"]; // Adicione os nomes dos profissionais que devem ser destacados

    const filteredProfessionals = professionals.filter(professional => professional.service === selectedService);

if (filteredProfessionals.length === 0) {
    
    mainContainer.innerHTML = `
<div style="margin-left: 61px; text-align: center; max-width: 350px; position: relative; top: -100px;">
    <img src="css/imagens/lupa.png" alt="Busca" style="width: 80px; height: 80px; position: relative; top: -10px;">
    <p class="no-wrap-text" style="color: darkred; position: relative; top: -15px;">Nenhum profissional cadastrado.</p>
</div>
    `;
    return;
}

mainContainer.innerHTML = "";

filteredProfessionals.forEach(professional => {
    const card = document.createElement("div");

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
<a class="whatsapp-button"
   href="${whatsappLink}"
   target="_blank"
   data-id="${professional.id}"
   data-nome="${professional.name}"> <!-- ✅ Certifique-se de que esse atributo existe -->
   Contato via WhatsApp
</a>
    `;

    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
        const professionalName = encodeURIComponent(professional.name);
        window.open(`profissional.html?name=${professionalName}`, "_blank");
    });

    // ✅ Captura o ID e o nome corretamente agora!
    const whatsappButton = card.querySelector(".whatsapp-button");
    whatsappButton.addEventListener("click", function (event) {
        event.stopPropagation();

        const profissionalId = whatsappButton.getAttribute("data-id");
        const nomeProfissional = whatsappButton.getAttribute("data-nome"); // ✅ Agora pega o nome corretamente!
        

    fetch("https://clientes-fhfe.onrender.com/api/click", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            profissionalId: profissionalId, 
            nomeProfissional: nomeProfissional 
        })
    })
    .then(response => response.json())
    .then(data => console.log("✅ Resposta do servidor:", data))
    .catch(err => console.error("🚨 Erro ao registrar clique:", err));

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
    const mainContainer = document.querySelector(".grid-container");
    mainContainer.innerHTML = ""; // 🔥 Remove qualquer texto inicial
});

window.addEventListener("load", function () {
    const voltarButton = document.getElementById("voltarButton");
    voltarButton.style.visibility = "visible";
    voltarButton.style.opacity = "1"; // 🔥 Agora aparece corretamente estilizado
});