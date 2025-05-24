document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const selectedName = params.get("name");

    if (!selectedName) {
        document.getElementById("professional-card").innerHTML = "<p>Profissional não encontrado.</p>";
        return;
    }

    // Lista de profissionais
    const professionals = [
        //Pedreiro
        { name: "Leonardo", city: "Fortaleza - CE", age: 28, stars: "⭐⭐⭐", comment: "Pedreiro, Mestre de obra profissional. Entendo de projetos.", whatsapp: "5585988559085" },
        { name: "Edilcimar Frazão", city: "Fortaleza - CE", age: 53, stars: "⭐⭐", comment: "Área de acabamento da constr. civil, PVC, Gesso, Porcel/Cerâmica.", whatsapp: "5585992363266" },
        { name: "Alberto", city: "Fortaleza - CE", age: 33, stars: "⭐⭐", comment: "Área de Construção. Dedicação, Qualidade e Compromisso.", whatsapp: "5585994312887" },
        { name: "Adonias", city: "Horizonte - CE", age: 42, stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável. Serviços em Geral.", whatsapp: "5585992726761" },
        { name: "Paulo Souza", city: "Itaitinga - CE", age: 39, stars: "⭐⭐⭐", comment: "Bom acabamento e rapidez.", whatsapp: "558599134065" },
        { name: "Ricardo Mendes", city: "Pacajus - CE", age: 44, stars: "⭐⭐⭐⭐", comment: "Especialista em reformas rápidas.", whatsapp: "558599340656" },
        { name: "Lucas Oliveira", city: "Itaitinga - CE", age: 35, stars: "⭐⭐⭐⭐⭐", comment: "Muito detalhista e eficiente.", whatsapp: "558599340657" },
        { name: "José Lima", city: "Pacajus - CE", age: 47, stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "558599134068" },
        { name: "Marcelo Nunes", city: "Pacajus - CE", age: 41, stars: "⭐⭐⭐⭐", comment: "Experiente em grandes projetos.", whatsapp: "558599140659" },
        { name: "Rafael Costa", city: "Itaitinga - CE", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Ótima comunicação e execução de obra.", whatsapp: "558599140660" },
    
    
            //Servente
        { name: "André Santos", age: 30, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ágil e eficiente na obra.", whatsapp: "5585991340671" },
        { name: "Eduardo Lima", age: 28, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Sempre disponível para ajudar.", whatsapp: "5585991340672" },
        { name: "Gabriel Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Responsável e organizado.", whatsapp: "5585991340673" },
        { name: "Ricardo Souza", age: 29, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Execução rápida e precisa.", whatsapp: "5585991340674" },
        { name: "Matheus Oliveira", age: 32, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência na área de construção.", whatsapp: "5585991340675" },
        { name: "Felipe Mendes", age: 27, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Trabalho de qualidade e dedicação.", whatsapp: "5585991340676" },
        { name: "Thiago Ferreira", age: 33, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Muito ágil na preparação dos materiais.", whatsapp: "5585991340677" },
        { name: "Lucas Nunes", age: 31, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Sempre comprometido com o trabalho.", whatsapp: "5585991340678" },
        { name: "Pedro Silva", age: 26, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo suporte aos pedreiros.", whatsapp: "5585991340679" },
        { name: "Vinícius Ramos", age: 34, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo suporte aos pedreiros.", whatsapp: "5585991340679" },
    
        //Bombeiro Hidráulico
        { name: "Alberto Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em encanamentos e reparos hidráulicos.", whatsapp: "5585991340681" },
        { name: "Carlos Nogueira", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiente em instalações de água e esgoto.", whatsapp: "5585991340682" },
        { name: "Eduardo Ferreira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Bom trabalho com manutenções emergenciais.", whatsapp: "5585991340683" },
        { name: "Renato Costa", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ágil e eficiente em instalações prediais.", whatsapp: "5585991340684" },
        { name: "Fernando Oliveira", age: 36, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Execução precisa em tubulações de água.", whatsapp: "5585991340685" },
        { name: "Luciano Mendes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Profissional dedicado e detalhista.", whatsapp: "5585991340686" },
        { name: "Gustavo Ramos", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "5585991340687" },
        { name: "Marcos Lima", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Perito em redes hidráulicas e pressurização.", whatsapp: "5585991340688" },
        { name: "Vinícius Silva", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento rápido e eficiente.", whatsapp: "5585991340689" },
        { name: "Rodrigo Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Atendimento rápido e eficiente.", whatsapp: "5585991340689" },
    
        //Pintor
        { name: "Luis Carlos", age: 34, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Pintura simples, em gesso, Reparo em pintura, pinturas em geral", whatsapp: "5585991757150" },
        { name: "Antonio Nunes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho impecável e acabamento fino.", whatsapp: "5585991340692" },
        { name: "Marcos Oliveira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Bom custo-benefício e rapidez.", whatsapp: "5585991340693" },
        { name: "Ricardo Lima", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em técnicas avançadas de pintura.", whatsapp: "5585991340694" },
        { name: "Fernando Souza", age: 36, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Excelência em pintura decorativa.", whatsapp: "5585991340695" },
        { name: "Leonardo Mendes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima aplicação de tintas especiais.", whatsapp: "5585991340696" },
        { name: "Gustavo Ramos", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho limpo e bem organizado.", whatsapp: "5585991340697" },
        { name: "Matheus Silva", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Qualidade garantida em pintura interna e externa.", whatsapp: "5585991340698" },
        { name: "Vinícius Costa", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Detalhista e comprometido com prazos.", whatsapp: "5585991340699" },
        { name: "Rodrigo Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Detalhista e comprometido com prazos.", whatsapp: "5585991340699" },
        { name: "José Antunes", age: 43, city: "Horizonte - CE", stars: "⭐", comment: "Detalhista", whatsapp: "5585991340699" },
    
        //Capinador
        { name: "Anderson Santos", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em limpeza de terrenos e áreas verdes.", whatsapp: "5585991340701" },
        { name: "Bruno Oliveira", age: 42, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho eficiente na remoção de vegetação.", whatsapp: "5585991340702" },
        { name: "Carlos Mendes", age: 36, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Ótimo para manutenção de espaços agrícolas.", whatsapp: "5585991340703" },
        { name: "Daniel Costa", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em limpeza de terrenos urbanos.", whatsapp: "5585991340704" },
        { name: "Eduardo Nunes", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Rápido e eficiente na capinação de grandes áreas.", whatsapp: "5585991340705" },
        { name: "Felipe Ramos", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "5585991340706" },
        { name: "Gabriel Silva", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Sempre comprometido com a qualidade do serviço.", whatsapp: "5585991340707" },
        { name: "Henrique Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em áreas de difícil acesso.", whatsapp: "5585991340708" },
        { name: "Igor Ferreira", age: 37, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para manutenção frequente.", whatsapp: "5585991340709" },
        { name: "João Nunes", age: 45, city: "Horizonte - CE", stars: "⭐", comment: "Ótima opção para manutenção frequente.", whatsapp: "5585991340709" },
    
        //Eletricista
        { name: "Roberto Evangelista", age: 39, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência na área de Eletricidade.", whatsapp: "5585981737165" },
        { name: "Bruno Almeida", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção e reparos elétricos eficientes.", whatsapp: "5585991340712" },
        { name: "Carlos Mendes", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiência em circuitos e sistemas elétricos.", whatsapp: "5585991340713" },
        { name: "Diego Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Instalações industriais e comerciais.", whatsapp: "5585991340714" },
        { name: "Fernando Costa", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Reparos elétricos rápidos e seguros.", whatsapp: "5585991340715" },
        { name: "Gustavo Pereira", age: 43, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiência com sistemas de energia renovável.", whatsapp: "5585991340716" },
        { name: "Henrique Rocha", age: 38, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em instalações elétricas complexas.", whatsapp: "5585991340717" },
        { name: "José Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Segurança e eficiência na manutenção elétrica.", whatsapp: "5585991340718" },
        { name: "Ricardo Nunes", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "5585991340719" },
        { name: "Thiago Silva", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐",  comment: "Instalação de painéis elétricos e quadros de distribuição.", whatsapp: "5585991340719" },

        //Montador de Móveis
        { name: "Naldo", age: 51, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "29 anos de experiência na área. Experiência com móveis de loja.", whatsapp: "5585992038039" },
        { name: "Bruno Ferreira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Montagem rápida e precisa.", whatsapp: "5585991340722" },
        { name: "Carlos", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em móveis residenciais e comerciais.", whatsapp: "5585991340723" },
        { name: "Diego Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo acabamento e dedicação.", whatsapp: "5585991340724" },
        { name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Montagem profissional e organização impecável.", whatsapp: "5585991340725" },
        { name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Garantia de serviço bem executado.", whatsapp: "5585991340726" },
        { name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com todos os tipos de móveis.", whatsapp: "5585991340727" },
        { name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Precisão na montagem e ajustes personalizados.", whatsapp: "5585991340728" },
        { name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Montagem ágil sem erros.", whatsapp: "5585991340729" },
        { name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Montagem ágil sem erros.", whatsapp: "5585991340729" },
    
        //Caminhões de Frete
        { name: "Marcio", age: 45, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Fretes rápidos e seguros para qualquer destino.", whatsapp: "5585991979580" },
        { name: "Fernando", age: 52, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Transporte de cargas com total cuidado e eficiência.", whatsapp: "5585991450130" },
        { name: "Duilio", age: 48, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em mudanças.", whatsapp: "5585992767286" },
        { name: "Vinicius", age: 26, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Frete residencial com atendimento ágil.", whatsapp: "5585992324911" },
        { name: "Primo Fretes", age: 54, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Serviço confiável.", whatsapp: "5585991557742" },
        { name: "Cristiano", age: 47, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Carregamento seguro e entrega rápida.", whatsapp: "5585992962940" },
        { name: "Henrique Rocha", age: 41, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Motorista experiente em rotas urbanas e rurais.", whatsapp: "5585991340737" },
        { name: "José Lima", age: 44, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento pontual e profissional.", whatsapp: "5585991340738" },
        { name: "Ricardo Nunes", age: 40, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em transporte de mercadorias frágeis.", whatsapp: "5585991340739" },
        { name: "Thiago Silva", age: 46, city: "Horizonte - CE", stars: "⭐⭐", comment: "Especialista em transporte de mercadorias frágeis.", whatsapp: "5585991340739" },
    
        //Diarista
        { name: "Andreza Lima", age: 28, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiênte em limpezas detalhadas, pontual e organizada.", whatsapp: "5585992333281" },
        //
        { name: "Beatriz Lima", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em casas e escritórios.", whatsapp: "5585991340742" },
        { name: "Carlos Mendes", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Pontualidade e eficiência garantidas.", whatsapp: "5585991340743" },
        { name: "Daniela Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em limpezas detalhadas.", whatsapp: "5585991340744" },
        { name: "Eduarda Nunes", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Cuidadosa com materiais e objetos.", whatsapp: "5585991340745" },
        { name: "Fernanda Ramos", age: 37, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza rápida e eficiente.", whatsapp: "5585991340746" },
        { name: "Gabriela Silva", age: 41, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Organização e atenção aos detalhes.", whatsapp: "5585991340747" },
        { name: "Helena Lima", age: 40, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Profissional dedicada e comprometida.", whatsapp: "5585991340748" },
        { name: "Isabela Ferreira", age: 34, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para limpeza profunda.", whatsapp: "5585991340749" },
        { name: "Juliana Nunes", age: 43, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para limpeza profunda.", whatsapp: "5585991340749" },
    
        //Vidraceiro
        { name: "André Sousa", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Instalação de vidros temperados e laminados.", whatsapp: "5585991340751" },
        { name: "Bruno Ferreira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho impecável em box e janelas.", whatsapp: "5585991340752" },
        { name: "Carlos Mendes", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em vidros decorativos e estruturais.", whatsapp: "5585991340753" },
        { name: "Diego Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Montagem precisa e acabamento fino.", whatsapp: "5585991340754" },
        { name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalho detalhado e resistência garantida.", whatsapp: "5585991340755" },
        { name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em portas de vidro e espelhos.", whatsapp: "5585991340756" },
        { name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em fechamento de sacadas e fachadas.", whatsapp: "5585991340757" },
        { name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Instalação segura e eficiente.", whatsapp: "5585991340758" },
        { name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótima opção para projetos personalizados.", whatsapp: "5585991340759" },
        { name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Ótima opção para projetos personalizados.", whatsapp: "5585991340759" },
    
        //Churrasqueiro
        { name: "Anderson Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em churrasco tradicional e cortes nobres.", whatsapp: "5585991340761" },
        { name: "Bruno Ferreira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Churrasco com sabor único e tempero especial.", whatsapp: "5585991340762" },
        { name: "Carlos Yuri", age: 45, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Experiência em eventos e festas.", whatsapp: "5585991340763" },
        { name: "Diego Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Técnicas avançadas de grelhados.", whatsapp: "5585991340764" },
        { name: "Fernando Lima", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Carnes sempre no ponto perfeito.", whatsapp: "5585991340765" },
        { name: "Gustavo Ramos", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Atendimento especial para grandes churrascos.", whatsapp: "5585991340766" },
        { name: "Henrique Nunes", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cortes argentinos e uruguaios.", whatsapp: "5585991340767" },
        { name: "José Silva", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Tempero secreto e qualidade garantida.", whatsapp: "5585991340768" },
        { name: "Ricardo Costa", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo atendimento e carnes selecionadas.", whatsapp: "5585991340769" },
        { name: "Thiago Martins", age: 44, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Ótimo atendimento e carnes selecionadas.", whatsapp: "5585991340769" },
    
        //Piscineiro
        { name: "Marcos Vinicius", age: 45, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em manutenção e tratamento de piscinas.", whatsapp: "5585991340830" },
        { name: "Lucas Oliveira", age: 38, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza completa e cuidados com produtos químicos.", whatsapp: "5585991340831" },
        { name: "Fernando Silva", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em piscinas residenciais e comerciais.", whatsapp: "5585991340832" },
        { name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Verificação de filtros e sistemas de bombeamento.", whatsapp: "5585991340833" },
        { name: "Diego Rocha", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Tratamento especializado contra algas e bactérias.", whatsapp: "5585991340834" },
        { name: "Rafael Lima", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Teste e equilíbrio do pH da água.", whatsapp: "5585991340835" },
        { name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Instalação e manutenção de aquecedores de piscina.", whatsapp: "5585991340836" },
        { name: "João Nunes", age: 43, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Reparos em azulejos e revestimentos.", whatsapp: "5585991340837" },
        { name: "Pedro Almeida", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Limpeza de bordas e áreas externas.", whatsapp: "5585991340838" },
        { name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Limpeza de bordas e áreas externas.", whatsapp: "5585991340838" },
    
        //Tecnico em Arcondicionado
        { name: "Maycon", age: 22, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Experiência de 2 anos, trabalho com máquinas Split, piso teto e Cassete.", whatsapp: "5585994088415" },
        { name: "Matheus Alves", age: 21, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "4 anos de Exp. na área de Ar Condicionado. Split e Máquinas de lavar.", whatsapp: "5585992081178" },
        { name: "Fernando Silva", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Reparo e limpeza de sistemas de refrigeração comercial.", whatsapp: "5585991340782" },
        { name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção preventiva de equipamentos de refrigeração.", whatsapp: "5585991340783" },
        { name: "Diego Rocha", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em gás refrigerante e carga térmica.", whatsapp: "5585991340784" },
        { name: "Rafael Lima", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Instalação de sistemas split e central de ar.", whatsapp: "5585991340785" },
        { name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Manutenção corretiva para equipamentos industriais.", whatsapp: "5585991340786" },
        { name: "João Nunes", age: 43, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Diagnóstico de falhas e eficiência energética.", whatsapp: "5585991340787" },
        { name: "Pedro Almeida", age: 35, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "5585991340788" },
        { name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐", comment: "Especialista em refrigeração automotiva.", whatsapp: "5585991340788" },
    
        //Metalurgico
        { name: "Gabriel", age: 35, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência em fabricação de peças metálicas sob medida.", whatsapp: "5585992768448" },
        { name: "Lucas Oliveira", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em soldagem e corte industrial.", whatsapp: "5585991340791" },
        { name: "Fernando Silva", age: 42, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Trabalha com fundição e tratamento térmico de metais.", whatsapp: "5585991340792" },
        { name: "André Souza", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em corte a plasma e moldagem de aço.", whatsapp: "5585991340793" },
        { name: "Diego Rocha", age: 39, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Montagem e manutenção de estruturas metálicas.", whatsapp: "5585991340794" },
        { name: "Rafael Lima", age: 41, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Tratamento superficial e acabamento de metais.", whatsapp: "5585991340795" },
        { name: "Marcelo Costa", age: 36, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Soldagem MIG, TIG e elétrica para projetos industriais.", whatsapp: "5585991340796" },
        { name: "João Nunes", age: 43, city: "Pacajus - CE", stars: "⭐⭐⭐⭐⭐", comment: "Fundição de metais não ferrosos e técnicas avançadas.", whatsapp: "5585991340797" },
        { name: "Pedro Almeida", age: 35, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em corte laser e estampagem.", whatsapp: "5585991340798" },
        { name: "Gabriel Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Especialista em corte laser e estampagem.", whatsapp: "5585991340798" },
    
        //Cuidador de Animais
        { name: "Ana Souza", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cuidados e alimentação de pets.", whatsapp: "5585991340800" },
        { name: "Antônia Almeida", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Passeios e entretenimento para cães e gatos.", whatsapp: "5585991340801" },
        { name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Excelência no trato com animais de todas as idades.", whatsapp: "5585991340802" },
        { name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Experiência com cuidados especiais e administração de medicamentos.", whatsapp: "5585991340803" },
        { name: "Fernanda Almeida", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Treinamento básico e socialização de filhotes.", whatsapp: "5585991340804" },
        { name: "Gabriela Pereira", age: 39, city: "Itaitinga - CE", stars: "⭐⭐", comment: "Treinamento básico e socialização de filhotes.", whatsapp: "5585991340804" },
   
        //Cabelereiro á Domicilio
        { name: "Anna Santos", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em cortes modernos e coloração.", whatsapp: "5585991340810" },
        { name: "Bruna Costa", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e reconstrução capilar.", whatsapp: "5585991340811" },
        { name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em penteados para eventos e casamentos.", whatsapp: "5585991340812" },
        { name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Cortes personalizados e estilo exclusivo.", whatsapp: "5585991340813" },
        { name: "Fernanda Almeida", age: 42, city: "Pacajus - CE", stars: "⭐⭐⭐", comment: "Cortes personalizados e estilo exclusivo.", whatsapp: "5585991340813" },
   
        //Manicure á Domicilio
        { name: "Ana Souza", age: 40, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Especialista em unhas decoradas e esmaltação profissional.", whatsapp: "5585991340820" },
        { name: "Bruna Costa", age: 38, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Hidratação profunda e cuidado especial para as unhas.", whatsapp: "5585991340821" },
        { name: "Camila Mendes", age: 45, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐", comment: "Experiência em unhas de gel, acrílico e fibra de vidro.", whatsapp: "5585991340822" },
        { name: "Daniela Martins", age: 37, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Alongamento de unhas e técnicas de nail art personalizadas.", whatsapp: "5585991340823" },

        //Designer 
        { name: "Mondesson Linardis", age: 29, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "3 anos de experiência em design e redes sociais, tenho uma gráfica há 5 meses.", whatsapp: "5585991774021" },

        //Adestramento
        { name: "César Freire", age: 41, city: "Aquiraz - CE", stars: "⭐⭐⭐⭐", comment: "Adestrador de cães há 10 anos. Hospedagem, Taxi Dog, DayCare/Creche", whatsapp: "5585991661174" },
    ];

    // Lista de profissionais destacados
    const highlightedProfessionals = new Set([ "Andreza Lima","César Freire","Matheus Alves", "Adonias", "Roberto Evangelista","Gabriel", "Fernando", "Cristiano", "Marcio","Primo Fretes", "Vinicius", "Maycon"
    ]);

    
    // Encontrar o profissional selecionado
    const professional = professionals.find(p => p.name.trim() === selectedName.trim());

    if (professional) {
        const whatsappLink = `https://api.whatsapp.com/send?phone=${professional.whatsapp}&text=Olá, vim por meio da Auza Services, gostaria de realizar um orçamento de serviço.`;

        // Verifica se o profissional está na lista de destaques
        const isHighlighted = highlightedProfessionals.has(professional.name.trim());
        const highlightedClass = isHighlighted ? "highlighted" : "";
        const nameClass = isHighlighted ? "highlighted-name" : ""; // Agora o nome tem estilo especial

        document.getElementById("professional-card").innerHTML = `
            <div class="card ${highlightedClass}">
                <h3 class="${nameClass}">${professional.name}</h3>
                <p>${professional.city}</p>
                <p>Idade: ${professional.age} anos</p>
                <p>Avaliação: ${professional.stars}</p>
                <p>${professional.comment}</p>
                <a class="whatsapp-button" href="${whatsappLink}" target="_blank"> Contato via WhatsApp</a>
            </div>
        `;

// Adiciona funcionalidade ao botão de compartilhar
document.getElementById("shareButton").addEventListener("click", async () => {
    const shareData = {
        title: "Seu profissional ideal está aqui!",
        text: "Confira esse profissional incrível!",
        url: window.location.href
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
    } else {
        document.getElementById("professional-card").innerHTML = "<p>Profissional não encontrado.</p>";
    }
});

document.getElementById("shareButton").addEventListener("click", function () {
    const cardElement = document.getElementById("professional-card");

    if (!cardElement) {
        console.error("Erro: O elemento #professional-card não foi encontrado.");
        return;
    }
});