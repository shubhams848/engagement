import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Team from './pages/Team';
import Feedback from './pages/Feedback';
import Appreciation from './pages/Appreciation';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { UsersProvider } from './contexts/UsersContext';
import { FeedbackProvider } from './contexts/FeedbackContext';

function App() {
  return (
    <UsersProvider>
      <AuthProvider>
        <FeedbackProvider>
          <BrowserRouter>
            <Toaster position="top-right" />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="team" element={<Team />} />
                <Route path="feedback" element={<Feedback />} />
                <Route path="appreciation" element={<Appreciation />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </FeedbackProvider>
      </AuthProvider>
    </UsersProvider>
  );
}

export default App;