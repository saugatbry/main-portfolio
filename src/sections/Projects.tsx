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
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "TrackYourCrypto",
    tagline: "FINANCIAL INTELLIGENCE",
    desc: "Crypto tracking dashboard with real-time insights and market analytics.",
    tech: ["React", "CryptoAPI", "Chart.js"],
    link: "https://trackyourcrypto.vercel.app/",
    color: "#ff00ff",
    img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Bubu Memorial",
    tagline: "EMOTIONAL EXPERIENCE",
    desc: "Emotional, aesthetic memorial website experience with glassmorphism UI.",
    tech: ["Vite", "Framer Motion", "CSS3"],
    link: "https://bubu-memorial.vercel.app/",
    color: "#00ff9f",
    img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800"
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
    <section className="py-24 px-4 bg-black/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-black neon-text-cyan mb-4">LIBRARY</h2>
            <p className="text-gray-500 font-mono tracking-widest uppercase">Select an experience to deploy</p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-cyber-neon font-mono text-sm leading-none block">DATABASE STATUS: ACTIVE</span>
            <span className="text-gray-600 font-mono text-xs uppercase">Updated: 04.14.2026</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`group relative overflow-hidden glass-card h-[450px] cursor-pointer ${project.disabled ? 'opacity-50 grayscale' : ''}`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute top-4 right-4 flex gap-2">
                {!project.disabled && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 hover:border-cyber-neon transition-colors"
                  >
                    <ExternalLink size={18} className="text-cyber-neon" />
                  </motion.a>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-mono tracking-[4px] text-cyber-neon mb-2 block uppercase">
                  {project.tagline}
                </span>
                <h3 className="text-2xl font-bold mb-3 font-orbitron group-hover:neon-text-cyan transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-1 bg-white/10 rounded uppercase font-mono border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Steam-style border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyber-neon transition-all duration-300 rounded-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
