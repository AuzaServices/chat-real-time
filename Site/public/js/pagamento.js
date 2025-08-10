document.getElementById("assinar-gratuito").addEventListener("click", function () {
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
  const assinarBtn = document.getElementById("assinar-gold");

  if (assinarBtn) {
    assinarBtn.addEventListener("click", function () {
      const urlParams = new URLSearchParams(window.location.search);
      const indicador = urlParams.get("indicador") || "Não fui indicado(a)";
      const nome = urlParams.get("nome") || "Nome não informado";
      const sobrenome = urlParams.get("sobrenome") || "";
      const idade = urlParams.get("idade") || "Idade não informada";
      const experiencia = urlParams.get("experiencia") || "Experiência não informada";
      const estado = urlParams.get("estado") || "Estado não informado";
      const cidade = urlParams.get("cidade") || "Cidade não informada";
      const profissao = urlParams.get("profissao") || "Profissão não informada";

      const queryString = new URLSearchParams({
        indicador,
        nome,
        sobrenome,
        idade,
        experiencia,
        estado,
        cidade,
        profissao
      }).toString();

      window.location.href = `pagamento-pix1.html?${queryString}`;
    });
  } else {
    console.error("❌ Botão 'assinar-gold' não encontrado.");
  }
});

// 🔥 Apague este bloco se o botão não existe mais

document.addEventListener("DOMContentLoaded", function () {
  const assinarBtn = document.getElementById("assinar-top");

  if (assinarBtn) {
    assinarBtn.addEventListener("click", function () {
      const urlParams = new URLSearchParams(window.location.search);
      const indicador = urlParams.get("indicador") || "Não fui indicado(a)";
      const nome = urlParams.get("nome") || "Nome não informado";
      const sobrenome = urlParams.get("sobrenome") || "";
      const idade = urlParams.get("idade") || "Idade não informada";
      const experiencia = urlParams.get("experiencia") || "Experiência não informada";
      const estado = urlParams.get("estado") || "Estado não informado";
      const cidade = urlParams.get("cidade") || "Cidade não informada";
      const profissao = urlParams.get("profissao") || "Profissão não informada";

      const queryString = new URLSearchParams({
        indicador,
        nome,
        sobrenome,
        idade,
        experiencia,
        estado,
        cidade,
        profissao
      }).toString();

      window.location.href = `pagamento-pix2.html?${queryString}`;
    });
  } else {
    console.error("❌ Botão 'assinar-gold' não encontrado.");
  }
});

