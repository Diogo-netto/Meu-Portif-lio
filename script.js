document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Menu Mobile Toggle
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const icon = mobileToggle.querySelector('i');

    const toggleMenu = () => {
        const isOpen = mainNav.classList.contains('menu-open');
        
        if (isOpen) {
            mainNav.classList.remove('menu-open');
            mobileToggle.setAttribute('aria-expanded', 'false');
            icon.classList.remove('bi-x');
            icon.classList.add('bi-list');
        } else {
            mainNav.classList.add('menu-open');
            mobileToggle.setAttribute('aria-expanded', 'true');
            icon.classList.remove('bi-list');
            icon.classList.add('bi-x');
        }
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Fechar menu ao clicar num link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('menu-open')) {
                toggleMenu();
            }
        });
    });

    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('menu-open')) {
            toggleMenu();
            mobileToggle.focus();
        }
    });

    // ==========================================
    // 2. Header Scroll Effect
    // ==========================================
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger on load

    // ==========================================
    // 3. Botão Voltar ao Topo
    // ==========================================
    const backToTopBtn = document.getElementById('back-to-top');
    
    const handleBackToTopVisibility = () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

    // ==========================================
    // 4. Animação de Entrada (Intersection Observer)
    // ==========================================
    // Verifica preferência de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Opcional: parar de observar após animar uma vez
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
    }

    // ==========================================
    // 5. Highlight Menu Ativo no Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Ajuste do offset referente à altura fixa do header (~80px)
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            const navItem = document.querySelector(`.nav-list a[href*=${sectionId}]`);
            
            if(navItem) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ==========================================
    // 6. Atualizar Ano no Footer
    // ==========================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});