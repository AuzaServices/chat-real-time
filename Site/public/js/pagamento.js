document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const nome = urlParams.get("nome") || "Nome não informado";
    const sobrenome = urlParams.get("sobrenome") || ""; 
    const nomeCompleto = sobrenome ? `${nome} ${sobrenome}` : nome;
    const idade = urlParams.get("idade") || "Idade não informada";
    const experiencia = urlParams.get("experiencia") || "Experiência não informada";
    const estado = urlParams.get("estado") || "Estado não informado";
    const cidade = urlParams.get("cidade") || "Cidade não informada";
    const profissao = urlParams.get("profissao") || "Profissão não informada";
    const indicador = urlParams.get("indicador") || "Não fui indicado(a)"; // 🔥 Agora o indicador está garantido!
    const whatsappNumero = "5585991340658"; // 🔥 Seu número atualizado

    const cidadeEstado = cidade && estado ? `${cidade} - ${estado}` : "";


    // ✅ Exibir o indicador na página de pagamento
    const indicadorEl = document.getElementById("indicadorPagamento");
    if (indicadorEl) {
        indicadorEl.textContent = `Indicado por: ${indicador}`;
    } else {
        console.warn("⚠️ O elemento para exibir o indicador não foi encontrado. Verifique se ele existe no HTML.");
    }

const nomePrataEl = document.getElementById("nomePrata");
const cidadeEstadoPrataEl = document.getElementById("cidadeEstadoPrata");
const comentarioPrataEl = document.getElementById("comentarioPrata");

const nomeDouradoEl = document.getElementById("nomeDourado");
const cidadeEstadoDouradoEl = document.getElementById("cidadeEstadoDourado");
const comentarioDouradoEl = document.getElementById("comentarioDourado");

// ✅ Exibir o nome completo nos cartões
if (nomePrataEl) nomePrataEl.innerHTML = `<strong>${nomeCompleto}</strong>`;
if (cidadeEstadoPrataEl) cidadeEstadoPrataEl.textContent = cidadeEstado;
if (comentarioPrataEl) comentarioPrataEl.textContent = experiencia;

if (nomeDouradoEl) nomeDouradoEl.innerHTML = `<strong>${nomeCompleto}</strong>`;
if (cidadeEstadoDouradoEl) cidadeEstadoDouradoEl.textContent = cidadeEstado;
if (comentarioDouradoEl) comentarioDouradoEl.textContent = experiencia;

