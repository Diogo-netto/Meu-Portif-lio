// Seleciona todos os links do menu
const menuLinks = document.querySelectorAll('.menu a');

// Adiciona um efeito de linha animada para cada link
menuLinks.forEach(link => {
    // Cria o elemento de linha
    const line = document.createElement('span');
    link.appendChild(line);

    // Evento ao passar o mouse
    link.addEventListener('mouseover', () => {
        line.style.width = '100%';
        line.style.left = '0';
    });

    // Evento ao remover o mouse
    link.addEventListener('mouseout', () => {
        line.style.width = '0';
        line.style.left = '0';
    });
});









window.addEventListener('load', function() {
    setTimeout(function() {
        window.scrollTo(0, 0); // Rola para o topo
    }, 100); // Aguarda 100ms antes de rolar para o topo
});




/* js referente ao botão de voltar ao topo */
document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.querySelector('.scroll-to');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show-scroll-to');
        } else {
            scrollToTopBtn.classList.remove('show-scroll-to');
        }
    });

    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});














/* js referente a formulário botão "enter" */
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("form"); // Seleciona o formulário

    formulario.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Previne o envio do formulário

            // Tenta focar no próximo campo
            const formElements = Array.from(formulario.elements); // Todos os elementos do formulário
            const currentIndex = formElements.indexOf(event.target); // Index do elemento atual
            const nextElement = formElements[currentIndex + 1]; // Próximo elemento

            if (nextElement) {
                nextElement.focus(); // Move o foco para o próximo campo
            }
        }
    });
});






document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const navMenu = document.getElementById("nav-menu");

    menuButton.addEventListener("click", function () {
        navMenu.classList.toggle("show");
    });
});



