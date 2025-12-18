// ====================================
// MEDIFLEX - JAVASCRIPT CORREGIDO
// ====================================

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM cargado - Inicializando...');
    initAOS();
    initCarousel();
    initStatsCounter();
    initMobileMenu();
    initDropdowns();
    initScrollEffects();
});

// ====================================
// ANIMATE ON SCROLL
// ====================================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
}

// ====================================
// HERO CAROUSEL
// ====================================
function initCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const heroCarousel = document.querySelector('.hero-carousel');

    if (!slides.length) return;

    let currentSlide = 0;
    let autoplayInterval = null;

    // ==============================
    // Mostrar slide
    // ==============================
    function showSlide(index) {
        if (index === currentSlide) return;

        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        slides[index].classList.add('active');
        indicators[index]?.classList.add('active');

        currentSlide = index;
    }

    // ==============================
    // Navegación
    // ==============================
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // ==============================
    // Autoplay controlado
    // ==============================
    function startAutoplay() {
        if (autoplayInterval) return;
        autoplayInterval = setInterval(nextSlide, 7500);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }

    function userInteracted() {
        stopAutoplay();
        setTimeout(startAutoplay, 12000);
    }

    // ==============================
    // Event listeners
    // ==============================
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            userInteracted();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            userInteracted();
        });
    }

    if (indicators.length) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                userInteracted();
            });
        });
    }

    // Teclado (accesibilidad)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            userInteracted();
        }
        if (e.key === 'ArrowLeft') {
            prevSlide();
            userInteracted();
        }
    });

    // Pausar en hover (desktop)
    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', stopAutoplay);
        heroCarousel.addEventListener('mouseleave', startAutoplay);
    }

    // ==============================
    // Inicio
    // ==============================
    slides[0].classList.add('active');
    indicators[0]?.classList.add('active');
    startAutoplay();
}


function initMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    if (!mobileMenu || !mobileMenuBtn || !closeMenuBtn) {
        console.error('Elementos del menú móvil no encontrados');
        return;
    }

    // Abrir menú
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileMenu.classList.add('active');
        document.body.classList.add('menu-open'); // ← Cambio aquí
    });

    // Cerrar menú
    closeMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open'); // ← Cambio aquí
    });

    // Dropdown en móvil
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = toggle.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('active');
                const icon = toggle.querySelector('i.fa-chevron-down');
                if (icon) {
                    icon.style.transform = submenu.classList.contains('active')
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)';
                }
            }
        });
    });

    // Cerrar al hacer click en enlaces
    const mobileNavLinks = document.querySelectorAll('.mobile-nav > li > a:not(.mobile-dropdown-toggle)');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open'); // ← Cambio aquí
        });
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open'); // ← Cambio aquí
        }
    });
}

// ====================================
// SCROLL EFFECTS
// ====================================
function initScrollEffects() {
    const banner = document.querySelector('.top-banner');
    const header = document.querySelector('.main-header');

    if (!banner || !header) return;

    const bannerHeight = banner.offsetHeight;

    function onScroll() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// ====================================
// STATS COUNTER
// ====================================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return '+' + (num / 1000000).toFixed(0) + 'M';
    } else if (num >= 1000) {
        return '+' + (num / 1000).toFixed(0) + 'k';
    }
    return '+' + num;
}

// ====================================
// DROPDOWNS
// ====================================
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (toggle && menu) {
            // Desktop hover
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth >= 1024) {
                    menu.style.display = 'block';
                    setTimeout(() => {
                        menu.style.opacity = '1';
                        menu.style.visibility = 'visible';
                        menu.style.transform = 'translateY(0)';
                    }, 10);
                }
            });

            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth >= 1024) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 300);
                }
            });
        }
    });
}

// ====================================
// SMOOTH SCROLL
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ====================================
// PREVENIR FOUC
// ====================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ====================================
// MANEJAR RESIZE
// ====================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const mobileMenu = document.getElementById('mobileMenu');
        // Cerrar menú móvil si se redimensiona a desktop
        if (window.innerWidth >= 1024 && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});