// Portfolio JavaScript - Versão Melhorada
// Autor: Manus AI
// Data: 17 de julho de 2025

class Portfolio {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupMobileMenu();
    this.setupMenuAnimation();
    this.setupScrollToTop();
    this.setupFormNavigation();
    this.setupIntersectionObserver();
    this.setupThemeToggle();
    this.setupLazyLoading();
  }

  // Configuração de event listeners
  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      this.scrollToTop();
    });

    window.addEventListener('load', () => {
      setTimeout(() => window.scrollTo(0, 0), 100);
    });

    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => this.handleScroll(), 10);
    });
  }

  // Menu mobile melhorado
  setupMobileMenu() {
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');
    
    if (!menuButton || !navMenu) {
      console.warn('Elementos do menu não encontrados');
      return;
    }

    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      
      // Toggle menu visibility
      navMenu.classList.toggle('show');
      
      // Update ARIA attributes
      menuButton.setAttribute('aria-expanded', !isExpanded);
      
      // Prevent body scroll when menu is open
      document.body.classList.toggle('menu-open', !isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuButton.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');
        menuButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        menuButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        menuButton.focus();
      }
    });
  }

  // Animação de links do menu melhorada
  setupMenuAnimation() {
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
      // Verifica se já tem o span para evitar duplicação
      if (link.querySelector('span')) return;
      
      const line = document.createElement('span');
      line.className = 'menu-line';
      link.appendChild(line);

      // Eventos otimizados
      link.addEventListener('mouseenter', () => {
        line.style.width = '100%';
      });

      link.addEventListener('mouseleave', () => {
        line.style.width = '0';
      });

      // Adiciona indicador de seção ativa
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          this.scrollToSection(targetSection);
          this.setActiveLink(link);
        }
      });
    });
  }

  // Scroll suave para seções
  scrollToSection(target) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const targetPosition = target.offsetTop - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  // Define link ativo na navegação
  setActiveLink(activeLink) {
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }

  // Botão voltar ao topo melhorado
  setupScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to');
    if (!scrollBtn) return;

    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Handler de scroll otimizado
  handleScroll() {
    const scrollBtn = document.querySelector('.scroll-to');
    const scrollY = window.scrollY;
    
    // Show/hide scroll to top button
    if (scrollBtn) {
      scrollBtn.classList.toggle('show-scroll-to', scrollY > 300);
    }

    // Update active navigation link
    this.updateActiveNavigation();
  }

  // Atualiza navegação ativa baseada na posição do scroll
  updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menu a[href^="#"]');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    menuLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Navegação por teclado no formulário melhorada
  setupFormNavigation() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        
        const formElements = Array.from(form.elements).filter(el => 
          !el.disabled && el.type !== 'hidden' && el.tabIndex !== -1
        );
        
        const currentIndex = formElements.indexOf(e.target);
        const nextElement = formElements[currentIndex + 1];
        
        if (nextElement) {
          nextElement.focus();
        } else {
          // Se for o último campo, submete o formulário
          this.handleFormSubmit(form);
        }
      }
    });

    // Validação em tempo real
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    // Submissão do formulário
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit(form);
    });
  }

  // Validação de campos
  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove erros anteriores
    this.clearFieldError(field);

    // Validações específicas
    switch (field.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Por favor, insira um email válido';
        }
        break;
      case 'text':
        if (value.length < 2) {
          isValid = false;
          errorMessage = 'Este campo deve ter pelo menos 2 caracteres';
        }
        break;
    }

    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Este campo é obrigatório';
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  // Mostra erro no campo
  showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'error-message';
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }

  // Remove erro do campo
  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  // Submissão do formulário
  handleFormSubmit(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // Aqui você implementaria o envio real do formulário
      this.showSuccessMessage('Mensagem enviada com sucesso!');
      form.reset();
    }
  }

  // Mostra mensagem de sucesso
  showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.querySelector('form');
    form.parentNode.insertBefore(successDiv, form);
    
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  // Intersection Observer para animações
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observa elementos que devem ser animados
    const animatedElements = document.querySelectorAll('.skill-item, .project-item, .hero-content');
    animatedElements.forEach(el => observer.observe(el));
  }

  // Sistema de tema escuro/claro
  setupThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Alternar tema');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    
    const nav = document.querySelector('header nav');
    if (nav) {
      nav.appendChild(themeToggle);
    }
    
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(themeToggle, savedTheme);
    
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      this.updateThemeIcon(themeToggle, newTheme);
    });
  }

  updateThemeIcon(button, theme) {
    const icon = button.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Lazy loading de imagens
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  new Portfolio();
});

// Fallback para browsers mais antigos
if (!window.IntersectionObserver) {
  document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.skill-item, .project-item, .hero-content');
    elements.forEach(el => el.classList.add('animate-in'));
  });
}
