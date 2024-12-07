import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container,
  Alert,
  MenuItem
} from '@mui/material';
import axios from 'axios';

const genres = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Romance',
  'Biography',
  'History',
  'Science'
];

function AddBook() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishDate: '',
    description: '',
    coverImage: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/books', formData, {
        headers: {
          'x-auth-token': token
        }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding book');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Add New Book
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Book Title"
            name="title"
            autoFocus
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            select
            id="genre"
            label="Genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            type="date"
            id="publishDate"
            label="Publish Date"
            name="publishDate"
            InputLabelProps={{ shrink: true }}
            value={formData.publishDate}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            id="description"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="coverImage"
            label="Cover Image URL"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Book
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddBook; 