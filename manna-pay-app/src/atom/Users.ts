import { atom } from 'recoil'

export type user = {
  userId: string
  userPw: string
}

export const userState = atom<user>({
  key: 'userState',
  default: {
    userId: '',
    userPw: ''
  }
})
