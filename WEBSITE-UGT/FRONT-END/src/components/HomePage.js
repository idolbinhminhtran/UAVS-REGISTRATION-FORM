import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Add this import at the top if you want to use require for dynamic import (not needed for public folder)
// import { default as KaleidoscopeImage } from './kaleidoscope.png';

const HomePage = () => {
  // Countdown Timer State
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Target date: July 18, 2025, 23:59 PM
  const targetDate = new Date('2025-07-18T23:59:00').getTime();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

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

        {/* Kaleidoscope Background Elements */}
        <div className="kaleidoscope-bg-elements">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`kaleidoscope-shape shape-${i + 1}`}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon
                  points="50,10 90,35 90,75 50,90 10,75 10,35"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                />
                <polygon
                  points="50,25 75,40 75,60 50,75 25,60 25,40"
                  fill="rgba(255, 255, 255, 0.05)"
                />
              </svg>
            </div>
          ))}
          {/* Triangular kaleidoscope patterns */}
          {[...Array(4)].map((_, i) => (
            <div key={`triangle-${i}`} className={`kaleidoscope-triangle triangle-${i + 1}`}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(50,50)">
                  {[...Array(6)].map((_, j) => (
                    <polygon
                      key={j}
                      points="0,-30 26,15 -26,15"
                      fill={`rgba(255, 255, 255, ${0.03 - j * 0.005})`}
                      transform={`rotate(${j * 60})`}
                    />
                  ))}
                </g>
              </svg>
            </div>
          ))}
        </div>

        {/* Main Hero Content */}
        <div className="container hero-container">
          <div className="hero-layout">


            {/* Center - Main Content */}
            <div className="hero-center">
              <h1 className="hero-title">
                <div className="title-main">UAVS's Got Talent</div>
              </h1>
              
              <div className="event-name" data-text="RÊVERIA">
                <span className="event-name-text">Rêveria</span>
                <div className="event-name-decoration"></div>
              </div>
              
              <div className="title-year-container">
                <span className="year-number">2025</span>
                <div className="year-decoration"></div>
              </div>
              
              {/* Countdown Clock */}
              <div className="countdown-container">
                <div className="countdown-header">Registration closes in</div>
                <div className="countdown-timer">
                  <div className="countdown-unit">
                    <div className="countdown-number">{countdown.days}</div>
                    <div className="countdown-label">Days</div>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-unit">
                    <div className="countdown-number">{countdown.hours.toString().padStart(2, '0')}</div>
                    <div className="countdown-label">Hours</div>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-unit">
                    <div className="countdown-number">{countdown.minutes.toString().padStart(2, '0')}</div>
                    <div className="countdown-label">Minutes</div>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-unit">
                    <div className="countdown-number">{countdown.seconds.toString().padStart(2, '0')}</div>
                    <div className="countdown-label">Seconds</div>
                  </div>
                </div>
              </div>
              
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
              

            </div>

            {/* Right Side - Castle Illustration */}
            <div className="hero-illustration" style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', minHeight: '400px', width: '100%' }}>
              <img
                src="/kaleidoscope.png"
                alt="Kaleidoscope"
                className="kaleidoscope-animated"
                style={{
                  position: 'absolute',
                  top: '-30px',
                  left: '25%',
                  maxWidth: '600px',
                  width: '200%',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 8px 32px rgba(124,58,237,0.15))',
                  zIndex: 2
                }}
              />
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
      <section id="about" className="about-section" style={{ background: 'linear-gradient(135deg, #f7f6fb 0%, #f7c1e3 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Animated floating background shapes */}
        <div className="about-bg-anim">
          <div className="about-float about-float-1"></div>
          <div className="about-float about-float-2"></div>
          <div className="about-float about-float-3"></div>
        </div>
        <div style={{
          position: 'absolute',
          top: '-80px',
          left: '-120px',
          width: '340px',
          height: '340px',
          background: 'radial-gradient(circle at 60% 40%, #a5c7f9 0%, transparent 70%)',
          filter: 'blur(18px)',
          opacity: 0.45,
          zIndex: 0,
          pointerEvents: 'none',
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle at 40% 60%, #f7c1e3 0%, transparent 70%)',
          filter: 'blur(24px)',
          opacity: 0.35,
          zIndex: 0,
          pointerEvents: 'none',
        }}></div>
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '10%',
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, #ffe59e 0%, transparent 70%)',
          filter: 'blur(30px)',
          opacity: 0.18,
          zIndex: 0,
          pointerEvents: 'none',
        }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-wrapper">
            <div className="section-header reveal">
              <span className="section-label">Về Rêveria</span>
              <h2 className="section-title">Lăng kính văn hóa</h2>
              <div className="section-decoration">
                <svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,20 Q50,0 100,20 T200,20" stroke="#8B5CF6" strokeWidth="2" fill="none" opacity="0.5"/>
                  <circle cx="100" cy="20" r="5" fill="#EC4899"/>
                </svg>
              </div>
            </div>

            {/* Highlighted Introduction Card */}
            <div className="reveal" style={{ marginBottom: '4rem' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.05) 100%)', 
                borderRadius: '24px', 
                padding: '3rem 2.5rem', 
                maxWidth: '900px', 
                margin: '0 auto',
                border: '1px solid rgba(139, 92, 246, 0.1)',
                boxShadow: '0 8px 32px rgba(140, 122, 230, 0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '-50%', right: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(247, 193, 227, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                <p style={{ 
                  color: '#6B46C1', 
                  fontSize: '1.1rem', 
                  lineHeight: '1.9', 
                  textAlign: 'justify', 
                  margin: '0',
                  fontWeight: '500',
                  position: 'relative',
                  zIndex: 1
                }}>
