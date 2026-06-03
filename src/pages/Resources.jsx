import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getResources()
      .then(({ resources: r }) => setResources(r))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h1>Career Guides</h1>
      <p className="muted">Practical articles — 12th, exams, skills, salary</p>
      {loading ? (
        <p className="muted">Loading...</p>
      ) : (
        <div className="resource-list">
          {resources.map((r) => (
            <Link key={r.id} to={`/resources/${r.id}`} className="resource-card">
              <span className="badge">{r.category}</span>
              <h3>{r.title}</h3>
              <p>{r.summary}</p>
              <span className="read-time">{r.read_time_min} min read</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
