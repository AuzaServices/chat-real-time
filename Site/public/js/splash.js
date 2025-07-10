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

  localStorage.setItem("indexSplashVisto", "true");

  // Redireciona pro index com marca de origem interna
  setTimeout(() => {
    window.location.href = "index.html?interno=1";
  }, 4000); // ou o tempo do seu splash


