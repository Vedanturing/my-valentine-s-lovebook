import { useMemo } from "react";

const HEART_CHARS = ["💕", "💗", "💖", "💞", "❤️", "🩷", "✨"];

const FloatingHearts = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        char: HEART_CHARS[i % HEART_CHARS.length],
        left: Math.random() * 100,
        size: 14 + Math.random() * 18,
        duration: 6 + Math.random() * 10,
        delay: Math.random() * 8,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute animate-float-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          {h.char}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
