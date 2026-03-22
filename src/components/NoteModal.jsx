import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';

const NoteModal = ({ isOpen, onClose, onSave, locationName }) => {
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/40 backdrop-blur-[4px] flex items-center justify-center z-[2000]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="w-[90%] max-w-[500px] p-8 rounded-radius-custom glass"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">New Note @ {locationName || 'Unknown Spot'}</h2>
            <button onClick={onClose} className="bg-transparent border-none text-white opacity-50 cursor-pointer hover:opacity-100"><X /></button>
          </div>
          <textarea 
            placeholder="What's on your mind? Capture a memory or a learning..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full h-[150px] bg-black/20 border border-white/10 rounded-radius-custom p-4 color-white resize-none mb-6 font-inherit outline-none focus:border-blue-400"
          />
          <button 
            className="w-full p-4 rounded-radius-custom border-none text-white font-semibold cursor-pointer flex items-center justify-center gap-2 premium-gradient hover:brightness-110 active:scale-[0.98] transition-all"
            onClick={() => { onSave(note); setNote(''); onClose(); }}
          >
            <Save size={18} /> Save Note
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NoteModal;
