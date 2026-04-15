import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, ExternalLink, Activity, Info, Clock, Search } from 'lucide-react';

const DISCORD_ID = "1313736920454533171";
const LASTFM_USER = "psy4z";
const LASTFM_API_KEY = "650fc2bafe4903f994c2c283626faf16";

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [lanyardData, setLanyardData] = useState<any>(null);
  const [lastFmData, setLastFmData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Lanyard (Live)
        const lanyardRes = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
          .then(r => r.json())
          .catch(() => ({ success: false }));
          
        if (lanyardRes.success) setLanyardData(lanyardRes.data);

        // 2. Fetch Last.fm (Recent Fallback)
        const lastFmRes = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
        ).then(r => r.json()).catch(() => null);
        
        if (lastFmRes?.recenttracks?.track?.[0]) {
          setLastFmData(lastFmRes.recenttracks.track[0]);
        }
      } catch (err) {
        console.error("Sync error:", err);
      } finally {
        setIsSearching(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval);
  }, []);

  // Priority Logic
  const liveActivity = lanyardData?.activities?.find((a: any) => a.name === "Spotify" || a.type === 2);
  const isLive = lanyardData?.listening_to_spotify || !!liveActivity;
  
  const songInfo = isLive ? {
    title: lanyardData.spotify?.song || liveActivity?.details || "Unknown Track",
    artist: lanyardData.spotify?.artist || liveActivity?.state || "Unknown Artist",
    image: lanyardData.spotify?.album_art_url || (liveActivity?.assets?.large_image ? `https://i.scdn.co/image/${liveActivity.assets.large_image.split(':')[1]}` : null),
    url: lanyardData.spotify?.track_id ? `https://open.spotify.com/track/${lanyardData.spotify.track_id}` : `https://open.spotify.com/search/${encodeURIComponent((lanyardData.spotify?.song || liveActivity?.details || "") + ' ' + (lanyardData.spotify?.artist || liveActivity?.state || ""))}`,
    isLive: true
  } : lastFmData ? {
    title: lastFmData.name,
    artist: lastFmData.artist['#text'],
    image: lastFmData.image?.[3]?.['#text'] || lastFmData.image?.[2]?.['#text'],
    url: `https://open.spotify.com/search/${encodeURIComponent(lastFmData.name + ' ' + lastFmData.artist['#text'])}`,
    isLive: false
  } : {
    title: "NEURAL_LINK_ACTIVE",
    artist: "Scanning Frequencies...",
    image: null,
    url: null,
    isLive: false,
    isMock: true
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-card px-4 py-2 flex items-center gap-3 border-cyber-green/30 hover:border-cyber-green transition-all group backdrop-blur-xl bg-black/60 shadow-[0_0_40px_rgba(0,0,0,0.7)]"
      >
        {/* Animated Disc / Album Art */}
        <motion.div 
          animate={songInfo.isLive ? { rotate: 360 } : {}}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className={`w-11 h-11 rounded-full border-2 ${songInfo.isLive ? 'border-cyber-green/50' : 'border-white/10'} overflow-hidden shrink-0 relative bg-black/40`}
        >
          {songInfo.image ? (
            <img src={songInfo.image} alt="Disc" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music size={18} className={isSearching ? "text-cyber-green animate-pulse" : "text-white/20"} />
            </div>
          )}
          {songInfo.isLive && (
            <div className="absolute inset-0 bg-cyber-green/5 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-black rounded-full border border-white/20 shadow-inner" />
            </div>
          )}
        </motion.div>

        {/* Visualizer Bars (Static or Animated) */}
        <div className="flex gap-[3px] h-4 items-end mx-1">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                height: songInfo.isLive ? [4, 16, 8, 12, 4] : [4, 6, 4] 
              }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              className={`w-[3px] ${songInfo.isLive ? 'bg-cyber-green' : 'bg-white/10'}`}
            />
          ))}
        </div>
        
        {/* Info Text */}
        <div className="flex flex-col min-w-[130px] max-w-[240px]">
          <div className="flex items-center gap-2">
            <span className={`text-[8px] font-bold uppercase tracking-[0.2em] ${songInfo.isLive ? 'text-cyber-green' : 'text-white/40'}`}>
              {isSearching ? 'Scanning Sync...' : songInfo.isLive ? 'Now Playing' : 'Recently Played'}
            </span>
            {songInfo.isLive ? (
              <Activity size={8} className="text-cyber-green animate-pulse" />
            ) : isSearching ? (
              <Search size={8} className="text-cyber-green animate-spin-slow" />
            ) : (
              <Clock size={8} className="text-white/20" />
            )}
          </div>
          
          <span className="text-[11px] font-orbitron text-white font-black truncate leading-tight tracking-[0.15em] group-hover:text-cyber-green transition-colors">
            {songInfo.title}
          </span>
          
          <span className="text-[10px] font-mono text-white/40 truncate tracking-tight uppercase">
            {songInfo.artist}
          </span>
        </div>

        {/* Link / Control */}
        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-white/10">
          {songInfo.url ? (
            <a 
              href={songInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 rounded-full transition-all hover:scale-110 active:scale-90 ${songInfo.isLive ? 'text-cyber-green hover:bg-cyber-green/20' : 'text-white/30 hover:bg-white/10'}`}
              title="Open Spotify"
            >
              <ExternalLink size={14} />
            </a>
          ) : (
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 text-white/30 hover:text-white/60 transition-colors rounded-full"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          )}
        </div>
      </motion.div>

      {/* Hidden YouTube BG Audio */}
      {!songInfo.isLive && (
        <div className="hidden">
          <iframe
            width="0"
            height="0"
            src={`https://www.youtube.com/embed/LYvWDSs1bsc?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=LYvWDSs1bsc`}
            title="BG Audio"
            allow="autoplay"
          />
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;





