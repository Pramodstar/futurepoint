import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

const growthLabel = { high: 'High growth', medium: 'Growing', stable: 'Stable' };

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCareerCategories().then(({ categories: c }) => setCategories(c));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category) params.category = category;
    if (search.trim()) params.search = search.trim();
    api
      .getCareers(params)
      .then(({ careers: c }) => setCareers(c))
      .finally(() => setLoading(false));
  }, [category, search]);

  return (
    <div className="page">
      <h1>Career Explorer</h1>
      <p className="muted">10+ careers — skills, salary, education path</p>

      <div className="filters">
        <input
          type="search"
          placeholder="Search careers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="muted">Loading...</p>
      ) : (
        <div className="career-grid">
          {careers.map((c) => (
            <Link key={c.slug} to={`/careers/${c.slug}`} className="career-card">
              <span className="career-icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.description.slice(0, 100)}...</p>
              <div className="career-meta">
                <span className="badge">{c.category}</span>
                <span className={`growth growth-${c.growth_outlook}`}>
                  {growthLabel[c.growth_outlook]}
                </span>
              </div>
              <span className="salary">{c.salary_range}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
