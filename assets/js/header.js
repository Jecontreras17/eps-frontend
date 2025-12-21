
// ====================================
// MOBILE MENU
// ====================================
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    if (!mobileMenu || !mobileMenuBtn || !closeMenuBtn) return;

    // Abrir menú
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenu.classList.add('active');
        document.body.classList.add('menu-open');
    });

    // Cerrar menú
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    // Dropdowns mobile
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = toggle.nextElementSibling;
            if (!submenu) return;

            submenu.classList.toggle('active');

            const icon = toggle.querySelector('i.fa-chevron-down');
            if (icon) {
                icon.style.transform = submenu.classList.contains('active')
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)';
            }
        });
    });

    // Cerrar al hacer click en links normales
    document.querySelectorAll('.mobile-nav > li > a:not(.mobile-dropdown-toggle)')
        .forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

    // ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// ====================================
// DESKTOP DROPDOWNS (hover)
// ====================================
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (!menu) return;

        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth >= 1024) {
                menu.classList.add('open');
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 1024) {
                menu.classList.remove('open');
            }
        });
    });
}

// ====================================
// HEADER SCROLL EFFECT
// ====================================
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    const banner = document.querySelector('.top-banner');

    if (!header || !banner) return;

    const applyState = () => {
        if (window.scrollY > banner.offsetHeight) {
            banner.classList.add('hide');
            header.classList.add('fixed');
        } else {
            banner.classList.remove('hide');
            header.classList.remove('fixed');
        }
    };

    // ⬅️ APLICAR ANTES DE QUE EL USUARIO LO VEA
    requestAnimationFrame(applyState);

    window.addEventListener('scroll', applyState, { passive: true });
}




// ====================================
// RESPONSIVE CLEANUP
// ====================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const mobileMenu = document.getElementById('mobileMenu');
        if (window.innerWidth >= 1024 && mobileMenu?.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }, 200);
});

let headerInitialized = false;

function initHeader() {
    if (headerInitialized) return;

    initHeaderScroll();
    initMobileMenu();
    initDropdowns();

    headerInitialized = true;
}