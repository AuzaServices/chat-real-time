document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.getItem("splashShown")) {
        window.location.href = "index.html"; // Se já viu o splash, pula direto para index.html
        return;
    }

    sessionStorage.setItem("splashShown", "true");

    const sloganElement = document.getElementById("slogan-text");
    const sloganText = "Tudo em Serviços de A a Z";
    const typingSpeed = 68;
    let index = 0;

    function typeEffect() {
        if (index < sloganText.length) {
            sloganElement.innerHTML += sloganText.charAt(index);
            index++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            setTimeout(() => {
                window.location.href = "index.html"; // Redireciona após animação
            }, 2000);
        }
    }

    typeEffect();
});

  // Marca que o splash foi visto (salva no navegador)
  localStorage.setItem("splashJaVisto", "true");

  // Redireciona para index.html após 4 segundos (ou seu tempo padrão)
  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);


