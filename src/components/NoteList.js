import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Spinner, Alert } from 'react-bootstrap';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('https://backendassign-59wq.onrender.com/api/notes/getNotes');
        setNotes(res.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching notes');
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://backendassign-59wq.onrender.com/api/notes/deleteNote/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      setError('Error deleting the note');
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2>Notes</h2>
          <Button as={Link} to="/notes" variant="primary" className="me-2">
            Create Note
          </Button>
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note, index) => (
                <tr key={note._id}>
                  <td>{index + 1}</td>
                  <td>{note.title}</td>
                  <td>{note.description}</td>
                  <td>
                    <Button onClick={() => handleDeleteNote(note._id)} variant="outline-primary" size="sm" className="me-2">
                      Delete
                    </Button>
                    <Button as={Link} to={`/notes/${note._id}/edit`} variant="outline-secondary" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default NotesList;
