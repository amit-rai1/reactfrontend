import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Notes from './components/Notes';
import NoteDetail from './components/NoteDetail';
import EditNote from './components/EditNote';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/edit-note/:id" element={<EditNote />} />
        {/* Add any other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
