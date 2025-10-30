// js/script.js

// Ждем, пока весь HTML-документ загрузится
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Логика Бургер-меню (уже была) ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const navWrapper = document.querySelector('.nav-wrapper');

    if (hamburgerButton && navWrapper) {
        hamburgerButton.addEventListener('click', function() {
            // Переключаем класс .is-active у меню
            navWrapper.classList.toggle('is-active');

            // Меняем иконку (бургер / крестик)
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

    // Закрываем меню, если нажали на ссылку внутри него (для мобильных)
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

    // --- 2. Логика "Активной" ссылки меню (уже была) ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-header nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.endsWith(linkPath) || (linkPath === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')))) {
            link.classList.add('active');
        }
    });

    // --- 3. НОВОЕ: Анимации при прокрутке ---
    
    // Создаем "наблюдателя"
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Если элемент, за которым мы следим, появился на экране...
            if (entry.isIntersecting) {
                // ...добавляем ему класс, который его "покажет"
                entry.target.classList.add('is-visible');
                // И перестаем за ним следить, т.к. он уже показан
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Анимация сработает, когда 10% элемента видно
    });

    // Находим все элементы, которые мы пометили классом .reveal-on-scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    // "Натравливаем" наблюдателя на каждый из них
    revealElements.forEach(el => {
        observer.observe(el);
    });

    
    // --- 4. НОВОЕ: "Умный" хедер ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            // Если пользователь прокрутил вниз больше чем на 50 пикселей...
            if (window.scrollY > 50) {
                // ...добавляем класс
                header.classList.add('is-scrolled');
            } else {
                // ...иначе убираем
                header.classList.remove('is-scrolled');
            }
        });
    }
});