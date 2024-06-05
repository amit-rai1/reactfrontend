import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/notes/${id}`, { title, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/'); // navigate to the home page or any other route
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditNote;
