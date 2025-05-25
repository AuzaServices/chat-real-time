document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        window.location.href = "index.html"; // Após o splash, redireciona para index.html
    }, 3000); // Tempo de exibição do splash antes do redirecionamento
});

document.addEventListener("DOMContentLoaded", function() {
    const sloganElement = document.getElementById("slogan-text");
    const sloganText = "Tudo em serviço de A a Z";
    let index = 0;

    function typeEffect() {
        if (index < sloganText.length) {
            sloganElement.innerHTML += sloganText.charAt(index);
            index++;
            setTimeout(typeEffect, 100); // Ajuste o tempo para controlar a velocidade da digitação
        }
    }

    typeEffect();

    setTimeout(() => {
        window.location.href = "index.html"; // Redireciona após exibir o slogan
    }, 4000); // Tempo total do efeito antes do redirecionamento
});