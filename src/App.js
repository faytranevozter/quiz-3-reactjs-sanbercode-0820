import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// components
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

// routes
import Routes from './Routes';

// context
import { AuthProvider } from './contexts/Authorization';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
