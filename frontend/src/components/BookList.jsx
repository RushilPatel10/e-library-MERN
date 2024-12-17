import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const genres = [
  'All',
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

function BookList() {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState({
    genre: 'All',
    search: ''
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, [filter.genre]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchBooks();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filter.search]);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      
      if (filter.genre !== 'All') {
        params.append('genre', filter.genre);
      }
      
      if (filter.search.trim()) {
        params.append('search', filter.search.trim());
      }

      const response = await axios.get(`https://e-library-mern-backend.onrender.com/api/books?${params.toString()}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setFilter(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const handleGenreChange = (e) => {
    setFilter(prev => ({
      ...prev,
      genre: e.target.value
    }));
  };

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setBookToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/books/${bookToDelete._id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      setBooks(books.filter(book => book._id !== bookToDelete._id));
      handleDeleteClose();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Books
      </Typography>
      
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          select
          label="Genre"
          value={filter.genre}
          onChange={handleGenreChange}
          sx={{ minWidth: 200 }}
        >
          {genres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </TextField>
        
        <TextField
          label="Search books"
          value={filter.search}
          onChange={handleSearchChange}
          sx={{ minWidth: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Search by title or author..."
        />
      </Box>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : books.length === 0 ? (
        <Typography>No books found</Typography>
      ) : (
        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                backgroundColor: 'background.paper',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                },
              }}>
                {user && (
                  <IconButton
                    component={Link}
                    to={`/edit-book/${book._id}`}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                <CardMedia
                  component="img"
                  height="200"
                  image={book.coverImage}
                  alt={book.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2" sx={{ color: 'text.primary' }}>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    by {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Genre: {book.genre}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button 
                    component={Link} 
                    to={`/book/${book._id}`} 
                    size="small" 
                    variant="contained"
                    color="primary"
                  >
                    View Details
                  </Button>
                  {user && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        component={Link}
                        to={`/edit-book/${book._id}`}
                        size="small"
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteClick(book)}
                      >
                        Delete
                      </Button>
                    </Box>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete "{bookToDelete?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BookList; 