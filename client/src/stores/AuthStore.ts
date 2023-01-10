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

        let loginResult = await AuthService.login(user.email, user.password)
        if (loginResult.status == 200) {
          console.log(loginResult)
          this.user = loginResult.data
        } else {
            this.user = []
        }
        return loginResult.status
      },

      async register(user: User) {
        if (!user) return;

        let registerResult = await AuthService.register(user.username!, user.email, user.password)
        if (registerResult.status == 200) {
          console.log(registerResult)
          this.user = registerResult.data
        } else {
            this.user = []
        }
        return registerResult.status
      }
    }
})