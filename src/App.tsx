import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FrontPage from './pages/fpage';

import SavedPage from './pages/spage';
import { useJokes } from './hooks/UseJokes';

const App: React.FC = () => {
  const { savedJokes, addJoke } = useJokes();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<FrontPage saveJoke={addJoke} />} />
        <Route path="/saved" element={<SavedPage savedJokes={savedJokes} />} />
      </Routes>
    </Router>
  );
};

export default App;
