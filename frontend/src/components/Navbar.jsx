import React, { useState, useEffect } from 'react'
import { navbarStyles } from '../assets/dummystyles'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Award, LogOut, LogIn, X, Menu, Brain } from 'lucide-react';

const Navbar = ({ logoSrc }) => {
const navigate = useNavigate();
const [loggedIn, setLoggedIn] = useState(false);

// useEffect hook to show the login status
  useEffect(() => {
    try {
      const u = localStorage.getItem("authToken");
      setLoggedIn(!!u);
    } catch (e) {
      setLoggedIn(false);
    }

    const handler = (ev) => {
      const detailUser = ev?.detail?.user ?? null;
      setLoggedIn(!!detailUser);
    };
    window.addEventListener("authChanged", handler);

    return () => window.removeEventListener("authChanged", handler);
  }, []);

//LOGOUT FUNCTION
const handlelogout = () => {
  try {
    localStorage.removeItem('authToken');
    localStorage.clear();

  }
  catch (error) {
    //ignore all errors

  }
  window.dispatchEvent(
    new CustomEvent("authChanged", {detail: {user: null}})
  )
  try {
    navigate('/login');
  }
  catch (error) {
    window.location.href = '/login';
  }
}

  return (
    <nav className={navbarStyles.nav}>
        <div style={{backgroundImage: navbarStyles.decorativePatternBackground,}} className={navbarStyles.decorativePattern}>

        </div>
        <div className={navbarStyles.bubble1}></div>
         <div className={navbarStyles.bubble2}></div>
          <div className={navbarStyles.bubble3}></div>

          <div className={navbarStyles.container}>
            <div className={navbarStyles.logoContainer}>
               <Link to="/" className={navbarStyles.logoButton}>
                  <div className={navbarStyles.logoInner}>
                    <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-purple-600" />
                   </div>
                 </Link>

            </div>
            <div className={navbarStyles.titleContainer}>
              <div className={navbarStyles.titleBackground}>
                <h1 className={navbarStyles.titleText}>
                  Swali Hub

                </h1>

              </div>
               
            </div>
            <div className={navbarStyles.desktopButtonsContainer}>
                <div className={navbarStyles.spacer}></div>

                <NavLink to="/result" className={navbarStyles.resultsButton}>
                  <Award className={navbarStyles.buttonIcon} />
                  My Results
                </NavLink>
                {loggedIn ? (
                  <button onClick={handlelogout} className={navbarStyles.logoutButton}>
                    <LogOut className={navbarStyles.buttonIcon} />
                    Logout
                  </button>
                ) : (
                  <NavLink to="/login" className={navbarStyles.loginButton}>
                    <LogIn className={navbarStyles.buttonIcon} />
                    Login
                  </NavLink>
                )}
            </div>
            <div className={navbarStyles.mobileMenuContainer}>
              <NavLink to="/result" className={navbarStyles.resultsButton}>
                <Award className={navbarStyles.buttonIcon} />
                My Results
              </NavLink>
              {loggedIn ? (
                <button onClick={handlelogout} className={navbarStyles.logoutButton}>
                  <LogOut className={navbarStyles.buttonIcon} />
                  Logout
                </button>
              ) : (
                <NavLink to="/login" className={navbarStyles.loginButton}>
                  <LogIn className={navbarStyles.buttonIcon} />
                  Login
                </NavLink>
              )}
            </div>


          </div>

          <style>{navbarStyles.animations}</style>

    </nav>

  )
}

export default Navbar
