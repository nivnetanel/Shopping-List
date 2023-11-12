import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import RTLProvider from './context/RTL.provider';
import ThemeProvider from './context/Theme.provider';
import toastProps from './presets/toastProps';
import HomePage from './routes/Home/HomePage';

function App() {
  return (
    <ThemeProvider>
      <RTLProvider>
        <ToastContainer {...toastProps} />
        <HomePage />
      </RTLProvider>
    </ThemeProvider>
  );
}

export default App;
