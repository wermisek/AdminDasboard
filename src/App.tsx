import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import getTheme from './theme';
import Layout from './components/Layout';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const queryClient = new QueryClient();

// Separate component for theme handling
const ThemedApp = () => {
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const theme = getTheme(darkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemedApp />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
