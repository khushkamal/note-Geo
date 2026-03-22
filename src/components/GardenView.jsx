import React from 'react';
import { motion } from 'framer-motion';
import { TreePine } from 'lucide-react';

const GardenView = ({ treeCount = 0 }) => {
  return (
    <div className="mt-8 p-6 rounded-radius-custom glass">
      <h3 className="text-base mb-4 opacity-80">Your Zen Garden</h3>
      <div className="flex flex-wrap gap-2 min-h-[40px]">
        {[...Array(Math.min(treeCount, 12))].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, type: "spring" }}
          >
            <TreePine size={24} className="text-emerald-500" />
          </motion.div>
        ))}
        {treeCount === 0 && <p className="opacity-40 text-sm">Start focusing to grow your first tree!</p>}
      </div>
    </div>
  );
};

export default GardenView;
