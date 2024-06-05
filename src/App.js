import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Notes from './components/Notes';
import NoteDetail from './components/NoteList';
import EditNote from './components/EditNote';
import CreateNote from './components/Notes';
import NotesList from './components/NoteList';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<CreateNote />} />
        <Route path="/notelist" element={<NotesList />} />

        <Route path="/notes/:id/edit" element={<EditNote />} />        {/* Add any other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
