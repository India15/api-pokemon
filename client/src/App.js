// App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './views/landing/landing.jsx';
import Navbar from './components/navbar/navBar.jsx';
import Detail from './views/detail/detail.jsx';
import Home from './views/home/home.jsx';
import Create from './views/create/create.jsx';

function App() {
  const location = useLocation();

  // Verificar si la ruta actual es la vista Landing
  const isLanding = location.pathname === '/';

  return (
    <div className="App">
      <Routes>
        <Route
          path='/'
          element={<Landing />}
        />
        {/* Verificar si no es la vista Landing antes de renderizar Navbar */}
        {isLanding ? null : (
          <Route
            path='/*'
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path='/home' element={<Home />} />
                  <Route path='/create' element={<Create />} />
                  <Route path="/pokemon/:id" element={<Detail />} />

                </Routes>
              </>
            }
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
