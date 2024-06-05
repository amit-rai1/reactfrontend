import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backendassign-59wq.onrender.com/api/notes/createNote', { title, description });
      alert("note added")
      navigate('/notelist'); // navigate to the home page or any other route
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Create Note</h2>
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
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default CreateNote;
