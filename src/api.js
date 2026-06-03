const API_BASE = '/api';

function getToken() {
  return localStorage.getItem('fp_token');
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const api = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request('/auth/me'),
  getCareers: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/careers${q ? `?${q}` : ''}`);
  },
  getCareerCategories: () => request('/careers/categories'),
  getCareer: (slug) => request(`/careers/${slug}`),
  getQuestions: () => request('/assessment/questions'),
  submitAssessment: (answers) =>
    request('/assessment/submit', { method: 'POST', body: JSON.stringify({ answers }) }),
  getAssessmentHistory: () => request('/assessment/history'),
  getResources: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/resources${q ? `?${q}` : ''}`);
  },
  getResource: (id) => request(`/resources/${id}`),
};
