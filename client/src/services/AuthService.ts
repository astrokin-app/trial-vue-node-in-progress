import axios from 'axios'
import VueJwtDecode from "vue-jwt-decode";

const API_URL = 'http://localhost:4000/'

class AuthService {
  async login(email: string, password: string) {
    const response = await axios
      .post(API_URL + 'login', {
        email, password
      })

    if (response.data.access_token) {
      try {
        const payload = VueJwtDecode.decode(response.data.access_token);

        localStorage.setItem('user', JSON.stringify(payload))

        return {
          username: payload.username, 
          email: payload.email,
          token: response.data.access_token
        }

      } catch (error) {
        console.log(error)
      }
    }

    //
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

      if (response.data.access_token) {
        try {
          const payload = VueJwtDecode.decode(response.data.access_token);

          localStorage.setItem('user', JSON.stringify(payload))
          
          return {
            username: payload.username, 
            email: payload.email,
            token: response.data.access_token
          }
  
        } catch (error) {
          console.log(error)
        }
      }

      //
  }
}

export default new AuthService();