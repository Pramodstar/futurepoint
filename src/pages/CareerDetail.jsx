import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';

const growthLabel = { high: 'High growth', medium: 'Growing', stable: 'Stable' };

export default function CareerDetail() {
  const { slug } = useParams();
  const [career, setCareer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getCareer(slug)
      .then(({ career: c }) => setCareer(c))
      .catch((e) => setError(e.message));
  }, [slug]);

  if (error) return <div className="page"><p className="alert alert-error">{error}</p></div>;
  if (!career) return <div className="page"><p className="muted">Loading...</p></div>;

  return (
    <div className="page detail-page">
      <Link to="/careers" className="back-link">← All careers</Link>
      <div className="detail-header">
        <span className="detail-icon">{career.icon}</span>
        <div>
          <h1>{career.title}</h1>
          <div className="detail-badges">
            <span className="badge">{career.category}</span>
            <span className={`growth growth-${career.growth_outlook}`}>
              {growthLabel[career.growth_outlook]}
            </span>
            <span className="salary-tag">{career.salary_range}</span>
          </div>
        </div>
      </div>
      <p className="detail-desc">{career.description}</p>
      <div className="detail-blocks">
        <div className="detail-block">
          <h3>Skills required</h3>
          <p>{career.skills_required}</p>
        </div>
        <div className="detail-block">
          <h3>Education path</h3>
          <p>{career.education_path}</p>
        </div>
      </div>
      <Link to="/assessment" className="btn btn-primary">
        Is career ke liye suited ho? Assessment lo
      </Link>
    </div>
  );
}
