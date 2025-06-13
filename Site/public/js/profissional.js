document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const selectedName = params.get("name");

    if (!selectedName) {
        document.getElementById("professional-card").innerHTML = "<p>Profissional não encontrado.</p>";
        return;
    }

    // Lista de profissionais
    window.professionals = [

        //AuzaPoli
        { id: 1, service: "AuzaPoli (Polivalente)", name: "Fagner Lucena", age: 47, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Eletricista, Bombeiro Hidráulico, Manutenção Predial", whatsapp: "558598581919" },

        //Pedreiro
        { id: 2, service: "Pedreiro", name: "Leonardo", age: 28, city: "Fortaleza - CE", stars: "⭐⭐", comment: "Pedreiro, Mestre de obra profissional. Entendo de projetos.", whatsapp: "5585988559085" },
        { id: 3, service: "Pedreiro", name: "Edilcimar Frazão", age: 53, city: "Fortaleza - CE", stars: "⭐⭐", comment: "Área de acabamento da constr. civil, PVC, Gesso, Porcel/Cerâmica.", whatsapp: "5585992363266" },
        { id: 4, service: "Pedreiro", name: "Alberto", age: 33, city: "Fortaleza - CE", stars: "⭐⭐", comment: "Área de Construção. Dedicação, Qualidade e Compromisso", whatsapp: "5585994312887" },
        { id: 5, service: "Pedreiro", name: "Adonias", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável. Serviços em Geral", whatsapp: "5585992726761" },
        { id: 6, service: "Pedreiro", name: "Charles Gomes", age: 47, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "5 anos de experiência na área", whatsapp: "5585997225537" },
        //
        { id: 7, service: "Pedreiro", name: "Ricardo Mendes", age: 44, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em reformas rápidas.", whatsapp: "558599340656" },
        { id: 8, service: "Pedreiro", name: "Lucas Oliveira", age: 35, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Muito detalhista e eficiente.", whatsapp: "558599340657" },
        { id: 9, service: "Pedreiro", name: "José Lima", age: 47, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "558599134068" },
        { id: 10, service: "Pedreiro", name: "Marcelo Nunes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em grandes projetos.", whatsapp: "558599140659" },
        { id: 11, service: "Pedreiro", name: "Rafael Costa", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Ótima comunicação e execução de obra.", whatsapp: "558599140660" },
    
        //Servente
        { id: 12, service: "Servente", name: "Micael Souza", age: 18, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Ajudante de Pedreiro.", whatsapp: "5585921741466" },
        //
        { id: 13, service: "Servente", name: "Eduardo Lima", age: 28, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Sempre disponível para ajudar.", whatsapp: "55851340672" },
        { id: 14, service: "Servente", name: "Gabriel Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Responsável e organizado.", whatsapp: "55859913406" },
        { id: 15, service: "Servente", name: "Ricardo Souza", age: 29, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Execução rápida e precisa.", whatsapp: "55859913404" },
        { id: 16, service: "Servente", name: "Matheus Oliveira", age: 32, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência na área de construção.", whatsapp: "55891340675" },
        { id: 17, service: "Servente", name: "Felipe Mendes", age: 27, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Trabalho de qualidade e dedicação.", whatsapp: "55859913406" },
        { id: 18, service: "Servente", name: "Thiago Ferreira", age: 33, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Muito ágil na preparação dos materiais.", whatsapp: "55859340677" },
        { id: 19, service: "Servente", name: "Lucas Nunes", age: 31, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Sempre comprometido com o trabalho.", whatsapp: "55851340678" },
        { id: 20, service: "Servente", name: "Pedro Silva", age: 26, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo suporte aos pedreiros.", whatsapp: "55859913406" },
        { id: 21, service: "Servente", name: "Vinícius Ramos", age: 34, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo suporte aos pedreiros.", whatsapp: "55859913406" },
    
        //Bombeiro Hidráulico
        { id: 22, service: "Bombeiro Hidraulico", name: "Marcilano Costa", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Vazamentos, limpeza de caixa d'água e desentupimentos.", whatsapp: "5585992531487" },
        //
        { id: 23, service: "Bombeiro Hidraulico", name: "Carlos Nogueira", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiente em instalações de água e esgoto.", whatsapp: "55851340682" },
        { id: 24, service: "Bombeiro Hidraulico", name: "Eduardo Ferreira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Bom trabalho com manutenções emergenciais.", whatsapp: "55859940683" },
        { id: 25, service: "Bombeiro Hidraulico", name: "Renato Costa", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ágil e eficiente em instalações prediais.", whatsapp: "55859913484" },
        { id: 26, service: "Bombeiro Hidraulico", name: "Fernando Oliveira", age: 36, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Execução precisa em tubulações de água.", whatsapp: "55859940685" },
        { id: 27, service: "Bombeiro Hidraulico", name: "Luciano Mendes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Profissional dedicado e detalhista.", whatsapp: "5585990686" },
        { id: 28, service: "Bombeiro Hidraulico", name: "Gustavo Ramos", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "55859910687" },
        { id: 29, service: "Bombeiro Hidraulico", name: "Marcos Lima", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Perito em redes hidráulicas e pressurização.", whatsapp: "55891340688" },
        { id: 30, service: "Bombeiro Hidraulico", name: "Vinícius Silva", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento rápido e eficiente.", whatsapp: "55859913406" },
        { id: 31, service: "Bombeiro Hidraulico", name: "Rodrigo Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "55859910687" },
    
        //Pintor
        { id: 32, service: "Pintor", name: "Luis Carlos", age: 34, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Pintura simples, em gesso, Reparo em pintura, pinturas em geral", whatsapp: "5585991757150" },
        { id: 33, service: "Pintor", name: "Daniel Souza", age: 27, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "2 anos na função de pintura e manutenção de serviços.", whatsapp: "5585994148055" },
        //
        { id: 34, service: "Pintor", name: "Marcos Oliveira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Bom custo-benefício e rapidez.", whatsapp: "55859913403" },
        { id: 35, service: "Pintor", name: "Ricardo Lima", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em técnicas avançadas de pintura.", whatsapp: "55991340694" },
        { id: 36, service: "Pintor", name: "Fernando Souza", age: 36, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Excelência em pintura decorativa.", whatsapp: "55851340695" },
        { id: 37, service: "Pintor", name: "Leonardo Mendes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima aplicação de tintas especiais.", whatsapp: "55859940696" },
        { id: 38, service: "Pintor", name: "Gustavo Ramos", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho limpo e bem organizado.", whatsapp: "55859913407" },
        { id: 39, service: "Pintor", name: "Matheus Silva", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Qualidade garantida em pintura interna e externa.", whatsapp: "55851340698" },
        { id: 40, service: "Pintor", name: "Vinícius Costa", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Detalhista e comprometido com prazos.", whatsapp: "55859913699" },
        { id: 41, service: "Pintor", name: "Rodrigo Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Detalhista e comprometido com prazos.", whatsapp: "55859913406" },
        { id: 42, service: "Pintor", name: "José Antunes", age: 43, city: "Horizonte - CE", stars: "⭐", comment: "Detalhista", whatsapp: "55859913409" },
    
        //Capinador
        { id: 42, service: "Capinador", name: "Adriano Costa", age: 31, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Tenho experiência na área.", whatsapp: "5585992318130" },
        //
        { id: 43, service: "Capinador", name: "Bruno Oliveira", age: 42, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho eficiente na remoção de vegetação.", whatsapp: "55859913407" },
        { id: 44, service: "Capinador", name: "Carlos Mendes", age: 36, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Ótimo para manutenção de espaços agrícolas.", whatsapp: "55859913403" },
        { id: 45, service: "Capinador", name: "Daniel Costa", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em limpeza de terrenos urbanos.", whatsapp: "55859913404" },
        { id: 46, service: "Capinador", name: "Eduardo Nunes", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Rápido e eficiente na capinação de grandes áreas.", whatsapp: "55851340705" },
        { id: 47, service: "Capinador", name: "Felipe Ramos", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "55859913407" },
        { id: 48, service: "Capinador", name: "Gabriel Silva", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Sempre comprometido com a qualidade do serviço.", whatsapp: "55859340707" },
        { id: 49, service: "Capinador", name: "Henrique Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em áreas de difícil acesso.", whatsapp: "55991340708" },
        { id: 50, service: "Capinador", name: "Igor Ferreira", age: 37, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para manutenção frequente.", whatsapp: "55859913709" },
        { id: 51, service: "Capinador", name: "João Nunes", age: 45, city: "Horizonte - CE", stars: "⭐", comment: "Ótima opção para manutenção frequente.", whatsapp: "55851340709" },
    
        //Eletricista
        { id: 52, service: "Eletricista", name: "Roberto Evangelista", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência na área de Eletricidade.", whatsapp: "5585981737165" },
        { id: 53, service: "Eletricista", name: "Marcelo Lima", age: 30, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Eletricista Residencial e Predial.", whatsapp: "5585992726101" },
        //
        { id: 54, service: "Eletricista", name: "Carlos Mendes", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiência em circuitos e sistemas elétricos.", whatsapp: "551340713" },
        { id: 55, service: "Eletricista", name: "Diego Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Instalações industriais e comerciais.", whatsapp: "55851340714" },
        { id: 56, service: "Eletricista", name: "Fernando Costa", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Reparos elétricos rápidos e seguros.", whatsapp: "55859913405" },
        { id: 57, service: "Eletricista", name: "Gustavo Pereira", age: 43, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiência com sistemas de energia renovável.", whatsapp: "55859940716" },
        { id: 58, service: "Eletricista", name: "Henrique Rocha", age: 38, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em instalações elétricas complexas.", whatsapp: "55891340717" },
        { id: 59, service: "Eletricista", name: "José Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Segurança e eficiência na manutenção elétrica.", whatsapp: "55859913407" },
        { id: 60, service: "Eletricista", name: "Ricardo Nunes", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "55859913419" },
        { id: 61, service: "Eletricista", name: "Thiago Silva", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "55859940719" },

        //Montador de Móveis
        { id: 62, service: "Montador de Móveis", name: "Naldo", age: 51, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "29 anos de experiência na área. Experiência com móveis de loja.", whatsapp: "5585992038039" }, 
        { id: 63, service: "Montador de Móveis", name: "Felipe Araújo", age: 30, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Montagens em Geral.", whatsapp: "5588920007471" },
        { id: 64, service: "Montador de Móveis", name: "Robson", age: 27, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "9 anos de Experiência na área.", whatsapp: "5585994050965" },
        { id: 65, service: "Montador de Móveis", name: "Bergson Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "18 anos de experiência. Atendo em Fortaleza e Regiões metropolitanas", whatsapp: "5585994316980" },
        //
        { id: 66, service: "Montador de Móveis", name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Montagem profissional e organização impecável.", whatsapp: "55851340725" },
        { id: 67, service: "Montador de Móveis", name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "55859913407" },
        { id: 68, service: "Montador de Móveis", name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com todos os tipos de móveis.", whatsapp: "55851340727" },
        { id: 69, service: "Montador de Móveis", name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Precisão na montagem e ajustes personalizados.", whatsapp: "55859940728" },
        { id: 70, service: "Montador de Móveis", name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Montagem ágil sem erros.", whatsapp: "55859913409" },
        { id: 71, service: "Montador de Móveis", name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com todos os tipos de móveis.", whatsapp: "55859913407" },
    
        //Caminhões de Frete
        { id: 72, service: "Frete e Mudanças", name: "Marcio", age: 45, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Fretes rápidos e seguros para qualquer destino.", whatsapp: "5585991979580" },
        { id: 73, service: "Frete e Mudanças", name: "Fernando", age: 52, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Transporte de cargas com total cuidado e eficiência.", whatsapp: "5585991450130" },
        { id: 74, service: "Frete e Mudanças", name: "Duilio", age: 48, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em mudanças.", whatsapp: "5585992767286" },
        { id: 75, service: "Frete e Mudanças", name: "Vinicius", age: 26, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Frete residencial com atendimento ágil.", whatsapp: "5585992324911" },
        { id: 76, service: "Frete e Mudanças", name: "Primo Fretes", age: 54, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Serviço confiável.", whatsapp: "5585991557742" },
        { id: 77, service: "Frete e Mudanças", name: "Cristiano", age: 47, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Carregamento seguro e entrega rápida.", whatsapp: "5585992962940" },
        //
        { id: 78, service: "Frete e Mudanças", name: "Henrique Rocha", age: 41, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Motorista experiente em rotas urbanas e rurais.", whatsapp: "55859913737" },
        { id: 79, service: "Frete e Mudanças", name: "José Lima", age: 44, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento pontual e profissional.", whatsapp: "55859913407" },
        { id: 80, service: "Frete e Mudanças", name: "Ricardo Nunes", age: 40, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em transporte de mercadorias frágeis.", whatsapp: "55859940739" },
        { id: 81, service: "Frete e Mudanças", name: "Thiago Silva", age: 46, city: "Horizonte - CE", stars: "⭐⭐", comment: "Especialista em transporte de mercadorias frágeis.", whatsapp: "55851340739" },
    
        //Diarista
        { id: 82, service: "Faxineira", name: "Andreza Lima", age: 28, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Experiênte em limpezas detalhadas, pontual e organizada.", whatsapp: "5585992333281" },
        { id: 83, service: "Faxineira", name: "Alexandra Reis", age: 31, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Tenho experiência como Diarista á anos com competência", whatsapp: "5585992460837" },
        { id: 84, service: "Faxineira", name: "Andrea Carneiro", age: 42, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "6 anos de experiência", whatsapp: "5585989282316" },
        { id: 85, service: "Faxineira", name: "Daniele Ribeiro", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Bastante experiência na área", whatsapp: "5585991738251" },
        { id: 86, service: "Faxineira", name: "Emília Costa", age: 39, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Tenho experiência na área.", whatsapp: "5585989506095" },
        { id: 87, service: "Faxineira", name: "Emanuele Pereira", age: 46, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "10 anos de experiência em faxinas.", whatsapp: "5575998229065" },
        //
        { id: 88, service: "Faxineira", name: "Gabriela Silva", age: 41, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Organização e atenção aos detalhes.", whatsapp: "55859340747" },
        { id: 89, service: "Faxineira", name: "Helena Lima", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Profissional dedicada e comprometida.", whatsapp: "55859940748" },
        { id: 90, service: "Faxineira", name: "Isabela Ferreira", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para limpeza profunda.", whatsapp: "55859913749" },
        { id: 91, service: "Faxineira", name: "Juliana Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para limpeza profunda.", whatsapp: "55859913407" },
    
        //Vidraceiro
        { id: 92, service: "Vidraceiro", name: "André Sousa", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Instalação de vidros temperados e laminados.", whatsapp: "55851340751" },
        { id: 93, service: "Vidraceiro", name: "Bruno Ferreira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho impecável em box e janelas.", whatsapp: "55859913452" },
        { id: 94, service: "Vidraceiro", name: "Carlos Mendes", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em vidros decorativos e estruturais.", whatsapp: "55859940753" },
        { id: 95, service: "Vidraceiro", name: "Diego Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Montagem precisa e acabamento fino.", whatsapp: "55859913407" },
        { id: 96, service: "Vidraceiro", name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho detalhado e resistência garantida.", whatsapp: "55859340755" },
        { id: 97, service: "Vidraceiro", name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em portas de vidro e espelhos.", whatsapp: "55859913407" },
        { id: 98, service: "Vidraceiro", name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em fechamento de sacadas e fachadas.", whatsapp: "55851340757" },
        { id: 99, service: "Vidraceiro", name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Instalação segura e eficiente.", whatsapp: "55859913407" },
        { id: 100, service: "Vidraceiro", name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para projetos personalizados.", whatsapp: "55859913759" },
        { id: 101, service: "Vidraceiro", name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para projetos personalizados.", whatsapp: "55859910759" },
    
        //Churrasqueiro
        { id: 102, service: "Churrasqueiro", name: "Anderson Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em churrasco tradicional e cortes nobres.", whatsapp: "55859913461" },
        { id: 103, service: "Churrasqueiro", name: "Bruno Ferreira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Churrasco com sabor único e tempero especial.", whatsapp: "55859910762" },
        { id: 104, service: "Churrasqueiro", name: "Carlos Yuri", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em eventos e festas.", whatsapp: "55859913407" },
        { id: 105, service: "Churrasqueiro", name: "Diego Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Técnicas avançadas de grelhados.", whatsapp: "55859913404" },
        { id: 106, service: "Churrasqueiro", name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Carnes sempre no ponto perfeito.", whatsapp: "55859913765" },
        { id: 107, service: "Churrasqueiro", name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento especial para grandes churrascos.", whatsapp: "55859913407" },
        { id: 108, service: "Churrasqueiro", name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cortes argentinos e uruguaios.", whatsapp: "55859913467" },
        { id: 109, service: "Churrasqueiro", name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Tempero secreto e qualidade garantida.", whatsapp: "55859913768" },
        { id: 110, service: "Churrasqueiro", name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo atendimento e carnes selecionadas.", whatsapp: "55859910769" },
        { id: 111, service: "Churrasqueiro", name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo atendimento e carnes selecionadas.", whatsapp: "55859940769" },
    
        //Piscineiro
        { id: 112, service: "Piscineiro", name: "Marcos Vinicius", age: 45, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em manutenção e tratamento de piscinas.", whatsapp: "55859913400" },
        { id: 113, service: "Piscineiro", name: "Lucas Oliveira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza completa e cuidados com produtos químicos.", whatsapp: "55851340831" },
        { id: 114, service: "Piscineiro", name: "Fernando Silva", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em piscinas residenciais e comerciais.", whatsapp: "55859940832" },
        { id: 115, service: "Piscineiro", name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Verificação de filtros e sistemas de bombeamento.", whatsapp: "55859940833" },
        { id: 116, service: "Piscineiro", name: "Diego Rocha", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Tratamento especializado contra algas e bactérias.", whatsapp: "55859340834" },
        { id: 117, service: "Piscineiro", name: "Rafael Lima", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Teste e equilíbrio do pH da água.", whatsapp: "55859913408" },
        { id: 118, service: "Piscineiro", name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Instalação e manutenção de aquecedores de piscina.", whatsapp: "55859910836" },
        { id: 119, service: "Piscineiro", name: "João Nunes", age: 43, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Reparos em azulejos e revestimentos.", whatsapp: "55859940837" },
        { id: 120, service: "Piscineiro", name: "Pedro Almeida", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza de bordas e áreas externas.", whatsapp: "55859913408" },
        { id: 121, service: "Piscineiro", name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Limpeza de bordas e áreas externas.", whatsapp: "55859913408" },
    
        //Tecnico em Arcondicionado
        { id: 122, service: "Téc. em Refrigeração", name: "Maycon", age: 22, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Experiência de 2 anos, trabalho com máquinas Split, piso teto e Cassete.", whatsapp: "5585994088415" },
        { id: 123, service: "Téc. em Refrigeração", name: "Matheus Alves", age: 21, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "4 anos de Exp. na área de Ar Condicionado. Split e Máquinas de lavar.", whatsapp: "5585992081178" },
        { id: 124, service: "Téc. em Refrigeração", name: "Adriano", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Mecânico de ar condicionado instalação, manutenção e conserto.", whatsapp: "5585991368616" },
        //
        { id: 125, service: "Téc. em Refrigeração", name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção preventiva de equipamentos de refrigeração.", whatsapp: "55851340783" },
        { id: 126, service: "Téc. em Refrigeração", name: "Diego Rocha", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em gás refrigerante e carga térmica.", whatsapp: "55891340784" },
        { id: 127, service: "Téc. em Refrigeração", name: "Rafael Lima", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Instalação de sistemas split e central de ar.", whatsapp: "55859913407" },
        { id: 128, service: "Téc. em Refrigeração", name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção corretiva para equipamentos industriais.", whatsapp: "55859340786" },
        { id: 129, service: "Téc. em Refrigeração", name: "João Nunes", age: 43, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Diagnóstico de falhas e eficiência energética.", whatsapp: "55851340787" },
        { id: 130, service: "Téc. em Refrigeração", name: "Pedro Almeida", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "55859940788" },
        { id: 131, service: "Téc. em Refrigeração", name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "55859913407" },
    
        //Metalurgico
        { id: 132, service: "Metalurgico", name: "Gabriel", age: 35, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em fabricação de peças metálicas sob medida.", whatsapp: "5585992768448" },
        //
        { id: 133, service: "Metalurgico", name: "Lucas Oliveira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em soldagem e corte industrial.", whatsapp: "55859913407" },
        { id: 134, service: "Metalurgico", name: "Fernando Silva", age: 42, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalha com fundição e tratamento térmico de metais.", whatsapp: "55859940792" },
        { id: 135, service: "Metalurgico", name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em corte a plasma e moldagem de aço.", whatsapp: "5991340793" },
        { id: 136, service: "Metalurgico", name: "Diego Rocha", age: 39, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Montagem e manutenção de estruturas metálicas.", whatsapp: "55859910794" },
        { id: 137, service: "Metalurgico", name: "Rafael Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Tratamento superficial e acabamento de metais.", whatsapp: "55859913407" },
        { id: 138, service: "Metalurgico", name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Soldagem MIG, TIG e elétrica para projetos industriais.", whatsapp: "55859940796" },
        { id: 139, service: "Metalurgico", name: "João Nunes", age: 43, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Fundição de metais não ferrosos e técnicas avançadas.", whatsapp: "55859340797" },
        { id: 140, service: "Metalurgico", name: "Pedro Almeida", age: 35, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em corte laser e estampagem.", whatsapp: "55859913407" },
        { id: 141, service: "Metalurgico", name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Reparo e manutenção de componentes metálicos.", whatsapp: "55859913407" },
    
        //Cuidador de Animais
        { id: 142, service: "Cuidador(a) de Animais", name: "Ana Souza", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cuidados e alimentação de pets.", whatsapp: "55859910800" },
        { id: 143, service: "Cuidador(a) de Animais", name: "Antônia Almeida", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Passeios e entretenimento para cães e gatos.", whatsapp: "55859913401" },
        { id: 144, service: "Cuidador(a) de Animais", name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Excelência no trato com animais de todas as idades.", whatsapp: "55859910802" },
        { id: 145, service: "Cuidador(a) de Animais", name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com cuidados especiais e administração de medicamentos.", whatsapp: "55859940803" },
        { id: 146, service: "Cuidador(a) de Animais", name: "Fernanda Almeida", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Treinamento básico e socialização de filhotes.", whatsapp: "55859913804" },
        { id: 147, service: "Cuidador(a) de Animais", name: "Gabriela Pereira", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Higiene e banho de pets com técnicas especializadas.", whatsapp: "55859913405" },
   
        //Cabelereiro á Domicilio
        { id: 148, service: "Cabeleireiro(a) a Domicílio", name: "Francisco Romario", age: 31, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "3 anos de Experiência", whatsapp: "5585987494767" },
        //
        { id: 149, service: "Cabeleireiro(a) a Domicílio", name: "Bruna Costa", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e reconstrução capilar.", whatsapp: "55859913401" },
        { id: 150, service: "Cabeleireiro(a) a Domicílio", name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em penteados para eventos e casamentos.", whatsapp: "55891340812" },
        { id: 151, service: "Cabeleireiro(a) a Domicílio", name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Cortes personalizados e estilo exclusivo.", whatsapp: "55859913813" },
        { id: 152, service: "Cabeleireiro(a) a Domicílio", name: "Fernanda Almeida", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Tratamentos naturais para cabelos danificados.", whatsapp: "55859913404" },
   
        //Manicure á Domicilio
        { id: 153, service: "Manicure a Domicílio", name: "Renata Rodrigues", age: 31, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "4 anos de experiência da área", whatsapp: "5585992272181" },
        //
        { id: 154, service: "Manicure a Domicílio", name: "Bruna Costa", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e cuidado especial para as unhas.", whatsapp: "55859913408" },
        { id: 155, service: "Manicure a Domicílio", name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Experiência em unhas de gel, acrílico e fibra de vidro.", whatsapp: "55859913408" },
        { id: 156, service: "Manicure a Domicílio", name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Alongamento de unhas e técnicas de nail art personalizadas.", whatsapp: "55859340823" },

        //Designer 
        { id: 157, service: "Designer", name: "Mondesson Linardis", age: 29, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "3 anos de experiência em design e redes sociais, tenho uma gráfica há 5 meses.", whatsapp: "5585991774021" },
        { id: 158, service: "Designer", name: "Mateus Santos", age: 26, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência como designer na grafica Connect.com e designer Autônomo á 5 anos.", whatsapp: "5585992975877" },

        //Adestramento
        { id: 159, service: "Adestramento", name: "César Freire", age: 41, city: "Aquiraz - CE", stars: "⭐⭐⭐⭐", comment: "Adestrador de cães há 10 anos. Hospedagem, Taxi Dog, DayCare/Creche", whatsapp: "5585991661174" },

        //Marceneiro
        { id: 160, service: "Marceneiro", name: "Halison Santos", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "A mais de 12 anos ná área de Móveis Planejados", whatsapp: "5585991893493" },
 
        //Chaveiro
        { id: 161, service: "Chaveiro", name: "André Batista", age: 50, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "10 anos de chaveiro / Técnico Mecânico", whatsapp: "5585992438122" },
   
        //Costureira  
    ];

    // Lista de profissionais destacados
    const highlightedProfessionals = new Set([
        "Mateus Santos", "Bruna Costa", "Carlos Costa", "Ana Souza", "Lucas Oliveira", "André Souza",
        "Diego Rocha", "Marcos Vinicius", "Bruno Ferreira", "Carlos Mendes", "Eduarda Nunes",
        "Fernanda Ramos", "Gustavo Ramos", "Diego Martins", "Carlos Nogueira", "José Lima"
    ]);

    // Encontrar o profissional selecionado
    const professional = professionals.find(p => p.name.trim() === selectedName.trim());

    if (professional) {
        const whatsappLink = `https://api.whatsapp.com/send?phone=${professional.whatsapp}&text=Olá, vim por meio da Auza Services, gostaria de realizar um orçamento de serviço.`;

        // Verifica se o profissional está na lista de destaques
        const isHighlighted = highlightedProfessionals.has(professional.name.trim());
        const highlightedClass = isHighlighted ? "highlighted" : "";
        const nameClass = isHighlighted ? "highlighted-name" : "";

        document.getElementById("professional-card").innerHTML = `
            <div class="card ${highlightedClass}">
                <img class="card-logo" src="css/imagens/background.png" alt="Logo">
                <h3 class="${nameClass}">${professional.name}</h3>
                <p>${professional.city}</p>
                <p>Idade: ${professional.age} anos</p>
                <p>Avaliação: ${professional.stars}</p>
                <p>${professional.comment}</p>
                <a class="whatsapp-button" href="${whatsappLink}" target="_blank"
                    data-id="${professional.id}" data-nome="${professional.name}">
                    Contato via WhatsApp
                </a>
            </div>
        `;

        // 🚀 **Corrigindo evento de clique no botão do WhatsApp**
        const whatsappButton = document.querySelector(".whatsapp-button");

        if (whatsappButton) {
            whatsappButton.removeEventListener("click", handleClick); // 🔥 Remove evento duplicado antes de adicionar
            whatsappButton.addEventListener("click", handleClick);
        } else {
            console.error("🚨 Erro: Botão de WhatsApp não encontrado!");
        }
    } else {
        document.getElementById("professional-card").innerHTML = "<p>Profissional não encontrado.</p>";
    }
});

// ✅ **Função para capturar clique e enviar dados ao banco**
function handleClick(event) {
    console.log("📌 Clique detectado! Enviando dados ao backend…");

fetch("https://clientes-fhfe.onrender.com/api/click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        profissionalId: profissionalId,
        nomeProfissional: nomeProfissional,
        profissao: professional.service // 👈 Pega a profissão direto do objeto professional
    })
})
    .then(response => {
        if (response.ok) {
            console.log("✅ Clique registrado com sucesso no banco!");
        } else {
            console.error("🚨 Erro ao registrar clique:", response.statusText);
        }
    })
    .catch(error => console.error("🚨 Erro na requisição:", error));
}


document.getElementById("shareButton").addEventListener("click", async () => {
    const params = new URLSearchParams(window.location.search);
    const selectedName = params.get("name");

    if (!selectedName) {
        console.error("Erro: Nome do profissional não encontrado na URL.");
        return;
    }

    if (!Array.isArray(professionals) || professionals.length === 0) {
    console.error("🚨 Erro: Lista de profissionais não carregada antes de compartilhar.");
    alert("Erro: Lista de profissionais não carregada.");
    return;
}

    // Buscar o profissional correto
    const professional = professionals.find(p => p.name.trim() === selectedName.trim());

    if (!professional) {
        console.error("Erro: Profissional não encontrado.");
        return;
    }

    console.log("Profissional encontrado:", professional.name, professional.service); // 🔥 Teste para garantir que a profissão está carregando

    // Atualiza as meta tags corretamente
    updateMetaTags(professional);

const shareData = {  
    title: `${professional.name} - ${professional.service}`,  
    text: `*${professional.service}*\n\nNome: ${professional.name} \nCidade: ${professional.city} \nAvaliação: ${professional.stars}\n*${professional.comment}*\n\n${window.location.href}\n\nClique no link acima para solicitar um orçamento.`,  
};

    if (navigator.share) {
        try {
            await navigator.share(shareData);
            console.log("Compartilhado com sucesso!");
        } catch (error) {
            console.error("Erro ao compartilhar:", error);
        }
    } else {
        alert("Seu navegador não suporta compartilhamento nativo.");
    }
});
document.getElementById("backButton").addEventListener("click", function () {
    if (window.history.length > 1) {
        window.history.back(); // Volta para a página anterior
    } else {
        window.location.href = "index.html"; // Caso não haja histórico, volta para a página inicial
    }

});

document.getElementById("shareButton").addEventListener("click", function () {
    const cardElement = document.getElementById("professional-card");

    if (!cardElement) {
        console.error("Erro: O elemento #professional-card não foi encontrado.");
        return;
    }
});

function updateMetaTags(professional) {
    if (!professional) return;

    document.title = `${professional.name} - ${professional.service}`; // 🔥 Nome + Profissão no título

    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = `Nome: ${professional.name} | Serviço: ${professional.service} | Avaliação: ${professional.stars} | ${professional.comment}`;

    let metaKeywords = document.querySelector("meta[name='keywords']");
    if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = `Serviço, Profissional, ${professional.name}, Avaliação ${professional.stars}`;
}
document.getElementById("optionsButton").addEventListener("click", function () {
    const menu = document.getElementById("optionsMenu");
    menu.classList.toggle("hidden"); // 🔥 Alterna visibilidade do menu
});

document.getElementById("reportButton").addEventListener("click", function () {
    const params = new URLSearchParams(window.location.search);
    const selectedName = params.get("name"); // 🔥 Obtém o nome do profissional
    const whatsappNumber = "+55(85)991340658"; // 🔥 Insira seu número de WhatsApp

    if (selectedName) {
        const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Gostaria de relatar um ocorrido envolvendo o(a) profissional *${selectedName}*!`;
        window.open(whatsappLink, "_blank"); // 🔥 Abre diretamente o WhatsApp com a mensagem formatada
    } else {
        alert("Erro: Nome do profissional não encontrado.");
    
    }
});

const stars = document.querySelectorAll(".star");
const submitButton = document.getElementById("submitRating");
let selectedRating = 0;

// Atualiza visualmente as estrelas e armazena a avaliação
stars.forEach(star => {
    star.addEventListener("click", function () {
        selectedRating = parseInt(this.getAttribute("data-value"));
        stars.forEach(s => s.classList.remove("selected"));
        stars.forEach(s => {
            if (parseInt(s.getAttribute("data-value")) <= selectedRating) {
                s.classList.add("selected");
            }
        });
        submitButton.disabled = false;
        console.log("Estrelas selecionadas antes do envio:", selectedRating); // 🔥 Teste no console
    });
});

// Evento de clique do botão "Enviar Avaliação"
document.getElementById("submitRating").addEventListener("click", function () {
    // Busca o nome do profissional
    const professionalNameElement = document.querySelector("#professional-card h3"); // 🔥 Ajustado para buscar dentro do card
    const whatsappNumber = "+55(85)991340658";

    if (professionalNameElement) {
        const professionalName = professionalNameElement.innerText.trim();
        const selectedRating = document.querySelectorAll(".star.selected").length;

        if (selectedRating > 0) {
            const message = `Olá! Gostaria de avaliar o trabalho do(a) profissional *${professionalName}*. Ele(a) recebeu uma avaliação de ${selectedRating} ⭐ estrelas!`;

            console.log("Mensagem gerada:", message); // 🔥 Teste antes do envio
            const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
            window.location.href = whatsappLink;
        } else {
            alert("Erro: Certifique-se de selecionar as estrelas antes de enviar!");
        }
    } else {
        alert("Erro: Nome do profissional não foi encontrado na página. Verifique se ele está carregando corretamente no HTML.");
    }
});

const testimonials = [
    { name: "Gabriel Nunes", text: "Fiquei surpreso com a velocidade! Em 5 minutos já tinha um profissional agendado." },
    { name: "Amanda Reis", text: "O site é super intuitivo! Não precisei nem perguntar nada pra entender como funciona." },
    { name: "Felipe Castro", text: "Nunca vi um sistema tão simples e direto. Escolhi, agendei e pronto!" },
    { name: "Juliana Moreira", text: "Muito melhor do que ficar ligando para um monte de gente. Aqui tudo funciona certinho!" },
    { name: "Carlos Batista", text: "Praticidade total. Sem burocracia, sem espera, só eficiência!" },
    { name: "Vanessa Oliveira", text: "Achei tão simples de usar que minha avó conseguiu marcar um técnico sozinha!" },
    { name: "Rodrigo Ferreira", text: "O site é rápido e direto ao ponto! Sem enrolação, é isso que eu gosto." },
    { name: "Daniel Martins", text: "Melhor experiência! Em poucos cliques resolvi meu problema." },
    { name: "Luiza Santos", text: "Não preciso mais pedir indicações para ninguém, só entro no site e pronto!" },
    { name: "Fernando Lima", text: "Facilidade nível máximo! Esse site realmente salva!" },
    { name: "Ana Beatriz", text: "O layout do site é tão bem pensado que qualquer um consegue usar sem dificuldade." },
    { name: "Thiago Almeida", text: "Achei muito fácil contratar um serviço sem perder tempo. Tudo bem otimizado!" },
    { name: "Letícia Costa", text: "Nunca mais preciso ficar rodando na internet procurando técnicos. Aqui tudo é rápido!" },
    { name: "Marcelo Duarte", text: "Simples, funcional e rápido. A experiência foi impecável!" },
    { name: "Camila Ribeiro", text: "Resolvi meu problema sem precisar baixar aplicativo ou criar conta. Prático demais!" },
    { name: "Pedro Souza", text: "Gostei muito da organização do site! Tão simples que até parece mágica." },
    { name: "Beatriz Monteiro", text: "Precisei de um serviço urgente e esse site foi minha salvação!" },
    { name: "Ricardo Fernandes", text: "Já usei várias vezes e sempre consigo agendar tudo sem dor de cabeça!" },
    { name: "Tatiane Vasconcelos", text: "Sensação de que finalmente alguém resolveu o problema de buscar profissionais!" },
    { name: "Diego Oliveira", text: "Amei a praticidade! Nada de ligações intermináveis, apenas um clique e pronto." }
];

let index = 0;
const container = document.querySelector(".testimonial-container");

function showNextTestimonial() {
    const activeTestimonial = document.querySelector(".testimonial.active");

    if (activeTestimonial) {
        activeTestimonial.classList.remove("active");
        activeTestimonial.classList.add("exiting");

        setTimeout(() => {
            activeTestimonial.remove();
        }, 1500); // 🔥 Tempo ajustado para sincronizar com a animação do CSS
    }

    // Criar novo depoimento com efeito de entrada suave
    const newTestimonial = document.createElement("div");
    newTestimonial.classList.add("testimonial");
    newTestimonial.innerHTML = `
        <p class="testimonial-text">${testimonials[index].text}</p>
        <span class="testimonial-name">— ${testimonials[index].name}</span>
    `;

    container.appendChild(newTestimonial);

    setTimeout(() => {
        newTestimonial.classList.add("active"); // 🔥 Faz o depoimento aparecer sem desfoque
    }, 100);

    index = (index + 1) % testimonials.length;

    setTimeout(showNextTestimonial, 9000); // 🔄 Troca a cada 20s
}

document.addEventListener("DOMContentLoaded", showNextTestimonial);