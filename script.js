// Custom Cursor
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");

window.addEventListener("mousemove", function (e) {
    // Only move custom cursor if not a touch device to prevent ghosting
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Add a slight lag for the outline for a fluid feel
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

// Hover effects for cursor
const hoverElements = document.querySelectorAll("a, button, .menu-item");
hoverElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
            cursorOutline.style.backgroundColor = "rgba(212, 175, 55, 0.1)";
        }
    });
    el.addEventListener("mouseleave", () => {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
            cursorOutline.style.backgroundColor = "transparent";
        }
    });
});

// Sticky Header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('nav-open');
        document.body.style.overflow = navMenu.classList.contains('nav-open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('nav-open');
            document.body.style.overflow = '';
        });
    });
}

// Parallax Effect - Disable on small screens for performance
window.addEventListener('scroll', function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
        const parallax = document.querySelector('.parallax');
        if (parallax) {
            let scrollPosition = window.pageYOffset;
            parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        }
    }
});

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('.reveal-text, .reveal-image, .reveal-card, .menu-category');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1, // Lower threshold for mobile
    rootMargin: "0px"
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Offset for fixed header
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});
