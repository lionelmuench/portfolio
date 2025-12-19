/**
 * Scroll Animations Module
 * Uses IntersectionObserver for performant scroll-triggered animations
 */

export function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optionally unobserve after revealing for performance
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  revealElements.forEach(el => {
    observer.observe(el);
  });

  // Parallax effect for background elements
  initParallax();
}

/**
 * Parallax scrolling for hero shapes
 */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (!parallaxElements.length) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const yPos = -(scrollY * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Animate elements when they enter specific viewport zones
 */
export function initViewportAnimations() {
  const projectSections = document.querySelectorAll('.project-section');
  
  if (!projectSections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, {
    threshold: 0.3
  });

  projectSections.forEach(section => {
    observer.observe(section);
  });
}
