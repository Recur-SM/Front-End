import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Tab from './components/tabbar';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tab" element={<Tab />} />
    </Routes>
  );
}

export default App;