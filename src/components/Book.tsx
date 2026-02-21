import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AudioPlayer from "./AudioPlayer";

interface PageData {
  caption: string;
  subCaption?: string;
  imageLabel: string;
  isLast?: boolean;
}

const pages: PageData[] = [
  {
    imageLabel: "📸 Our First Photo",
    caption: "You must be made of magic,\nbecause every time I see you,\nmy world turns pink 💕",
  },
  {
    imageLabel: "📸 Our Adventure",
    caption: "Kung ikaw ay bituin,\nikaw ang pinakamaliwanag sa langit ko ✨",
    subCaption: "If you were a star, you'd be the brightest in my sky.",
  },
  {
    imageLabel: "📸 Your Smile",
    caption: "Are you a WiFi signal?\nBecause I'm feeling the strongest\nconnection with you 💖",
  },
  {
    imageLabel: "📸 Us Together",
    caption: "Sa bawat tibok ng puso ko,\npangalan mo ang bumubulong 💞",
    subCaption: "With every heartbeat, it softly whispers your name.",
  },
  {
    imageLabel: "📸 Forever Ours",
    caption: "No matter how many pages life gives us,\nI only want to write them with you 💗",
    isLast: true,
  },
];

const Book = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = useCallback(() => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  }, [currentPage]);

  const goPrev = useCallback(() => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  }, [currentPage]);

  // Swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  };

  const page = pages[currentPage];

  const variants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div
      className="w-full max-w-md mx-auto px-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: "1200px" }}
    >
      {/* Book Container */}
      <div className="relative bg-card rounded-2xl shadow-romantic overflow-hidden min-h-[520px] sm:min-h-[560px]">
        {/* Page indicator */}
        <div className="absolute top-4 right-4 z-10 text-xs font-body text-muted-foreground bg-secondary/80 backdrop-blur-sm px-3 py-1 rounded-full">
          {currentPage + 1} / {pages.length}
        </div>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              rotateY: { duration: 0.5, ease: "easeInOut" },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="p-6 sm:p-8 flex flex-col items-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full aspect-[4/3] rounded-xl bg-secondary flex items-center justify-center mb-6 border-2 border-dashed border-border overflow-hidden"
            >
              <div className="text-center text-muted-foreground">
                <p className="text-4xl mb-2">📷</p>
                <p className="text-sm font-body">{page.imageLabel}</p>
                <p className="text-xs mt-1 opacity-60">Replace with your photo</p>
              </div>
            </motion.div>

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <p className="font-script text-xl sm:text-2xl text-foreground leading-relaxed whitespace-pre-line">
                {page.caption}
              </p>
              {page.subCaption && (
                <p className="text-sm text-muted-foreground font-body mt-3 italic">
                  {page.subCaption}
                </p>
              )}
            </motion.div>

            {/* Audio player on last page */}
            {page.isLast && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full"
              >
                <AudioPlayer />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goPrev}
            disabled={currentPage === 0}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground disabled:opacity-30 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goNext}
            disabled={currentPage === pages.length - 1}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground disabled:opacity-30 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentPage ? 1 : -1);
              setCurrentPage(i);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentPage
                ? "bg-primary w-6"
                : "bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Book;
