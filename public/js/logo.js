document.addEventListener("DOMContentLoaded", function () {
    const logo = document.getElementById("logo");

    if (logo) {
        setTimeout(() => {
            logo.style.opacity = "1";
            logo.style.transform = "scale(1)";
        }, 500); // Pequeno atraso para garantir o carregamento correto
    } else {
        console.error("Elemento #logo não encontrado!");
    }
});