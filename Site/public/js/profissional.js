document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const selectedName = params.get("name");

    if (!selectedName) {
        document.getElementById("professional-card").innerHTML = "<p>Profissional não encontrado.</p>";
        return;
    }

    // Lista de profissionais
    const professionals = [

        //AuzaPoli
        { name: "Fagner Lucena", service: "AuzaPoli (Polivalente)", name: "Fagner Lucena", age: 47, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Eletricista, Bombeiro Hidráulico, Manutenção Predial", whatsapp: "558598581919" },

        //Pedreiro
        { id: 1, name: "Leonardo", service: "Pedreiro", city: "Fortaleza - CE", age: 28, stars: "⭐⭐⭐", comment: "Mestre de obra profissional. Entendo de projetos.", whatsapp: "5585988559085" },
        { name: "Edilcimar Frazão",  service: "Pedreiro", city: "Fortaleza - CE", age: 53, stars: "⭐⭐", comment: "Área de acabamento da constr. civil, PVC, Gesso, Porcel/Cerâmica.", whatsapp: "5585992363266" },
        { name: "Alberto",  service: "Pedreiro", city: "Fortaleza - CE", age: 33, stars: "⭐⭐", comment: "Área de Construção. Dedicação, Qualidade e Compromisso.", whatsapp: "5585994312887" },
        { name: "Adonias",  service: "Pedreiro", city: "Horizonte - CE", age: 42, stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável. Serviços em Geral.", whatsapp: "5585992726761" },
        { service: "Pedreiro", name: "Charles Gomes", age: 47, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "5 anos de experiência na área", whatsapp: "5585997225537" },
        //
        { name: "Ricardo Mendes", service: "Pedreiro", city: "Pacajus - CE",  age: 44, stars: "⭐⭐⭐⭐", comment: "Especialista em reformas rápidas.", whatsapp: "55859934065" },
        { name: "Lucas Oliveira", service: "Pedreiro", city: "Itaitinga - CE",  age: 35, stars: "⭐⭐⭐⭐⭐", comment: "Muito detalhista e eficiente.", whatsapp: "55859934067" },
        { name: "José Lima", service: "Pedreiro", city: "Pacajus - CE", age: 47, stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "55859913408" },
        { name: "Marcelo Nunes", service: "Pedreiro", city: "Pacajus - CE",  age: 41, stars: "⭐⭐⭐⭐", comment: "Experiente em grandes projetos.", whatsapp: "558599140659" },
        { name: "Rafael Costa", service: "Pedreiro", city: "Itaitinga - CE",  age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Ótima comunicação e execução de obra.", whatsapp: "55859140660" },
    
        //Servente
        { name: "Micael Souza", service: "Servente", age: 18, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Ajudante de Pedreiro.", whatsapp: "5585921741466" },
        //
        { name: "Eduardo Lima", service: "Servente", age: 28, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Sempre disponível para ajudar.", whatsapp: "558599140672" },
        { name: "Gabriel Costa", service: "Servente", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Responsável e organizado.", whatsapp: "558599134063" },
        { name: "Ricardo Souza", service: "Servente", age: 29, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Execução rápida e precisa.", whatsapp: "558599130674" },
        { name: "Matheus Oliveira", service: "Servente", age: 32, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência na área de construção.", whatsapp: "55859940675" },
        { name: "Felipe Mendes", service: "Servente", age: 27, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Trabalho de qualidade e dedicação.", whatsapp: "55859913406" },
        { name: "Thiago Ferreira", service: "Servente", age: 33, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Muito ágil na preparação dos materiais.", whatsapp: "55859340677" },
        { name: "Lucas Nunes", service: "Servente", age: 31, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Sempre comprometido com o trabalho.", whatsapp: "55859913406" },
        { name: "Pedro Silva", service: "Servente", age: 26, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo suporte aos pedreiros.", whatsapp: "55859913406" },
        { name: "Vinícius Ramos", service: "Servente", age: 34, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo suporte aos pedreiros.", whatsapp: "55851340679" },
    
        //Bombeiro Hidráulico
        { service: "Bombeiro Hidráulico", name: "Marcilano Costa", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Vazamentos, limpeza de caixa d'água e desentupimentos", whatsapp: "5585992531487" },
        //
        { name: "Carlos Nogueira", service: "Encanador", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiente em instalações de água e esgoto.", whatsapp: "55859940682" },
        { name: "Eduardo Ferreira", service: "Encanador", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Bom trabalho com manutenções emergenciais.", whatsapp: "55859913406" },
        { name: "Renato Costa", service: "Encanador", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ágil e eficiente em instalações prediais.", whatsapp: "55859913404" },
        { name: "Fernando Oliveira", service: "Encanador", age: 36, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Execução precisa em tubulações de água.", whatsapp: "55859340685" },
        { name: "Luciano Mendes", service: "Encanador", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Profissional dedicado e detalhista.", whatsapp: "55859913406" },
        { name: "Gustavo Duar", service: "Encanador", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "55859940687" },
        { name: "Marcos Lima", service: "Encanador", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Perito em redes hidráulicas e pressurização.", whatsapp: "55991340688" },
        { name: "Vinícius Silva", service: "Encanador", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento rápido e eficiente.", whatsapp: "55859913489" },
        { name: "Rodrigo Nunes", service: "Encanador", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Atendimento rápido e eficiente.", whatsapp: "55851340689" },
    
        //Pintor
        { name: "Luis Carlos", service: "Pintor", age: 34, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Pintura simples, em gesso, Reparo em pintura, pinturas em geral", whatsapp: "5585991757150" },
        { service: "Pintor", name: "Daniel Souza", age: 27, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "2 anos na função de pintura e manutenção de serviços.", whatsapp: "5585994148055" },
        //
        { name: "Marcos Oliveira", service: "Pintor", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Bom custo-benefício e rapidez.", whatsapp: "55859913403" },
        { name: "Ricardo Lima", service: "Pintor", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em técnicas avançadas de pintura.", whatsapp: "55851340694" },
        { name: "Fernando Souza", service: "Pintor", age: 36, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Excelência em pintura decorativa.", whatsapp: "55859913495" },
        { name: "Leonardo Mendes", service: "Pintor", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima aplicação de tintas especiais.", whatsapp: "55859910696" },
        { name: "Gustavo Ramos", service: "Pintor", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho limpo e bem organizado.", whatsapp: "55859910697" },
        { name: "Matheus Silva", service: "Pintor", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Qualidade garantida em pintura interna e externa.", whatsapp: "55859913498" },
        { name: "Vinícius Costa", service: "Pintor", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Detalhista e comprometido com prazos.", whatsapp: "55859913406" },
        { name: "Rodrigo Nunes", service: "Pintor", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Detalhista e comprometido com prazos.", whatsapp: "55859913409" },
        { name: "José Antunes", service: "Pintor", age: 43, city: "Horizonte - CE", stars: "⭐", comment: "Detalhista", whatsapp: "55859913409" },
    
        //Capinador
        { service: "Capinador", name: "Adriano Costa", age: 31, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Tenho experiência na área.", whatsapp: "5585992318130" },
        //
        { name: "Bruno Oliveira", service: "Capinador", age: 42, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho eficiente na remoção de vegetação.", whatsapp: "55859340702" },
        { name: "Carlos Mendes", service: "Capinador", age: 36, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Ótimo para manutenção de espaços agrícolas.", whatsapp: "55859913403" },
        { name: "Daniel Costa", service: "Capinador", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em limpeza de terrenos urbanos.", whatsapp: "55859940704" },
        { name: "Eduardo Nunes", service: "Capinador", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Rápido e eficiente na capinação de grandes áreas.", whatsapp: "55859913407" },
        { name: "Felipe Ramos", service: "Capinador", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "55859913407" },
        { name: "Gabriel Silva", service: "Capinador", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Sempre comprometido com a qualidade do serviço.", whatsapp: "55859940707" },
        { name: "Henrique Lima", service: "Capinador", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em áreas de difícil acesso.", whatsapp: "5585991340" },
        { name: "Igor Ferreira", service: "Capinador", age: 37, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para manutenção frequente.", whatsapp: "5585991340" },
        { name: "João Nunes", service: "Capinador", age: 45, city: "Horizonte - CE", stars: "⭐", comment: "Ótima opção para manutenção frequente.", whatsapp: "55859913409" },
    
        //Eletricista
        { name: "Roberto Evangelista", service: "Eletricista", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência na área de Eletricidade.", whatsapp: "5585981737165" },
        { service: "Eletricista", name: "Marcelo Lima", age: 30, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Eletricista Residencial e Predial.", whatsapp: "5585992726101" },
        //
        { name: "Carlos Mendes", service: "Eletricista", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiência em circuitos e sistemas elétricos.", whatsapp: "55859910713" },
        { name: "Diego Martins", service: "Eletricista", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Instalações industriais e comerciais.", whatsapp: "55859913404" },
        { name: "Fernando Costa", service: "Eletricista", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Reparos elétricos rápidos e seguros.", whatsapp: "55859913405" },
        { name: "Gustavo Pereira", service: "Eletricista", age: 43, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiência com sistemas de energia renovável.", whatsapp: "55891340716" },
        { name: "Henrique Rocha", service: "Eletricista", age: 38, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em instalações elétricas complexas.", whatsapp: "55991340717" },
        { name: "José Lima", service: "Eletricista", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Segurança e eficiência na manutenção elétrica.", whatsapp: "55859913408" },
        { name: "Ricardo Nunes", service: "Eletricista", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "55859913719" },
        { name: "Thiago Silva", service: "Eletricista", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐",  comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "5585940719" },

        //Montador de Móveis
        { name: "Naldo", service: "Montador de Móveis", age: 51, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "29 anos de experiência na área. Experiência com móveis de loja.", whatsapp: "5585992038039" },
        { name: "Felipe Araújo", service: "Montador de Móveis", age: 30, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Montagens em Geral.", whatsapp: "5588920007471" },
        { name: "Robson", service: "Montador de Móveis", age: 27, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "9 anos de Experiência na área.", whatsapp: "5585994050965" },
        { service: "Montador de Móveis", name: "Bergson Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "18 anos de experiência. Atendo em Fortaleza e Regiões metropolitanas", whatsapp: "5585994316980" },
        //
        { name: "Fernando Lima", service: "Montador de Móveis", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Montagem profissional e organização impecável.", whatsapp: "55851340725" },
        { name: "Gustavo Ramos", service: "Montador de Móveis", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "55859913407" },
        { name: "Henrique Nunes", service: "Montador de Móveis", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com todos os tipos de móveis.", whatsapp: "55851340727" },
        { name: "José Silva", service: "Montador de Móveis", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Precisão na montagem e ajustes personalizados.", whatsapp: "55891340728" },
        { name: "Ricardo Costa", service: "Montador de Móveis", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Montagem ágil sem erros.", whatsapp: "55859913409" },
        { name: "Thiago Martins", service: "Montador de Móveis", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Montagem ágil sem erros.", whatsapp: "55859340729" },
    
        //Caminhões de Frete
        { name: "Marcio", service: "Frete e Mudanças", age: 45, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Fretes rápidos e seguros para qualquer destino.", whatsapp: "5585991979580" },
        { name: "Fernando", service: "Frete e Mudanças", age: 52, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Transporte de cargas com total cuidado e eficiência.", whatsapp: "5585991450130" },
        { name: "Duilio", service: "Frete e Mudanças", age: 48, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em mudanças.", whatsapp: "5585992767286" },
        { name: "Vinicius", service: "Frete e Mudanças", age: 26, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Frete residencial com atendimento ágil.", whatsapp: "5585992324911" },
        { name: "Primo Fretes", service: "Frete e Mudanças", age: 54, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Serviço confiável.", whatsapp: "5585991557742" },
        { name: "Cristiano", service: "Frete e Mudanças", age: 47, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Carregamento seguro e entrega rápida.", whatsapp: "5585992962940" },
        //
        { name: "Henrique Rocha", service: "Frete e Mudanças", age: 41, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Motorista experiente em rotas urbanas e rurais.", whatsapp: "55859913737" },
        { name: "José Lima", service: "Frete e Mudanças", age: 44, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento pontual e profissional.", whatsapp: "55859913407" },
        { name: "Ricardo Nunes", service: "Frete e Mudanças", age: 40, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em transporte de mercadorias frágeis.", whatsapp: "55851340739" },
        { name: "Thiago Silva", service: "Frete e Mudanças", age: 46, city: "Horizonte - CE", stars: "⭐⭐", comment: "Especialista em transporte de mercadorias frágeis.", whatsapp: "55859340739" },
    
        //Diarista
        { service: "Faxineira", name: "Andreza Lima", age: 28, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Experiênte em limpezas detalhadas, pontual e organizada.", whatsapp: "5585992333281" },
        { service: "Faxineira", name: "Alexandra Reis", age: 31, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Tenho experiência como Diarista á anos com competência", whatsapp: "5585992460837" },
        { service: "Faxineira", name: "Andrea Carneiro", age: 42, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "6 anos de experiência", whatsapp: "5585989282316" },
        { service: "Faxineira", name: "Daniele Ribeiro", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Bastante experiência na área", whatsapp: "5585991738251" },
        { service: "Faxineira", name: "Emília Costa", age: 39, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Tenho experiência na área.", whatsapp: "5585989506095" },
        { service: "Faxineira", name: "Emanuele Pereira", age: 46, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "10 anos de experiência em faxinas.", whatsapp: "5575998229065" },
        
        { name: "Eduarda Nunes", service: "Faxineira", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Cuidadosa com materiais e objetos.", whatsapp: "5581340745" },
        { name: "Fernanda Ramos", service: "Faxineira", age: 37, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza rápida e eficiente.", whatsapp: "55859913407" },
        { name: "Gabriela Silva", service: "Faxineira", age: 41, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Organização e atenção aos detalhes.", whatsapp: "55991340747" },
        { name: "Helena Lima", service: "Faxineira", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Profissional dedicada e comprometida.", whatsapp: "55891340748" },
        { name: "Isabela Ferreira", service: "Faxineira", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para limpeza profunda.", whatsapp: "55991340749" },
        { name: "Juliana Nunes", service: "Faxineira", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para limpeza profunda.", whatsapp: "891340749" },
    
        //Vidraceiro
        { name: "André Sousa", service: "Vidraceiro", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Instalação de vidros temperados e laminados.", whatsapp: "55859913451" },
        { name: "Lucas Ferreira", service: "Vidraceiro", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho impecável em box e janelas.", whatsapp: "55859913402" },
        { name: "Carlos Mendes", service: "Vidraceiro", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em vidros decorativos e estruturais.", whatsapp: "55891340753" },
        { name: "Diego Souza", service: "Vidraceiro", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Montagem precisa e acabamento fino.", whatsapp: "55859913407" },
        { name: "Fernando Lima", service: "Vidraceiro", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho detalhado e resistência garantida.", whatsapp: "55859910755" },
        { name: "Gustavo Ramos", service: "Vidraceiro", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em portas de vidro e espelhos.", whatsapp: "5585991356" },
        { name: "Henrique Nunes", service: "Vidraceiro", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em fechamento de sacadas e fachadas.", whatsapp: "55851340757" },
        { name: "José Silva", service: "Vidraceiro", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Instalação segura e eficiente.", whatsapp: "55859913407" },
        { name: "Ricardo Costa", service: "Vidraceiro", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para projetos personalizados.", whatsapp: "55891340759" },
        { name: "Thiago Martins", service: "Vidraceiro", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Ótima opção para projetos personalizados.", whatsapp: "55859340759" },
    
        //Churrasqueiro
        { name: "Anderson Santos", service: "Churrasqueiro", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em churrasco tradicional e cortes nobres.", whatsapp: "55859910761" },
        { name: "Bruno Ferreira", service: "Churrasqueiro", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Churrasco com sabor único e tempero especial.", whatsapp: "55859913402" },
        { name: "Carlos Yuri", service: "Churrasqueiro", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em eventos e festas.", whatsapp: "55859913463" },
        { name: "Diego Souza", service: "Churrasqueiro", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Técnicas avançadas de grelhados.", whatsapp: "55891340764" },
        { name: "Fernando Lima", service: "Churrasqueiro", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Carnes sempre no ponto perfeito.", whatsapp: "55851340765" },
        { name: "Gustavo Ramos", service: "Churrasqueiro", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento especial para grandes churrascos.", whatsapp: "55851340766" },
        { name: "Henrique Nunes", service: "Churrasqueiro", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cortes argentinos e uruguaios.", whatsapp: "55859940767" },
        { name: "José Silva", service: "Churrasqueiro", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Tempero secreto e qualidade garantida.", whatsapp: "55859913407" },
        { name: "Ricardo Costa", service: "Churrasqueiro", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo atendimento e carnes selecionadas.", whatsapp: "55859940769" },
        { name: "Thiago Martins", service: "Churrasqueiro", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo atendimento e carnes selecionadas.", whatsapp: "5991340769" },
    
        //Piscineiro
        { name: "Marcos Vinicius", service: "Piscineiro", age: 45, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em manutenção e tratamento de piscinas.", whatsapp: "55859913400" },
        { name: "Lucas Oliveira", service: "Piscineiro", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza completa e cuidados com produtos químicos.", whatsapp: "55859913408" },
        { name: "Fernando Silva", service: "Piscineiro", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em piscinas residenciais e comerciais.", whatsapp: "55859913432" },
        { name: "André Souza", service: "Piscineiro", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Verificação de filtros e sistemas de bombeamento.", whatsapp: "55859913408" },
        { name: "Diego Rocha", service: "Piscineiro", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Tratamento especializado contra algas e bactérias.", whatsapp: "55859940834" },
        { name: "Rafael Lima", service: "Piscineiro", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Teste e equilíbrio do pH da água.", whatsapp: "5585991340" },
        { name: "Marcelo Costa", service: "Piscineiro", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Instalação e manutenção de aquecedores de piscina.", whatsapp: "55859340836" },
        { name: "João Nunes", service: "Piscineiro", age: 43, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Reparos em azulejos e revestimentos.", whatsapp: "55859913408" },
        { name: "Pedro Almeida", service: "Piscineiro", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza de bordas e áreas externas.", whatsapp: "55859913408" },
        { name: "Gabriel Santos", service: "Piscineiro", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Limpeza de bordas e áreas externas.", whatsapp: "55859913838" },
    
        //Tecnico em Arcondicionado
        { name: "Maycon", service: "Tec. em Ar Condicionado", age: 22, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Experiência de 2 anos, trabalho com máquinas Split, piso teto e Cassete.", whatsapp: "5585994088415" },
        { name: "Matheus Alves", service: "Tec. em Ar Condicionado", age: 21, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "4 anos de Exp. na área de Ar Condicionado. Split e Máquinas de lavar.", whatsapp: "5585992081178" },
        { service: "Tec. em Refrigeração", name: "Adriano", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Mecânico de ar condicionado instalação, manutenção e conserto.", whatsapp: "5585991368616" },
        //
        { name: "André Souza", service: "Tec. em Ar Condicionado", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção preventiva de equipamentos de refrigeração.", whatsapp: "55859940783" },
        { name: "Diego Rocha", service: "Tec. em Ar Condicionado", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em gás refrigerante e carga térmica.", whatsapp: "55859910784" },
        { name: "Rafael Lima", service: "Tec. em Ar Condicionado", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Instalação de sistemas split e central de ar.", whatsapp: "55859913407" },
        { name: "Marcelo Costa", service: "Tec. em Ar Condicionado", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção corretiva para equipamentos industriais.", whatsapp: "55859910786" },
        { name: "João Nunes", service: "Tec. em Ar Condicionado", age: 43, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Diagnóstico de falhas e eficiência energética.", whatsapp: "55859913407" },
        { name: "Pedro Almeida", service: "Tec. em Ar Condicionado", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "55859913407" },
        { name: "Gabriel Santos", service: "Tec. em Ar Condicionado", age: 40, city: "Horizonte - CE", stars: "⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "55859913407" },
    
        //Metalurgico
        { name: "Gabriel", service: "Metalúrgico", age: 35, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em fabricação de peças metálicas sob medida.", whatsapp: "5585992768448" },
        //
        { name: "Lucas Oliveira", service: "Metalúrgico", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em soldagem e corte industrial.", whatsapp: "55859913407" },
        { name: "Fernando Silva", service: "Metalúrgico", age: 42, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalha com fundição e tratamento térmico de metais.", whatsapp: "55991340792" },
        { name: "André Souza", service: "Metalúrgico", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em corte a plasma e moldagem de aço.", whatsapp: "55859913493" },
        { name: "Diego Rocha", service: "Metalúrgico", age: 39, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Montagem e manutenção de estruturas metálicas.", whatsapp: "55859913404" },
        { name: "Rafael Lima", service: "Metalúrgico", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Tratamento superficial e acabamento de metais.", whatsapp: "55859913405" },
        { name: "Marcelo Costa", service: "Metalúrgico", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Soldagem MIG, TIG e elétrica para projetos industriais.", whatsapp: "591340796" },
        { name: "João Nunes", service: "Metalúrgico", age: 43, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Fundição de metais não ferrosos e técnicas avançadas.", whatsapp: "55851340797" },
        { name: "Pedro Almeida", service: "Metalúrgico", age: 35, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em corte laser e estampagem.", whatsapp: "55859913408" },
        { name: "Gabriel Santos", service: "Metalúrgico", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Especialista em corte laser e estampagem.", whatsapp: "55859913498" },
    
        //Cuidador de Animais
        { name: "Ana Souza", service: "Cuidador(a) de Animais", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cuidados e alimentação de pets.", whatsapp: "55859913800" },
        { name: "Antônia Almeida", service: "Cuidador(a) de Animais", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Passeios e entretenimento para cães e gatos.", whatsapp: "55859910801" },
        { name: "Camila Mendes", service: "Cuidador(a) de Animais", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Excelência no trato com animais de todas as idades.", whatsapp: "55891340802" },
        { name: "Daniela Martins", service: "Cuidador(a) de Animais", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com cuidados especiais e administração de medicamentos.", whatsapp: "55859940803" },
        { name: "Fernanda Almeida", service: "Cuidador(a) de Animais", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Treinamento básico e socialização de filhotes.", whatsapp: "55859913804" },
        { name: "Gabriela Pereira", service: "Cuidador(a) de Animais", age: 39, city: "Itaitinga - CE", stars: "⭐⭐", comment: "Treinamento básico e socialização de filhotes.", whatsapp: "55859940804" },
   
        //Cabelereiro á Domicilio
        { name: "Francisco Romario", service: "Cabeleireiro a Domicilio", age: 31, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "3 anos de Experiência", whatsapp: "5585987494767" },
        //
        { name: "Carlos Costa", service: "Cabeleireiro a Domicilio", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e reconstrução capilar.", whatsapp: "55859913408" },
        { name: "Camila Mendes", service: "Cabeleireiro a Domicilio", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em penteados para eventos e casamentos.", whatsapp: "55859910812" },
        { name: "Daniela Martins", service: "Cabeleireiro a Domicilio", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Cortes personalizados e estilo exclusivo.", whatsapp: "55859913408" },
        { name: "Fernanda Almeida", service: "Cabeleireiro a Domicilio", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Cortes personalizados e estilo exclusivo.", whatsapp: "55859913403" },
   
        //Manicure á Domicilio
        { name: "Renata Rodrigues", service: "Manicure a Domicilio", age: 31, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "4 anos de experiência da área", whatsapp: "5585992272181" },
        //
        { name: "Bruna Costa", service: "Manicure a Domicilio", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e cuidado especial para as unhas.", whatsapp: "55859913408" },
        { name: "Camila Mendes", service: "Manicure a Domicilio", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Experiência em unhas de gel, acrílico e fibra de vidro.", whatsapp: "55859340822" },
        { name: "Daniela Martins", service: "Manicure a Domicilio", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Alongamento de unhas e técnicas de nail art personalizadas.", whatsapp: "55891340823" },

        //Designer 
        { name: "Mondesson Linardis", service: "Designer", age: 29, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "3 anos de experiência em design e redes sociais, tenho uma gráfica há 5 meses.", whatsapp: "5585991774021" },
        { service: "Designer", name: "Mateus Santos", age: 26, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência como designer na grafica Connect.com e designer Autônomo á 5 anos.", whatsapp: "5585992975877" },

        //Adestramento
        { name: "César Freire", service: "Adestrador", age: 41, city: "Aquiraz - CE", stars: "⭐⭐⭐⭐", comment: "Adestrador de cães há 10 anos. Hospedagem, Taxi Dog, DayCare/Creche", whatsapp: "5585991661174" },

        //Costureira
 
       
        //Marceneiro
        { service: "Marceneiro", name: "Halison Santos", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "A mais de 12 anos ná área de Móveis Planejados", whatsapp: "5585991893493" },
 

        //Chaveiro
        { service: "Chaveiro", name: "André Batista", age: 50, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "10 anos de chaveiro / Técnico Mecânico", whatsapp: "5585992438122" },
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

    fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            profissionalId: event.target.getAttribute("data-id"),
            nomeProfissional: event.target.getAttribute("data-nome")
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