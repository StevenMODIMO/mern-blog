import Home from "./routes/Home";
import Create from "./routes/Create";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './context/AuthContext'

function App() {
  const { user } = useAuth()
  return (
    <div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='create' element={user ? <Create /> : <Navigate to='/login' /> } />
        <Route path='profile' element={user ? <Profile /> : <Navigate to='/login' /> } />
        <Route path='signup' element={!user ? <Signup /> : <Navigate to='/' /> } />
        <Route path='login' element={!user ? <Login /> : <Navigate to='/' /> } />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