// 🔥 Adiciona um console.log para verificar se o nome completo está certo
console.log("Nome Completo Capturado:", nomeCompleto);

    let tipoCartaoSelecionado = ""; // 🔥 Variável para armazenar o cartão escolhido

    document.getElementById("cardPrata").addEventListener("click", function () {
        selecionarCartao("prata");
    });

    document.getElementById("cardDourado").addEventListener("click", function () {
        selecionarCartao("dourado");
    });

    function selecionarCartao(tipo) {
        tipoCartaoSelecionado = tipo; // 🔥 Define qual cartão foi escolhido
        document.getElementById("cardPrata").classList.remove("selected");
        document.getElementById("cardDourado").classList.remove("selected");

        const cardSelecionado = tipo === "prata" ? document.getElementById("cardPrata") : document.getElementById("cardDourado");
        cardSelecionado.classList.add("selected");

        mostrarVantagens(tipo);
    }

    function mostrarVantagens(tipo) {
        const vantagens = {
            prata: `<h3>Sem custo: AuzaFree</h3>
                    <ul id="listaVantagensPrata">
                        <li>✅ Cadastro 100% Gratuito</li>
                        <li>✅ Presença na plataforma</li>
                        <li>✅ Cadastro simples</li>
                        <li id="vantagemMisteriosaBtn" style="cursor: pointer;">➡️ Auza Rewards (Clique Aqui)</li>
                        <li>ℹ️ Taxa de 10% por serviço realizado</li>
                    </ul>`,
            dourado: `<h3>Vantagens de ser AuzaGold:</h3>
                      <ul>
                          <li>🏆 Mais chance de ser contratado</li>
                          <li>🏆 Destaque na plataforma</li>
                          <li>🏆 Mais visibilidade</li>
                          <li>🏆 Maior Credibilidade</li>
                          <li>🏆 Contato prioritário</li>
                          <li id="vantagemMisteriosaBtn" style="cursor: pointer;">➡️ Auza Rewards (Clique Aqui)</li>
                          <li>ℹ️ Taxa de 10% por serviço realizado</li>
                      </ul>`
        };

        const vantagensContainer = document.getElementById("vantagens-container");
        vantagensContainer.innerHTML = vantagens[tipo];
        vantagensContainer.style.display = "block";

        setTimeout(() => {
            vantagensContainer.style.opacity = 1;
        }, 100);

        // 🔥 Adiciona evento de clique na vantagem misteriosa
        if (tipo === "prata") {
            setTimeout(() => {
                const vantagemMisteriosaBtn = document.getElementById("vantagemMisteriosaBtn");
                if (vantagemMisteriosaBtn) {
                    vantagemMisteriosaBtn.addEventListener("click", mostrarVantagemMisteriosa);
                }
            }, 200);
        }
    }

    function mostrarVantagemMisteriosa() {
        let vantagemBox = document.getElementById("vantagem-misteriosa");

        if (!vantagemBox) {
            vantagemBox = document.createElement("div");
            vantagemBox.id = "vantagem-misteriosa";
            vantagemBox.innerHTML = "<p>💎 Indique 5 profisisonais para a plataforma e ganhe 30 dias de AuzaGold!</p>";
            document.body.appendChild(vantagemBox);
        }

        vantagemBox.style.display = "block";

        setTimeout(() => {
            document.addEventListener("click", function removerVantagem(event) {
                if (!vantagemBox.contains(event.target)) {
                    vantagemBox.style.display = "none";
                    document.removeEventListener("click", removerVantagem);
                }
            });
        }, 100);
    }

    document.getElementById("continuar-btn").addEventListener("click", function () {
        if (tipoCartaoSelecionado === "prata") {
            const mensagem = `\u200E*Quero Fazer parte do Time Auza!*\n
\u200E👤 *Nome:* ${nomeCompleto}
\u200E🔢 *Idade:* ${idade}
\u200E💼 *Profissão:* ${profissao}
\u200E📍 *Cidade/Estado:* ${cidade} - ${estado}
\u200E⭐ *Experiência:* ${experiencia}
\u200E👤 *Indicado por:* ${indicador}`; // 🔥 Agora o indicador aparece na mensagem!

            const linkWhatsApp = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
            window.location.href = linkWhatsApp;
        } else if (tipoCartaoSelecionado === "dourado") {
            window.location.href = window.location.href = `loading.html?nome=${encodeURIComponent(nome)}&sobrenome=${encodeURIComponent(sobrenome)}&idade=${encodeURIComponent(idade)}&experiencia=${encodeURIComponent(experiencia)}&estado=${encodeURIComponent(estado)}&cidade=${encodeURIComponent(cidade)}&profissao=${encodeURIComponent(profissao)}&indicador=${encodeURIComponent(indicador)}`;
        } else {
            alert("Por favor, selecione um cartão antes de continuar.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const confirmarPagamentoBtn = document.getElementById("confirmar-pagamento-btn");

    if (confirmarPagamentoBtn) {
        confirmarPagamentoBtn.addEventListener("click", function () {
            const urlParams = new URLSearchParams(window.location.search);
            const indicador = urlParams.get("indicador") || "Não fui indicado(a)";
            const nome = urlParams.get("nome") || "Nome não informado";
            const sobrenome = urlParams.get("sobrenome") || ""; 
            const nomeCompleto = sobrenome ? `${nome} ${sobrenome}` : nome;
            const idade = urlParams.get("idade") || "Idade não informada";
            const experiencia = urlParams.get("experiencia") || "Experiência não informada";
            const estado = urlParams.get("estado") || "Estado não informado";
            const cidade = urlParams.get("cidade") || "Cidade não informada";
            const profissao = urlParams.get("profissao") || "Profissão não informada";
            const whatsappNumero = "5585991340658"; // 🔥 Seu número atualizado

            // 🔎 Teste para verificar se o indicador está correto antes de enviar
            console.log("Indicador capturado:", indicador);

            const mensagemComprovante = `\u200E*Quero fazer parte do Time Auza Gold!*\n
\u200E👤 *Nome:* ${nomeCompleto}
\u200E🔢 *Idade:* ${idade}
\u200E💼 *Profissão:* ${profissao}
\u200E📍 *Cidade/Estado:* ${cidade} - ${estado}
\u200E⭐ *Experiência:* ${experiencia}
\u200E👤 *Indicado por:* ${indicador}
-----------------------------------------------------------
\u200E *⬇️ Comprovante de Pagamento ⬇️*`;

            const linkWhatsApp = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensagemComprovante)}`;
            console.log("Link gerado para WhatsApp:", linkWhatsApp); // 🔥 Teste antes de redirecionar!
            window.location.href = linkWhatsApp;
        });
    } else {
        console.error("❌ O botão 'Confirmar Pagamento' não foi encontrado. Verifique o ID no HTML.");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const copiarPixBtn = document.getElementById("copiarPix");

    if (copiarPixBtn) {
        copiarPixBtn.addEventListener("click", function () {
            const pixCodeInput = document.getElementById("pixCode");

            // 🔥 Seleciona todo o texto e copia
            pixCodeInput.select();
            pixCodeInput.setSelectionRange(0, 99999); 

            navigator.clipboard.writeText(pixCodeInput.value).then(() => {
            }).catch(err => {
                console.error("❌ Erro ao copiar:", err);
                alert("❌ Erro ao copiar o código PIX. Tente manualmente.");
            });
        });
    } else {
        console.error("❌ O botão de copiar não foi encontrado.");
    }
});