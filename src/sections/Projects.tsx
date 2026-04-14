import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers, Zap } from 'lucide-react';

const projects = [
  {
    title: "ContentForge AI",
    tagline: "AI CONTENT OPS",
    desc: "AI-powered content generator for YouTube, Instagram, TikTok scripts and posts.",
    tech: ["Next.js", "OpenRouter", "Tailwind"],
    link: "https://contentforgeaii.vercel.app/",
    color: "#00f3ff",
    img: "/projects/contentforge.png"
  },
  {
    title: "TrackYourCrypto",
    tagline: "FINANCIAL INTELLIGENCE",
    desc: "Crypto tracking dashboard with real-time insights and market analytics.",
    tech: ["React", "CryptoAPI", "Chart.js"],
    link: "https://trackyourcrypto.vercel.app/",
    color: "#ff00ff",
    img: "/projects/crypto.png"
  },
  {
    title: "Bubu Memorial",
    tagline: "EMOTIONAL EXPERIENCE",
    desc: "Emotional, aesthetic memorial website experience with glassmorphism UI.",
    tech: ["Vite", "Framer Motion", "CSS3"],
    link: "https://bubu-memorial.vercel.app/",
    color: "#00ff9f",
    img: "/projects/bubu.png"
  },
  {
    title: "Loading New Sector...",
    tagline: "FUTURE VENTURE",
    desc: "More projects coming soon. Compiling new ideas and technologies.",
    tech: ["REDACTED"],
    link: "#",
    color: "#fdf500",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    disabled: true
  }
];

const Projects = () => {
  return (
    <section className="py-24 px-4 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-black neon-text-cyan mb-4">PROJECTS</h2>
            <p className="text-gray-500 font-mono tracking-widest uppercase">Select an experience to deploy</p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-cyber-neon font-mono text-sm leading-none block">DATABASE STATUS: ACTIVE</span>
            <span className="text-gray-600 font-mono text-xs uppercase">Updated: 04.14.2026</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href={project.disabled ? '#' : project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 100, rotate: i % 2 === 0 ? -10 : 10, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: i * 0.1 
              }}
              whileHover={{ scale: 1.05, y: -20, zIndex: 50 }}
              className={`group relative overflow-hidden glass rounded-2xl h-[450px] cursor-pointer block border-white/5 hover:border-cyber-neon/50 shadow-2xl transition-all duration-500 ${project.disabled ? 'opacity-50 grayscale' : ''}`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-125"
                style={{ backgroundImage: `url(${project.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover:via-black/40 transition-all" />
              
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform">
                {!project.disabled && (
                  <div className="p-2 bg-cyber-neon text-black rounded-lg shadow-[0_0_15px_#00f3ff]">
                    <ExternalLink size={18} />
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 transform group-hover:translate-y-[-10px] transition-transform duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-[2px] bg-cyber-neon group-hover:w-16 transition-all duration-500" />
                  <span className="text-xs font-mono tracking-[4px] text-cyber-neon uppercase">
                    {project.tagline}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 font-orbitron group-hover:text-cyber-neon transition-all duration-300 drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="text-[9px] px-2 py-1 bg-white/5 rounded-full border border-white/10 uppercase font-mono group-hover:border-cyber-neon/30 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Advanced Glow Effect */}
              <div className="absolute -inset-px bg-gradient-to-tr from-cyber-neon/20 via-transparent to-cyber-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
