import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import AddCarScreen from './screens/AddCarScreen/AddCarScreen';
import Home from './screens/Home/Home';
import Register from './screens/Register/Register';
import LoginScreen from './screens/LoginScreen/LoginScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/addcar"
            element={<AddCarScreen />}
          />
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<LoginScreen />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
