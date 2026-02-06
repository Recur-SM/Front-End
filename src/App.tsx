import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Tabbar from './components/tabbar';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Tabbar />} />
    </Routes>
  );
}

export default App;