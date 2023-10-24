import React from 'react'
import { Link } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../styles/navbar.css'

const Navbar = () => {
  return (
    <header className="head-sec">
      <nav className="navbar">
        <div className="logo">
          <Link className="logo-img" to="/">
            <img
              src="https://seeklogo.com/images/M/myntra-logo-B3C45EAD5C-seeklogo.com.png"
              alt="logo"
            />
          </Link>
        </div>

        <div className="menu-types">
          <ul>
            <li className="menu-items">
              <Link to="/">Home</Link>
            </li>
            <li className="menu-items">
              <Link to="/register">Register</Link>
            </li>
            <li className="menu-items">
              <Link to="/signIn">Sign In</Link>
            </li>
            <li className="menu-items">
              <Link to="/followUser">Log Out</Link>
            </li>
          </ul>
        </div>

        <div className="search">
          <input className="input" type="text" placeholder="search" />
          <span className="search-icon-span">
            <i className="search-icon fa-solid fa-magnifying-glass"></i>
          </span>
        </div>

        <div className="user-icons">
          <div className="profile-user">
            <Link className="user" to="#">
              <i className=" profile-logo fa-regular fa-user"></i>
            </Link>
            <Link to="#">
              <p className="profile-name">Profile</p>
            </Link>
          </div>

          <div className="profile-user">
            <Link className="Bag" to="#">
              <i className="fas fa-bag-shopping"></i>
            </Link>
            <Link to="#">
              <p className="bag-name">Buy   </p>
            </Link>
          </div>
          {/* <div className="profile-user">
                <Link className="wishlist" to="#">
                <i className=" wishlist-logo fa-regular fa-heart"></i>
                </Link>
                <Link to="#">
                <p className="wishlist-name">Wishlist</p>
                </Link>
            </div> */}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
