import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CompanyPage } from './pages/CompanyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company/:companyId" element={<CompanyPage />} />
      </Routes>
    </Router>
  );
}

export default App;