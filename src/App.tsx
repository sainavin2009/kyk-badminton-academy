import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import AdminSettings from './pages/admin/Settings';
import { SettingsProvider } from './contexts/SettingsContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </SettingsProvider>
  );
}

export default App;