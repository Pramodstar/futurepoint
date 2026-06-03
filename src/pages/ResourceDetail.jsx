import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';

export default function ResourceDetail() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    api.getResource(id).then(({ resource: r }) => setResource(r));
  }, [id]);

  if (!resource) return <div className="page"><p className="muted">Loading...</p></div>;

  return (
    <article className="page article-page">
      <Link to="/resources" className="back-link">← All guides</Link>
      <span className="badge">{resource.category}</span>
      <h1>{resource.title}</h1>
      <p className="article-meta">{resource.read_time_min} min read</p>
      <div className="article-body">
        {resource.content.split('\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
