import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const NoteDetail = () => {
  const [note, setNote] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNote(res.data);
    };
    fetchNote();
  }, [id]);

  return (
    <div>
      {note && (
        <>
          <h2>{note.title}</h2>
          <p>{note.description}</p>
          <Link to={`/edit/${note._id}`}>Edit</Link>
        </>
      )}
    </div>
  );
};

export default NoteDetail;
