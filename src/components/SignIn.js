// SignIn.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailId, password }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      if (data.message === 'success') {
        navigate('/blogs')
      } else {
        // Handle sign-in failure here
      }
    } catch (error) {
      // Handle any error that occurs during the sign-in process
      console.error('Error during sign-in:', error)
    }
  }

  return (
    <div>
      <h2>Login User Here</h2>
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
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  )
}

export default SignIn
