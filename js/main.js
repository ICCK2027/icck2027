/* ============================================================
   CONFERENCE WEBSITE — SCRIPTS
   ============================================================
   This file handles:
     1. Showing one section at a time when a nav link is clicked.
     2. The mobile hamburger menu (open/close).
     3. The "back to top" button after you scroll.

   No libraries needed — it's plain JavaScript and runs as-is.
============================================================ */

// Grab the elements we need once, at the top.
const navToggle = document.getElementById('navToggle');
const siteNav   = document.getElementById('siteNav');
const backToTop = document.getElementById('backToTop');

// Every page section is a <section class="page">. Only one has ".active".
const pages = document.querySelectorAll('main > .page');

// Every navigation link that points at a section (href="#something").
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

/* ------------------------------------------------------------
   1. SHOW / HIDE SECTIONS
   Given an id like "about", show that section and hide the rest.
------------------------------------------------------------ */
function showPage(id) {
  // Ignore empty ids (e.g. placeholder href="#") or ids with no matching section.
  const target = document.getElementById(id);
  if (!target) return;

  // Hide all pages, then reveal the requested one.
  pages.forEach((section) => {
    section.classList.toggle('active', section.id === id);
  });

  // Update the "active" highlight on the nav links to match.
  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute('href') === '#' + id;
    link.classList.toggle('active', isCurrent);
  });

  // Jump back to the top so each "page" starts at the top.
  window.scrollTo({ top: 0, behavior: 'auto' });
}

// Attach a click handler to each nav link.
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // stop the default jump-to-anchor behaviour

    // Extract the section id from the href, e.g. "#about" -> "about".
    const id = link.getAttribute('href').slice(1);
    showPage(id);

    // If the mobile menu is open, close it after choosing a page.
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Also let the hero buttons ("Register", "Submit a Paper") switch pages.
// They are <a href="#registration"> etc. but are NOT inside .site-nav.
document.querySelectorAll('main a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const id = link.getAttribute('href').slice(1);
    showPage(id);
  });
});

/* ------------------------------------------------------------
   2. MOBILE MENU
   Toggling the ".open" class shows/hides the nav (see CSS).
------------------------------------------------------------ */
navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');

  // Keep the button's aria-expanded state in sync for accessibility.
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

/* ------------------------------------------------------------
   3. BACK-TO-TOP BUTTON
   Show the button only after the user has scrolled down a bit.
------------------------------------------------------------ */
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show the "home" section first on page load.
showPage('home');
