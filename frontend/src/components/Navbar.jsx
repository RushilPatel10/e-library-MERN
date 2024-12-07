import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  console.log('Current user:', user); // Debug line

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'text.primary',
            fontWeight: 'bold',
          }}
        >
          E-Library
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {user ? (
            <>
              <Button 
                color="primary"
                variant="contained"
                component={RouterLink} 
                to="/add-book"
              >
                Add Book
              </Button>
              <Button 
                color="primary"
                variant="outlined"
                onClick={handleLogout}
              >
                Logout ({user.username})
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="primary"
                variant="contained"
                component={RouterLink} 
                to="/login"
              >
                Login
              </Button>
              <Button 
                color="primary"
                variant="outlined"
                component={RouterLink} 
                to="/register"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 