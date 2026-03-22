import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, TreePine, MapPin, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';
import GardenView from './GardenView';

const ZenPanel = ({ treeCount, onTreeGrow, notes }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      onTreeGrow(); // User finished a session!
      setTimeLeft(25 * 60);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTreeGrow]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-[400px] h-full flex flex-col p-10 z-[1000] border-l border-glass-border glass">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter accent-text">Zen-Geo</h1>
        <p className="opacity-70">Focus & Map your journey</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div 
          className="text-8xl font-bold tabular-nums mb-8 [text-shadow:0_0_20px_rgba(59,130,246,0.5)]"
          animate={{ scale: isActive ? 1.05 : 1 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        >
          {formatTime(timeLeft)}
        </motion.div>
        
        <div className="flex gap-6">
          <button onClick={() => setIsActive(!isActive)} className="bg-white/10 border border-white/10 text-white p-4 rounded-full cursor-pointer transition-all hover:bg-white/20 hover:-translate-y-0.5 flex items-center justify-center">
            {isActive ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }} className="bg-white/10 border border-white/10 text-white p-4 rounded-full cursor-pointer transition-all hover:bg-white/20 hover:-translate-y-0.5 flex items-center justify-center">
            <RotateCcw size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="p-6 rounded-radius-custom flex flex-col gap-2 glass">
          <TreePine className="text-blue-400" />
          <div className="stat-info">
            <span className="text-[0.8rem] opacity-60">Trees Grown</span>
            <strong className="block text-xl">{treeCount}</strong>
          </div>
        </div>
        <div className="p-6 rounded-radius-custom flex flex-col gap-2 glass">
          <MapPin className="text-blue-400" />
          <div className="stat-info">
            <span className="text-[0.8rem] opacity-60">Focus Zones</span>
            <strong className="block text-xl">{new Set(notes.map(n => n.location)).size}</strong>
          </div>
        </div>
      </div>

      <GardenView treeCount={treeCount} />

      <div className="mt-12">
        <h3 className="flex items-center gap-2 text-base mb-4 opacity-80"><ClipboardList size={18} /> Recent Notes</h3>
        <div className="flex flex-col gap-4">
          {notes.length === 0 ? (
            <p className="opacity-50 text-sm">Click the map to add a note!</p>
          ) : (
            notes.slice(0, 3).map((note) => (
              <div key={note.id} className="p-4 rounded-radius-custom text-sm glass">
                <p>{note.text}</p>
                <span className="text-[0.75rem] opacity-50 mt-2 block">{note.location} • {note.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ZenPanel;
