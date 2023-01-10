import axios from 'axios'

const API_URL = 'http://localhost:4000/'

class AuthService {
  async login(email: string, password: string) {
    const response = await axios
      .post(API_URL + 'login', {
        email, password
      })
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  }

  logout() {
    localStorage.removeItem('user')
  }

  async register(username: string, email: string, password: string) {
    const response = await axios
      .post(API_URL + 'register', {
        username,
        email,
        password
      })
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  }
}

export default new AuthService();