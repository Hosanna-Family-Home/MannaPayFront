import { atom } from 'recoil'

export type user = {
  userId: string | null;
  userPw: string | null;
  userPoint: number | null;
  userName: string | null;
  userFlag: string | null;
  loginFlag: boolean;
}

export const userState = atom<user>({
  key: 'userState',
  default: {
    userId: null,
    userPw: null,
    userPoint: null,
    userName: null,
    userFlag: null,
    loginFlag: false
  }
})
