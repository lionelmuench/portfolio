/**
 * Main JavaScript Entry Point
 * Initializes all modules on DOM ready
 */

import { initScrollAnimations, initViewportAnimations } from './scroll-animations.js';
import { initCursorEffects, initHeroMouseEffect } from './cursor-effects.js';
import { initNavigation, initBackToTop } from './navigation.js';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Add classes to indicate JS is loaded and working
  document.body.classList.add('page-loaded');
  document.body.classList.add('js-loaded');

  // Initialize all modules
  initNavigation();
  initScrollAnimations();
  initViewportAnimations();
  initCursorEffects();
  initHeroMouseEffect();
  initBackToTop();

  // Initialize audio player if present
  initAudioPlayer();

  console.log('Portfolio initialized ✨');
});

/**
 * Audio player for Sound Vessel section
 */
function initAudioPlayer() {
  const playBtn = document.querySelector('.audio-player__btn');
  const audio = document.querySelector('.audio-player audio');

  if (!playBtn || !audio) return;

  let isPlaying = false;

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      playBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      `;
    } else {
      audio.play();
      playBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      `;
    }
    isPlaying = !isPlaying;
  });

  audio.addEventListener('ended', () => {
    isPlaying = false;
    playBtn.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    `;
  });
}

/**
 * Preload critical images
 */
function preloadImages() {
  const imagesToPreload = document.querySelectorAll('img[data-preload]');

  imagesToPreload.forEach(img => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = img.src;
    document.head.appendChild(preloadLink);
  });
}

// Run preload immediately
preloadImages();
