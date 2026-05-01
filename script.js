document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-ready");

  const revealElements = Array.from(document.querySelectorAll(".reveal"));
  revealElements.forEach((element, index) => {
    const delay = Math.min(index * 90, 630);
    element.style.setProperty("--delay", `${delay}ms`);
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -6% 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const yearNode = document.querySelector("[data-year]");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  // Projects toggle: show first 6, expand on button
  const projectGrid = document.getElementById("project-grid");
  if (projectGrid) {
    const cards = Array.from(projectGrid.querySelectorAll('.project-card'));
    const initialCount = 6;
    const toggleBtn = document.getElementById('toggle-projects');

    function showInitial() {
      cards.forEach((c, i) => c.classList.toggle('hidden', i >= initialCount));
      if (toggleBtn) toggleBtn.textContent = 'View all →';
    }

    function showAll() {
      cards.forEach(c => c.classList.remove('hidden'));
      if (toggleBtn) toggleBtn.textContent = 'Show less ←';
    }

    if (cards.length > initialCount) {
      showInitial();
      if (toggleBtn) {
        toggleBtn.style.display = 'inline-flex';
        toggleBtn.addEventListener('click', () => {
          const anyHidden = cards.some(c => c.classList.contains('hidden'));
          if (anyHidden) showAll(); else showInitial();
        });
      }
    } else {
      if (toggleBtn) toggleBtn.style.display = 'none';
    }
  }
});
