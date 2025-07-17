// Theme Management
const themeToggle = document.getElementById("theme-toggle");
const footerThemeToggle = document.getElementById("footer-theme-toggle");

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", currentTheme);

// Theme toggle functionality
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Immediately update navbar background
  const navbar = document.querySelector(".navbar");
  if (document.documentElement.getAttribute("data-theme") === "light") {
    navbar.style.background = "rgba(248, 250, 252, 0.95)";
  } else {
    navbar.style.background = "rgba(15, 23, 42, 0.95)";
  }

  // Update footer background
  const footer = document.querySelector(".footer");
  if (document.documentElement.getAttribute("data-theme") === "light") {
    footer.style.background = "rgba(248, 250, 252, 0.95)";
  } else {
    footer.style.background = "rgba(15, 23, 42, 0.95)";
  }
}

themeToggle.addEventListener("click", toggleTheme);
footerThemeToggle.addEventListener("click", toggleTheme);

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Typing Animation
const phrases = [
  "Java",
  "Python",
  "Machine Learning",
  "AI Projects",
  "Deep Learning",
  "Data Science",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById("typed-text");

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    setTimeout(() => {
      isDeleting = true;
    }, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  const typingSpeed = isDeleting ? 100 : 150;
  setTimeout(typeEffect, typingSpeed);
}

// Start typing animation
typeEffect();

// Resume Download
document.getElementById("resume-download").addEventListener("click", () => {
  const resumeUrl =
    "https://drive.google.com/uc?export=download&id=16OschSFyMB4oYcbpnPvQj2_o8g5bU_5g";

  const a = document.createElement("a");
  a.href = resumeUrl;
  a.download = "Siramdasu_Lalith_Kumar_Resume.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  showToast("Resume downloaded successfully!");
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Back to Top Button
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars
      if (entry.target.classList.contains("skills")) {
        animateSkillBars();
      }
    }
  });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("fade-in");
  observer.observe(section);
});

// Observe individual elements
document
  .querySelectorAll(".project-card, .cert-item, .timeline-item, .stat")
  .forEach((element) => {
    element.classList.add("scale-in");
    observer.observe(element);
  });

// Skills Animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });
}

// Contact Form
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Basic validation
  if (!name || !email || !message) {
    showToast("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showToast("Please enter a valid email address.", "error");
    return;
  }

  // Simulate form submission
  showToast("Thank you for your message! I'll get back to you soon.");
  contactForm.reset();
});

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Copy Email Function
document.getElementById("copy-email").addEventListener("click", () => {
  const email = document.getElementById("email-text").textContent;
  navigator.clipboard
    .writeText(email)
    .then(() => {
      showToast("Email copied to clipboard!");
    })
    .catch(() => {
      showToast("Failed to copy email. Please try again.", "error");
    });
});

// Toast Notification
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastMessage = toast.querySelector(".toast-message");

  toastMessage.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    if (document.documentElement.getAttribute("data-theme") === "light") {
      navbar.style.background = "rgba(248, 250, 252, 0.98)";
    } else {
      navbar.style.background = "rgba(15, 23, 42, 0.98)";
    }
  } else {
    if (document.documentElement.getAttribute("data-theme") === "light") {
      navbar.style.background = "rgba(248, 250, 252, 0.95)";
    } else {
      navbar.style.background = "rgba(15, 23, 42, 0.95)";
    }
  }
});

// Active Navigation Link
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Particle Animation Enhancement
function createParticles() {
  const particleContainer = document.querySelector(".hero-bg");

  for (let i = 0; i < 5; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.width = Math.random() * 100 + 40 + "px";
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";

    particleContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

// Preloader (optional)
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Enhanced Form Interactions
document
  .querySelectorAll(".form-group input, .form-group textarea")
  .forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        input.parentElement.classList.remove("focused");
      }
    });
  });

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".particle");

  parallaxElements.forEach((element, index) => {
    const speed = (index + 1) * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounced scroll handler
const debouncedScrollHandler = debounce(() => {
  // Your scroll handling code here
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// Initialize all animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Add initial animation classes
  const elementsToAnimate = document.querySelectorAll(
    ".hero-title, .hero-subtitle, .typing-container, .hero-buttons"
  );
  elementsToAnimate.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`;
  });

  // Trigger navbar initial state
  if (window.scrollY === 0) {
    if (document.documentElement.getAttribute("data-theme") === "light") {
      document.querySelector(".navbar").style.background =
        "rgba(248, 250, 252, 0.95)";
    } else {
      document.querySelector(".navbar").style.background =
        "rgba(15, 23, 42, 0.95)";
    }
  }
});

document.querySelectorAll(".view-cert-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const url = btn.dataset.url;
    if (url) window.open(url, "_blank");
  });
});
