import axios from 'axios';

const apiCodeBurger = axios.create({
  baseURL: 'https://codeburger-production-f8a0.up.railway.app/'
});

// Interceptor de requisição para adicionar o token de autenticação
apiCodeBurger.interceptors.request.use(async config => {
  const userData = await localStorage.getItem('codeburger:userData');
  console.log('User Data:', userData); // Log do userData
  const token = userData && JSON.parse(userData).token;
  console.log('Token:', token); // Log do token
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  // Handle request error
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// Interceptor de resposta para capturar erros
apiCodeBurger.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error.message || error);
    return Promise.reject(error);
  }
);

export default apiCodeBurger;
