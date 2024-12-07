import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import theme from './theme';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <main style={{ padding: '20px' }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/" element={
                <PrivateRoute>
                  <BookList />
                </PrivateRoute>
              } />
              <Route path="/book/:id" element={
                <PrivateRoute>
                  <BookDetail />
                </PrivateRoute>
              } />
              <Route path="/add-book" element={
                <PrivateRoute>
                  <AddBook />
                </PrivateRoute>
              } />
              <Route path="/edit-book/:id" element={
                <PrivateRoute>
                  <EditBook />
                </PrivateRoute>
              } />

              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App; 