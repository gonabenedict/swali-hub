import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/home'
import Login from './components/login'
import Signup from './components/signup'
import MyResultPage from './pages/MyResultPage'

//private protected route
function RequireAuth({ children }) {
  const isLoggedIn = Boolean(localStorage.getItem('authToken'));
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

const App = () => {
  return (
   <Routes>
    <Route path='/' element={
      <RequireAuth>
        <Home />
      </RequireAuth>
    } />

    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/result' element={
      <RequireAuth>
        <MyResultPage />
      </RequireAuth>
    } />
   </Routes>
  )
}

export default App