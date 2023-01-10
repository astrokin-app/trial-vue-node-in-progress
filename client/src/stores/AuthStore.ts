import { defineStore } from 'pinia'
import { User } from '@/models/UsersModel'
import AuthService from '@/services/AuthService'

export type RootState = {
  user: User[]
}

export const useAuthStore = defineStore({
  id: "authStore",
  state: () => 
    ({
      user: [],
    } as RootState),

    actions: {
      async login(user: User) {
        if (!user) return;

        const loginResult = await AuthService.login(user.email, user.password)
        if (loginResult) {
          this.user = loginResult
        } else {
            this.user = []
        }
        return loginResult
      },

      async register(user: User) {
        if (!user) return;

        const registerResult = await AuthService.register(user.username!, user.email, user.password)
        if (registerResult) {
          this.user = registerResult
        } else {
            this.user = []
        }
        return registerResult
      }
    }
})