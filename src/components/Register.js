// Register.js
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/register', {
        emailId: emailId,
        password: password,
      })
      if (response.data === 'success') {
        // Redirect to /blogs on successful registration
        // UseNavigate can be used here for redirection
        navigate('/blogs')
      }
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  return (
    <div>
      <h2>Register User Here</h2>
      <input
        type="text"
        placeholder="Email"
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register
