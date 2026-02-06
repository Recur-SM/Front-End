import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Tapbar from './components/tapbar';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Tapbar />} />
    </Routes>
  );
}

export default App;