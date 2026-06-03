import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="hero">
      <div className="hero-badge">Career Guidance for Indian Students</div>
      <h1>
        Apna <span className="gradient-text">Future</span> sahi direction mein
      </h1>
      <p className="hero-sub">
        FuturePoint aapko careers explore karne, personality assessment lene, aur expert
        guides padhne mein madad karta hai — 12th ke baad ya college ke dauran.
      </p>
      <div className="hero-actions">
        {user ? (
          <Link to="/assessment" className="btn btn-primary btn-lg">
            Start Assessment
          </Link>
        ) : (
          <Link to="/register" className="btn btn-primary btn-lg">
            Free account banao
          </Link>
        )}
        <Link to="/careers" className="btn btn-outline btn-lg">
          Explore careers
        </Link>
      </div>
      <div className="hero-stats">
        <div>
          <strong>10+</strong>
          <span>Career paths</span>
        </div>
        <div>
          <strong>8</strong>
          <span>Assessment questions</span>
        </div>
        <div>
          <strong>5+</strong>
          <span>Expert guides</span>
        </div>
      </div>
      <div className="feature-grid">
        <article className="feature-card">
          <span className="feature-icon">🎯</span>
          <h3>Career Assessment</h3>
          <p>8 sawalon se apni strengths samjho aur personalized recommendations pao.</p>
        </article>
        <article className="feature-card">
          <span className="feature-icon">📋</span>
          <h3>Career Explorer</h3>
          <p>Salary, skills, education path — har career ki detail ek jagah.</p>
        </article>
        <article className="feature-card">
          <span className="feature-icon">📖</span>
          <h3>Guidance Articles</h3>
          <p>NEET, JEE, skills, salary — practical guides Hindi-friendly tone mein.</p>
        </article>
      </div>
    </section>
  );
}
