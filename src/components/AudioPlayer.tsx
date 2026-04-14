import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-4">
      {/* Small Now Playing Bar */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card px-4 py-2 flex items-center gap-3 border-cyber-pink/30 hover:border-cyber-pink transition-all group"
      >
        <div className="flex gap-[2px] h-4 items-end">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: !isMuted ? [4, 16, 8, 12, 4] : [4, 4, 4] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              className="w-[2px] bg-cyber-pink"
            />
          ))}
        </div>
        
        <div className="flex flex-col">
          <span className="text-[10px] text-cyber-pink font-bold uppercase tracking-widest">Now Playing</span>
          <span className="text-[10px] text-white/50 truncate max-w-[100px]">LYvWDSs1bsc</span>
        </div>

        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="ml-2 p-1 text-cyber-pink hover:bg-cyber-pink/10 rounded transition-colors"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </motion.div>

      {/* Hidden YouTube Player */}
      <div className="hidden">
        <iframe
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/LYvWDSs1bsc?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=LYvWDSs1bsc`}
          title="YouTube video player"
          allow="autoplay"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
