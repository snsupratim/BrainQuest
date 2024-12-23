import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to IQuest</h1>
        <p>
          Join technical challenges, enhance your skills, and compete with
          developers worldwide!
        </p>
      </header>
      <section className="home-quests">
        <h2>Available Quests</h2>
        <div className="quests-grid">
          <div className="quest-card">
            <h3>Frontend Challenge</h3>
            <p>Build a responsive layout with React and CSS.</p>
            <button>Join Now</button>
          </div>
          <div className="quest-card">
            <h3>Backend Quest</h3>
            <p>Create a REST API with Node.js and Express.</p>
            <button>Join Now</button>
          </div>
          <div className="quest-card">
            <h3>DSA Battle</h3>
            <p>Compete in solving data structures and algorithms problems.</p>
            <button>Join Now</button>
          </div>
        </div>
      </section>
      <section className="home-featured">
        <h2>Featured Challenge</h2>
        <p>
          Don’t miss the “Hackathon Sprint 2025” – Collaborate, Code, and
          Conquer!
        </p>
        <button>Learn More</button>
      </section>
      <footer className="home-footer">
        <p>IQuest - Empowering Developers </p>
      </footer>
    </div>
  );
};

export default Home;
