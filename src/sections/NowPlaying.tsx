import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Disc, ExternalLink, Play } from 'lucide-react';

// YOUR DISCORD ID GOES HERE
const DISCORD_ID = "1313736920454533171";

interface LanyardData {
  spotify: {
    track_id: string;
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    timestamps: {
      start: number;
      end: number;
    };
  } | null;
  listening_to_spotify: boolean;
}

const SpotifyNowPlaying = () => {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanyard = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const res = await response.json();
        if (res.success) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Lanyard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanyard();
    const interval = setInterval(fetchLanyard, 5000); // Poll every 5 seconds for real-time feel
    return () => clearInterval(interval);
  }, []);

  const isPlaying = data?.listening_to_spotify && data.spotify;
  const song = data?.spotify;

  return (
    <section className="py-24 px-4 bg-transparent border-y border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-green/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12 justify-center"
        >
          <div className="p-2 bg-cyber-green/10 rounded-lg border border-cyber-green/20">
            <Music className="text-cyber-green w-6 h-6" />
          </div>
          <h2 className="text-2xl font-orbitron tracking-[0.2em] font-bold text-white uppercase">
            Live Frequency
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-6 md:p-10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group hover:border-cyber-green/30 transition-all duration-500 backdrop-blur-xl border-white/5 bg-black/40"
        >
          {loading ? (
            <div className="w-full py-12 flex flex-col items-center gap-4">
              <div className="flex gap-1 h-8 items-end">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [8, 32, 8] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1.5 bg-cyber-green rounded-full"
                  />
                ))}
              </div>
              <span className="text-cyber-green/50 font-mono text-sm tracking-widest animate-pulse font-bold">
                ESTABLISHING NEURAL LINK...
              </span>
            </div>
          ) : isPlaying && song ? (
            <>
              {/* Rotating Disc with Glow */}
              <div className="relative shrink-0 perspective-1000">
                <motion.div 
                  className="relative z-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-[6px] border-black/80 shadow-[0_0_50px_rgba(0,255,159,0.2)] relative">
                    <img 
                      src={song.album_art_url} 
                      alt={song.album} 
                      className="w-full h-full object-cover scale-110" 
                    />
                    {/* Vinyl Center Hole */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-black rounded-full border-4 border-gray-800 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white/20 rounded-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Secondary Orbiting Ring */}
                <motion.div 
                  className="absolute -inset-4 border border-cyber-green/20 rounded-full z-0"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Floating Spotify Icon */}
                <div className="absolute -bottom-2 -right-2 bg-[#1DB954] p-3 rounded-full shadow-lg shadow-[#1DB954]/20 z-20 group-hover:scale-110 transition-transform">
                  <Play className="fill-black text-black w-4 h-4 ml-0.5" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left z-10 relative">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                  <span className="flex gap-[3px] h-3 items-end">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [4, 12, 4] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.2 }}
                        className="w-[3px] bg-cyber-green rounded-full"
                      />
                    ))}
                  </span>
                  <span className="text-xs font-mono text-cyber-green font-bold uppercase tracking-[0.3em]">
                    Streaming Live
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black font-orbitron text-white mb-3 leading-tight group-hover:text-cyber-green transition-colors">
                  {song.song}
                </h3>
                
                <p className="text-gray-300 text-lg md:text-xl font-mono mb-4 flex items-center justify-center md:justify-start gap-2">
                  <span className="text-cyber-green">by</span> {song.artist}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <a 
                    href={`https://open.spotify.com/track/${song.track_id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-cyber-green text-black rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyber-green/20"
                  >
                    Listen Along
                    <ExternalLink size={16} />
                  </a>
                  
                  <div className="hidden md:flex items-center gap-1.5 px-4 py-2 border border-white/10 rounded-full bg-white/5 opacity-50 text-[10px] font-mono uppercase tracking-widest text-white">
                    <Disc size={12} className="animate-spin-slow" />
                    {song.album}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-10 gap-6 opacity-60">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center animate-spin-slow">
                <Music className="text-white/20" size={32} />
              </div>
              <div className="text-center">
                <p className="text-white font-orbitron tracking-widest text-lg mb-1 uppercase font-bold">Signal Lost</p>
                <p className="text-gray-500 font-mono text-xs uppercase">Not playing anything right now</p>
              </div>
            </div>
          )}

          {/* Bottom Audio Bar Visualizer */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 flex gap-[2px] opacity-20">
            {[...Array(80)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: isPlaying ? [4, Math.random() * 24 + 4, 4] : [4, 6, 4],
                }}
                transition={{
                  duration: 0.5 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex-1 bg-cyber-green"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpotifyNowPlaying;

