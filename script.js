// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===== Typed text effect in hero title =====
const typedWords = ["Frontend Developer", "Web Designer", "Problem Solver"];
const typedEl = document.getElementById('typedText');
let wordIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  if (!typedEl) return;
  const word = typedWords[wordIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = word.slice(0, charIndex);
    if (charIndex === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = word.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % typedWords.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}
typeLoop();

// ===== Contact form: sends straight to your inbox via FormSubmit =====
// No backend needed. IMPORTANT one-time step: the very first submission
// triggers a confirmation email to xamanarif2306@gmail.com — open it and
// click "Activate Form" once. After that, every message arrives automatically.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/xamanarif2306@gmail.com";

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const statusEl = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusEl.textContent = "";
    statusEl.className = "form-status";
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(contactForm)
      });

      if (response.ok) {
        statusEl.textContent = "Message sent! I'll get back to you soon.";
        statusEl.classList.add("success");
        contactForm.reset();
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      statusEl.textContent = "Something went wrong. Please try again, or email me directly.";
      statusEl.classList.add("error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message 🚀";
    }
  });
}