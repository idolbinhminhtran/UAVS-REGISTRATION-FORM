import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  useEffect(() => {
    // Add animation on scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((el) => {
        const speed = el.getAttribute('data-speed');
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });

      // Reveal animations
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('active');
        }
      });
    };

    // Initial check for elements in view
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section with Enhanced Layout */}
      <section id="home" className="hero">
        {/* Multi-layer Background */}
        <div className="hero-background">
          <div className="gradient-layer"></div>
          <div className="stars-layer parallax" data-speed="0.5"></div>
          <div className="clouds-layer parallax" data-speed="0.3"></div>
        </div>

        {/* Animated Particles */}
        <div className="particle-container">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>

        {/* Main Hero Content */}
        <div className="container hero-container">
          <div className="hero-layout">
            {/* Left Side - Kaleidoscope Animation */}
            <div className="hero-left">
              <div className="kaleidoscope-wrapper">
                <svg className="kaleidoscope-main" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#EC4899" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
                    </linearGradient>
                    <radialGradient id="centerGradient">
                      <stop offset="0%" stopColor="#FCD34D" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </radialGradient>
                  </defs>
                  
                  {/* Outer Ring - 12 petals */}
                  <g className="outer-petals">
                    {[...Array(12)].map((_, i) => (
                      <path
                        key={`outer-${i}`}
                        d="M 200 100 Q 250 150 200 200 Q 150 150 200 100"
                        fill="url(#gradient1)"
                        transform={`rotate(${i * 30} 200 200)`}
                        opacity="0.7"
                      />
                    ))}
                  </g>
                  
                  {/* Middle Ring - 8 geometric shapes */}
                  <g className="middle-shapes">
                    {[...Array(8)].map((_, i) => (
                      <polygon
                        key={`middle-${i}`}
                        points="200,120 220,160 200,180 180,160"
                        fill="#C084FC"
                        fillOpacity="0.6"
                        transform={`rotate(${i * 45} 200 200)`}
                      />
                    ))}
                  </g>
                  
                  {/* Inner Ring - 6 triangles */}
                  <g className="inner-triangles">
                    {[...Array(6)].map((_, i) => (
                      <polygon
                        key={`inner-${i}`}
                        points="200,150 215,175 185,175"
                        fill="#F0ABFC"
                        fillOpacity="0.5"
                        transform={`rotate(${i * 60} 200 200)`}
                      />
                    ))}
                  </g>
                  
                  {/* Center Star */}
                  <g className="center-star">
                    <circle cx="200" cy="200" r="50" fill="rgba(255, 255, 255, 0.2)" />
                    <polygon
                      points="200,160 210,180 230,180 215,195 225,215 200,200 175,215 185,195 170,180 190,180"
                      fill="url(#centerGradient)"
                    />
                  </g>
                </svg>
                
                {/* Floating accent shapes */}
                <div className="accent-shapes">
                  <div className="accent-shape shape-1"></div>
                  <div className="accent-shape shape-2"></div>
                  <div className="accent-shape shape-3"></div>
                </div>
              </div>
            </div>

            {/* Center - Main Content */}
            <div className="hero-center">
              <div className="hero-badge">
                <span>✨</span>
                <span>First Edition</span>
                <span>✨</span>
              </div>
              
              <h1 className="hero-title">
                <div className="title-main">UAVS's</div>
                <div className="title-main">Got</div>
                <div className="title-main">Talent</div>
              </h1>
              
              <div className="event-name" data-text="RÊVERIA">
                <span className="event-name-text">Rêveria</span>
                <div className="event-name-decoration"></div>
              </div>
              
              <div className="title-year-container">
                <span className="year-number">2025</span>
                <div className="year-decoration"></div>
              </div>
              
              {/* Value proposition tagline */}
              <p className="hero-tagline">
                "Showcase your talent & win amazing prizes"
              </p>
              
              {/* Hero Actions */}
              <div className="hero-actions">
                <Link to="/register" className="btn btn-primary btn-glow">
                  <span className="btn-bg"></span>
                  <span className="btn-content">
                    <span className="btn-text">REGISTER NOW</span>
                    <span className="btn-icon">→</span>
                  </span>
                </Link>
                <a href="#about" className="btn btn-secondary">
                  <span className="btn-content">
                    <span className="btn-text">LEARN MORE</span>
                    <span className="btn-icon">↓</span>
                  </span>
                </a>
              </div>
              
              {/* Registration deadline */}
              <p className="registration-deadline">
                <strong>Registration closes 31 July 2025</strong>
              </p>
            </div>

            {/* Right Side - Text and Actions */}
            <div className="hero-right">
              <p className="hero-description">
                The very first cultural and performing arts competition organised by 
                the United Associations of Vietnamese Students in New South Wales
              </p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-icon">🎭</span>
                  <span>Multiple Performance Categories</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🏆</span>
                  <span>Amazing Prizes to Win</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🌟</span>
                  <span>Open to All Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator" aria-label="Scroll down to learn more">
          <div className="scroll-icon">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* About Section with Enhanced Design */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-wrapper">
            <div className="section-header reveal">
              <span className="section-label">About Rêveria</span>
              <h2 className="section-title">
                The Kaleidoscope of Cultures
              </h2>
              <div className="section-decoration">
                <svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,20 Q50,0 100,20 T200,20" stroke="#8B5CF6" strokeWidth="2" fill="none" opacity="0.5"/>
                  <circle cx="100" cy="20" r="5" fill="#EC4899"/>
                </svg>
              </div>
            </div>

            <div className="about-grid">
              <div className="about-content reveal">
                <div className="about-card">
                  <div className="card-icon">
                    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                      <g className="icon-kaleidoscope">
                        {[...Array(6)].map((_, i) => (
                          <polygon
                            key={i}
                            points="30,15 35,25 30,35 25,25"
                            fill={`hsl(${280 + i * 15}, 70%, 65%)`}
                            transform={`rotate(${i * 60} 30 30)`}
                            opacity="0.8"
                          />
                        ))}
                      </g>
                    </svg>
                  </div>
                  <h3>Inspired by Childhood</h3>
                  <p>
                    Drawing inspiration from the beloved kaleidoscope toy, a treasure of memories 
                    across generations, this event celebrates the beautiful patterns formed when 
                    diverse cultures come together.
                  </p>
                </div>

                <div className="about-card">
                  <div className="card-icon">
                    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="30" cy="30" r="25" fill="none" stroke="#EC4899" strokeWidth="2" opacity="0.5"/>
                      <circle cx="30" cy="30" r="18" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.5"/>
                      <circle cx="30" cy="30" r="10" fill="#F59E0B" opacity="0.8"/>
                    </svg>
                  </div>
                  <h3>Unity in Diversity</h3>
                  <p>
                    Each performance represents a unique cultural shard, distinct in its colors and shapes. 
                    Together, they create mesmerizing patterns that showcase the beauty of 
                    cross-cultural harmony.
                  </p>
                </div>

                <div className="about-card">
                  <div className="card-icon">
                    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30,10 L40,25 L35,40 L25,40 L20,25 Z" fill="#C084FC" opacity="0.8"/>
                      <path d="M30,20 L35,27.5 L32.5,35 L27.5,35 L25,27.5 Z" fill="#F0ABFC"/>
                    </svg>
                  </div>
                  <h3>Cultural Exchange</h3>
                  <p>
                    UAVS hopes that the cultural identities brought to the competition will blend 
                    harmoniously, presenting a diverse and meaningful showcase of artistic expression.
                  </p>
                </div>
              </div>

              <div className="about-visual reveal">
                <div className="visual-container">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImczIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzhCNUNGNiIgc3RvcC1vcGFjaXR5PSIwLjgiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNFQzQ4OTkiIHN0b3Atb3BhY2l0eT0iMC44Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0Y1OUUwQiIgc3RvcC1vcGFjaXR5PSIwLjgiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIG9wYWNpdHk9IjAuOCI+CiAgICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjE4MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ1cmwoI2czKSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjE1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzA4NEZDIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9IjAuNiIvPgogICAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSIxMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YwQUJGQyIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjQiLz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwMCwyMDApIj4KICAgICAgPGcgaWQ9InBldGFsIj4KICAgICAgICA8cGF0aCBkPSJNMCwtODAgUTQwLC00MCA0MCwwIFEwLDAgMCwtODAiIGZpbGw9InVybCgjZzMpIiBvcGFjaXR5PSIwLjciLz4KICAgICAgPC9nPgogICAgICA8dXNlIGhyZWY9IiNwZXRhbCIgdHJhbnNmb3JtPSJyb3RhdGUoNDUpIi8+CiAgICAgIDx1c2UgaHJlZj0iI3BldGFsIiB0cmFuc2Zvcm09InJvdGF0ZSg5MCkiLz4KICAgICAgPHVzZSBocmVmPSIjcGV0YWwiIHRyYW5zZm9ybT0icm90YXRlKDEzNSkiLz4KICAgICAgPHVzZSBocmVmPSIjcGV0YWwiIHRyYW5zZm9ybT0icm90YXRlKDE4MCkiLz4KICAgICAgPHVzZSBocmVmPSIjcGV0YWwiIHRyYW5zZm9ybT0icm90YXRlKDIyNSkiLz4KICAgICAgPHVzZSBocmVmPSIjcGV0YWwiIHRyYW5zZm9ybT0icm90YXRlKDI3MCkiLz4KICAgICAgPHVzZSBocmVmPSIjcGV0YWwiIHRyYW5zZm9ybT0icm90YXRlKDMxNSkiLz4KICAgICAgPGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjMwIiBmaWxsPSIjRkNEMzREIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=" alt="Kaleidoscope Pattern" className="visual-image" />
                  <div className="visual-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section with Cards */}
      <section id="vision" className="vision-section">
        <div className="container">
          <div className="vision-wrapper">
            <div className="section-header reveal">
              <span className="section-label">Our Vision</span>
              <h2 className="section-title">A Stage for Dreams</h2>
            </div>

            <div className="vision-grid">
              <div className="vision-card reveal">
                <div className="vision-icon">
                  <span>🎭</span>
                </div>
                <h3>Express Your Voice</h3>
                <p>
                  A platform where individuals can express their voices and aspirations 
                  through the power of performing arts.
                </p>
              </div>

              <div className="vision-card reveal">
                <div className="vision-icon">
                  <span>🌟</span>
                </div>
                <h3>Share Your Story</h3>
                <p>
                  Each performance tells a unique story – from humble hopes to bold visions 
                  of humanity and social impact.
                </p>
              </div>

              <div className="vision-card reveal">
                <div className="vision-icon">
                  <span>🤝</span>
                </div>
                <h3>Build Connections</h3>
                <p>
                  A bridge connecting international students seeking self-discovery 
                  and meaningful cultural connections.
                </p>
              </div>
            </div>

            <div className="vision-highlight reveal">
              <div className="highlight-content">
                <div className="highlight-icon">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.3"/>
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#EC4899" strokeWidth="2" opacity="0.5"/>
                    <circle cx="50" cy="50" r="25" fill="#F59E0B" opacity="0.2"/>
                    <text x="50" y="55" textAnchor="middle" fontSize="24" fill="#8B5CF6">🎪</text>
                  </svg>
                </div>
                <blockquote>
                  <p>
                    <strong>UAVS's Got Talent 2025</strong> will be a bridge and a platform where 
                    every message is shared with intention, every dream is celebrated, and every voice, 
                    rich with personal identity and a desire to create positive change, is heard loud and clear.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="section-header reveal">
              <h2 className="contact-title">
                <span className="word-animate">Get</span>
                <span className="word-animate">in</span>
                <span className="word-animate">Touch</span>
              </h2>
              <p className="contact-subtitle">We'd love to hear from you</p>
            </div>
            
            <div className="contact-grid">
              <div className="contact-card reveal">
                <div className="card-inner">
                  <div className="card-glow"></div>
                  <div className="card-content">
                    <div className="contact-icon-wrapper">
                      <div className="icon-bg"></div>
                      <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>Email Us</h3>
                    <a href="mailto:info@uavs-nsw.org" className="contact-link">
                      info@uavs-nsw.org
                      <span className="link-arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="contact-card reveal">
                <div className="card-inner">
                  <div className="card-glow"></div>
                  <div className="card-content">
                    <div className="contact-icon-wrapper">
                      <div className="icon-bg"></div>
                      <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>Follow Us</h3>
                    <div className="social-links-compact">
                      <a href="https://www.facebook.com/uavsnsw" target="_blank" rel="noopener noreferrer" className="social-link-icon">
                        <span>Facebook</span>
                      </a>
                      <a href="https://www.instagram.com/uavs.nsw/" target="_blank" rel="noopener noreferrer" className="social-link-icon">
                        <span>Instagram</span>
                      </a>
                      <a href="https://www.linkedin.com/company/uavs-nsw/" target="_blank" rel="noopener noreferrer" className="social-link-icon">
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="contact-card reveal">
                <div className="card-inner">
                  <div className="card-glow"></div>
                  <div className="card-content">
                    <div className="contact-icon-wrapper">
                      <div className="icon-bg"></div>
                      <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>Join Community</h3>
                    <a href="https://www.facebook.com/groups/UAVSNSWStudentHub/" target="_blank" rel="noopener noreferrer" className="contact-link">
                      Student Hub
                      <span className="link-arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Background Elements */}
      <div className="floating-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
        <div className="floating-element element-5"></div>
      </div>
    </div>
  );
};

export default HomePage; 