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
        { service: "auzapoli", name: "Fagner Lucena", age: 47, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Eletricista, Bombeiro Hidráulico, Manutenção Predial", whatsapp: "558598581919" },

        //Pedreiro 🧱🔨
        { service: "pedreiro", name: "Leonardo", age: 28, city: "Fortaleza - CE", stars: "⭐⭐", comment: "Pedreiro, Mestre de obra profissional. Entendo de projetos.", whatsapp: "5585988559085" },
        { service: "pedreiro", name: "Edilcimar Frazão", age: 53, city: "Fortaleza - CE", stars: "⭐⭐", comment: "Área de acabamento da constr. civil, PVC, Gesso, Porcel/Cerâmica.", whatsapp: "5585992363266" },
        { service: "pedreiro", name: "Alberto", age: 33, city: "Fortaleza - CE", stars: "⭐⭐", comment: "Área de Construção. Dedicação, Qualidade e Compromisso", whatsapp: "5585994312887" },
        { service: "pedreiro", name: "Adonias", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável. Serviços em Geral", whatsapp: "5585992726761" },
        { service: "pedreiro", name: "Charles Gomes", age: 47, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "5 anos de experiência na área", whatsapp: "5585997225537" },
        //
        { service: "pedreiro", name: "Ricardo Mendes", age: 44, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em reformas rápidas.", whatsapp: "558599340656" },
        { service: "pedreiro", name: "Lucas Oliveira", age: 35, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Muito detalhista e eficiente.", whatsapp: "558599340657" },
        { service: "pedreiro", name: "José Lima", age: 47, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "558599134068" },
        { service: "pedreiro", name: "Marcelo Nunes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em grandes projetos.", whatsapp: "558599140659" },
        { service: "pedreiro", name: "Rafael Costa", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Ótima comunicação e execução de obra.", whatsapp: "558599140660" },


        //Servente 🏗️ 
        { service: "servente", name: "André Santos", age: 30, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ágil e eficiente na obra.", whatsapp: "55859913471" },
        { service: "servente", name: "Eduardo Lima", age: 28, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Sempre disponível para ajudar.", whatsapp: "55851340672" },
        { service: "servente", name: "Gabriel Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Responsável e organizado.", whatsapp: "55859913406" },
        { service: "servente", name: "Ricardo Souza", age: 29, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Execução rápida e precisa.", whatsapp: "55859913404" },
        { service: "servente", name: "Matheus Oliveira", age: 32, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência na área de construção.", whatsapp: "55891340675" },
        { service: "servente", name: "Felipe Mendes", age: 27, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Trabalho de qualidade e dedicação.", whatsapp: "55859913406" },
        { service: "servente", name: "Thiago Ferreira", age: 33, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Muito ágil na preparação dos materiais.", whatsapp: "55859340677" },
        { service: "servente", name: "Lucas Nunes", age: 31, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Sempre comprometido com o trabalho.", whatsapp: "55851340678" },
        { service: "servente", name: "Pedro Silva", age: 26, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo suporte aos pedreiros.", whatsapp: "55859913406" },
        { service: "servente", name: "Vinícius Ramos", age: 34, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo suporte aos pedreiros.", whatsapp: "55859913406" },
        
        //Bombeiro Hidráulico 💧
        { service: "bombeiro-hidraulico", name: "Marcilano Costa", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Vazamentos, limpeza de caixa d'água e desentupimentos.", whatsapp: "5585992531487" },
        //
        { service: "bombeiro-hidraulico", name: "Carlos Nogueira", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiente em instalações de água e esgoto.", whatsapp: "55851340682" },
        { service: "bombeiro-hidraulico", name: "Eduardo Ferreira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Bom trabalho com manutenções emergenciais.", whatsapp: "55859940683" },
        { service: "bombeiro-hidraulico", name: "Renato Costa", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ágil e eficiente em instalações prediais.", whatsapp: "55859913484" },
        { service: "bombeiro-hidraulico", name: "Fernando Oliveira", age: 36, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Execução precisa em tubulações de água.", whatsapp: "55859940685" },
        { service: "bombeiro-hidraulico", name: "Luciano Mendes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Profissional dedicado e detalhista.", whatsapp: "5585990686" },
        { service: "bombeiro-hidraulico", name: "Gustavo Ramos", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "55859910687" },
        { service: "bombeiro-hidraulico", name: "Marcos Lima", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Perito em redes hidráulicas e pressurização.", whatsapp: "55891340688" },
        { service: "bombeiro-hidraulico", name: "Vinícius Silva", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento rápido e eficiente.", whatsapp: "55859913406" },
        { service: "bombeiro-hidraulico", name: "Rodrigo Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "55859910687" },
        
        //Pintores 🎨
        { service: "pintor", name: "Luis Carlos", age: 34, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Pintura simples, em gesso, Reparo em pintura, pinturas em geral", whatsapp: "5585991757150" },
        { service: "pintor", name: "Daniel Souza", age: 27, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "2 anos na função de pintura e manutenção de serviços.", whatsapp: "5585994148055" },
        //
        { service: "pintor", name: "Marcos Oliveira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Bom custo-benefício e rapidez.", whatsapp: "55859913403" },
        { service: "pintor", name: "Ricardo Lima", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em técnicas avançadas de pintura.", whatsapp: "55991340694" },
        { service: "pintor", name: "Fernando Souza", age: 36, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Excelência em pintura decorativa.", whatsapp: "55851340695" },
        { service: "pintor", name: "Leonardo Mendes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima aplicação de tintas especiais.", whatsapp: "55859940696" },
        { service: "pintor", name: "Gustavo Ramos", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho limpo e bem organizado.", whatsapp: "55859913407" },
        { service: "pintor", name: "Matheus Silva", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Qualidade garantida em pintura interna e externa.", whatsapp: "55851340698" },
        { service: "pintor", name: "Vinícius Costa", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Detalhista e comprometido com prazos.", whatsapp: "55859913699" },
        { service: "pintor", name: "Rodrigo Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Detalhista e comprometido com prazos.", whatsapp: "55859913406" },
        { service: "pintor", name: "José Antunes", age: 43, city: "Horizonte - CE", stars: "⭐", comment: "Detalhista", whatsapp: "55859913409" },
        
        //Capinadores 🌿
        { service: "capinador", name: "Adriano Costa", age: 31, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Tenho experiência na área.", whatsapp: "5585992318130" },
        //
        { service: "capinador", name: "Bruno Oliveira", age: 42, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho eficiente na remoção de vegetação.", whatsapp: "55859913407" },
        { service: "capinador", name: "Carlos Mendes", age: 36, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Ótimo para manutenção de espaços agrícolas.", whatsapp: "55859913403" },
        { service: "capinador", name: "Daniel Costa", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em limpeza de terrenos urbanos.", whatsapp: "55859913404" },
        { service: "capinador", name: "Eduardo Nunes", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Rápido e eficiente na capinação de grandes áreas.", whatsapp: "55851340705" },
        { service: "capinador", name: "Felipe Ramos", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "55859913407" },
        { service: "capinador", name: "Gabriel Silva", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Sempre comprometido com a qualidade do serviço.", whatsapp: "55859340707" },
        { service: "capinador", name: "Henrique Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em áreas de difícil acesso.", whatsapp: "55991340708" },
        { service: "capinador", name: "Igor Ferreira", age: 37, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para manutenção frequente.", whatsapp: "55859913709" },
        { service: "capinador", name: "João Nunes", age: 45, city: "Horizonte - CE", stars: "⭐", comment: "Ótima opção para manutenção frequente.", whatsapp: "55851340709" },
        
        //Eletricistas ⚡
        { service: "eletricista", name: "Roberto Evangelista", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência na área de Eletricidade.", whatsapp: "5585981737165" },
        { service: "eletricista", name: "Marcelo Lima", age: 30, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Eletricista Residencial e Predial.", whatsapp: "5585992726101" },
        //
        { service: "eletricista", name: "Carlos Mendes", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiência em circuitos e sistemas elétricos.", whatsapp: "551340713" },
        { service: "eletricista", name: "Diego Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Instalações industriais e comerciais.", whatsapp: "55851340714" },
        { service: "eletricista", name: "Fernando Costa", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Reparos elétricos rápidos e seguros.", whatsapp: "55859913405" },
        { service: "eletricista", name: "Gustavo Pereira", age: 43, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiência com sistemas de energia renovável.", whatsapp: "55859940716" },
        { service: "eletricista", name: "Henrique Rocha", age: 38, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em instalações elétricas complexas.", whatsapp: "55891340717" },
        { service: "eletricista", name: "José Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Segurança e eficiência na manutenção elétrica.", whatsapp: "55859913407" },
        { service: "eletricista", name: "Ricardo Nunes", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "55859913419" },
        { service: "eletricista", name: "Thiago Silva", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "55859940719" },
        
        //Montadores de Móveis 🛠️
        { service: "montador-de-moveis", name: "Naldo", age: 51, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "29 anos de experiência na área. Experiência com móveis de loja.", whatsapp: "5585992038039" }, 
        { service: "montador-de-moveis", name: "Felipe Araújo", age: 30, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Montagens em Geral.", whatsapp: "5588920007471" },
        { service: "montador-de-moveis", name: "Robson", age: 27, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "9 anos de Experiência na área.", whatsapp: "5585994050965" },
        { service: "montador-de-moveis", name: "Bergson Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "18 anos de experiência. Atendo em Fortaleza e Regiões metropolitanas", whatsapp: "5585994316980" },
        //
        { service: "montador-de-moveis", name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Montagem profissional e organização impecável.", whatsapp: "55851340725" },
        { service: "montador-de-moveis", name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "55859913407" },
        { service: "montador-de-moveis", name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com todos os tipos de móveis.", whatsapp: "55851340727" },
        { service: "montador-de-moveis", name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Precisão na montagem e ajustes personalizados.", whatsapp: "55859940728" },
        { service: "montador-de-moveis", name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Montagem ágil sem erros.", whatsapp: "55859913409" },
        { service: "montador-de-moveis", name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com todos os tipos de móveis.", whatsapp: "55859913407" },
        

        //Mudanças e Carretos 🚛📦
        { service: "mudanças-e-carretos", name: "Marcio", age: 45, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Fretes rápidos e seguros para qualquer destino.", whatsapp: "5585991979580" },
        { service: "mudanças-e-carretos", name: "Fernando", age: 52, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Transporte de cargas com total cuidado e eficiência.", whatsapp: "5585991450130" },
        { service: "mudanças-e-carretor", name: "Duilio", age: 48, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em mudanças.", whatsapp: "5585992767286" },
        { service: "mudanças-e-carretos", name: "Vinicius", age: 26, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Frete residencial com atendimento ágil.", whatsapp: "5585992324911" },
        { service: "mudanças-e-carretos", name: "Primo Fretes", age: 54, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Serviço confiável.", whatsapp: "5585991557742" },
        { service: "mudanças-e-carretos", name: "Cristiano", age: 47, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Carregamento seguro e entrega rápida.", whatsapp: "5585992962940" },
        //
        { service: "mudanças-e-carretos", name: "Henrique Rocha", age: 41, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Motorista experiente em rotas urbanas e rurais.", whatsapp: "55859913737" },
        { service: "mudanças-e-carretos", name: "José Lima", age: 44, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento pontual e profissional.", whatsapp: "55859913407" },
        { service: "mudanças-e-carretos", name: "Ricardo Nunes", age: 40, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em transporte de mercadorias frágeis.", whatsapp: "55859940739" },
        { service: "mudanças-e-carretos", name: "Thiago Silva", age: 46, city: "Horizonte - CE", stars: "⭐⭐", comment: "Especialista em transporte de mercadorias frágeis.", whatsapp: "55851340739" },
            
        //Diaristas 🧹
        { service: "faxineira", name: "Andreza Lima", age: 28, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Experiênte em limpezas detalhadas, pontual e organizada.", whatsapp: "5585992333281" },
        { service: "faxineira", name: "Alexandra Reis", age: 31, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Tenho experiência como Diarista á anos com competência", whatsapp: "5585992460837" },
        { service: "faxineira", name: "Andrea Carneiro", age: 42, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "6 anos de experiência", whatsapp: "5585989282316" },
        { service: "faxineira", name: "Daniele Ribeiro", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Bastante experiência na área", whatsapp: "5585991738251" },
        { service: "faxineira", name: "Emília Costa", age: 39, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Tenho experiência na área.", whatsapp: "5585989506095" },
        //
        { service: "faxineira", name: "Fernanda Ramos", age: 37, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza rápida e eficiente.", whatsapp: "55859913407" },
        { service: "faxineira", name: "Gabriela Silva", age: 41, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Organização e atenção aos detalhes.", whatsapp: "55859340747" },
        { service: "faxineira", name: "Helena Lima", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Profissional dedicada e comprometida.", whatsapp: "55859940748" },
        { service: "faxineira", name: "Isabela Ferreira", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para limpeza profunda.", whatsapp: "55859913749" },
        { service: "faxineira", name: "Juliana Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para limpeza profunda.", whatsapp: "55859913407" },
        
        //Vidraceiro 🔨🪟
        { service: "vidraceiro", name: "André Sousa", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Instalação de vidros temperados e laminados.", whatsapp: "55851340751" },
        { service: "vidraceiro", name: "Bruno Ferreira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho impecável em box e janelas.", whatsapp: "55859913452" },
        { service: "vidraceiro", name: "Carlos Mendes", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em vidros decorativos e estruturais.", whatsapp: "55859940753" },
        { service: "vidraceiro", name: "Diego Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Montagem precisa e acabamento fino.", whatsapp: "55859913407" },
        { service: "vidraceiro", name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho detalhado e resistência garantida.", whatsapp: "55859340755" },
        { service: "vidraceiro", name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em portas de vidro e espelhos.", whatsapp: "55859913407" },
        { service: "vidraceiro", name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em fechamento de sacadas e fachadas.", whatsapp: "55851340757" },
        { service: "vidraceiro", name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Instalação segura e eficiente.", whatsapp: "55859913407" },
        { service: "vidraceiro", name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para projetos personalizados.", whatsapp: "55859913759" },
        { service: "vidraceiro", name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para projetos personalizados.", whatsapp: "55859910759" },
                
        //Churrasqueiro🔥🍖
        { service: "churrasqueiro", name: "Anderson Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em churrasco tradicional e cortes nobres.", whatsapp: "55859913461" },
        { service: "churrasqueiro", name: "Bruno Ferreira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Churrasco com sabor único e tempero especial.", whatsapp: "55859910762" },
        { service: "churrasqueiro", name: "Carlos Yuri", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em eventos e festas.", whatsapp: "55859913407" },
        { service: "churrasqueiro", name: "Diego Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Técnicas avançadas de grelhados.", whatsapp: "55859913404" },
        { service: "churrasqueiro", name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Carnes sempre no ponto perfeito.", whatsapp: "55859913765" },
        { service: "churrasqueiro", name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento especial para grandes churrascos.", whatsapp: "55859913407" },
        { service: "churrasqueiro", name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cortes argentinos e uruguaios.", whatsapp: "55859913467" },
        { service: "churrasqueiro", name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Tempero secreto e qualidade garantida.", whatsapp: "55859913768" },
        { service: "churrasqueiro", name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo atendimento e carnes selecionadas.", whatsapp: "55859910769" },
        { service: "churrasqueiro", name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo atendimento e carnes selecionadas.", whatsapp: "55859940769" },
            
        //Piscineiro 💦🏊‍♂️
        { service: "piscineiro", name: "Marcos Vinicius", age: 45, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em manutenção e tratamento de piscinas.", whatsapp: "55859913400" },
        { service: "piscineiro", name: "Lucas Oliveira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza completa e cuidados com produtos químicos.", whatsapp: "55851340831" },
        { service: "piscineiro", name: "Fernando Silva", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em piscinas residenciais e comerciais.", whatsapp: "55859940832" },
        { service: "piscineiro", name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Verificação de filtros e sistemas de bombeamento.", whatsapp: "55859940833" },
        { service: "piscineiro", name: "Diego Rocha", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Tratamento especializado contra algas e bactérias.", whatsapp: "55859340834" },
        { service: "piscineiro", name: "Rafael Lima", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Teste e equilíbrio do pH da água.", whatsapp: "55859913408" },
        { service: "piscineiro", name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Instalação e manutenção de aquecedores de piscina.", whatsapp: "55859910836" },
        { service: "piscineiro", name: "João Nunes", age: 43, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Reparos em azulejos e revestimentos.", whatsapp: "55859940837" },
        { service: "piscineiro", name: "Pedro Almeida", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza de bordas e áreas externas.", whatsapp: "55859913408" },
        { service: "piscineiro", name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Limpeza de bordas e áreas externas.", whatsapp: "55859913408" },
            
        // Técnico em Refrigeração ❄️💨
        { service: "tecnico-em-refrigeracao", name: "Maycon", age: 22, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Experiência de 2 anos, trabalho com máquinas Split, piso teto e Cassete.", whatsapp: "5585994088415" },
        { service: "tecnico-em-refrigeracao", name: "Matheus Alves", age: 21, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "4 anos de Exp. na área de Ar Condicionado. Split e Máquinas de lavar.", whatsapp: "5585992081178" },
        //
        { service: "tecnico-em-refrigeracao", name: "Fernando Silva", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Reparo e limpeza de sistemas de refrigeração comercial.", whatsapp: "55851340782" },
        { service: "tecnico-em-refrigeracao", name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção preventiva de equipamentos de refrigeração.", whatsapp: "55851340783" },
        { service: "tecnico-em-refrigeracao", name: "Diego Rocha", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em gás refrigerante e carga térmica.", whatsapp: "55891340784" },
        { service: "tecnico-em-refrigeracao", name: "Rafael Lima", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Instalação de sistemas split e central de ar.", whatsapp: "55859913407" },
        { service: "tecnico-em-refrigeracao", name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção corretiva para equipamentos industriais.", whatsapp: "55859340786" },
        { service: "tecnico-em-refrigeracao", name: "João Nunes", age: 43, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Diagnóstico de falhas e eficiência energética.", whatsapp: "55851340787" },
        { service: "tecnico-em-refrigeracao", name: "Pedro Almeida", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "55859940788" },
        { service: "tecnico-em-refrigeracao", name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "55859913407" },
                
        // Metalúrgico 🔩⚙️
        { service: "metalurgico", name: "Gabriel", age: 35, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em fabricação de peças metálicas sob medida.", whatsapp: "5585992768448" },
        //
        { service: "metalurgico", name: "Lucas Oliveira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em soldagem e corte industrial.", whatsapp: "55859913407" },
        { service: "metalurgico", name: "Fernando Silva", age: 42, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalha com fundição e tratamento térmico de metais.", whatsapp: "55859940792" },
        { service: "metalurgico", name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em corte a plasma e moldagem de aço.", whatsapp: "5991340793" },
        { service: "metalurgico", name: "Diego Rocha", age: 39, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Montagem e manutenção de estruturas metálicas.", whatsapp: "55859910794" },
        { service: "metalurgico", name: "Rafael Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Tratamento superficial e acabamento de metais.", whatsapp: "55859913407" },
        { service: "metalurgico", name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Soldagem MIG, TIG e elétrica para projetos industriais.", whatsapp: "55859940796" },
        { service: "metalurgico", name: "João Nunes", age: 43, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Fundição de metais não ferrosos e técnicas avançadas.", whatsapp: "55859340797" },
        { service: "metalurgico", name: "Pedro Almeida", age: 35, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em corte laser e estampagem.", whatsapp: "55859913407" },
        { service: "metalurgico", name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Reparo e manutenção de componentes metálicos.", whatsapp: "55859913407" },
                
        // Cuidador de Animais 🐶🐱
        { service: "cuidador-de-animais", name: "Ana Souza", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cuidados e alimentação de pets.", whatsapp: "55859910800" },
        { service: "cuidador-de-animais", name: "Antônia Almeida", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Passeios e entretenimento para cães e gatos.", whatsapp: "55859913401" },
        { service: "cuidador-de-animais", name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Excelência no trato com animais de todas as idades.", whatsapp: "55859910802" },
        { service: "cuidador-de-animais", name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com cuidados especiais e administração de medicamentos.", whatsapp: "55859940803" },
        { service: "cuidador-de-animais", name: "Fernanda Almeida", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Treinamento básico e socialização de filhotes.", whatsapp: "55859913804" },
        { service: "cuidador-de-animais", name: "Gabriela Pereira", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Higiene e banho de pets com técnicas especializadas.", whatsapp: "55859913405" },
                
        //Cabeleireiro a Domicilio ✂️💖
        { service: "cabeleireiro-a-domicilio", name: "Francisco Romario", age: 31, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "3 anos de Experiência", whatsapp: "5585987494767" },
        //
        { service: "cabeleireiro-a-domicilio", name: "Bruna Costa", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e reconstrução capilar.", whatsapp: "55859913401" },
        { service: "cabeleireiro-a-domicilio", name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em penteados para eventos e casamentos.", whatsapp: "55891340812" },
        { service: "cabeleireiro-a-domicilio", name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Cortes personalizados e estilo exclusivo.", whatsapp: "55859913813" },
        { service: "cabeleireiro-a-domicilio", name: "Fernanda Almeida", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Tratamentos naturais para cabelos danificados.", whatsapp: "55859913404" },

        // Manicure a Domicílio 💅✨
        { service: "manicure-a-domicilio", name: "Renata Rodrigues", age: 31, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "4 anos de experiência da área", whatsapp: "5585992272181" },
        //
        { service: "manicure-a-domicilio", name: "Bruna Costa", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e cuidado especial para as unhas.", whatsapp: "55859913408" },
        { service: "manicure-a-domicilio", name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Experiência em unhas de gel, acrílico e fibra de vidro.", whatsapp: "55859913408" },
        { service: "manicure-a-domicilio", name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Alongamento de unhas e técnicas de nail art personalizadas.", whatsapp: "55859340823" },

        // Designer 🎨✨
        { service: "designer", name: "Mondesson Linardis", age: 29, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "3 anos de experiência em design e redes sociais, tenho uma gráfica há 5 meses.", whatsapp: "5585991774021" },
        { service: "designer", name: "Mateus Santos", age: 26, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência como designer na grafica Connect.com e designer Autônomo á 5 anos.", whatsapp: "5585992975877" },

        // Adestamento
        { service: "adestramento", name: "César Freire", age: 41, city: "Aquiraz - CE", stars: "⭐⭐⭐⭐", comment: "Adestrador de cães há 10 anos. Hospedagem, Taxi Dog, DayCare/Creche", whatsapp: "5585991661174" },
        

         // Costureira 
        { service: "costureira", name: "Mariza", age: 60, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Costureira Experiênte", whatsapp: "5585991245108" },
        
        //Marceneiro
        { service: "marceneiro", name: "Halison Santos", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "A mais de 12 anos ná área de Móveis Planejados", whatsapp: "5585991893493" },

    ];

    // **Defina os profissionais destacados**
    const highlightedProfessionals = ["Daniel Souza","Marcilano Costa","Halison Santos","Bergson Nunes","Mateus Santos","Charles Gomes","Andrea Carneiro","Alexandra Reis","Fagner Lucena","Robson","Francisco Romario","Renata Rodrigues","Felipe Araújo","Andreza Lima","César Freire","Matheus Alves","Adonias","Roberto Evangelista","Gabriel","Fernando","Cristiano","Marcio","Primo Fretes","Vinicius","Maycon"]; // Adicione os nomes dos profissionais que devem ser destacados

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
    const mainContainer = document.querySelector(".grid-container");
    mainContainer.innerHTML = ""; // 🔥 Remove qualquer texto inicial
});

window.addEventListener("load", function () {
    const voltarButton = document.getElementById("voltarButton");
    voltarButton.style.visibility = "visible";
    voltarButton.style.opacity = "1"; // 🔥 Agora aparece corretamente estilizado
});