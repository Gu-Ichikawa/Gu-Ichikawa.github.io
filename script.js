const navbar = document.querySelector(".portfolio-navbar");
const navLinks = document.querySelectorAll(".nav-link[href^='#']");
const sections = document.querySelectorAll("main section[id]");
const backToTopButton = document.querySelector(".back-to-top");
const typingText = document.getElementById("typingText");
const menu = document.getElementById("menu");

const typingWords = ["C", "C++", "Java", "HTML", "CSS"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function updateNavbarState() {
    const scrolled = window.scrollY > 20;
    navbar.classList.toggle("nav-scrolled", scrolled);
    backToTopButton.classList.toggle("is-visible", window.scrollY > 500);
}

function setActiveLink() {
    let currentSection = "inicio";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 130;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
}

function typeLoop() {
    if (!typingText) {
        return;
    }

    const currentWord = typingWords[wordIndex];
    const nextText = isDeleting
        ? currentWord.substring(0, charIndex - 1)
        : currentWord.substring(0, charIndex + 1);

    typingText.textContent = nextText;
    charIndex = nextText.length;

    let delay = isDeleting ? 70 : 110;

    if (!isDeleting && nextText === currentWord) {
        delay = 1200;
        isDeleting = true;
    } else if (isDeleting && nextText === "") {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        delay = 260;
    }

    window.setTimeout(typeLoop, delay);
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.16
});

document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const bootstrapCollapse = bootstrap.Collapse.getInstance(menu);

        if (bootstrapCollapse) {
            bootstrapCollapse.hide();
        }
    });
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", () => {
    updateNavbarState();
    setActiveLink();
});

updateNavbarState();
setActiveLink();
typeLoop();
