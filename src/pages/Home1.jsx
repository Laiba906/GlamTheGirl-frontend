import React from 'react';
import Header from '../components/Header1';  // Adjust the path if needed
import { BrowserRouter as Router, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Header />
    </Router>
  );
};

export default App;
