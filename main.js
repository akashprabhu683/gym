/* =========================
   HERO REVEAL ON LOAD
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.getElementById("home");
    if (hero) {
        setTimeout(() => {
            hero.classList.add("revealed");
            // Also reveal content specifically if needed by other CSS
            const content = hero.querySelector(".hero-content");
            if (content) content.classList.add("revealed");
        }, 100);
    }
});

/* =========================
   METRICS COUNTER
   ========================= */
const countElements = document.querySelectorAll(".count");

const startCounting = (el) => {
    const target = parseInt(el.getAttribute("data-target"));
    const suffix = el.getAttribute("data-suffix") || "";
    let count = 0;
    const duration = 2000; // 2 seconds for counting
    const increment = target / (duration / 16); // 60fps

    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(count) + suffix;
        }
    }, 16);
};

const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounting(entry.target);
            metricsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

countElements.forEach(el => metricsObserver.observe(el));

/* =========================
   NAVBAR SCROLL EFFECT
   ========================= */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
    updateActiveLink();
    toggleBackToTop();
}, { passive: true });

/* =========================
   SMOOTH SCROLL + MOBILE CLOSE
   ========================= */
const navLinks = document.querySelectorAll(".nav-links a");
const navMenu = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");

navLinks.forEach(link => {
    link.addEventListener("click", e => {
        const targetId = link.getAttribute("href");
        if (targetId && targetId.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) target.scrollIntoView({ behavior: "smooth" });
        }
        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        document.body.style.overflow = "";
    });
});

/* =========================
   MOBILE NAV TOGGLE
   ========================= */
menuToggle && menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuToggle.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("open") ? "hidden" : "";
});

/* =========================
   ACTIVE NAV LINK
   ========================= */
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
    let current = "";
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (pageYOffset >= top && pageYOffset < top + section.offsetHeight) {
            current = section.id;
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
}

/* =========================
   SCROLL REVEAL
   ========================= */
const revealItems = document.querySelectorAll(
    ".service-card, .trainer-card, .price-card, .review-card, .metric, .transform-card, .contact-card, .gallery-item, .section-title, .section-sub"
);

function revealOnScroll() {
    const wh = window.innerHeight;
    revealItems.forEach(el => {
        if (el.getBoundingClientRect().top < wh - 80) {
            el.classList.add("reveal");
        }
    });
}

window.addEventListener("scroll", revealOnScroll, { passive: true });
window.addEventListener("load", revealOnScroll);

/* =========================
   BACK TO TOP
   ========================= */
const backToTopBtn = document.getElementById("back-to-top");

function toggleBackToTop() {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
    } else {
        backToTopBtn.classList.remove("visible");
    }
}

backToTopBtn && backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =========================
   ICON INIT
   ========================= */
lucide.createIcons();