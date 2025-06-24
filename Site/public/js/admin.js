async function carregarDados() {
  try {
    const response = await fetch("/api/dados");
    const dados = await response.json();

    if (dados.trafego && dados.cliques) {
      const tabelaTrafego = document.getElementById("tabela-trafego");
      const tabelaCliques = document.getElementById("tabela-cliques");

      tabelaTrafego.innerHTML = dados.trafego.map(item => `
        <tr>
          <td>${item.pagina}</td>
          <td>${item.acessos}</td>
          <td>${item.data}</td>
        </tr>
      `).join("");

tabelaCliques.innerHTML = dados.cliques.map((item, index) => {
  const numero = item.whatsappCliente?.replace(/\D/g, "");
  const numeroInternacional = numero ? `55${numero}` : null;

  const mensagens = {
    1: `Oii, tudo certo? Aqui é da Auza 👋\nSó pra saber mesmo: o serviço com *${item.Profissional}* - *${item.Profissão}* foi concluído direitinho ou ainda tá em andamento?`,
    2: `Oi novamente! Conseguiu finalizar o serviço com *${item.Profissional}* - *${item.Profissão}*?\nSe tiver um minutinho, me avisa aqui 🙏`,
    3: `Último lembrete: conseguimos confirmar o serviço com *${item.Profissional}* - *${item.Profissão}*?\nMe dá um ok por aqui rapidinho, por favor! ⚡`
  };

  const botoesTentativas = numeroInternacional ? `
<div class="tentativas" style="display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
      ${[1, 2, 3].map(i => {
        const localKey = `item-${index}-tentativa-${i}`;
        const clicado = localStorage.getItem(localKey) === "true";
        const classe = clicado ? "btn-tentativa clicked" : "btn-tentativa";
        const link = `https://wa.me/${numeroInternacional}?text=${encodeURIComponent(mensagens[i])}`;
        return `<button 
                  class="${classe}" 
                  data-key="${localKey}" 
                  data-link="${link}" 
                  data-tentativa="${i}">
                  ${i}
                </button>`;
      }).join("")}
    </div>
  ` : "-";

  return `
    <tr>
      <td>${item.Profissional}</td>
      <td>${item.Profissão}</td>
      <td>${item.Chamadas}</td>
      <td>${item.dataHora || "-"}</td>
      <td>${item.whatsappCliente || "-"}</td>
      <td>${botoesTentativas}</td>
    </tr>
  `;
}).join("");

// Lógica dos botões de tentativa
setTimeout(() => {
  document.querySelectorAll(".btn-tentativa").forEach(btn => {
    const key = btn.dataset.key;
    const link = btn.dataset.link;
    const tentativa = parseInt(btn.dataset.tentativa);
    const delay = tentativa === 2 ? 24 : tentativa === 3 ? 48 : 0;
    const savedTime = localStorage.getItem(`${key}-time`);

    // Piscar após atraso (para tentativas 2 e 3)
    if (!localStorage.getItem(key) && delay > 0) {
      const baseTime = Number(savedTime || Date.now());
      const diff = Date.now() - baseTime;
      if (diff > delay * 60 * 60 * 1000) {
        btn.classList.add("blink");
      } else {
        setTimeout(() => btn.classList.add("blink"), delay * 60 * 60 * 1000 - diff);
        if (!savedTime) localStorage.setItem(`${key}-time`, baseTime);
      }
    }

    // Clique SEM BLOQUEIO
    btn.onclick = () => {
      window.open(link, "_blank");
      btn.classList.add("clicked");
      btn.classList.remove("blink");
      localStorage.setItem(key, "true");
      localStorage.setItem(`${key}-time`, Date.now());
    };
  });
}, 500);

      console.log("✅ Dados atualizados automaticamente!");
    }
  } catch (error) {
    console.error("❌ Erro ao carregar dados:", error);
  }
}

// 🔄 Atualiza dados a cada 2 segundos
setInterval(carregarDados, 2000);
document.addEventListener("DOMContentLoaded", carregarDados);

// 🛡️ Verifica senha antes de exibir painel
function verificarSenha() {
    const senhaCorreta = "74141260314";
    const entrada = document.getElementById("senha").value;
    const msg = document.getElementById("msg");

    if (entrada === senhaCorreta) {
        document.getElementById("senha-container").style.display = "none";
        document.getElementById("painel").style.display = "block";
    } else {
        msg.textContent = "❌ Senha incorreta. Tente novamente.";
    }
}

// 🔄 Recupera clientes Gold do localStorage
let clientesGold = JSON.parse(localStorage.getItem("clientesGold")) || [];

// 🔧 Atualiza a lista de AuzaGold na tela
function atualizarLista() {
    const container = document.getElementById("goldContainer");
    container.innerHTML = "";
    const hoje = new Date();

    clientesGold.forEach((cliente, index) => {
        const inicio = new Date(cliente.inicio);
        const diasCalculados = 30 - Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24));
        const diasRestantes = cliente.diasCustom !== undefined && cliente.diasCustom !== null
            ? cliente.diasCustom
            : Math.max(diasCalculados, 0);

        const div = document.createElement("div");
        div.className = "gold";
        div.innerHTML = `
            <input type="text" value="${cliente.nome}" onchange="editarNome(${index}, this.value)">
            <input type="date" value="${cliente.inicio}" onchange="editarData(${index}, this.value)">
            <input type="number" value="${diasRestantes}" onchange="editarDias(${index}, this.value)" min="0" max="999" title="Dias restantes">
            <button onclick="removerCliente(${index})">❌</button>
        `;
        container.appendChild(div);
    });

    localStorage.setItem("clientesGold", JSON.stringify(clientesGold));
}

// ✏️ Edita nome do cliente
function editarNome(index, novoNome) {
    clientesGold[index].nome = novoNome;
    atualizarLista();
}

// 📅 Edita data de início
function editarData(index, novaData) {
    clientesGold[index].inicio = novaData;
    atualizarLista();
}

// 📆 Edita dias restantes manualmente
function editarDias(index, novoValor) {
    const valor = parseInt(novoValor);
    if (isNaN(valor)) {
        clientesGold[index].diasCustom = null;
    } else {
        clientesGold[index].diasCustom = valor;
    }
    atualizarLista();
}

// ❌ Remove cliente
function removerCliente(index) {
    clientesGold.splice(index, 1);
    atualizarLista();
}

// ➕ Adiciona novo cliente Gold
document.getElementById("adicionar").addEventListener("click", () => {
    clientesGold.push({
        nome: "Novo Cliente",
        inicio: new Date().toISOString().split("T")[0],
        diasCustom: null
    });
    atualizarLista();
});

// 🚀 Inicializa lista ao carregar página
atualizarLista();

document.addEventListener("DOMContentLoaded", () => {
    const descricaoInput = document.getElementById("descricao");
    const valorInput = document.getElementById("valor");

    // 🔄 Verificar se os elementos existem antes de tentar acessá-los
    if (!descricaoInput || !valorInput) {
        console.error("🚨 Campos do serviço não encontrados no HTML!");
        return;
    }

    // ✏️ Adicionar evento para salvar serviço
    document.getElementById("adicionar-servico").addEventListener("click", () => {
        const descricao = descricaoInput.value;
        const valor = valorInput.value;

        if (!descricao || !valor) {
            console.error("🚨 Todos os campos são obrigatórios!");
            return;
        }

        fetch("https://clientes-fhfe.onrender.com/api/salvar-servico", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ descricao: descricao, valor: valor })
        }).then(response => response.json())
          .then(data => console.log("✅ Serviço salvo com sucesso!", data))
          .catch(error => console.error("❌ Erro ao salvar serviço:", error));
    });

    console.log("✅ Script carregado e funcional!");
});

document.addEventListener("DOMContentLoaded", () => {
    const tabelaServicos = document.getElementById("tabela-servicos");

    if (!tabelaServicos) {
        console.error("🚨 Tabela de serviços não encontrada no HTML!");
        return;
    }

    async function carregarServicos() {
        try {
            const response = await fetch("/api/listar-servicos");
            if (!response.ok) throw new Error("Erro ao carregar serviços");

            const data = await response.json();
            tabelaServicos.innerHTML = "";

            data.forEach(servico => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${servico.descricao}</td>
                    <td>R$ ${parseFloat(servico.valor).toFixed(2)}</td>
                    <td>${servico.profissional_nome || "Não cadastrado"}</td>
                `;
                tabelaServicos.appendChild(row);
            });

            console.log("✅ Serviços carregados com sucesso!");
        } catch (error) {
            console.error("❌ Erro ao carregar serviços:", error);
        }
    }

    setInterval(carregarServicos, 5000);
    carregarServicos();
});

