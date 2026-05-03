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

  const topNavLinks = Array.from(document.querySelectorAll('.top-nav a[href^="#"]'));
  const trackedSections = topNavLinks
    .map((link) => {
      const targetId = link.getAttribute('href')?.slice(1);
      return targetId ? document.getElementById(targetId) : null;
    })
    .filter(Boolean);

  if (topNavLinks.length && trackedSections.length) {
    const setActiveNavLink = (activeId) => {
      topNavLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${activeId}`;
        link.classList.toggle('active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    const topbar = document.querySelector('.topbar');
    const topbarOffset = topbar ? topbar.offsetHeight + 24 : 96;
    let activeSectionId = trackedSections[0].id;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          activeSectionId = visibleEntries[0].target.id;
          setActiveNavLink(activeSectionId);
        }
      },
      {
        rootMargin: `-${topbarOffset}px 0px -55% 0px`,
        threshold: [0.15, 0.3, 0.45, 0.6],
      }
    );

    trackedSections.forEach((section) => sectionObserver.observe(section));
    setActiveNavLink(activeSectionId);
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

    function scrollToExpandedProjects() {
      const targetCard = cards[initialCount];
      if (!targetCard) return;

      requestAnimationFrame(() => {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    if (cards.length > initialCount) {
      showInitial();
      if (toggleBtn) {
        toggleBtn.style.display = 'inline-flex';
        toggleBtn.addEventListener('click', () => {
          const anyHidden = cards.some(c => c.classList.contains('hidden'));
          if (anyHidden) {
            showAll();
            scrollToExpandedProjects();
          } else {
            showInitial();
          }
        });
      }
    } else {
      if (toggleBtn) toggleBtn.style.display = 'none';
    }
  }

  // Skills toggle: show first 8, expand on button
  const skillsGrid = document.querySelector('.skills-grid');
  const skillsToggle = document.getElementById('toggle-skills');
  if (skillsGrid && skillsToggle) {
    const skills = Array.from(skillsGrid.querySelectorAll('.skill-card'));
    const initialCount = 8;
    const topbar = document.querySelector('.topbar');

    function showInitialSkills() {
      skillsGrid.classList.add('collapsed');
      skillsToggle.textContent = 'View all';
      skillsToggle.setAttribute('aria-expanded', 'false');
    }

    function showAllSkills() {
      skillsGrid.classList.remove('collapsed');
      skillsToggle.textContent = 'Show less';
      skillsToggle.setAttribute('aria-expanded', 'true');
    }

    function scrollToExpandedSkills() {
      const target = skills[initialCount];
      if (!target) return;
      const topbarOffset = topbar ? topbar.offsetHeight + 24 : 96;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const targetTop = target.getBoundingClientRect().top + window.scrollY - topbarOffset;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        });
      });
    }

    if (skills.length > initialCount) {
      showInitialSkills();
      skillsToggle.style.display = 'inline-flex';
      skillsToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (skillsGrid.classList.contains('collapsed')) {
          showAllSkills();
          scrollToExpandedSkills();
        } else {
          showInitialSkills();
        }
      });
    } else {
      skillsToggle.style.display = 'none';
    }
  }

  // Experience toggle: show first 3, expand on button
  const timeline = document.querySelector('.timeline');
  const experienceToggle = document.getElementById('toggle-experience');
  if (timeline && experienceToggle) {
    const items = Array.from(timeline.querySelectorAll('.timeline-item'));
    const initialCount = 3;
    const topbar = document.querySelector('.topbar');

    function showInitialExperience() {
      timeline.classList.add('collapsed');
      experienceToggle.textContent = 'View all';
      experienceToggle.setAttribute('aria-expanded', 'false');
    }

    function showAllExperience() {
      timeline.classList.remove('collapsed');
      experienceToggle.textContent = 'Show less';
      experienceToggle.setAttribute('aria-expanded', 'true');
    }

    function scrollToFourthExperienceItem() {
      const target = items[initialCount];
      if (!target) return;
      const topbarOffset = topbar ? topbar.offsetHeight + 24 : 96;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const targetTop = target.getBoundingClientRect().top + window.scrollY - topbarOffset;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        });
      });
    }

    if (items.length > initialCount) {
      showInitialExperience();
      experienceToggle.style.display = 'inline-flex';
      experienceToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (timeline.classList.contains('collapsed')) {
          showAllExperience();
          scrollToFourthExperienceItem();
        } else {
          showInitialExperience();
        }
      });
    } else {
      experienceToggle.style.display = 'none';
    }
  }
});
