document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("estado").addEventListener("change", function() {
        const estadoSelecionado = this.value;
        const cidadeSelect = document.getElementById("cidade");

        if (!estadoSelecionado) {
            console.error("Nenhum estado selecionado!");
            return;
        }

        console.log(`Buscando cidades para o estado: ${estadoSelecionado}`);

        cidadeSelect.innerHTML = '<option value="" disabled selected>Carregando cidades...</option>';

        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
            .then(response => {
                if (!response.ok) throw new Error("Erro ao acessar a API do IBGE");
                return response.json();
            })
            .then(data => {
                console.log("Dados recebidos da API:", data);

                cidadeSelect.innerHTML = '<option value="" disabled selected>Selecione a cidade</option>';
                data.forEach(municipio => {
                    const option = document.createElement("option");
                    option.value = municipio.nome;
                    option.textContent = municipio.nome;
                    cidadeSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Erro ao carregar cidades:", error);
                cidadeSelect.innerHTML = '<option value="" disabled selected>Erro ao carregar cidades</option>';
            });
    });

    // ✅ Enviar Estado, Cidade e Profissão para o WhatsApp
document.getElementById("cadastro-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const experiencia = document.getElementById("experiencia").value;
    const estado = document.getElementById("estado").options[document.getElementById("estado").selectedIndex].text;
    const cidade = document.getElementById("cidade").options[document.getElementById("cidade").selectedIndex].text;
    const profissao = document.getElementById("profissao").options[document.getElementById("profissao").selectedIndex].text;
    const indicador = document.getElementById("indicador").value;

    if (nome && idade && experiencia && estado && cidade && profissao) {
        // 🚀 Redireciona para a página de pagamento com os dados no URL
        const paymentURL = `pagamento.html?nome=${encodeURIComponent(nome)}&idade=${idade}&experiencia=${encodeURIComponent(experiencia)}&estado=${encodeURIComponent(estado)}&cidade=${encodeURIComponent(cidade)}&profissao=${encodeURIComponent(profissao)}`;
        
        window.location.href = paymentURL;
    } else {
        alert("Por favor, preencha todos os campos antes de prosseguir!");
    }
   });
});

function removeFocusAndGoBack() {
    const nomeInput = document.getElementById("nome");
    nomeInput.setAttribute("readonly", "true"); // Impede que receba foco antes de sair

    setTimeout(() => {
        window.location.href = "index.html";
    }, 100); // Redireciona sem dar tempo do teclado aparecer
}

document.getElementById("experiencia").addEventListener("input", function () {
    const limite = 60;
    const atual = this.value.length;
    document.getElementById("contador").textContent = `${atual}/${limite}`;
});