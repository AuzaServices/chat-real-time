document.addEventListener("DOMContentLoaded", function() {
    const splashLogo = document.querySelector(".splash-container");

    setTimeout(() => {
        splashLogo.classList.add("fade-out");

        setTimeout(() => {
            window.location.replace("index.html"); // Redireciona corretamente
        }, 2000);
    }, 3000);
});