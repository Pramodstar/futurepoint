import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

export default function Dashboard() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getAssessmentHistory()
      .then(({ assessments }) => setHistory(assessments))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const latest = history[0];
  const traitScores = latest?.trait_scores
    ? typeof latest.trait_scores === 'string'
      ? JSON.parse(latest.trait_scores)
      : latest.trait_scores
    : null;

  return (
    <div className="page">
      <h1>Hello, {user?.name} 👋</h1>
      <p className="muted">Aapka career guidance dashboard</p>

      <div className="dash-grid">
        <div className="dash-card highlight">
          <h3>Career Assessment</h3>
          <p>Apni strengths discover karo aur top career recommendations pao.</p>
          <Link to="/assessment" className="btn btn-primary">
            {history.length ? 'Retake assessment' : 'Start assessment'}
          </Link>
        </div>
        <div className="dash-card">
          <h3>Profile</h3>
          <ul className="profile-list">
            <li>
              <span>Email</span> {user?.email}
            </li>
            <li>
              <span>Education</span> {user?.education_level || '—'}
            </li>
            <li>
              <span>Interests</span> {user?.interests || 'Not set'}
            </li>
          </ul>
        </div>
      </div>

      {traitScores && (
        <section className="section">
          <h2>Latest trait scores</h2>
          <div className="trait-bars">
            {Object.entries(traitScores).map(([trait, score]) => (
              <div key={trait} className="trait-row">
                <span className="trait-label">{trait}</span>
                <div className="trait-bar-wrap">
                  <div className="trait-bar" style={{ width: `${(score / 8) * 100}%` }} />
                </div>
                <span className="trait-score">{score}/8</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {history.length > 0 && (
        <section className="section">
          <h2>Assessment history</h2>
          <ul className="history-list">
            {history.map((a) => (
              <li key={a.id}>
                {new Date(a.completed_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </li>
            ))}
          </ul>
        </section>
      )}

      {loading && <p className="muted">Loading history...</p>}
    </div>
  );
}
