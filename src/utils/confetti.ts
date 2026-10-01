import confetti from 'canvas-confetti';

export const triggerSproutConfetti = () => {
  try {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#10b981', '#34d399', '#059669', '#f59e0b', '#6ee7b7', '#38bdf8'],
      ticks: 200,
    });
  } catch {
    // Graceful fallback if canvas is unavailable
  }
};

export const triggerLevelUpConfetti = () => {
  try {
    const end = Date.now() + 1000;
    const colors = ['#10b981', '#fbbf24', '#3b82f6', '#34d399'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {
    // Graceful fallback
  }
};