const mensagens = {
  1: "Oi! Aqui é da Auza 😊 Só confirmando se o serviço com *{PROFISSIONAL}* — *{PROFISSAO}* foi concluído?",
  2: "Passando de novo pra te lembrar da confirmação com *{PROFISSIONAL}* (*{PROFISSAO}*) 🙏",
  3: "Último lembrete: conseguimos confirmar o serviço com *{PROFISSIONAL}* (*{PROFISSAO}*)? Me avisa aqui! ⚡"
};

const clienteNumero = "558599999999";
const profissional = "Renata Rodrigues";
const profissao = "Manicure a Domicílio";
const now = Date.now();
const ultimoClique = new Date("2025-06-24T14:46:11.000Z").getTime();

const delays = {
  2: 24 * 60 * 60 * 1000, // 1 dia
  3: 48 * 60 * 60 * 1000  // 2 dias
};

document.querySelectorAll(".btn-tentativa").forEach(btn => {
  const step = btn.dataset.step;
  const key = `tentativa-${step}`;

  const texto = mensagens[step]
    .replace("{PROFISSIONAL}", profissional)
    .replace("{PROFISSAO}", profissao);

  const link = `https://wa.me/${clienteNumero}?text=${encodeURIComponent(texto)}`;
  btn.setAttribute("data-key", key);

  if (localStorage.getItem(key) === "true") {
    btn.classList.add("clicked");
  }

  btn.addEventListener("click", () => {
    // Agora sempre redireciona — verde, vermelho, azul ou cor que for!
    window.open(link, "_blank");

    btn.classList.add("clicked");
    btn.classList.remove("blink");
    localStorage.setItem(key, "true");
    localStorage.setItem(`${key}-time`, Date.now());

    console.log(`📤 Tentativa ${step} enviada para ${clienteNumero}`);
  });
});

// Piscar automático
Object.entries(delays).forEach(([step, delay]) => {
  const key = `tentativa-${step}`;
  const savedTime = localStorage.getItem(`${key}-time`) || ultimoClique;
  const tempoRestante = new Date(savedTime).getTime() + delay - now;

  if (!localStorage.getItem(key)) {
    setTimeout(() => {
      const btn = document.querySelector(`.btn-tentativa[data-step="${step}"]`);
      if (btn && !btn.classList.contains("clicked")) {
        btn.classList.add("blink");
      }
    }, Math.max(0, tempoRestante));
  }
});