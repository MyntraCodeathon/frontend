import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router,Routes, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from './components/Register';
import SignIn from './components/SignIn';
import Blogs from './components/Blogs';
import Home from './components/Home'
import SingleBlog from './components/SingleBlog';

function App() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [followUserId, setFollowUserId] = useState("");

  const handleRegister = async () => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailId, password }),
    });
    const data = await response.json();
    console.log(data); // Handle the response data accordingly
  };

  const handleSignIn = async () => {
    const response = await fetch("/api/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailId, password }),
    });
    const data = await response.json();
    console.log(data); // Handle the response data accordingly
  };

  const handleFollowUser = async () => {
    const response = await fetch("/api/followUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followUserId }),
    });
    const data = await response.json();
    console.log(data); // Handle the response data accordingly
  };

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<SingleBlog/>} />
          <Route path="/followUser" element={<div><h2>Follow User</h2></div>} />
        </Routes>
    </Router>
  );
}

export default App;
