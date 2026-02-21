import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import Book from "@/components/Book";

const Index = () => {
  const [showBook, setShowBook] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-romantic relative overflow-hidden">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {!showBook ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-7xl font-script text-gradient-love glow-text mb-4">
                Happy Valentine's Day
              </h1>
              <p className="text-3xl sm:text-4xl mb-2">💖</p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground font-body mb-10 max-w-sm"
            >
              I made something special for you…
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBook(true)}
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold text-lg shadow-romantic animate-pulse-glow"
            >
              💌 Open the Surprise
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="book"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen py-10"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-script text-3xl sm:text-4xl text-gradient-love glow-text mb-6 text-center px-4"
            >
              Our Love Story 💕
            </motion.h2>

            <Book />

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBook(false)}
              className="mt-8 text-sm text-muted-foreground font-body underline underline-offset-4 hover:text-foreground transition-colors"
            >
              ← Back to start
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
