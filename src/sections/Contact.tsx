import React from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Mail, MessageSquare, Music, ExternalLink, Globe } from 'lucide-react';

const socials = [
  { icon: <Github />, label: "GitHub", handle: "psyxd1", link: "https://github.com/psyxd1", color: "#6e5494" },
  { icon: <MessageSquare />, label: "Discord", handle: "psy#0000", link: "https://discord.com/users/1313736920454533171", color: "#5865F2" },
  { icon: <Instagram />, label: "Instagram", handle: "@psyflowz", link: "https://www.instagram.com/psyflowz", color: "#E1306C" },
  { icon: <Music />, label: "Spotify", handle: "psy4z", link: "https://open.spotify.com/user/your_spotify_id", color: "#00ff9f" },
  { icon: <Globe />, label: "Personal", handle: "yoursit.ee", link: "https://yoursit.ee/psy4z", color: "#00f3ff" },
  { icon: <Mail />, label: "Email", handle: "psyduckbry@gmail.com", link: "mailto:psyduckbry@gmail.com", color: "#00ff9f" }
];

const Contact = () => {
  return (
    <section className="py-24 px-4 bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black neon-text-cyan mb-4 uppercase">Contact Me</h2>
          <p className="text-gray-500 font-mono">Establish a point-to-point connection</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {socials.map((social, i) => (
            <motion.a
              key={i}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass p-6 rounded-2xl flex flex-col items-center gap-4 transition-all duration-300 hover:border-white/30 group"
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_var(--shadow-color)]"
                style={{ backgroundColor: `${social.color}22`, color: social.color, '--shadow-color': social.color } as any}
              >
                {React.cloneElement(social.icon as React.ReactElement, { size: 32 })}
              </div>
              <div className="text-center">
                <span className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">{social.label}</span>
                <span className="block text-sm font-bold truncate max-w-[120px]">{social.handle}</span>
              </div>
              <ExternalLink size={14} className="text-gray-700 group-hover:text-cyber-neon transition-colors" />
            </motion.a>
          ))}
        </div>
        
        <div className="mt-40 pt-12 border-t border-white/5 text-center">
          <p className="text-gray-600 font-mono text-xs uppercase tracking-[10px]">
            © 2026 SAUGAT BRY SYSTEM // ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
