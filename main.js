/* =========================
   PRELOADER (FIXED % BUG)
   ========================= */
let load = 0;
const percentageText = document.getElementById("load-percentage");
const loadingBar = document.getElementById("loading-bar");
const preloader = document.getElementById("preloader");

const loaderInterval = setInterval(() => {
    load++;

    percentageText.textContent = load; // FIX: number only
    loadingBar.style.width = `${load}%`;

    if (load >= 100) {
        clearInterval(loaderInterval);

        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.pointerEvents = "none";

            setTimeout(() => {
                preloader.style.display = "none";
            }, 600);
        }, 400);
    }
}, 30);

/* =========================
   NAVBAR SCROLL EFFECT
   ========================= */
const navbar = document.querySelector(".navbar");

window.addEventListener(
    "scroll",
    () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
        updateActiveLink();
    },
    { passive: true }
);

/* =========================
   SMOOTH SCROLL + MOBILE CLOSE
   ========================= */
const navLinks = document.querySelectorAll(".nav-links a");
const navMenu = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");

navLinks.forEach(link => {
    link.addEventListener("click", e => {
        const targetId = link.getAttribute("href");

        if (targetId.startsWith("#")) {
            e.preventDefault();
            document.querySelector(targetId)?.scrollIntoView({
                behavior: "smooth"
            });
        }

        // MOBILE: close menu on click
        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        document.body.style.overflow = "";
    });
});

/* =========================
   MOBILE NAV TOGGLE
   ========================= */
menuToggle?.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuToggle.classList.toggle("active");

    document.body.style.overflow =
        navMenu.classList.contains("open") ? "hidden" : "";
});

/* =========================
   ACTIVE NAV LINK (OPTIMIZED)
   ========================= */
const sections = document.querySelectorAll("section");

function updateActiveLink() {
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (pageYOffset >= top && pageYOffset < top + height) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
}

/* =========================
   SCROLL REVEAL
   ========================= */
const revealItems = document.querySelectorAll(
    ".service-card, .trainer-card, .price-card, .review-card"
);

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealItems.forEach(el => {
        if (el.getBoundingClientRect().top < windowHeight - 80) {
            el.classList.add("reveal");
        }
    });
}

window.addEventListener("scroll", revealOnScroll, { passive: true });
window.addEventListener("load", revealOnScroll);

/* =========================
   ICON INIT
   ========================= */
lucide.createIcons();

sections = document.querySelectorAll("section[id]");
navLinks = document.querySelectorAll(".nav-links a");

function activateNavLink() {
    let scrollY = window.scrollY + 120; // offset for navbar

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove("active"));

            const activeLink = document.querySelector(
                `.nav-links a[href="#${sectionId}"]`
            );

            if (activeLink) activeLink.classList.add("active");
        }
    });
}

window.addEventListener("scroll", activateNavLink);