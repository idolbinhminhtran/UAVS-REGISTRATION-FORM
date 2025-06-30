import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-kaleidoscope-bg"></div>
      
      <div className="container footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-logo">
              <svg className="footer-logo-icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <g className="footer-kaleidoscope">
                  {[...Array(6)].map((_, i) => (
                    <polygon
                      key={i}
                      points="20,10 25,20 20,30 15,20"
                      fill={`hsl(${260 + i * 20}, 70%, 60%)`}
                      transform={`rotate(${i * 60} 20 20)`}
                      opacity="0.8"
                    />
                  ))}
                  <circle cx="20" cy="20" r="5" fill="#FFD700" />
                </g>
              </svg>
              <div>
                <h3 className="footer-logo-title">UAVS's Got Talent</h3>
                <p className="footer-logo-subtitle">The Kaleidoscope of Cultures</p>
              </div>
            </div>
            <p className="footer-description">
              Celebrating diversity through art and performance
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">About Event</a></li>
              <li><a href="#vision">Our Vision</a></li>
              <li><a href="#register">Register</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="footer-social">
              <a href="https://www.facebook.com/uavsnsw" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/uavs.nsw/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/uavs-nsw/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <a href="mailto:info@uavs-nsw.org" className="footer-email">
              info@uavs-nsw.org
            </a>
          </div>

          <div className="footer-section">
            <h4>Join Our Community</h4>
            <p className="footer-text">Be part of the UAVS-NSW Student Hub</p>
            <a href="https://www.facebook.com/groups/UAVSNSWStudentHub/" target="_blank" rel="noopener noreferrer" className="footer-cta">
              Join Facebook Group
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} United Associations of Vietnamese Students in NSW. All rights reserved.</p>
            <p className="footer-credits">Crafted with ❤️ by UAVS-NSW</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 