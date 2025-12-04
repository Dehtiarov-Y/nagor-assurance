document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Логика Бургер-меню ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const navWrapper = document.querySelector('.nav-wrapper');

    if (hamburgerButton && navWrapper) {
        hamburgerButton.addEventListener('click', function() {
            navWrapper.classList.toggle('is-active');

            const icon = hamburgerButton.querySelector('i');
            if (navWrapper.classList.contains('is-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }

    // Закрытие меню при клике на ссылку
    navWrapper.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (navWrapper.classList.contains('is-active')) {
                navWrapper.classList.remove('is-active');
                hamburgerButton.querySelector('i').classList.remove('fa-times');
                hamburgerButton.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    });

    // --- 2. Логика "Активной" ссылки меню ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-header nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.endsWith(linkPath) || (linkPath === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')))) {
            link.classList.add('active');
        }
    });

    // --- 3. Анимации при прокрутке ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => {
        observer.observe(el);
    });
    
    // --- 4. "Умный" хедер ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        });
    }
});