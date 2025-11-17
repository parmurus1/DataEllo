// Função de scroll suave
function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Fechar menu mobile se estiver aberto
      if (window.innerWidth <= 900) {
        const navContainer = document.querySelector('.nav-container');
        navContainer.style.display = 'none';
      }
    }
  }
  
  // Loading Screen
  window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simular carregamento
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Finalizar carregamento
        setTimeout(() => {
          loadingScreen.classList.add('fade-out');
          setTimeout(() => {
            loadingScreen.remove();
            initializeApp();
          }, 500);
        }, 500);
      }
      loadingProgress.style.width = progress + '%';
    }, 200);
  });
  
  // Adicionar keyframes para o efeito ripple
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    @keyframes smoothScale {
      0% { transform: scale(1); }
      50% { transform: scale(0.98); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
  
  // Função para melhorar interações
  function enhanceInteractions() {
    // Adicionar efeito de clique nos cards
    const interactiveElements = document.querySelectorAll('.feature, .case-card, .portfolio-item, .team-member, .step, .contact-item');
    
    interactiveElements.forEach(element => {
      // Prevenir duplicação de event listeners
      if (element.hasAttribute('data-interactive-enhanced')) return;
      element.setAttribute('data-interactive-enhanced', 'true');
      
      element.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
        this.style.transition = 'transform 0.1s ease';
      });
      
      element.addEventListener('mouseup', function() {
        this.style.transform = '';
        this.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      });
      
      element.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      });
      
      // Adicionar feedback de foco para acessibilidade
      element.addEventListener('focus', function() {
        this.style.outline = `2px solid var(--primary)`;
        this.style.outlineOffset = '2px';
      });
      
      element.addEventListener('blur', function() {
        this.style.outline = '';
      });
    });
  
    // Melhorar feedback visual nos botões
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-outline, .tab-btn, .quick-question');
    
    buttons.forEach(button => {
      // Prevenir duplicação de event listeners
      if (button.hasAttribute('data-button-enhanced')) return;
      button.setAttribute('data-button-enhanced', 'true');
      
      button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
        this.style.transition = 'transform 0.1s ease';
      });
      
      button.addEventListener('mouseup', function() {
        this.style.transform = '';
        this.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      });
  
      // Efeito de onda nos botões
      button.addEventListener('click', function(e) {
        // Verificar se já existe um ripple
        if (this.querySelector('.ripple-effect')) return;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          pointer-events: none;
          z-index: 1;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
          if (ripple.parentNode === this) {
            this.removeChild(ripple);
          }
        }, 600);
      });
    });
  
    // Melhorar interação com inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      });
      
      input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
      });
    });
  
    console.log('Interações melhoradas aplicadas! 🎯');
  }
  
  function initializeApp() {
    // Inicializa AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  
    // Header scroll effect
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("visible");
        if (window.scrollY > 300) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      } else {
        header.classList.remove("visible");
        header.classList.remove("scrolled");
      }
    });
  
    // Theme toggle
    const themeToggle = document.getElementById("themeToggle");
    const heroLogo = document.getElementById("heroLogo");
    const logo = document.getElementById("logo");
  
    let currentTheme = localStorage.getItem("theme") || "light";
    applyTheme(currentTheme);
  
    themeToggle.addEventListener("click", () => {
      currentTheme = currentTheme === "light" ? "dark" : "light";
      applyTheme(currentTheme);
      localStorage.setItem("theme", currentTheme);
    });
  
    function applyTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      themeToggle.textContent = theme === "light" ? "🌙" : "☀️";
      if (heroLogo) heroLogo.src = theme === "light" ? "biglogo1.png" : "biglogo2.png";
      if (logo) logo.src = theme === "light" ? "logo1.png" : "logo2.png";
    }
  
    // Update year
    document.getElementById("year").textContent = new Date().getFullYear();
  
    // ROI Calculator - ATUALIZADO
    function updateROI() {
      const volume = document.getElementById('data-volume');
      const team = document.getElementById('team-size');
      const complexity = document.getElementById('complexity');
      
      if (volume && team && complexity) {
        const volumeValue = parseInt(volume.value);
        const teamValue = parseInt(team.value);
        const complexityValue = parseFloat(complexity.value);
        
        document.getElementById('volume-value').textContent = volumeValue + ' TB';
        document.getElementById('team-value').textContent = teamValue + ' pessoas';
        
        // Cálculo mais realista considerando TB
        const baseROI = volumeValue * teamValue * 500; // Base por TB
        const adjustedROI = baseROI * complexityValue;
        
        document.getElementById('roi-amount').textContent = 'R$ ' + Math.round(adjustedROI).toLocaleString();
      }
    }
  
    // Inicializar ROI calculator
    updateROI();
  
    // Portfolio filtering
    const tabButtons = document.querySelectorAll('.tab-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        portfolioItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category').includes(category)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 100);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  
    // CHAT FUNCTIONALITY - COMPLETAMENTE FUNCIONAL
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const quickQuestions = document.querySelectorAll('.quick-question');
  
    let chatOpen = false;
  
    // Funções do Chat
    function toggleChat() {
      chatOpen = !chatOpen;
      
      if (chatOpen) {
        chatWidget.style.display = 'flex';
        chatToggle.style.display = 'none';
        setTimeout(() => {
          chatWidget.classList.add('active');
          chatInput.focus();
        }, 10);
      } else {
        chatWidget.classList.remove('active');
        setTimeout(() => {
          chatWidget.style.display = 'none';
          chatToggle.style.display = 'flex';
        }, 300);
      }
    }
  
    function addMessage(text, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
      
      const messageContent = document.createElement('div');
      messageContent.className = 'message-content';
      
      const avatar = document.createElement('div');
      avatar.className = 'message-avatar';
      avatar.textContent = isUser ? '👤' : '🤖';
      
      const messageText = document.createElement('div');
      messageText.className = 'message-text';
      
      if (!isUser) {
        const strong = document.createElement('strong');
        strong.textContent = 'Assistente DataEllo';
        messageText.appendChild(strong);
      }
      
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      messageText.appendChild(paragraph);
      
      messageContent.appendChild(avatar);
      messageContent.appendChild(messageText);
      messageDiv.appendChild(messageContent);
      
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Animação
      messageDiv.style.animation = 'messageSlide 0.3s ease-out';
    }
  
    function handleQuickQuestion(question) {
      addMessage(question, true);
      
      setTimeout(() => {
        let response = '';
        if (question.includes('organizar')) {
          response = 'Perfeito! Para organização de dados, oferecemos soluções com IA que automatizam a limpeza, estruturação e categorização. Posso conectar você com um especialista?';
        } else if (question.includes('migrar') || question.includes('nuvem')) {
          response = 'Excelente escolha! Nossa equipe especializada em migração cloud garante transição segura e sem downtime. Temos casos de sucesso com redução de 60% em custos.';
        } else if (question.includes('orçamento')) {
          response = 'Entendido! Para um orçamento personalizado, precisamos entender melhor seu volume de dados e necessidades específicas. Podemos agendar uma call técnica de 30 minutos?';
        } else {
          response = 'Obrigado pelo seu interesse! Nossa equipe entrará em contato para entender melhor suas necessidades e oferecer a melhor solução.';
        }
        addMessage(response);
      }, 1000);
    }
  
    function handleUserMessage() {
      const message = chatInput.value.trim();
      if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Resposta automática
        setTimeout(() => {
          const responses = [
            'Interessante! Nossos especialistas em IA podem ajudar com isso. Deixe me conectar você com nossa equipe.',
            'Excelente pergunta! Temos cases similares com resultados comprovados. Posso compartilhar mais detalhes?',
            'Entendi sua necessidade! Nossa solução pode ser personalizada para seu caso específico. Vamos agendar uma demonstração?',
            'Perfeito! Trabalhamos exatamente com esse tipo de desafio. Nossos clientes alcançaram até 80% de eficiência em processos similares.'
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addMessage(randomResponse);
        }, 1500);
      }
    }
  
    // Event Listeners do Chat
    chatToggle.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);
  
    sendMessage.addEventListener('click', handleUserMessage);
  
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleUserMessage();
      }
    });
  
    quickQuestions.forEach(button => {
      button.addEventListener('click', () => {
        const question = button.getAttribute('data-question');
        handleQuickQuestion(question);
      });
    });
  
    // Email system
    function sendEmail() {
      const name = document.querySelector('#contactForm input[type="text"]').value;
      const email = document.querySelector('#contactForm input[type="email"]').value;
      const company = document.querySelector('#contactForm input[type="text"]:nth-child(3)').value;
      const phone = document.querySelector('#contactForm input[type="tel"]').value;
      const message = document.querySelector('#contactForm textarea').value;
      
      const subject = `Contato DataEllo - ${company || 'Interessado'}`;
      const body = `Nome: ${name}%0D%0AEmail: ${email}%0D%0AEmpresa: ${company}%0D%0ATelefone: ${phone}%0D%0A%0D%0AMensagem:%0D%0A${message}`;
      
      window.open(`mailto:dataello2@gmail.com?subject=${subject}&body=${body}`);
    }
  
    // Form handlers
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      sendEmail();
      this.reset();
      addMessage('Obrigado pelo contato! Nossa equipe responderá em até 24 horas.', false);
    });
  
    document.getElementById('schedule-form').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Agendamento enviado! Entraremos em contato para confirmar.');
      this.reset();
      addMessage('Consulta agendada! Confirmaremos o horário por email.', false);
    });
  
    // Utility functions
    function openModal(type) {
      const modalText = {
        'demo': 'Demonstração agendada! Nossa equipe entrará em contato para confirmar o horário.',
        'consultoria': 'Consulta técnica marcada! Um especialista entrará em contato.'
      };
      addMessage(modalText[type] || 'Ação confirmada! Em breve retornaremos.', false);
    }
  
    function downloadCaseStudy() {
      addMessage('Iniciando download do case study... Em breve você receberá o material por email.', false);
      setTimeout(() => {
        alert('Download simulado - em produção, o arquivo seria baixado');
      }, 1000);
    }
  
    function openSchedulingModal() {
      addMessage('Abrindo calendário de agendamento...', false);
      setTimeout(() => {
        alert('Calendário de agendamento - em produção, seria integrado com Google Calendar');
      }, 1000);
    }
  
    // Typing animation
    function typeWriter() {
      const titleElement = document.getElementById('typing-title');
      const text = "Organizamos <span class='highlight'>dados</span>, geramos <span class='highlight'>insights</span>.";
      let i = 0;
      let isTag = false;
      let currentText = '';
      
      function type() {
        if (i < text.length) {
          if (text.charAt(i) === '<') {
            isTag = true;
            let tagContent = '';
            
            while (text.charAt(i) !== '>' && i < text.length) {
              tagContent += text.charAt(i);
              i++;
            }
            tagContent += '>';
            i++;
            
            currentText += tagContent;
            titleElement.innerHTML = currentText;
            
            setTimeout(type, 50);
          } else {
            currentText += text.charAt(i);
            titleElement.innerHTML = currentText;
            i++;
            setTimeout(type, 80);
          }
        }
      }
      
      type();
    }
  
    // Scroll reveal animation
    function revealOnScroll() {
      const elements = document.querySelectorAll('.feature, .step, .case-card, .portfolio-item, .team-member');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('revealed');
        }
      });
    }
  
    // Adicionar animação de pulse nos botões CTA
    function addPulseAnimation() {
      const ctaButtons = document.querySelectorAll('.btn-primary');
      ctaButtons.forEach((button, index) => {
        setTimeout(() => {
          button.classList.add('pulse');
        }, index * 1000);
      });
    }
  
    // Initialize animations
    typeWriter();
    addPulseAnimation();
  
    // Adicionar classe reveal-on-scroll aos elementos
    const elementsToReveal = document.querySelectorAll('.feature, .step, .case-card, .portfolio-item, .team-member');
    elementsToReveal.forEach(element => {
      element.classList.add('reveal-on-scroll');
    });
  
    // Adicionar evento de scroll para reveal
    window.addEventListener('scroll', revealOnScroll);
  
    // Mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.nav-container');
    
    mobileMenuBtn.addEventListener('click', () => {
      navContainer.style.display = navContainer.style.display === 'flex' ? 'none' : 'flex';
    });
  
    // Aplicar melhorias de interação
    enhanceInteractions();
  
    console.log('DataEllo - Sistema carregado com sucesso! 🚀');
  }
  
  // Global functions para HTML
  window.openModal = function(type) {
    const modalText = {
      'demo': 'Demonstração agendada! Nossa equipe entrará em contato para confirmar o horário.',
      'consultoria': 'Consulta técnica marcada! Um especialista entrará em contato.'
    };
    
    if (typeof addMessage === 'function') {
      addMessage(modalText[type] || 'Ação confirmada! Em breve retornaremos.', false);
    } else {
      alert('Demonstração solicitada! Entraremos em contato em breve.');
    }
  };
  
  window.smoothScroll = smoothScroll;
  
  window.downloadCaseStudy = function() {
    if (typeof addMessage === 'function') {
      addMessage('Iniciando download do case study... Em breve você receberá o material por email.', false);
    }
    setTimeout(() => {
      alert('Download simulado - em produção, o arquivo seria baixado');
    }, 1000);
  };
  
  window.openSchedulingModal = function() {
    if (typeof addMessage === 'function') {
      addMessage('Abrindo calendário de agendamento...', false);
    }
    setTimeout(() => {
      alert('Calendário de agendamento - em produção, seria integrado com Google Calendar');
    }, 1000);
  };
  
  window.updateROI = function() {
    const volume = document.getElementById('data-volume');
    const team = document.getElementById('team-size');
    const complexity = document.getElementById('complexity');
    
    if (volume && team && complexity) {
      const volumeValue = parseInt(volume.value);
      const teamValue = parseInt(team.value);
      const complexityValue = parseFloat(complexity.value);
      
      document.getElementById('volume-value').textContent = volumeValue + ' TB';
      document.getElementById('team-value').textContent = teamValue + ' pessoas';
      
      // Cálculo mais realista considerando TB
      const baseROI = volumeValue * teamValue * 500; // Base por TB
      const adjustedROI = baseROI * complexityValue;
      
      document.getElementById('roi-amount').textContent = 'R$ ' + Math.round(adjustedROI).toLocaleString();
    }
  };