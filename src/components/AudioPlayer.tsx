import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, ExternalLink, Activity, Info } from 'lucide-react';

const DISCORD_ID = "1313736920454533171";

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLanyard = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const res = await response.json();
        if (res.success) {
          setData(res.data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      }
    };

    fetchLanyard();
    const interval = setInterval(fetchLanyard, 3000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced Detection: Check official Spotify link OR activities list
  const spotifyData = data?.spotify;
  const isListeningOfficial = data?.listening_to_spotify;
  
  // Fallback: search activities for Spotify
  const fallbackActivity = data?.activities?.find((a: any) => a.name === "Spotify" || a.type === 2);
  
  const isPlaying = isListeningOfficial || fallbackActivity;
  
  const songInfo = spotifyData || (fallbackActivity ? {
    song: fallbackActivity.details,
    artist: fallbackActivity.state,
    album_art_url: fallbackActivity.assets?.large_image ? `https://i.scdn.co/image/${fallbackActivity.assets.large_image.split(':')[1]}` : null,
    track_id: fallbackActivity.sync_id
  } : null);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card px-4 py-2 flex items-center gap-3 border-cyber-green/30 hover:border-cyber-green transition-all group backdrop-blur-xl bg-black/60 shadow-[0_0_30px_rgba(0,0,0,0.6)]"
      >
        {/* Animated Disc / Album Art */}
        <motion.div 
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className={`w-11 h-11 rounded-full border-2 ${isPlaying ? 'border-cyber-green/50' : 'border-white/10'} overflow-hidden shrink-0 relative`}
        >
          {songInfo?.album_art_url ? (
            <img src={songInfo.album_art_url} alt="Album Art" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              {error ? <Info size={18} className="text-red-500 animate-pulse" /> : <Music size={18} className="text-white/20" />}
            </div>
          )}
          {isPlaying && (
            <div className="absolute inset-0 bg-cyber-green/10 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-black rounded-full border border-white/20" />
            </div>
          )}
        </motion.div>

        {/* Visualizer Bars */}
        <div className="flex gap-[3px] h-4 items-end mx-1">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                height: isPlaying ? [4, 16, 8, 12, 4] : [4, 6, 4] 
              }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              className={`w-[3px] ${isPlaying ? 'bg-cyber-green' : 'bg-white/10'}`}
            />
          ))}
        </div>
        
        {/* Info Text */}
        <div className="flex flex-col min-w-[120px] max-w-[220px]">
          <div className="flex items-center gap-2">
            <span className={`text-[8px] font-bold uppercase tracking-[0.2em] ${isPlaying ? 'text-cyber-green' : 'text-white/30'}`}>
              {error ? 'ERR: DISCORD_NOT_FOUND' : isPlaying ? 'Live Sync' : 'Frequency Idle'}
            </span>
            {isPlaying && <Activity size={8} className="text-cyber-green animate-pulse" />}
          </div>
          
          <span className="text-[11px] font-orbitron text-white font-black truncate leading-tight tracking-widest">
            {error ? 'JOIN_LANYARD_DISCORD' : isPlaying ? songInfo.song : 'BRAIN_OFFLINE'}
          </span>
          
          {isPlaying ? (
            <span className="text-[10px] font-mono text-white/50 truncate">
              {songInfo.artist}
            </span>
          ) : (
            <span className="text-[8px] font-mono text-white/20 uppercase">
              {error ? 'discord.gg/lanyard' : 'Awaiting Signal...'}
            </span>
          )}
        </div>

        {/* Link / Control */}
        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-white/10">
          {isPlaying && songInfo.track_id ? (
            <a 
              href={`https://open.spotify.com/track/${songInfo.track_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-cyber-green hover:bg-cyber-green/20 rounded-full transition-all hover:scale-110 active:scale-90"
              title="Open in Spotify"
            >
              <ExternalLink size={14} />
            </a>
          ) : (
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-1.5 transition-colors rounded-full ${error ? 'text-red-500/50' : 'text-white/30 hover:text-white/60'}`}
              title={error ? "Join Lanyard Discord to fix" : isMuted ? "Unmute BG Audio" : "Mute BG Audio"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          )}
        </div>
      </motion.div>

      {/* Background YouTube Audio */}
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



