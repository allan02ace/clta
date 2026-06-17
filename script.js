// ==========================================
// 1. NAV ACTIVE LINK HIGHLIGHTER
// ==========================================
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

// ==========================================
// 2. HERO PANEL SLIDE-IN ANIMATION (Guarded)
// ==========================================
const heroPanel = document.getElementById('heroPanel');
if (heroPanel) {
    window.addEventListener('load', () => {
        heroPanel.classList.add('visible');
    });
}

// ==========================================
// 3. STEPPING-STONE SCROLL ARROW BEHAVIOR (Fixed Coordinates)
// ==========================================
const scrollArrow = document.getElementById('scrollArrow');

// Mapped precisely to your explicit HTML IDs and Classes
const sectionSelectors = [
    '#what-we-do',
    '.about',
    '.industry-wrapper', // Nested div handled safely now
    '.mv-section',
    '.values-section'    // Core Values (Final destination)
];

if (scrollArrow) {
    // Generate valid elements based on selectors array
    const orderedSections = sectionSelectors
        .map(selector => document.querySelector(selector))
        .filter(el => el !== null);

    const finalSection = orderedSections[orderedSections.length - 1];

    // Helper function to get absolute page coordinates regardless of CSS nesting parent elements
    const getAbsoluteTop = (element) => {
        return element.getBoundingClientRect().top + window.scrollY;
    };

    // 1. Smoothly fade out arrow when arriving at Core Values or page bottom
    window.addEventListener('scroll', () => {
        let shouldHide = false;

        if (finalSection) {
            const finalSectionTop = getAbsoluteTop(finalSection);
            // Arrow vanishes safely when Core Values hits near the top viewport line
            shouldHide = window.scrollY >= (finalSectionTop - 120);
        }

        // Safety fallback check for reaching absolute bottom boundary of layout
        const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 120;
        
        if (shouldHide || scrolledToBottom) {
            scrollArrow.classList.add('hidden');
        } else {
            scrollArrow.classList.remove('hidden');
        }
    });

    // 2. Sequential Step Router Engine
    scrollArrow.addEventListener('click', (e) => {
        e.preventDefault();
        const currentScrollPosition = window.scrollY;

        // Finds the next section whose top boundary is at least 30px FURTHER down than your current view window.
        // The (+ 30) acts as a safety threshold to bypass subpixel rounding calculation dead-zones entirely.
        const nextTarget = orderedSections.find(section => {
            const sectionTop = getAbsoluteTop(section);
            return sectionTop > (currentScrollPosition + 30);
        });

        // If a chronological step remains downstream, execute jump transition
        if (nextTarget) {
            nextTarget.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
}

// ==========================================
// 4. GENERAL SMOOTH SCROLL HANDLER
// ==========================================
document.querySelectorAll('a[href^="#"]:not(#scrollArrow)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// ==========================================
// 5. HERO SLIDESHOW (Guarded & WebP Optimized)
// ==========================================
const bgImg = document.getElementById('heroBgImg');
const dotsContainer = document.getElementById('heroDots');

if (bgImg && dotsContainer) {
    const slides = [
        { src: 'images/brg.webp',  position: 'center center' },
        { src: 'images/brg2.webp', position: 'center center' },
        { src: 'images/brg3.webp', position: 'center center' },
        { src: 'images/brg4.webp', position: 'center center' }
    ];
    let current = 0;

    // Create navigation dots
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

    const heroPrev = document.getElementById('heroPrev');
    const heroNext = document.getElementById('heroNext');
    if (heroPrev) heroPrev.addEventListener('click', () => goTo(current - 1));
    if (heroNext) heroNext.addEventListener('click', () => goTo(current + 1));
}

// ==========================================
// 6. HAMBURGER MOBILE SIDEBAR (Guarded)
// ==========================================
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

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            overlay.classList.remove('active');
        });
    });
}

// ==========================================
// 7. GLOBAL SILENT IMAGE PRELOADER
// ==========================================
const imagesToPreload = [
    "images/brg2.webp",
    "images/brg3.webp",
    "images/brg4.webp"
];

imagesToPreload.forEach((imagePath) => {
    const img = new Image();
    img.src = imagePath;
});
