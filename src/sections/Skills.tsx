import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  {
    category: "Game Development",
    items: [
      { name: "Minecraft Bots", level: 95, color: "#00f3ff" },
      { name: "Automation Scripts", level: 90, color: "#00f3ff" },
      { name: "Game Logic", level: 85, color: "#00f3ff" },
    ]
  },
  {
    category: "Web Development",
    items: [
      { name: "React / Vite", level: 90, color: "#ff00ff" },
      { name: "Flask / Python", level: 85, color: "#ff00ff" },
      { name: "Tailwind CSS", level: 95, color: "#ff00ff" },
    ]
  },
  {
    category: "AI & Automation",
    items: [
      { name: "AI Prompting", level: 95, color: "#00ff9f" },
      { name: "Content Forge APIs", level: 80, color: "#00ff9f" },
      { name: "Large Language Models", level: 85, color: "#00ff9f" },
    ]
  }
];

const Skills = () => {
  return (
    <section className="py-24 px-4 bg-cyber-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black neon-text-cyan mb-4 uppercase tracking-[10px]">Augmentations</h2>
          <div className="w-24 h-1 bg-cyber-neon mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {skills.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass p-8 rounded-2xl relative group"
            >
              <h3 className="text-xl font-orbitron mb-8 text-white border-b border-white/10 pb-4">
                {category.category}
              </h3>
              
              <div className="space-y-8">
                {category.items.map((skill, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-mono uppercase tracking-widest text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm font-mono" style={{ color: skill.color }}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="h-[6px] w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + (idx * 0.1) }}
                        className="h-full relative shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                        style={{ backgroundColor: skill.color }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyber-neon/30 group-hover:border-cyber-neon transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
