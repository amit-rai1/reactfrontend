import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const EditNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`https://backendassign-59wq.onrender.com/api/notes/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (err) {
        setError('Error fetching the note');
        console.error(err);
      }
    };
    fetchNote();
  }, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://backendassign-59wq.onrender.com/api/notes/updateNote/${id}`, { title, description });
      alert("updated successfully")
      navigate('/notelist'); // navigate to the home page or any other route
    } catch (err) {
      setError('Error updating the note');
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Edit Note</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default EditNote;
