import { User } from '@/models/UsersModel';
import axios from 'axios'
import VueJwtDecode from "vue-jwt-decode";

const API_URL = 'http://localhost:3009/'

class AuthService {
  async login(email: string, password: string): Promise<User | undefined> {
    const response = await axios
      .post(API_URL + 'login', {
        email, password
      })

    if (response.data.access_token) {
        const payload = VueJwtDecode.decode(response.data.access_token);
        // Use cookie instead
        localStorage.setItem('user', JSON.stringify(payload))

        const user:User = {
          email: payload.email,
          username: payload.username, 
          token: response.data.access_token
        }

        return user
    }
    //
  }

  async register(email: string, username: string, password: string): Promise<User | undefined> {
    const response = await axios
      .post(API_URL + 'register', {
        username,
        email,
        password
      })

      if (response.data.access_token) {
          const payload = VueJwtDecode.decode(response.data.access_token);
          // Use cookie instead
          localStorage.setItem('user', JSON.stringify(payload))

          const user:User = {
            email: payload.email,
            username: payload.username, 
            token: response.data.access_token
          }
  
          return user
      }
  }

  logout() {
    localStorage.removeItem('user')
  }

}

export default new AuthService();