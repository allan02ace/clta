// Nav active link
const links = document.querySelectorAll('nav ul li a');
const currentFilename = window.location.pathname.split('/').pop();
links.forEach(link => {
    const linkFilename = link.getAttribute('href');
    if (currentFilename === linkFilename) {
        link.classList.add('active');
    } else if ((currentFilename === '' || currentFilename === 'index.html') && linkFilename === 'index.html') {
        link.classList.add('active');
    }
});

// Hero panel slide-in
window.addEventListener('load', () => {
    document.getElementById('heroPanel').classList.add('visible');
});

// Scroll arrow hide at bottom
const scrollArrow = document.getElementById('scrollArrow');
window.addEventListener('scroll', () => {
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 150;
    if (scrolledToBottom) {
        scrollArrow.classList.add('hidden');
    } else {
        scrollArrow.classList.remove('hidden');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Hero slideshow
const slides = [
    { src: 'images/brg.jpg',  position: 'center center' },
    { src: 'images/brg2.jpg', position: 'center center' },
    { src: 'images/brg3.jpg', position: 'center center' },
    { src: 'images/brg4.jpg', position: 'center center' }
];
let current = 0;
const bgImg = document.getElementById('heroBgImg');
const dotsContainer = document.getElementById('heroDots');

slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('hero-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
});

function updateDots() {
    document.querySelectorAll('.hero-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
    });
}

function goTo(index) {
    current = (index + slides.length) % slides.length;
    bgImg.style.opacity = '0';
    setTimeout(() => {
        bgImg.src = slides[current].src;
        bgImg.style.objectPosition = slides[current].position;
        bgImg.style.opacity = '1';
    }, 300);
    updateDots();
}

document.getElementById('heroPrev').addEventListener('click', () => goTo(current - 1));
document.getElementById('heroNext').addEventListener('click', () => goTo(current + 1));

// Hamburger sidebar
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const closeMenu = document.getElementById('closeMenu');
const overlay = document.getElementById('sidebarOverlay');

if (hamburger && navMenu && closeMenu && overlay) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.add('open');
        overlay.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        navMenu.classList.remove('open');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
        navMenu.classList.remove('open');
        overlay.classList.remove('active');
    });

    // 💡 ONLY close the sidebar automatically if the link is an in-page anchor link (starts with #)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                navMenu.classList.remove('open');
                overlay.classList.remove('active');
            }
        });
    });
}
