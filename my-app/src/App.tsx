import './App.css'
import MainLayout from './layouts/MainLayout'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/main/Homepage'
import PatientSignupForm from './pages/main/PatientSignup'
import DoctorSignupForm from './pages/main/DoctorSignup'
import AppointmentsPage from './pages/main/AppointmentsPage'
import Login from './pages/main/Login'
import MessagesPage from './pages/main/MessagesPage'

function App() {

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/doctorSignup" element={<DoctorSignupForm />} />
          <Route path="/patientSignup" element={<PatientSignupForm />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Routes>
      </MainLayout>

    </>
  )
}

export default App
