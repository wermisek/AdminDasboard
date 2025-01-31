import { Suspense, lazy } from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

// Lazy load components
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Users = lazy(() => import('../pages/Users'));
const Products = lazy(() => import('../pages/Products'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Messages = lazy(() => import('../pages/Messages'));
const Calendar = lazy(() => import('../pages/Calendar'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));

const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

const Routes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterRoutes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </RouterRoutes>
    </Suspense>
  );
};

export default Routes; 