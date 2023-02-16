import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const App = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <Navbar
        className="shadow-sm navbar navbar-expand-lg navbar-light bg-white"
      >
        My chat
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
);

export default App;
