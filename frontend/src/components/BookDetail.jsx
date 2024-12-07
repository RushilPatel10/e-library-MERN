import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Card, 
  CardMedia, 
  CardContent,
  Alert,
  Grid,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(response.data);
    } catch (err) {
      setError('Error fetching book details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting book');
    }
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  if (loading) return <Typography>Loading...</Typography>;
  if (!book) return <Typography>Book not found</Typography>;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                image={book.coverImage}
                alt={book.title}
                sx={{ height: 400, objectFit: 'cover' }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              by {book.author}
            </Typography>
            <Typography variant="body1" paragraph>
              {book.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Genre: {book.genre}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Published: {new Date(book.publishDate).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Status: {book.available ? 'Available' : 'Borrowed'}
            </Typography>
            
            {user && (
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  component={Link}
                  to={`/edit-book/${book._id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleOpenDialog}
                >
                  Delete
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">
            Confirm Delete
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete "{book.title}"? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default BookDetail;