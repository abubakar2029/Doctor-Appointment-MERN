
import './App.css'
import MainLayout from './layouts/MainLayout'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/main/Homepage'
import PatientSignupForm from './pages/main/Signup'
import Login from './pages/main/Login'

function App() {

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<PatientSignupForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MainLayout>

    </>
  )
}

export default App
