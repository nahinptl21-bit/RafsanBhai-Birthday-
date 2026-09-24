import confetti from 'canvas-confetti';

/**
 * Trigger an explosion of confetti from the center of the screen
 */
export function fireCelebrationBurst() {
  const count = 200;
  const defaults = {
    origin: { y: 0.6 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f59e0b', '#ef4444', '#ec4899', '#3b82f6', '#10b981'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#ffd700', '#ff69b4', '#00e5ff', '#ff3d00'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

/**
 * Fires confetti cannons from both sides
 */
export function fireSideCannons() {
  const end = Date.now() + 1200;
  const colors = ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#fbbf24'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

/**
 * Golden stars and sparkle shower
 */
export function fireGoldenStars() {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.4,
    decay: 0.94,
    startVelocity: 28,
    colors: ['#FFE600', '#FFD700', '#FF9E00', '#FFB703', '#FFF176'],
    shapes: ['star'] as confetti.Shape[],
    zIndex: 9999,
  };

  confetti({
    ...defaults,
    particleCount: 45,
    scalar: 1.3,
  });
  confetti({
    ...defaults,
    particleCount: 30,
    scalar: 0.9,
  });
}

/**
 * Candle blow-out special magic blast
 */
export function fireCandleBlowFanfare() {
  const duration = 2500;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 70, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: any = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.2, 0.4), y: Math.random() - 0.2 },
      colors: ['#f59e0b', '#ec4899', '#6366f1', '#14b8a6', '#fbbf24'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.8), y: Math.random() - 0.2 },
      colors: ['#ef4444', '#3b82f6', '#8b5cf6', '#10b981', '#f97316'],
    });
  }, 250);
}
