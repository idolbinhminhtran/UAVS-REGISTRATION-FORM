import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Track active section
      if (location.pathname === '/') {
        const sections = ['home', 'about', 'vision', 'contact'];
        const scrollPosition = window.scrollY + 100;
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    // Reset active section when route changes
    if (location.pathname === '/register') {
      setActiveSection('register');
    } else {
      setActiveSection('home');
    }
  }, [location.pathname]);

  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    if (sectionId === 'register') {
      navigate('/register');
      setIsMobileMenuOpen(false);
    } else if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    } else {
      // If on another page, navigate home first then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo-container">
            <div className="logo-text">
              <h1 className="logo-title">UAVS</h1>
              <span className="logo-subtitle">GOT TALENT 2025</span>
            </div>
          </div>
          
          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => scrollToSection('about')}>About</a></li>
            <li><a href="#vision" className={activeSection === 'vision' ? 'active' : ''} onClick={() => scrollToSection('vision')}>Vision</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</a></li>
            <li>
              <a href="#register" className={`nav-cta ${activeSection === 'register' ? 'active' : ''}`} onClick={() => scrollToSection('register')}>
                Register Now
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header; 