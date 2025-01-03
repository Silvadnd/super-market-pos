import 'react' 
import Dashboard from './components/Dashboard'
import { BrowserRouter, Routes,Route } from 'react-router-dom'

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
