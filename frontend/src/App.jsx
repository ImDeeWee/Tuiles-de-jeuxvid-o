import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import CreateTuile from './pages/CreateTuile'
import DeleteTuile from './pages/DeleteTuile'
import EditTuile from './pages/EditTuile'
import ShowTuiles from './pages/ShowTuiles'
import Login from './pages/Login'
import Signup from './pages/Signup'
import useAuthContext from './hooks/useAuthContext.jsx'

const App = () => {
  const {user} = useAuthContext()

  return (
    <Routes>
      <Route path='/' element={user ? <Home /> : <Navigate to="/login"/>} />
      <Route path='/tuiles/create' element={<CreateTuile />} />
      <Route path='/tuiles/details/:id' element={<ShowTuiles />} />
      <Route path='/tuiles/edit/:id' element={<EditTuile />} />
      <Route path='/tuiles/delete/:id' element={<DeleteTuile />} />
      <Route path='/login' element={!user ? <Login /> : <Navigate to="/"/>} />
      <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/"/>} />
    </Routes>
  )
}

export default App