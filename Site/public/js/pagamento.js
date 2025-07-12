document.getElementById("assinar-platinum").addEventListener("click", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const nome = urlParams.get("nome") || "Nome não informado";
  const sobrenome = urlParams.get("sobrenome") || ""; 
  const nomeCompleto = sobrenome ? `${nome} ${sobrenome}` : nome;
  const idade = urlParams.get("idade") || "Idade não informada";
  const experiencia = urlParams.get("experiencia") || "Experiência não informada";
  const estado = urlParams.get("estado") || "Estado não informado";
  const cidade = urlParams.get("cidade") || "Cidade não informada";
  const profissao = urlParams.get("profissao") || "Profissão não informada";
  const indicador = urlParams.get("indicador") || "Não fui indicado(a)";
  const whatsappNumero = "5585991340658";

  const mensagem = `\u200E*Quero fazer parte do Time Auza!*\n
\u200E👤 *Nome:* ${nomeCompleto}
\u200E🔢 *Idade:* ${idade}
\u200E💼 *Profissão:* ${profissao}
\u200E📍 *Cidade/Estado:* ${cidade} - ${estado}
\u200E⭐ *Experiência:* ${experiencia}
\u200E👤 *Indicado por:* ${indicador}`;

  const linkWhatsApp = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
  window.location.href = linkWhatsApp;
});

document.addEventListener("DOMContentLoaded", function () {
  const confirmarPagamentoBtn = document.getElementById("assinar-gold");

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
      const whatsappNumero = "5585991340658";

      const mensagem = `*Quero fazer parte do Time Auza Gold!*\n
👤 *Nome:* ${nomeCompleto}
🔢 *Idade:* ${idade}
💼 *Profissão:* ${profissao}
📍 *Cidade/Estado:* ${cidade} - ${estado}
⭐ *Experiência:* ${experiencia}
👤 *Indicado por:* ${indicador}
-----------------------------------------------------------
*⬇️ Comprovante de Pagamento ⬇️*`;

      const linkWhatsApp = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
      console.log("Link gerado para WhatsApp:", linkWhatsApp);
      window.location.href = linkWhatsApp;
    });
  } else {
    console.error("❌ O botão 'Confirmar Pagamento' não foi encontrado.");
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