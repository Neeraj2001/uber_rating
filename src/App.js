// import logo from './logo.svg';
// import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { RiderProfile } from './components/RiderProfile';
import { DriverProfile } from './components/DriverProfile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Sentry from "@sentry/react";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/driver/:driverid" element={<DriverProfile />} />
          <Route exact path="/rider/:riderid" element={<RiderProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Sentry.withProfiler(App);
