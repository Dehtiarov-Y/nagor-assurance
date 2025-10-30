
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-header nav ul li a');

    navLinks.forEach(link => {
        // Obtenir le chemin relatif de chaque lien
        const linkPath = link.getAttribute('href');

        // Vérifier si le chemin actuel contient le chemin du lien
        // Pour gérer "index.html" et "index" comme la même page, et les sous-pages
        if (currentPath.includes(linkPath) || (linkPath === 'index.html' && (currentPath === '/' || currentPath === '/index.html'))) {
            link.classList.add('active');
        }
    });
});
// --- Burger Menu Logic ---

document.addEventListener('DOMContentLoaded', function() {
    
    // Код для .active (который у вас уже есть)
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-header nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath) || (linkPath === 'index.html' && (currentPath === '/' || currentPath === '/index.html'))) {
            link.classList.add('active');
        }
    });

    // --- Новый код для Бургера ---
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
                icon.classList.add('fa-times'); // 'fa-times' это иконка крестика
                // Блокируем прокрутку страницы, когда меню открыто
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // Разблокируем прокрутку
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
});