Cuộc thi tìm kiếm tài năng UAVS 2025 - UAVS's Got Talent (UGT) 2025 là cuộc thi văn hóa - nghệ thuật đầu tiên được tổ chức bởi Hội Sinh viên Việt Nam tại bang New South Wales (UAVS-NSW) trong suốt 7 năm hoạt động. Lấy cảm hứng từ chiếc Kính vạn hoa, một món đồ chơi tuổi thơ chất chứa nhiều kỉ niệm của mỗi thế hệ, sự kiện mong muốn tôn vinh sự đa dạng văn hóa như những mảnh kính màu sắc. Mỗi mảnh kính đại diện cho một quốc gia, một nền văn hóa đặc sắc với những sắc thái và hình dáng khác nhau. Giống như từng mảnh vạn hoa cùng kết nối để gói gọn trong một chiếc kính vạn hoa thu nhỏ, UAVS mong rằng những sắc màu văn hóa đến với cuộc thi cũng sẽ hòa quyện để đem đến các tiết mục đa dạng và ý nghĩa, cùng nhau tạo nên bức tranh muôn màu muôn vẻ của tinh thần giao lưu dân tộc.
<br/><br/>
Sự kiện không chỉ tôn vinh sự đa dạng văn hóa mà còn là nơi mỗi cá nhân có thể bày tỏ tiếng nói và khát vọng của mình. Mỗi tiết mục là một câu chuyện, là một giấc mơ được thể hiện qua nghệ thuật, từ những giấc mơ nhỏ bé của sinh viên quốc tế mong muốn được kết nối và khám phá bản thân, cho đến những khát vọng lớn lao về con người và xã hội.
<br/><br/>
UAVS's Got Talent 2025 sẽ là cầu nối, nơi mọi thông điệp được chuyên tâm gửi gắm, mọi ước mơ đều được tôn vinh, mọi tiếng nói mang đậm bản sắc cá nhân và mong muốn tạo ra sự thay đổi tích cực cho cộng đồng đều được cất lên một cách mạnh mẽ nhất!
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Animations for icons and kaleidoscope */}
        <style>{`
          @keyframes floatIcon {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes pulseIcon {
            0%, 100% { transform: scale(1); filter: brightness(1); }
            50% { transform: scale(1.12); filter: brightness(1.15); }
          }
          @keyframes rotateKaleidoscope {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animated-card:hover {
            transform: scale(1.035) translateY(-2px);
            box-shadow: 0 16px 48px 0 #f7c1e3, 0 2px 12px 0 #a5c7f9;
          }
          .about-bg-anim {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
          }
          .about-float {
            position: absolute;
            border-radius: 50%;
            opacity: 0.32;
            filter: blur(12px);
            animation: aboutFloat 16s ease-in-out infinite;
            will-change: transform, opacity;
          }
          .about-float-1 {
            width: 220px; height: 220px;
            left: -80px; top: 0;
            background: radial-gradient(circle, #a5c7f9 0%, transparent 70%);
            animation-delay: 0s;
          }
          .about-float-2 {
            width: 180px; height: 180px;
            right: 10vw; top: 60%;
            background: radial-gradient(circle, #ffe59e 0%, transparent 70%);
            animation-delay: 4s;
          }
          .about-float-3 {
            width: 260px; height: 260px;
            right: -100px; bottom: -60px;
            background: radial-gradient(circle, #f7c1e3 0%, transparent 70%);
            animation-delay: 8s;
          }
          @keyframes aboutFloat {
            0% { transform: translateY(0) scale(1); opacity: 0.32; }
            25% { transform: translateY(-18px) scale(1.04); opacity: 0.38; }
            50% { transform: translateY(12px) scale(0.98); opacity: 0.28; }
            75% { transform: translateY(-10px) scale(1.02); opacity: 0.36; }
            100% { transform: translateY(0) scale(1); opacity: 0.32; }
          }
        `}</style>
      </section>

      {/* Vision Section with Cards */}
      <section id="vision" className="vision-section">
        <div className="container">
          <div className="vision-wrapper">
            <div className="section-header reveal">
              <span className="section-label">Tầm nhìn của chúng tôi</span>
              <h2 className="section-title">Mục đích & Mục tiêu hướng tới</h2>
              <div className="section-decoration">
                <svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,20 Q50,0 100,20 T200,20" stroke="#8B5CF6" strokeWidth="2" fill="none" opacity="0.5"/>
                  <circle cx="100" cy="20" r="5" fill="#EC4899"/>
                </svg>
              </div>
            </div>

            {/* Organization Purpose Section */}
            <div className="vision-purpose-section reveal" style={{ marginBottom: '6rem' }}>
              <div className="purpose-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  marginBottom: '1.5rem',
                  padding: '0.75rem 2rem',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.05))',
                  borderRadius: '50px',
                  border: '1px solid rgba(139, 92, 246, 0.2)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="#8B5CF6"/>
                    <path d="M19 11L19.5 13.5L22 14L19.5 14.5L19 17L18.5 14.5L16 14L18.5 13.5L19 11Z" fill="#EC4899"/>
                    <path d="M5 6L5.5 8L7 8.5L5.5 9L5 11L4.5 9L3 8.5L4.5 8L5 6Z" fill="#F59E0B"/>
                  </svg>
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: '700', 
                    background: 'linear-gradient(135deg, #6B46C1 0%, #EC4899 100%)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent', 
                    backgroundClip: 'text',
                    margin: '0'
                  }}>
                    Mục đích tổ chức
                  </h3>
                </div>
                <p style={{ 
                  fontSize: '1.2rem', 
                  color: '#6B7280', 
                  maxWidth: '800px', 
                  margin: '0 auto',
                  lineHeight: '1.8',
                  fontWeight: '500'
                }}>
                  Tạo ra một sân chơi nghệ thuật sáng tạo, lành mạnh và cởi mở dành cho cộng đồng tại bang New South Wales
                </p>
              </div>

              <div className="purpose-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '2.5rem',
                maxWidth: '1400px',
                margin: '0 auto'
              }}>
                {/* Purpose Card 1 - Encourage Confidence */}
                <div className="purpose-card reveal" style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '3rem 2.5rem',
                  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(139, 92, 246, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '0', 
                    left: '0', 
                    right: '0', 
                    height: '5px', 
                    background: 'linear-gradient(90deg, #8B5CF6, #A855F7)' 
                  }}></div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                      border: '2px solid rgba(139, 92, 246, 0.1)'
                    }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7.5L12 8.5L9 7.5V5.5L3 7V9L9 10.5V22H11V15H13V22H15V10.5L21 9Z" fill="#8B5CF6"/>
                      </svg>
                    </div>
                    <h4 style={{ 
                      fontSize: '1.5rem', 
                      color: '#1F2937', 
                      marginBottom: '1.5rem',
                      fontWeight: '700',
                      lineHeight: '1.3'
                    }}>
                      Khuyến khích tự tin
                    </h4>
                    <p style={{ 
                      color: '#6B7280', 
                      lineHeight: '1.8',
                      margin: '0',
                      fontSize: '1rem'
                    }}>
                      Khuyến khích tinh thần tự tin, chủ động thể hiện bản thân của các cá nhân có năng khiếu nghệ thuật
                    </p>
                  </div>
                </div>

                {/* Purpose Card 2 - Cultural Spread */}
                <div className="purpose-card reveal" style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '3rem 2.5rem',
                  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(236, 72, 153, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '0', 
                    left: '0', 
                    right: '0', 
                    height: '5px', 
                    background: 'linear-gradient(90deg, #EC4899, #F472B6)' 
                  }}></div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.05))',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                      border: '2px solid rgba(236, 72, 153, 0.1)'
                    }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 4C14.76 4 17.12 5.44 18.41 7.59L16.4 8.6C15.58 7.07 13.93 6 12 6S8.42 7.07 7.6 8.6L5.59 7.59C6.88 5.44 9.24 4 12 4ZM12 20C9.24 20 6.88 18.56 5.59 16.41L7.6 15.4C8.42 16.93 10.07 18 12 18S15.58 16.93 16.4 15.4L18.41 16.41C17.12 18.56 14.76 20 12 20ZM20 12C20 14.76 18.56 17.12 16.41 18.41L15.4 16.4C16.93 15.58 18 13.93 18 12S16.93 8.42 15.4 7.6L16.41 5.59C18.56 6.88 20 9.24 20 12Z" fill="#EC4899"/>
                      </svg>
                    </div>
                    <h4 style={{ 
                      fontSize: '1.5rem', 
                      color: '#1F2937', 
                      marginBottom: '1.5rem',
                      fontWeight: '700',
                      lineHeight: '1.3'
                    }}>
                      Lan tỏa văn hóa
                    </h4>
                    <p style={{ 
                      color: '#6B7280', 
                      lineHeight: '1.8',
                      margin: '0',
                      fontSize: '1rem'
                    }}>
                      Góp phần lan tỏa các giá trị văn hóa, sự đa dạng và tinh thần gắn kết cộng đồng trong môi trường đa sắc tộc tại Úc
                    </p>
                  </div>
                </div>

                {/* Purpose Card 3 - Community Connection */}
                <div className="purpose-card reveal" style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '3rem 2.5rem',
                  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(16, 185, 129, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '0', 
                    left: '0', 
                    right: '0', 
                    height: '5px', 
                    background: 'linear-gradient(90deg, #10B981, #34D399)' 
                  }}></div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                      border: '2px solid rgba(16, 185, 129, 0.1)'
                    }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8C12 5.79086 13.7909 4 16 4ZM8 6C9.65685 6 11 7.34315 11 9C11 10.6569 9.65685 12 8 12C6.34315 12 5 10.6569 5 9C5 7.34315 6.34315 6 8 6ZM8 13C10.67 13 16 14.33 16 17V20H0V17C0 14.33 5.33 13 8 13ZM16 13.43C16.52 13.63 17.1 13.9 17.75 14.23C19.05 14.9 20 15.69 20 17V20H18V17C18 15.9 17.16 14.97 16 13.43Z" fill="#10B981"/>
                      </svg>
                    </div>
                    <h4 style={{ 
                      fontSize: '1.5rem', 
                      color: '#1F2937', 
                      marginBottom: '1.5rem',
                      fontWeight: '700',
                      lineHeight: '1.3'
                    }}>
                      Kết nối cộng đồng
                    </h4>
                    <p style={{ 
                      color: '#6B7280', 
                      lineHeight: '1.8',
                      margin: '0',
                      fontSize: '1rem'
                    }}>
                      Tăng cường sự hiện diện và kết nối của UAVS-NSW với cộng đồng thông qua các hoạt động giao lưu văn hóa - nghệ thuật
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Goals & Targets Section */}
            <div className="vision-goals-section reveal">
              <div className="goals-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  marginBottom: '1.5rem',
                  padding: '0.75rem 2rem',
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.05))',
                  borderRadius: '50px',
                  border: '1px solid rgba(236, 72, 153, 0.2)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="#EC4899"/>
                    <circle cx="12" cy="12" r="2" fill="#8B5CF6"/>
                  </svg>
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: '700', 
                    background: 'linear-gradient(135deg, #EC4899 0%, #6B46C1 100%)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent', 
                    backgroundClip: 'text',
                    margin: '0'
                  }}>
                    Mục tiêu hướng tới
                  </h3>
                </div>
                <p style={{ 
                  fontSize: '1.2rem', 
                  color: '#6B7280', 
                  maxWidth: '800px', 
                  margin: '0 auto',
                  lineHeight: '1.8',
                  fontWeight: '500'
                }}>
                  Những mục tiêu cụ thể mà chúng tôi hướng đến trong hành trình phát triển tài năng nghệ thuật
                </p>
              </div>

              <div className="goals-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
                gap: '2.5rem',
                maxWidth: '1400px',
                margin: '0 auto'
              }}>
                {/* Goal 1 - Find Talent */}
                <div className="goal-card reveal" style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                  borderRadius: '24px',
                  padding: '3rem 2.5rem',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '-50%', 
                    right: '-50%', 
                    width: '200%', 
                    height: '200%', 
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%)', 
                    pointerEvents: 'none' 
                  }}></div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                      boxShadow: '0 8px 25px rgba(139, 92, 246, 0.25)'
                    }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z" fill="white"/>
                      </svg>
                    </div>
                    <h4 style={{ 
                      fontSize: '1.5rem', 
                      color: '#1F2937', 
                      marginBottom: '1.5rem',
                      fontWeight: '700',
                      lineHeight: '1.3'
                    }}>
                      Tìm kiếm tài năng
                    </h4>
                    <p style={{ 
                      color: '#6B7280', 
                      lineHeight: '1.8',
                      margin: '0',
                      fontSize: '1rem'
                    }}>
                      Tìm kiếm và phát hiện các tài năng nghệ thuật tiềm năng, không phân biệt độ tuổi, quốc tịch, ngành nghề hay lĩnh vực biểu diễn
                    </p>
                  </div>
                </div>

                {/* Goal 2 - Development Opportunity */}
                <div className="goal-card reveal" style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                  borderRadius: '24px',
                  padding: '3rem 2.5rem',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '-50%', 
                    right: '-50%', 
                    width: '200%', 
                    height: '200%', 
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.03) 0%, transparent 70%)', 
                    pointerEvents: 'none' 
                  }}></div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #EC4899, #F472B6)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                      boxShadow: '0 8px 25px rgba(236, 72, 153, 0.25)'
                    }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C13.1 2 14 2.9 14 4V8H16C17.66 8 19 9.34 19 11V14H17V11C17 10.45 16.55 10 16 10H14V15C14 16.1 13.1 17 12 17S10 16.1 10 15V10H8C7.45 10 7 10.45 7 11V14H5V11C5 9.34 6.34 8 8 8H10V4C10 2.9 10.9 2 12 2ZM12 20C13.1 20 14 20.9 14 22H10C10 20.9 10.9 20 12 20Z" fill="white"/>
                      </svg>
                    </div>
                    <h4 style={{ 
                      fontSize: '1.5rem', 
                      color: '#1F2937', 
                      marginBottom: '1.5rem',
                      fontWeight: '700',
                      lineHeight: '1.3'
                    }}>
                      Cơ hội phát triển
                    </h4>
                    <p style={{ 
                      color: '#6B7280', 
                      lineHeight: '1.8',
                      margin: '0',
                      fontSize: '1rem'
                    }}>
                      Tạo điều kiện để những cá nhân đam mê nghệ thuật có cơ hội trình diễn, phát triển kỹ năng và truyền cảm hứng tích cực
                    </p>
                  </div>
                </div>

                {/* Goal 3 - Participation Target */}
                <div className="goal-card reveal" style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                  borderRadius: '24px',
                  padding: '3rem 2.5rem',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '-50%', 
                    right: '-50%', 
                    width: '200%', 
                    height: '200%', 
                    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.03) 0%, transparent 70%)', 
                    pointerEvents: 'none' 
                  }}></div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                      boxShadow: '0 8px 25px rgba(245, 158, 11, 0.25)'
                    }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="white"/>
                      </svg>
                    </div>
                    <h4 style={{ 
                      fontSize: '1.5rem', 
                      color: '#1F2937', 
                      marginBottom: '1.5rem',
                      fontWeight: '700',
                      lineHeight: '1.3'
                    }}>
                      Mục tiêu tham gia
                    </h4>
                    <p style={{ 
                      color: '#6B7280', 
                      lineHeight: '1.8',
                      margin: '0',
                      fontSize: '1rem'
                    }}>
                      Thu hút tối thiểu <strong style={{ color: '#8B5CF6', fontWeight: '700' }}>25 tiết mục</strong> đăng ký tham gia và tối thiểu <strong style={{ color: '#EC4899', fontWeight: '700' }}>300 khán giả</strong> tham dự đêm chung kết
                    </p>
                  </div>
                </div>

                {/* Goal 4 - Media & Sponsorship */}
                <div className="goal-card reveal" style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                  borderRadius: '24px',
                  padding: '3rem 2.5rem',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '-50%', 
                    right: '-50%', 
                    width: '200%', 
                    height: '200%', 
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.03) 0%, transparent 70%)', 
                    pointerEvents: 'none' 
                  }}></div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #10B981, #34D399)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.25)'
                    }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 6H18L15 3H9L6 6H3C1.9 6 1 6.9 1 8V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V8C23 6.9 22.1 6 21 6ZM12 17C9.24 17 7 14.76 7 12S9.24 7 12 7 17 9.24 17 12 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12S10.34 15 12 15 15 13.66 15 12 13.66 9 12 9Z" fill="white"/>
                      </svg>
                    </div>
                    <h4 style={{ 
                      fontSize: '1.5rem', 
                      color: '#1F2937', 
                      marginBottom: '1.5rem',
                      fontWeight: '700',
                      lineHeight: '1.3'
                    }}>
                      Truyền thông & Tài trợ
                    </h4>
                    <p style={{ 
                      color: '#6B7280', 
                      lineHeight: '1.8',
                      margin: '0',
                      fontSize: '1rem'
                    }}>
                      Đẩy mạnh hoạt động truyền thông và thu hút tài trợ để nâng cao chất lượng sự kiện
                    </p>
                  </div>
                </div>

                {/* Goal 5 - Professional Program */}
                <div className="goal-card reveal" style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                  borderRadius: '24px',
                  padding: '3rem 2.5rem',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '-50%', 
                    right: '-50%', 
                    width: '200%', 
                    height: '200%', 
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)', 
                    pointerEvents: 'none' 
                  }}></div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.25)'
                    }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.45 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.45 17 2V4H19C20.1 4 21 4.9 21 6V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V6C3 4.9 3.9 4 5 4H7ZM5 10V20H19V10H5ZM12 17L7 12L8.41 10.59L12 14.17L15.59 10.59L17 12L12 17Z" fill="white"/>
                      </svg>
                    </div>
                    <h4 style={{ 
                      fontSize: '1.5rem', 
                      color: '#1F2937', 
                      marginBottom: '1.5rem',
                      fontWeight: '700',
                      lineHeight: '1.3'
                    }}>
                      Chương trình chuyên nghiệp
                    </h4>
                    <p style={{ 
                      color: '#6B7280', 
                      lineHeight: '1.8',
                      margin: '0',
                      fontSize: '1rem'
                    }}>
                      Xây dựng một chương trình biểu diễn chuyên nghiệp, khẳng định vai trò của UAVS-NSW trong việc phát triển đời sống tinh thần cho cộng đồng
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced custom styles for sophisticated hover effects */}
        <style>{`
          .purpose-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
            border-color: rgba(139, 92, 246, 0.2);
          }
          
          .goal-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          }
          
          .purpose-card,
          .goal-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .purpose-card:hover .icon-container,
          .goal-card:hover .icon-container {
            transform: scale(1.1) rotate(5deg);
          }
          
          @media (max-width: 768px) {
            .purpose-grid,
            .goals-grid {
              grid-template-columns: 1fr;
              gap: 2rem;
            }
            
            .purpose-card,
            .goal-card {
              padding: 2.5rem 2rem;
            }
            
            .purpose-header h3,
            .goals-header h3 {
              font-size: 1.5rem;
            }
            
            .purpose-header p,
            .goals-header p {
              font-size: 1rem;
            }
          }
          
          @media (max-width: 480px) {
            .purpose-card,
            .goal-card {
              padding: 2rem 1.5rem;
            }
          }
        `}</style>
      </section>

      {/* Timeline Schedule Section */}
      <section id="timeline" className="timeline-section" style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-100px',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, transparent 70%)',
          filter: 'blur(35px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="timeline-wrapper" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Section Header */}
            <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '1.5rem',
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05))',
                borderRadius: '50px',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="#3B82F6"/>
                  <circle cx="12" cy="12" r="3" fill="#8B5CF6"/>
                </svg>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: '700', 
                  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent', 
                  backgroundClip: 'text',
                  margin: '0'
                }}>
                  Kế Hoạch
                </h2>
              </div>
              <p style={{ 
                fontSize: '1.2rem', 
                color: '#6B7280', 
                maxWidth: '800px', 
                margin: '0 auto',
                lineHeight: '1.8',
                fontWeight: '500'
              }}>
                Lộ trình chi tiết cho cuộc thi UAVS's Got Talent 2025 với 3 vòng thi chính
              </p>
            </div>

            {/* Timeline Container */}
            <div className="timeline-container" style={{ position: 'relative' }}>
              {/* Timeline Line */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '0',
                bottom: '0',
                width: '4px',
                background: 'linear-gradient(180deg, #3B82F6, #8B5CF6, #EC4899)',
                borderRadius: '2px',
                transform: 'translateX(-50%)',
                zIndex: 1
              }}></div>

              {/* Timeline Items */}
              <div className="timeline-items">
                {/* Round 1: Audition */}
                <div className="timeline-item reveal" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '4rem',
                  position: 'relative'
                }}>
                  {/* Timeline Node */}
                  <div className="timeline-node" style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.25)',
                    border: '4px solid white',
                    zIndex: 2,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C13.1 2 14 2.9 14 4V8H16C17.66 8 19 9.34 19 11V14H17V11C17 10.45 16.55 10 16 10H14V15C14 16.1 13.1 17 12 17S10 16.1 10 15V10H8C7.45 10 7 10.45 7 11V14H5V11C5 9.34 6.34 8 8 8H10V4C10 2.9 10.9 2 12 2Z" fill="white"/>
                    </svg>
                  </div>
                  
                  {/* Content Card - Left Side */}
                  <div style={{ 
                    flex: '1', 
                    paddingRight: '3rem',
                    textAlign: 'right'
                  }}>
                    <div className="timeline-card round-1" style={{
                      background: 'white',
                      borderRadius: '20px',
                      padding: '2rem',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
                      border: '1px solid rgba(59, 130, 246, 0.1)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      minHeight: '200px'
                    }}>
                      <div style={{ 
                        position: 'absolute', 
                        top: '0', 
                        left: '0', 
                        right: '0', 
                        height: '5px', 
                        background: 'linear-gradient(90deg, #3B82F6, #60A5FA)' 
                      }}></div>
                      
                      {/* Hover overlay */}
                      <div className="card-overlay" style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(96, 165, 250, 0.01) 100%)',
                        opacity: '0',
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none'
                      }}></div>
                      
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ 
                          display: 'inline-block',
                          background: 'rgba(59, 130, 246, 0.1)',
                          color: '#3B82F6',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          marginBottom: '1rem'
                        }}>
                          4/7 - 25/7/2025
                        </div>
                        <h3 style={{ 
                          fontSize: '1.4rem', 
                          color: '#1F2937', 
                          marginBottom: '1rem',
                          fontWeight: '700',
                          lineHeight: '1.3'
                        }}>
                          Vòng 1: Audition - Sơ loại
                        </h3>
                        
                        {/* Brief content - always visible */}
                        <div className="brief-content" style={{ 
                          color: '#6B7280', 
                          lineHeight: '1.6', 
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease'
                        }}>
                          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>
                            📹 Gửi video dự thi online
                          </p>
                          <p style={{ margin: '0', color: '#3B82F6', fontWeight: '600', fontSize: '0.9rem' }}>
                            Hover để xem chi tiết...
                          </p>
                        </div>
                        
                        {/* Full content - visible on hover */}
                        <div className="full-content" style={{
                          color: '#6B7280',
                          lineHeight: '1.7',
                          fontSize: '1rem',
                          overflow: 'hidden'
                        }}>
                          <p style={{ margin: '0 0 1rem 0' }}>
                            <strong>Hình thức:</strong> Gửi video dự thi qua link đăng ký
                          </p>
                          <p style={{ margin: '0 0 1rem 0' }}>
                            <strong>Thời lượng:</strong> Hát/rap: 3 phút, Nghệ thuật khác: 5 phút
                          </p>
                          <p style={{ margin: '0 0 1rem 0' }}>
                            <strong>Yêu cầu:</strong> Video không chỉnh sửa hiệu ứng đặc biệt
                          </p>
                          <p style={{ margin: '0 0 1rem 0' }}>
                            <strong>Mục tiêu:</strong> Chọn 10 tiết mục nổi bật và đa dạng nhất
                          </p>
                          <p style={{ margin: '0', color: '#3B82F6', fontWeight: '600' }}>
                            🎯 Công bố kết quả: 25/7/2025
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Empty space for right side */}
                  <div style={{ flex: '1' }}></div>
                </div>

                {/* Round 2: Voting */}
                <div className="timeline-item reveal" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '4rem',
                  position: 'relative'
                }}>
                  {/* Timeline Node */}
                  <div className="timeline-node" style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.25)',
                    border: '4px solid white',
                    zIndex: 2,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 11H7V9H9V11ZM13 11H11V9H13V11ZM17 11H15V9H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z" fill="white"/>
                    </svg>
                  </div>
                  
                  {/* Empty space for left side */}
                  <div style={{ flex: '1' }}></div>
                  
                  {/* Content Card - Right Side */}
                  <div style={{ 
                    flex: '1', 
                    paddingLeft: '3rem'
                  }}>
                    <div className="timeline-card round-2" style={{
                      background: 'white',
                      borderRadius: '20px',
                      padding: '2rem',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
                      border: '1px solid rgba(139, 92, 246, 0.1)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      minHeight: '200px'
                    }}>
                      <div style={{ 
                        position: 'absolute', 
                        top: '0', 
                        left: '0', 
                        right: '0', 
                        height: '5px', 
                        background: 'linear-gradient(90deg, #8B5CF6, #A855F7)' 
                      }}></div>
                      
                      {/* Hover overlay */}
                      <div className="card-overlay" style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.03) 0%, rgba(168, 85, 247, 0.01) 100%)',
                        opacity: '0',
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none'
                      }}></div>
                      
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ 
                          display: 'inline-block',
                          background: 'rgba(139, 92, 246, 0.1)',
                          color: '#8B5CF6',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          marginBottom: '1rem'
                        }}>
                          15/8 - 5/9/2025
                        </div>
                        <h3 style={{ 
                          fontSize: '1.4rem', 
                          color: '#1F2937', 
                          marginBottom: '1rem',
                          fontWeight: '700',
                          lineHeight: '1.3'
                        }}>
                          Vòng 2: Voting - Bình chọn Yêu thích
                        </h3>
                        
                        {/* Brief content - always visible */}
                        <div className="brief-content" style={{ 
                          color: '#6B7280', 
                          lineHeight: '1.6', 
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease'
                        }}>
                          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>
                            🗳️ Online (40%) + Offline (60%)
                          </p>
                          <p style={{ margin: '0', color: '#8B5CF6', fontWeight: '600', fontSize: '0.9rem' }}>
                            Hover để xem chi tiết...
                          </p>
                        </div>
                        
                        {/* Full content - visible on hover */}
                        <div className="full-content" style={{
                          color: '#6B7280',
                          lineHeight: '1.7',
                          fontSize: '1rem',
                          overflow: 'hidden'
                        }}>
                          <p style={{ margin: '0 0 1rem 0' }}>
                            <strong>Online Voting (40%):</strong> Like, share, comment trên Facebook
                          </p>
                          <p style={{ margin: '0 0 1rem 0' }}>
                            <strong>Offline Voting (60%):</strong> Bình chọn trực tiếp tại sự kiện
                          </p>
                          <p style={{ margin: '0 0 1rem 0' }}>
                            <strong>Cách thức:</strong> Tương tác với photo album chính thức của BTC
                          </p>
                          <p style={{ margin: '0', color: '#8B5CF6', fontWeight: '600' }}>
                            🚀 Tăng tương tác và lan tỏa chương trình
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Round 3: Grand Finale */}
                <div className="timeline-item reveal" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  position: 'relative'
                }}>
                  {/* Timeline Node */}
                  <div className="timeline-node" style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #EC4899, #F472B6)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 25px rgba(236, 72, 153, 0.25)',
                    border: '4px solid white',
                    zIndex: 2,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="white"/>
                    </svg>
                  </div>
                  
                  {/* Content Card - Left Side */}
                  <div style={{ 
                    flex: '1', 
                    paddingRight: '3rem',
                    textAlign: 'right'
                  }}>
                    <div className="timeline-card round-3" style={{
                      background: 'white',
                      borderRadius: '20px',
                      padding: '2rem',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
                      border: '1px solid rgba(236, 72, 153, 0.1)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      minHeight: '200px'
                    }}>
                      <div style={{ 
                        position: 'absolute', 
                        top: '0', 
                        left: '0', 
                        right: '0', 
                        height: '5px', 
                        background: 'linear-gradient(90deg, #EC4899, #F472B6)' 
                      }}></div>
                      
                      {/* Hover overlay */}
                      <div className="card-overlay" style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.03) 0%, rgba(244, 114, 182, 0.01) 100%)',
                        opacity: '0',
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none'
                      }}></div>
                      
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ 
                          display: 'inline-block',
                          background: 'rgba(236, 72, 153, 0.1)',
                          color: '#EC4899',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          marginBottom: '1rem'
                        }}>
                          5/9/2025
                        </div>
                        <h3 style={{ 
                          fontSize: '1.4rem', 
                          color: '#1F2937', 
                          marginBottom: '1rem',
                          fontWeight: '700',
                          lineHeight: '1.3'
                        }}>
                          Vòng 3: Grand Finale & Gala
                        </h3>
                        
                        {/* Brief content - always visible */}
                        <div className="brief-content" style={{ 
                          color: '#6B7280', 
                          lineHeight: '1.6', 
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease'
                        }}>
                          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>
                            🏆 "The Vivid Dream" - Đêm chung kết
                          </p>
                          <p style={{ margin: '0', color: '#EC4899', fontWeight: '600', fontSize: '0.9rem' }}>
                            Hover để xem chi tiết...
                          </p>
                        </div>
                        
                        {/* Full content - visible on hover */}
                        <div className="full-content" style={{
                          color: '#6B7280',
                          lineHeight: '1.7',
                          fontSize: '1rem',
                          overflow: 'hidden'
                        }}>
                          <p style={{ margin: '0 0 1rem 0' }}>
                            <strong>Biểu diễn trực tiếp:</strong> 15 phút mỗi tiết mục
                          </p>
                          <p style={{ margin: '0 0 1rem 0' }}>
                            <strong>Chấm điểm:</strong> BGK (70%) + Voting offline (30%)
                          </p>
                          <p style={{ margin: '0 0 1rem 0' }}>
                            <strong>Giải thưởng:</strong> Nhất, Nhì, Ba, People's Choice, Ấn tượng đặc biệt
                          </p>
                          <p style={{ margin: '0 0 1rem 0' }}>
                            <strong>Chuẩn bị:</strong> Tập luyện + MV giới thiệu từ 25/7 - 4/9
                          </p>
                          <p style={{ margin: '0', color: '#EC4899', fontWeight: '600' }}>
                            ✨ Đêm chung kết hoành tráng với khách mời đặc biệt
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Empty space for right side */}
                  <div style={{ flex: '1' }}></div>
                </div>
              </div>
            </div>

            {/* Competition Overview Stats */}
            <div className="competition-stats reveal" style={{ 
              marginTop: '5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              maxWidth: '1000px',
              margin: '5rem auto 0'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(59, 130, 246, 0.1)'
              }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800', 
                  color: '#3B82F6',
                  marginBottom: '0.5rem'
                }}>
                  3
                </div>
                <div style={{ color: '#6B7280', fontWeight: '600' }}>Vòng thi chính</div>
              </div>
              
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(139, 92, 246, 0.1)'
              }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800', 
                  color: '#8B5CF6',
                  marginBottom: '0.5rem'
                }}>
                  10
                </div>
                <div style={{ color: '#6B7280', fontWeight: '600' }}>Tiết mục chung kết</div>
              </div>
              
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(236, 72, 153, 0.1)'
              }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800', 
                  color: '#EC4899',
                  marginBottom: '0.5rem'
                }}>
                  5
                </div>
                <div style={{ color: '#6B7280', fontWeight: '600' }}>Giải thưởng</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Timeline Styles */}
        <style>{`
          /* Timeline Node Hover Effects */
          .timeline-node:hover {
            transform: translateX(-50%) scale(1.15);
            box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
          }
          
          .round-2 + * .timeline-node:hover {
            box-shadow: 0 12px 35px rgba(139, 92, 246, 0.4);
          }
          
          .round-3 + * .timeline-node:hover {
            box-shadow: 0 12px 35px rgba(236, 72, 153, 0.4);
          }

          /* Timeline Card Hover Effects */
          .timeline-card {
            position: relative;
          }
          
          .timeline-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
            border-color: rgba(59, 130, 246, 0.2);
          }
          
          .timeline-card.round-1:hover {
            border-color: rgba(59, 130, 246, 0.3);
            box-shadow: 0 20px 60px rgba(59, 130, 246, 0.15);
          }
          
          .timeline-card.round-2:hover {
            border-color: rgba(139, 92, 246, 0.3);
            box-shadow: 0 20px 60px rgba(139, 92, 246, 0.15);
          }
          
          .timeline-card.round-3:hover {
            border-color: rgba(236, 72, 153, 0.3);
            box-shadow: 0 20px 60px rgba(236, 72, 153, 0.15);
          }

          /* Card Overlay Effects */
          .timeline-card:hover .card-overlay {
            opacity: 1;
          }

          /* Content Expansion Effects */
          .timeline-card .full-content {
            opacity: 0 !important;
            max-height: 0 !important;
            padding-top: 0 !important;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          
          .timeline-card:hover .brief-content {
            opacity: 0 !important;
            transform: translateY(-10px) !important;
            max-height: 0 !important;
            margin-bottom: 0 !important;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          
          .timeline-card:hover .full-content {
            opacity: 1 !important;
            max-height: 400px !important;
            padding-top: 1rem !important;
          }

          /* Pulse animation for timeline nodes */
          @keyframes pulse {
            0%, 100% {
              transform: translateX(-50%) scale(1);
              opacity: 1;
            }
            50% {
              transform: translateX(-50%) scale(1.05);
              opacity: 0.9;
            }
          }
          
          .timeline-node {
            animation: pulse 3s ease-in-out infinite;
          }
          
          .timeline-node:nth-child(2) {
            animation-delay: 1s;
          }
          
          .timeline-node:nth-child(3) {
            animation-delay: 2s;
          }

          /* Enhanced interaction feedback */
          .timeline-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transform: translateX(-100%);
            transition: transform 0.6s ease;
            pointer-events: none;
            border-radius: 20px;
          }
          
          .timeline-card:hover::before {
            transform: translateX(100%);
          }

          /* Stats card hover effects */
          .competition-stats > div {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }
          
          .competition-stats > div:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          }
          
          .competition-stats > div:nth-child(1):hover {
            border-color: rgba(59, 130, 246, 0.3);
            box-shadow: 0 15px 40px rgba(59, 130, 246, 0.12);
          }
          
          .competition-stats > div:nth-child(2):hover {
            border-color: rgba(139, 92, 246, 0.3);
            box-shadow: 0 15px 40px rgba(139, 92, 246, 0.12);
          }
          
          .competition-stats > div:nth-child(3):hover {
            border-color: rgba(236, 72, 153, 0.3);
            box-shadow: 0 15px 40px rgba(236, 72, 153, 0.12);
          }

          /* Mobile responsiveness */
          @media (max-width: 768px) {
            .timeline-container {
              padding: 0 1rem;
            }
            
            .timeline-item {
              flex-direction: column !important;
              margin-bottom: 3rem !important;
            }
            
            .timeline-item > div[style*="flex: 1"] {
              flex: none !important;
              width: 100% !important;
              padding: 0 !important;
              text-align: left !important;
            }
            
            .timeline-container div[style*="position: absolute"][style*="left: 50%"] {
              position: relative !important;
              left: auto !important;
              transform: none !important;
              margin: 0 auto 2rem auto !important;
            }
            
            .timeline-node {
              animation: none;
            }
            
            .timeline-card {
              min-height: auto !important;
            }
            
            .timeline-card:hover .brief-content {
              opacity: 1;
              transform: none;
              max-height: none;
              margin-bottom: 1rem;
            }
            
            .timeline-card .full-content {
              opacity: 1;
              max-height: none;
              padding-top: 1rem;
            }
            
            .competition-stats {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
            }
          }

          /* Focus states for accessibility */
          .timeline-card:focus-visible {
            outline: 3px solid rgba(59, 130, 246, 0.5);
            outline-offset: 4px;
          }
          
          .timeline-node:focus-visible {
            outline: 3px solid rgba(255, 255, 255, 0.8);
            outline-offset: 4px;
          }

          /* Performance optimizations */
          .timeline-card,
          .timeline-node,
          .card-overlay {
            will-change: transform;
            backface-visibility: hidden;
          }
        `}</style>
      </section>

      {/* Floating Background Elements */}
      <div className="floating-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
        <div className="floating-element element-5"></div>
      </div>
      {/* Add animation style for kaleidoscope image */}
      <style>{`
        .kaleidoscope-animated {
          animation: spinKaleidoscope 12s linear infinite;
          filter: drop-shadow(0 0 24px #fff7b2) drop-shadow(0 0 48px #a18fff);
          transition: filter 0.3s;
        }
        .kaleidoscope-animated:hover {
          filter: drop-shadow(0 0 48px #fff7b2) drop-shadow(0 0 96px #a18fff);
        }
        @keyframes spinKaleidoscope {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HomePage; 