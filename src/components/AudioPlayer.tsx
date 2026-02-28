import { useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Music } from "lucide-react";
import { useState } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex flex-col items-center gap-3 mt-6"
    >
      <p className="text-muted-foreground text-sm font-body flex items-center gap-2">
        <Music className="w-4 h-4" />
        Our Song
      </p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggle}
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-romantic animate-pulse-glow"
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
      </motion.button>
      {/* Replace the src below with your audio file path */}
      <audio ref={audioRef} src="/assets/chahun.mp3" loop />
    </motion.div>
  );
};

export default AudioPlayer;
