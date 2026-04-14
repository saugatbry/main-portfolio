import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, BarChart3, Users, Globe, Terminal, LogOut } from 'lucide-react';

const Admin = ({ onLogout }: { onLogout: () => void }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ visits: 0, uptime: '99.9%', location: 'Global' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://api.counterapi.dev/v2/saugats-team-3738/first-counter-3738', {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_COUNTER_API_KEY}`
          }
        });
        const data = await response.json();
        setStats(s => ({ ...s, visits: data.count || 0 }));
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      }
    };
    fetchStats();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUser = import.meta.env.VITE_ADMIN_USER;
    const validPass = import.meta.env.VITE_ADMIN_PASS;

    if (username === validUser && password === validPass) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('ACCESS_DENIED: INVALID_CREDENTIALS');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono text-cyan-500">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full border border-cyan-500/30 p-10 bg-black/80 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          
          <div className="flex justify-center mb-8">
            <Lock className="text-cyan-500 animate-pulse" size={48} />
          </div>
          
          <h1 className="text-2xl font-black text-center mb-10 tracking-[10px]">ADMIN_AUTH</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase mb-2">Identifier</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-cyan-500/5 border border-cyan-500/20 px-4 py-3 focus:border-cyan-500 outline-none transition-all"
                placeholder="USER_ID"
              />
            </div>
            
            <div>
              <label className="block text-[10px] uppercase mb-2">Access_Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cyan-500/5 border border-cyan-500/20 px-4 py-3 focus:border-cyan-500 outline-none transition-all"
                placeholder="********"
              />
            </div>

            {error && (
              <motion.div 
                initial={{ x: -10 }} 
                animate={{ x: 0 }}
                className="text-red-500 text-[10px] text-center font-bold"
              >
                {error}
              </motion.div>
            )}

            <button className="w-full bg-cyan-500 text-black py-4 font-black hover:bg-white transition-colors uppercase tracking-widest text-sm">
              Initialize_System
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <button onClick={onLogout} className="text-[8px] opacity-30 hover:opacity-100 transition-opacity uppercase tracking-[4px]">
              Cancel_Operation
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-mono lg:p-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-16 pb-8 border-b border-white/5">
          <div className="flex items-center gap-4 text-cyan-400">
            <ShieldCheck size={32} />
            <div>
              <h1 className="text-2xl font-black tracking-tighter">CENTRAL_ADMIN_CORE</h1>
              <p className="text-[10px] opacity-50 uppercase tracking-[4px]">System_Integrity: Secured</p>
            </div>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 text-red-500 hover:text-white border border-red-500/30 px-6 py-2 transition-all group"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Terminate_Session</span>
          </button>
        </header>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 hover:border-cyan-500/50 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <BarChart3 className="text-cyan-500" />
              <span className="text-[10px] opacity-40">REALTIME</span>
            </div>
            <div className="text-4xl font-black mb-2">{stats.visits.toLocaleString()}</div>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Total_Neural_Visits</div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 hover:border-pink-500/50 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <Globe className="text-pink-500" />
              <span className="text-[10px] opacity-40">SYSTEM</span>
            </div>
            <div className="text-4xl font-black mb-2">{stats.uptime}</div>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Node_Connection_Uptime</div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 hover:border-green-500/50 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <Users className="text-green-500" />
              <span className="text-[10px] opacity-40">ACTIVE</span>
            </div>
            <div className="text-4xl font-black mb-2">RUNNING</div>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Traffic_Protocol_Status</div>
          </div>
        </div>

        {/* System Logs Area */}
        <div className="mt-12 bg-black border border-white/5 p-8">
          <div className="flex items-center gap-4 mb-8">
            <Terminal size={20} className="text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Kernel_System_Logs</h2>
          </div>
          <div className="space-y-3 font-mono text-[10px] opacity-60">
            <div className="flex gap-4">
              <span className="text-cyan-600">[0.00021s]</span>
              <span>ADMIN_CORE: Session initialized for user {import.meta.env.VITE_ADMIN_USER}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-cyan-600">[0.00045s]</span>
              <span>COUNTER_API: Synchronizing hits from saugats-team-3738</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-600">[0.00092s]</span>
              <span>SECURE_SHELL: Firewall operational at 100% efficiency</span>
            </div>
            <div className="flex gap-4">
              <span className="text-pink-600">[0.00124s]</span>
              <span>GEO_LOC: Detecting traffic from Earth_Sector_07</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
    </div>
  );
};

export default Admin;
