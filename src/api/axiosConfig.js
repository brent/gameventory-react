import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';

const gvAxios = axios.create();

gvAxios.interceptors.request.use((request) => {
    const token = localStorage.getItem('access');

    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }

    if (request.method === 'post') {
      request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    request.baseURL = BASE_URL;
    return request;
  }, (error) => {
    return Promise.reject(error);
  }
);

gvAxios.interceptors.response.use((response) => {
    return response;
  },
  (error) => {
    const resErr = error.response.data.error;
    const originalReq = error.config;
    originalReq._retry = false;

    if (resErr.statusCode === 401 && !originalReq._retry) {
      originalReq._retry = true;

      const refreshToken = localStorage.getItem('refresh');
      return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/auth/token`, { 'refreshToken': refreshToken })
          .then(res => {
            const newToken = res.data.token;
            localStorage.setItem('access', newToken)
            originalReq.headers['Authorization'] = `Bearer ${newToken}`;
            resolve(axios(originalReq));
          })
          .catch(err => {
            reject(new Error('could not refresh token'));
          });
      });
    }
  }
);

export default gvAxios;
