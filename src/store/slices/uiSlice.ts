import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  darkMode: boolean;
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }>;
}

// Get initial theme mode from localStorage or system preference
const getInitialThemeMode = () => {
  const savedMode = localStorage.getItem('themeMode');
  if (savedMode) {
    return savedMode === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState: UIState = {
  sidebarOpen: true,
  darkMode: getInitialThemeMode(),
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('themeMode', state.darkMode ? 'dark' : 'light');
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      localStorage.setItem('themeMode', action.payload ? 'dark' : 'light');
    },
    addNotification: (
      state,
      action: PayloadAction<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
      }>
    ) => {
      state.notifications.push({
        id: Date.now().toString(),
        message: action.payload.message,
        type: action.payload.type,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const {
  toggleSidebar,
  toggleDarkMode,
  setDarkMode,
  addNotification,
  removeNotification,
} = uiSlice.actions;
export default uiSlice.reducer; 