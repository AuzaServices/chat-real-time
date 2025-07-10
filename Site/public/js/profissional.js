document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const selectedId = parseInt(params.get("id"), 10);
  const selectedName = decodeURIComponent(params.get("name") || "").trim();

  fetch("https://seu-backend.com/api/profissionais")
    .then(res => res.json())
    .then(data => {
      window.professionals = data;
      renderizarPerfilPorIdOuNome(data);
    })
    .catch(err => {
      console.error("Erro ao buscar profissionais:", err);
      document.getElementById("professional-card").innerHTML = "<p>Erro ao carregar perfil.</p>";
    });

  const highlightedProfessionals = new Set([
    "Edimilson Camara", "Mateus Santos", "Bruna Costa", "Carlos Costa", "Ana Souza", "Lucas Oliveira", "André Souza",
    "Diego Rocha", "Marcos Vinicius", "Bruno Ferreira", "Carlos Mendes", "Eduarda Nunes",
    "Fernanda Ramos", "Gustavo Ramos", "Diego Martins", "Carlos Nogueira", "José Lima"
  ]);

  function renderizarPerfilPorIdOuNome(professionals) {
    let professional = !isNaN(selectedId)
      ? professionals.find(p => p.id === selectedId)
      : null;

    if (!professional && selectedName) {
      const matches = professionals.filter(p => p.name.trim() === selectedName);
      professional = matches.find(p => p.imagens?.length > 0) || matches[0];
    }

    if (!professional) {
      document.getElementById("professional-card").innerHTML = "<p>Profissional não encontrado.</p>";
      return;
    }

    const isHighlighted = highlightedProfessionals.has(professional.name.trim());
    const highlightedClass = isHighlighted ? "highlighted" : "";
    const nameClass = isHighlighted ? "highlighted-name" : "";

    const whatsappLink = `https://wa.me/${professional.whatsapp}?text=${encodeURIComponent(
      "Olá, vim por meio da *Auza Services*, gostaria de realizar um orçamento de serviço."
    )}`;

    document.getElementById("professional-card").innerHTML = `
      <div class="card ${highlightedClass}">
        <img class="card-logo" src="css/imagens/background.png" alt="Logo">
        <h3 class="${nameClass}">${professional.name}</h3>
        <p>${professional.city}</p>
        <p>Idade: ${professional.age} anos</p>
        <p>Avaliação: ${professional.stars}</p>
        <p>${professional.comment}</p>
        <a class="whatsapp-button" href="${whatsappLink}" target="_blank"
          data-id="${professional.id}" data-nome="${professional.name}" 
          data-profissao="${professional.service}">
          Contato via WhatsApp
        </a>
      </div>
    `;

    const whatsappButton = document.querySelector(".whatsapp-button");
    if (whatsappButton) {
      whatsappButton.removeEventListener("click", handleClick);
      whatsappButton.addEventListener("click", handleClick);
    }

    const ratingContainer = document.querySelector(".rating-container");
    if (ratingContainer && professional.imagens?.length > 0) {
      const count = professional.imagens.length;
      const classeExtra =
        count === 1 ? "unica" :
        count === 2 ? "duas" :
        count === 3 ? "tres" : "quatro";

      const primeiroNome = professional.name.trim().split(" ")[0];

      const imagensHtml = `
        <section class="detalhes-galeria">
          <h2>Serviços feitos por ${primeiroNome}</h2>
          <div class="imagens-detalhes ${classeExtra}">
            ${professional.imagens.map(url => `<img src="${url}" alt="Detalhe do serviço">`).join("")}
          </div>
        </section>
      `;
      ratingContainer.insertAdjacentHTML("beforebegin", imagensHtml);
    }

    document.addEventListener("click", function (e) {
      const clickedImg = e.target.closest(".imagens-detalhes img");
      const modal = document.getElementById("imagemModal");

      if (clickedImg && modal) {
        modal.querySelector("img").src = clickedImg.src;
        modal.style.display = "flex";
      }

      if (e.target.id === "imagemModal") {
        modal.style.display = "none";
      }
    });
  }
});

// ✅ **Função para capturar clique e enviar dados ao banco**
document.body.addEventListener("click", (event) => {
  const btn = event.target.closest(".whatsapp-button");
  if (btn) {
    handleClick(event);
  }
});

function handleClick(event) {
  event.preventDefault();
  console.log("🔥 handleClick foi chamado");

  const target = event.target.closest(".whatsapp-button");
  if (!target) return;

  const overlay = document.getElementById("whatsappOverlay");
  const continueBtn = document.getElementById("continueButton");
  const inputWhatsapp = document.getElementById("numeroWhatsapp");
  const msgErro = document.getElementById("erroNumero");
  const whatsappLink = target.getAttribute("href");

  if (!whatsappLink || !overlay || !continueBtn || !inputWhatsapp) return;

  overlay.classList.remove("hidden");

  // Clona o botão para remover eventos anteriores
  const novoBtn = continueBtn.cloneNode(true);
  continueBtn.parentNode.replaceChild(novoBtn, continueBtn);
  novoBtn.disabled = false;

  // Evento do botão interno do overlay
  novoBtn.addEventListener("click", () => {
    const numeroCliente = inputWhatsapp.value.replace(/\D/g, "");
    console.log("📞 Número digitado:", numeroCliente);

    if (numeroCliente.length !== 11) {
      if (msgErro) {
        msgErro.style.display = "block";
        msgErro.textContent = "Número de WhatsApp obrigatório no formato (99) 99999-9999.";
      }
      return;
    }

    // Número válido, então fecha overlay e limpa erro
    msgErro.style.display = "none";
    overlay.classList.add("hidden");

    const win = window.open(whatsappLink, "_blank");
    if (!win) {
      alert("⚠️ O navegador bloqueou a abertura do WhatsApp.");
    }

    const agora = new Date().toLocaleString("en-US", {
      timeZone: "America/Fortaleza",
      hour12: false
    });

    const [date, time] = agora.split(", ");
    const [month, day, year] = date.split("/");
    const dataHoraFormatada = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")} ${time}`;

    const payload = {
      profissionalId: target.getAttribute("data-id"),
      nomeProfissional: target.getAttribute("data-nome"),
      profissao: target.getAttribute("data-profissao"),
      dataHora: dataHoraFormatada,
      whatsappCliente: numeroCliente
    };

    console.log("📦 Enviando payload:", payload);

    fetch("https://clientes-fhfe.onrender.com/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro no servidor");
        return res.text();
      })
      .then((data) => {
        console.log("✅ Registro enviado:", data);
      })
      .catch((err) => {
        console.warn("⚠️ Falha no envio, tentando sendBeacon...", err);
        try {
          navigator.sendBeacon?.(
            "https://clientes-fhfe.onrender.com/api/click",
            new Blob([JSON.stringify(payload)], { type: "application/json" })
          );
        } catch (e) {
          console.error("❌ sendBeacon falhou também:", e);
        }
      });
  });
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
const backBtn = document.getElementById("backButton");
if (backBtn) {
  backBtn.addEventListener("click", function () {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }
  });
}

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