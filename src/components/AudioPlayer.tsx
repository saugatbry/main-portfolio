import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, ExternalLink } from 'lucide-react';

const DISCORD_ID = "1313736920454533171";

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchLanyard = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const res = await response.json();
        if (res.success) setData(res.data);
      } catch (error) {
        console.error("Lanyard error:", error);
      }
    };

    fetchLanyard();
    const interval = setInterval(fetchLanyard, 5000);
    return () => clearInterval(interval);
  }, []);

  const isPlaying = data?.listening_to_spotify && data.spotify;
  const song = data?.spotify;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card px-4 py-2 flex items-center gap-3 border-cyber-green/30 hover:border-cyber-green transition-all group backdrop-blur-xl bg-black/60"
      >
        {/* Animated Disc / Album Art */}
        <motion.div 
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className={`w-10 h-10 rounded-full border-2 ${isPlaying ? 'border-cyber-green' : 'border-white/20'} overflow-hidden shrink-0 shadow-[0_0_15px_rgba(0,255,159,0.1)]`}
        >
          {isPlaying ? (
            <img src={song.album_art_url} alt="Album Art" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-black/40 flex items-center justify-center">
              <Music size={16} className="text-white/20" />
            </div>
          )}
        </motion.div>

        {/* Visualizer Bars */}
        <div className="flex gap-[2px] h-4 items-end mx-1">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                height: isPlaying ? [4, 16, 8, 12, 4] : [4, 4, 4] 
              }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              className={`w-[2px] ${isPlaying ? 'bg-cyber-green' : 'bg-white/20'}`}
            />
          ))}
        </div>
        
        {/* Info Text */}
        <div className="flex flex-col min-w-[80px] max-w-[180px]">
          <span className={`text-[8px] font-bold uppercase tracking-[0.2em] ${isPlaying ? 'text-cyber-green' : 'text-white/30'}`}>
            {isPlaying ? 'Live on Spotify' : 'Spotify Offline'}
          </span>
          <span className="text-[10px] text-white font-medium truncate leading-tight">
            {isPlaying ? song.song : 'System Idle'}
          </span>
          {isPlaying && (
            <span className="text-[9px] text-white/50 truncate">
              {song.artist}
            </span>
          )}
        </div>

        {/* Link / Control */}
        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-white/10">
          {isPlaying ? (
            <a 
              href={`https://open.spotify.com/track/${song.track_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-cyber-green hover:bg-cyber-green/10 rounded transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          ) : (
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 text-white/30 hover:text-white/60 transition-colors"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          )}
        </div>
      </motion.div>

      {/* Background YouTube Audio (Only active when NOT playing Spotify) */}
      {!isPlaying && (
        <div className="hidden">
          <iframe
            width="0"
            height="0"
            src={`https://www.youtube.com/embed/LYvWDSs1bsc?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=LYvWDSs1bsc`}
            title="YouTube video player"
            allow="autoplay"
          />
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;

