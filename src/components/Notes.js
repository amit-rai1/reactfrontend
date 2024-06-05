import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/notes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data);
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Notes</h2>
      <Link to="/create">Create Note</Link>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            <Link to={`/notes/${note._id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
