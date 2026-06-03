import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    education_level: '12th',
    interests: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/assessment');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Join FuturePoint</h1>
        <p className="muted">Free account — career guidance shuru karo</p>
        {error && <div className="alert alert-error">{error}</div>}
        <label>
          Full name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password (min 6 chars)
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
          />
        </label>
        <label>
          Education level
          <select name="education_level" value={form.education_level} onChange={handleChange}>
            <option value="10th">10th pass</option>
            <option value="12th">12th pass / preparing</option>
            <option value="graduate">Graduate</option>
            <option value="postgraduate">Postgraduate</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Interests (optional)
          <input
            name="interests"
            placeholder="e.g. coding, biology, design"
            value={form.interests}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
        <p className="auth-footer">
          Already have account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
