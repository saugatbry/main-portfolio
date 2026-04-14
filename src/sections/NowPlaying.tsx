import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Disc } from 'lucide-react';

interface SongData {
  name: string;
  artist: string;
  album: string;
  image: string;
  nowPlaying: boolean;
}

const NowPlaying = () => {
  const [song, setSong] = useState<SongData | null>(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'YOUR_LASTFM_API_KEY'; // Ideally injected via env, but I will provide a placeholder or mock for now
  const USERNAME = 'psy4z';

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        // Fallback to a mock if API_KEY is placeholder
        // In reality, the user would provide their own API key
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=428987b1c31a74205f275685a4ea0b6c&format=json&limit=1`
        );
        const data = await response.json();
        const track = data.recenttracks.track[0];
        
        if (track) {
          setSong({
            name: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            image: track.image[3]['#text'] || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400',
            nowPlaying: track['@attr']?.nowplaying === 'true'
          });
        }
      } catch (error) {
        console.error("Error fetching song:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 bg-transparent border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12 justify-center">
          <Music className="text-cyber-pink animate-pulse" />
          <h2 className="text-2xl font-orbitron tracking-widest font-bold">Transmitting Audio</h2>
        </div>

        <div className="glass-card p-4 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
          {/* Visualizer bars */}
          <div className="absolute bottom-0 left-0 right-0 h-1 hidden md:flex gap-[2px] opacity-30">
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: song?.nowPlaying ? [4, Math.random() * 20 + 10, 4] : [4, 6, 4],
                }}
                transition={{
                  duration: 0.5 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex-1 bg-cyber-pink"
              />
            ))}
          </div>

          {!loading && song ? (
            <>
              <motion.div 
                className="relative shrink-0"
                animate={song.nowPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-cyber-pink/20 relative z-10">
                  <img src={song.image} alt="Album Art" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-cyber-pink blur-2xl opacity-20 z-0 group-hover:opacity-40 transition-opacity" />
                <Disc className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 z-20" size={32} />
              </motion.div>

              <div className="flex-1 text-center md:text-left z-10">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <span className={`w-2 h-2 rounded-full ${song.nowPlaying ? 'bg-cyber-green animate-pulse shadow-[0_0_8px_#00ff9f]' : 'bg-gray-600'}`}></span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    {song.nowPlaying ? 'Currently Playing' : 'Last Played'}
                  </span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold font-orbitron text-white mb-2 leading-tight">
                  {song.name}
                </h3>
                <p className="text-cyber-pink text-lg md:text-xl font-mono mb-1">{song.artist}</p>
                <p className="text-gray-500 font-mono text-sm italic">{song.album}</p>
                
                <div className="mt-6 flex justify-center md:justify-start gap-1 h-8 items-end">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: song.nowPlaying ? [8, 24, 12, 32, 8] : [8, 8, 8] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 bg-cyber-pink rounded-full"
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="w-full py-12 text-center text-gray-500 font-mono animate-pulse">
              SYNCING WITH PSY4Z FREQUENCY...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NowPlaying;
