import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import AddCarScreen from './screens/AddCarScreen/AddCarScreen';
import Home from './screens/Home/Home';
import Register from './screens/Register/Register';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import CarDetail from './screens/CarDetail/CarDetail';
import { useSelector } from 'react-redux';
import ReservedCars from './screens/ReservedCars/ReservedCars';

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
          <Route path="/car/:carId" element={<CarDetail />} />
          <Route path="/reservedcars" element={<ReservedCars />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
