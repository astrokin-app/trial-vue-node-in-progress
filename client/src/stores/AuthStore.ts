import { defineStore } from 'pinia'
import { User } from '@/models/UsersModel'
import AuthService from '@/services/AuthService'

export type RootState = {
  user: User | undefined,
  loading: boolean
}

export const useAuthStore = defineStore({
  id: "authStore",
  state: () => 
    ({
      user: undefined,
      loading: false
    } as RootState),

    actions: {
      async login(user: User): Promise<User | undefined> {
        this.loading = !this.loading

        const currentUser = await AuthService.login(user.email, user.password!)

        if (currentUser && currentUser.email && currentUser.username && currentUser.token) {
          this.user = {email: currentUser.email, username: currentUser.username, token: currentUser.token }
        }

        return this.user
      },

      async register(user: User): Promise<User | undefined> {
        this.loading = !this.loading

        const currentUser = await AuthService.register(user.email, user.username!, user.password!)

        if (currentUser && currentUser.email && currentUser.username && currentUser.token) {
          this.user = {email: currentUser.email, username: currentUser.username, token: currentUser.token }
        }

        return this.user
      }
    }
})