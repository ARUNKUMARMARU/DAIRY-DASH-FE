import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Signin from './components/signin/Signin';
import Admin from './components/admin/Admin';
import './components/dashboard/Dashboard.css';
import Body from './components/Body';


function App() {
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<Body />} />
        </Routes>
      </div>     
        
      
    </Router>
  )
}

export default App