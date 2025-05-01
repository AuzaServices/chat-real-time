const mainContainer = document.querySelector(".grid-container");

for (let i = 1; i <= 40; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h3>Profissional ${i}</h3><p>Avaliação: ⭐⭐⭐⭐</p>`;
    mainContainer.appendChild(card);
}

window.addEventListener("load", function() {
    if (!localStorage.getItem("visited")) {
        window.location.href = "index.html"; // Redireciona apenas em atualizações manuais
    } else {
        localStorage.removeItem("visited"); // Remove a marcação após entrar
    }
});