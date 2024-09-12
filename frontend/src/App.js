import React from 'react';
import appInsights from './appInsights';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.tsx';
import Challenges from './components/Challenges.tsx';
import Profile from './components/Profile.tsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/profile" component={Profile} />
      </Routes>
    </Router>
  );
}

export default App;
