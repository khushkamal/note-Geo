import React, { useState, useEffect } from 'react';
import MapOverlay from './components/MapOverlay';
import ZenPanel from './components/ZenPanel';
import NoteModal from './components/NoteModal';

function App() {
  // Load initial state from LocalStorage
  const [treeCount, setTreeCount] = useState(() => {
    const saved = localStorage.getItem('zen-geo-trees');
    return saved ? parseInt(saved) : 0;
  });
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('zen-geo-notes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('zen-geo-trees', treeCount);
  }, [treeCount]);

  useEffect(() => {
    localStorage.setItem('zen-geo-notes', JSON.stringify(notes));
  }, [notes]);

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
      <MapOverlay onMapClick={(loc) => { setSelectedLocation(loc); setIsNoteModalOpen(true); }} />
      <ZenPanel 
        treeCount={treeCount} 
        onTreeGrow={() => setTreeCount(prev => prev + 1)} 
        notes={notes}
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
