import React from 'react';
import './CustomCss/Homepage/Homepage.css';
import BlobPhoto from './componets/hompage/BlobPhoto'

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          ⟨⟩ Lahiru L
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About me</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#resume">Resume</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <span className="greeting">Hey! I'm</span>
              <br />
              <span className="name">LAHIRU LAKSHAN</span>
            </h1>
            <p className="description">
              A software developer passionate and experienced in
              <br />
              building Web applications.
            </p>
            <button className="resume-button">
              Resume ⬇
            </button>
          </div>
          <div className="hero-illustration">     
          <BlobPhoto imageSrc="/images/2.png"  />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;