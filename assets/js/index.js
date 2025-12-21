

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM cargado - Inicializando...');
    initAOS();
    initCarousel();
    initStatsCounter();
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

