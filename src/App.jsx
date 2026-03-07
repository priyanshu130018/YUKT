import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToolProvider } from './context/ToolContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToolProvider>
          <AppRoutes />
        </ToolProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
