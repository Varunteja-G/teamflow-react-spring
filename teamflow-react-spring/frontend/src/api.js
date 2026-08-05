const API_URL = '/api/tasks';

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'The request could not be completed.');
  }

  return response.status === 204 ? null : response.json();
}

export const taskApi = {
  list(filters = {}) {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => value && query.set(key, value));
    return request(`${API_URL}?${query}`);
  },
  stats: () => request(`${API_URL}/stats`),
  create: (task) => request(API_URL, { method: 'POST', body: JSON.stringify(task) }),
  update: (id, task) => request(`${API_URL}/${id}`, { method: 'PUT', body: JSON.stringify(task) }),
  remove: (id) => request(`${API_URL}/${id}`, { method: 'DELETE' })
};
