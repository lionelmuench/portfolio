/**
 * Cursor Effects Module
 * Custom cursor with trailing effect and particle generation
 */

export function initCursorEffects() {
    // Check for touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return;
    }

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Smooth follow for outer cursor
        const diffX = mouseX - cursorX;
        const diffY = mouseY - cursorY;
        cursorX += diffX * 0.15;
        cursorY += diffY * 0.15;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        // Faster follow for dot
        const dotDiffX = mouseX - dotX;
        const dotDiffY = mouseY - dotY;
        dotX += dotDiffX * 0.5;
        dotY += dotDiffY * 0.5;
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .project-image, .project-card, [data-cursor-hover]');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor--hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor--hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

/**
 * Particle effect on mouse movement (optional enhancement)
 */
export function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
    overflow: hidden;
  `;
    document.body.appendChild(particleContainer);

    let lastParticleTime = 0;
    const particleInterval = 50; // ms between particles

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastParticleTime < particleInterval) return;
        lastParticleTime = now;

        createParticle(e.clientX, e.clientY, particleContainer);
    });
}

function createParticle(x, y, container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;

    particle.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size}px;
    background: rgba(232, 228, 220, 0.5);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: all 1s ease-out;
  `;

    container.appendChild(particle);

    // Animate out
    requestAnimationFrame(() => {
        particle.style.opacity = '0';
        particle.style.transform = `translate(-50%, -50%) scale(0)`;
    });

    // Remove after animation
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

/**
 * Mouse-responsive hero shapes
 */
export function initHeroMouseEffect() {
    const heroShapes = document.querySelectorAll('.hero__shape');
    const hero = document.querySelector('.hero');

    if (!heroShapes.length || !hero) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left - centerX;
        const mouseY = e.clientY - rect.top - centerY;

        heroShapes.forEach((shape, index) => {
            const intensity = (index + 1) * 0.02;
            const x = mouseX * intensity;
            const y = mouseY * intensity;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    hero.addEventListener('mouseleave', () => {
        heroShapes.forEach(shape => {
            shape.style.transform = 'translate(0, 0)';
            shape.style.transition = 'transform 0.5s ease-out';
        });
    });

    hero.addEventListener('mouseenter', () => {
        heroShapes.forEach(shape => {
            shape.style.transition = 'transform 0.1s ease-out';
        });
    });
}
