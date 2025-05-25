document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        window.location.href = "index.html"; // Após o splash, redireciona para index.html
    }, 3000); // Tempo de exibição do splash antes do redirecionamento
});

document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.getItem("splashShown")) {
        window.location.href = "index.html"; // Pula o splash se já foi exibido
        return;
    }

    sessionStorage.setItem("splashShown", "true"); // Registra que o splash foi visto

    const sloganElement = document.getElementById("slogan-text");
    const sloganText = "Tudo em serviço de A a Z";
    const typingSpeed = 68; // Ajuste manual da velocidade

    let index = 0;

    function typeEffect() {
        if (index < sloganText.length) {
            sloganElement.innerHTML += sloganText.charAt(index);
            index++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            setTimeout(() => {
                window.location.href = "index.html"; // Redireciona após a digitação
            }, 1000); // Pequena pausa antes de sair
        }
    }

    typeEffect();
});