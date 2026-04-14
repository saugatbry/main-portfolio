import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Zap, Target } from 'lucide-react';

const About = () => {
  const cards = [
    {
      icon: <Cpu className="text-cyber-neon" size={32} />,
      title: "Self-Learning",
      desc: "Constantly learning, experimenting, and improving beyond the classroom."
    },
    {
      icon: <Zap className="text-cyber-pink" size={32} />,
      title: "Impactful Projects",
      desc: "Believes in building real projects that people actually use."
    },
    {
      icon: <Target className="text-cyber-green" size={32} />,
      title: "Future Focused",
      desc: "Searching for the next boundary to push in AI and game dynamics."
    }
  ];

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-cyber-neon"></div>
            <h2 className="text-3xl md:text-5xl font-black neon-text-cyan">THE ARCHITECT</h2>
          </div>
          
          <div className="space-y-6 text-xl text-gray-400 leading-relaxed font-light">
            <p>
              Hi, I'm <span className="text-white font-bold">Saugat Bry</span> (aka <span className="text-cyber-neon font-bold">psy4z</span> or <span className="text-cyber-pink font-bold">saugiiman</span>). 
              Currently a Class 12 student, living somewhere on the blue planet 🌍.
            </p>
            <p>
              I have a strong urge to learn everything about technology — from game development to AI and full-stack systems. 
              Not available 24/7 due to school, but always tries to respond and help when needed.
            </p>
            <p className="border-l-4 border-cyber-neon pl-6 py-2 bg-white/5 italic">
              "I believe in building real projects, not just learning theory. Focused on creating tools, systems, and experiences that actually solve problems."
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="grid gap-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {cards.map((card, i) => (
            <div key={i} className="glass-card p-8 flex items-start gap-6 group">
              <div className="p-4 bg-white/5 rounded-lg group-hover:bg-cyber-neon/10 transition-colors">
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyber-neon transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-400">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
