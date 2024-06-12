import axios from 'axios'

const apiCodeBurger = axios.create({
  baseURL: 'https://codeburger-production-f8a0.up.railway.app/'
})
apiCodeBurger.interceptors.request.use(async config => {
  const userData = await localStorage.getItem('codeburger:userData')
  console.log('User Data:', userData)
  const token = userData && JSON.parse(userData).token
  console.log('Token:', token)
  config.headers.authorization = `Bearer ${token}`
  return config
})
export default apiCodeBurger
