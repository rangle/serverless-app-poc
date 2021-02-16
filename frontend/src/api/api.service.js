export const apiClient = (url, token, { body, ...customConfig } = {}) => {
  const headers = { 'content-type': 'application/json' };
  if (token) {
    headers.Authorization = token;
  }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return window
    .fetch(url, config)
    .then(async response => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}
