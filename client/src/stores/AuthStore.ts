import { defineStore } from 'pinia'
import { User } from '@/models/UsersModel'
import AuthService from '@/services/AuthService'

export type RootState = {
  user: User[],
  loading: bool
}

export const useAuthStore = defineStore({
  id: "authStore",
  state: () => 
    ({
      user: [],
      loading: false
    } as RootState),

    actions: {
      async login(user: User): Promise<User | undefined> {
        this.loading = !this.loading
        if (!user) return;

        const loginResult = await AuthService.login(user.email, user.password!)

        if (loginResult) {
          // @ts-ignore
          this.user = loginResult
        } else {
            this.user = []
        }

        return loginResult
      },

      async register(user: User): Promise<User | undefined> {
        this.loading = !this.loading
        if (!user) return;

        const registerResult = await AuthService.register(user.username!, user.email, user.password!)
        if (registerResult) {
          // @ts-ignore
          this.user = registerResult
        } else {
            this.user = []
        }

        return registerResult
      }
    }
})