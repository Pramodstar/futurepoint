import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

const OPTIONS = ['a', 'b', 'c', 'd'];

export default function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getQuestions()
      .then(({ questions: q }) => setQuestions(q))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const current = questions[step];
  const progress = questions.length ? ((step + 1) / questions.length) * 100 : 0;

  const selectAnswer = (choice) => {
    const next = [...answers];
    next[step] = choice;
    setAnswers(next);
  };

  const goNext = async () => {
    if (!answers[step]) {
      setError('Please select an option');
      return;
    }
    setError('');
    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }
    setSubmitting(true);
    try {
      const data = await api.submitAssessment(answers);
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  if (loading) return <div className="page"><p className="muted">Loading questions...</p></div>;
  if (error && !questions.length) return <div className="page"><p className="alert alert-error">{error}</p></div>;

  if (result) {
    const traitLabels = {
      analytical: 'Analytical & Technical',
      social: 'Social & Helping',
      creative: 'Creative & Design',
      leadership: 'Leadership & Business',
    };
    return (
      <div className="page">
        <h1>Your results 🎉</h1>
        <p className="result-dominant">
          Dominant strength: <strong>{traitLabels[result.dominantTrait]}</strong>
        </p>
        <div className="trait-bars">
          {Object.entries(result.traitScores).map(([trait, score]) => (
            <div key={trait} className="trait-row">
              <span className="trait-label">{traitLabels[trait] || trait}</span>
              <div className="trait-bar-wrap">
                <div className="trait-bar" style={{ width: `${(score / 8) * 100}%` }} />
              </div>
              <span className="trait-score">{score}</span>
            </div>
          ))}
        </div>
        <h2>Recommended careers</h2>
        <div className="career-grid">
          {result.recommendedCareers.map((c) => (
            <Link key={c.slug} to={`/careers/${c.slug}`} className="career-card">
              <span className="career-icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.description.slice(0, 90)}...</p>
              <span className="salary">{c.salary_range}</span>
            </Link>
          ))}
        </div>
        <div className="hero-actions" style={{ marginTop: '2rem' }}>
          <Link to="/dashboard" className="btn btn-outline">
            Dashboard
          </Link>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setResult(null);
              setStep(0);
              setAnswers([]);
            }}
          >
            Retake assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page assessment-page">
      <h1>Career Assessment</h1>
      <p className="muted">
        Question {step + 1} of {questions.length} — honest answers dena
      </p>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {current && (
        <div className="question-card">
          <h2>{current.question_text}</h2>
          <div className="options">
            {OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`option-btn ${answers[step] === opt ? 'selected' : ''}`}
                onClick={() => selectAnswer(opt)}
              >
                {current[`option_${opt}`]}
              </button>
            ))}
          </div>
          <div className="question-nav">
            <button type="button" className="btn btn-outline" onClick={goBack} disabled={step === 0}>
              Back
            </button>
            <button type="button" className="btn btn-primary" onClick={goNext} disabled={submitting}>
              {submitting
                ? 'Submitting...'
                : step === questions.length - 1
                  ? 'See results'
                  : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
