/* ========================================
   SCRIPT DINÂMICO E INTERATIVO
   BLACK BARBER SHOP
   ======================================== */


// ========== DOM Elements ==========
const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');
const contactBtn = document.getElementById('contactBtn');


// ========== Menu Toggle Mobile ==========
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});


// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


// ========== Navbar Sticky com Blur ==========
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.backdropFilter = 'blur(12px)';
    }


    // Scroll to Top Button Visibility
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('active');
    } else {
        scrollToTopBtn.classList.remove('active');
    }
});


// ========== Scroll to Top ==========
scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// ========== Intersection Observer para Animações ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-section');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


// Observar todas as seções
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});


// ========== Animação de Cards ao Scroll ==========
const observeCards = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'fadeInUp 600ms ease-out forwards';
            }, index * 100);
            observeCards.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });


document.querySelectorAll('.service-card, .pricing-card, .contact-card').forEach(card => {
    observeCards.observe(card);
});


// ========== Contact Button Modal ==========
contactBtn.addEventListener('click', () => {
    showModal({
        title: 'Entre em Contato Conosco',
        content: `
            <div style="text-align: left; line-height: 1.8;">
                <p><strong>📍 Endereço:</strong> Rua das Barbas, 123 - São Paulo, SP</p>
                <p><strong>📞 Telefone:</strong> (11) 98765-4321</p>
                <p><strong>⏰ Horários:</strong></p>
                <ul>
                    <li>Segunda a Sexta: 09:30 - 18:30</li>
                    <li>Sábado: 09:30 - 18:30</li>
                    <li>Domingo: Fechado</li>
                </ul>
                <p><strong>📱 Instagram:</strong> @black.barbershop_</p>
            </div>
        `,
        buttonText: 'Fechar'
    });
});


// ========== Modal Simples ==========
function showModal({ title, content, buttonText = 'Fechar' }) {
    // Remover modal anterior se existir
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }


    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="btn-primary modal-action">${buttonText}</button>
                </div>
            </div>
        </div>
    `;


    document.body.insertAdjacentHTML('beforeend', modalHTML);


    const overlay = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.modal-close');
    const actionBtn = document.querySelector('.modal-action');


    // Fechar ao clicar no botão
    closeBtn.addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 300ms ease-out forwards';
        setTimeout(() => overlay.remove(), 300);
    });


    actionBtn.addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 300ms ease-out forwards';
        setTimeout(() => overlay.remove(), 300);
    });


    // Fechar ao clicar no overlay
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.animation = 'fadeOut 300ms ease-out forwards';
            setTimeout(() => overlay.remove(), 300);
        }
    });


    // Adicionar estilos do modal dinamicamente
    if (!document.querySelector('style[data-modal]')) {
        const style = document.createElement('style');
        style.setAttribute('data-modal', 'true');
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(11, 11, 11, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fadeIn 300ms ease-out forwards;
                backdrop-filter: blur(4px);
            }


            .modal-content {
                background: white;
                border-radius: 16px;
                padding: 0;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(11, 11, 11, 0.3);
                animation: slideUp 300ms ease-out forwards;
            }


            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem;
                border-bottom: 1px solid #d1d5db;
            }


            .modal-header h2 {
                margin: 0;
                font-size: 1.5rem;
                color: #000;
            }


            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #1a1a1a;
                transition: transform 200ms ease;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }


            .modal-close:hover {
                transform: rotate(90deg);
            }


            .modal-body {
                padding: 1.5rem 2rem;
                color: #0b0b0b;
            }


            .modal-footer {
                padding: 1.5rem 2rem;
                border-top: 1px solid #d1d5db;
                text-align: right;
            }


            .modal-footer .btn-primary {
                margin: 0;
            }


            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }


            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }


            @keyframes slideUp {
                from {
                    transform: translateY(40px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}


// ========== Validação de Formulários ==========
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');


    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });


    return isValid;
}


// ========== Efeito Parallax ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const shapes = document.querySelectorAll('.floating-shape');


    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});


// ========== Adicionar animação aos números (contador) ==========
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start) + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}


// Observar elementos com estatísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                const value = parseInt(statNumber.textContent);
                animateValue(statNumber, 0, value, 1500);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });


document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});


// ========== Smooth Scroll Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ========== Detect Reduced Motion ==========
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
    // Animar elementos ao carregar
    document.querySelectorAll('.fade-in-up').forEach((el, index) => {
        el.style.animation = 'none';
        setTimeout(() => {
            el.style.animation = `fadeInUp 800ms ease-out ${index * 0.2}s forwards`;
        }, 100);
    });
}


// ========== Log ==========
console.log('%c🪮 BLACK BARBER SHOP 🪮', 'color: #000; font-size: 20px; font-weight: bold;');
console.log('%cSite totalmente dinâmico e responsivo!', 'color: #1a1a1a; font-size: 14px;');



