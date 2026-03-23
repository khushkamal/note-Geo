import React, { useState, useEffect } from 'react';
import MapOverlay from './components/MapOverlay';
import ZenPanel from './components/ZenPanel';
import NoteModal from './components/NoteModal';

function App() {
  // Load initial state from LocalStorage
  const [trees, setTrees] = useState(() => {
    const saved = localStorage.getItem('zen-geo-trees-v2');
    return saved ? JSON.parse(saved) : [];
  });
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('zen-geo-notes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('zen-geo-trees-v2', JSON.stringify(trees));
  }, [trees]);

  useEffect(() => {
    localStorage.setItem('zen-geo-notes', JSON.stringify(notes));
  }, [notes]);

  const handleTreeGrow = () => {
    const newTree = {
      id: Date.now(),
      location: selectedLocation || "20.59, 78.96", // Default to India center if nothing selected
      timestamp: new Date().toLocaleTimeString()
    };
    setTrees(prev => [...prev, newTree]);
  };

  const handleSaveNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      location: selectedLocation || 'Marked Spot',
      timestamp: new Date().toLocaleTimeString()
    };
    setNotes([newNote, ...notes]);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden premium-gradient relative">
      <MapOverlay 
        onMapClick={(loc) => { setSelectedLocation(loc); setIsNoteModalOpen(true); }} 
        notes={notes}
        trees={trees}
      />
      <ZenPanel 
        trees={trees} 
        onTreeGrow={handleTreeGrow} 
        notes={notes}
        selectedLocation={selectedLocation}
      />
      
      <NoteModal 
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={handleSaveNote}
        locationName={selectedLocation}
      />
    </div>
  );
}

export default App;
