import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IUser} from '../../models/IUser'
import {userAPI} from '../../servicesAPI/UserService'
import {
  getAccessCookie,
  removeAccessCookie,
  removeRefreshCookie,
  setAccessCookie,
  setRefreshCookie
} from '../../utils/cookie'
import jwtDecode from 'jwt-decode'


interface UserState {
    user: IUser | {id: 0, login: '', email: '', role: ''}
    isLoading: boolean
    error: string,
    isAuth: boolean
    accessToken?: string
}

const initialState: UserState = {
    user: {id: 0, login: '', email: '', role: ''},
    isLoading: false,
    error: '',
    isAuth: false,
    accessToken: '',
}


export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        clearUser(state) {
            state.user = {id: 0, login: '', email: '', role: ''}
            state.isAuth = false
            state.accessToken = ''
            removeAccessCookie()
            removeRefreshCookie()
        },
        setUser: (state, action: PayloadAction<string>) => {
          state.accessToken = action.payload
          state.isAuth = true
          state.user = jwtDecode(`${getAccessCookie()}`)
        },
        tokenReceived: (state, {payload}) => {
          state.accessToken = payload.accessToken
          state.user = payload.user
          state.isAuth = true
          setAccessCookie(`${payload.accessToken}`)
          setRefreshCookie(`${payload.refreshToken}`)
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userAPI.endpoints.loginUser.matchFulfilled,
            (state, { payload }) => {
                state.accessToken = payload !== null ? payload.accessToken : ''
                state.user = payload !== null ? payload.user : {id: 0, login: '', email: '', role: ''}
                state.isAuth = payload !== null
              setAccessCookie(`${payload.accessToken}`)
              setRefreshCookie(`${payload.refreshToken}`)
            }
        )
      builder.addMatcher(
        userAPI.endpoints.logoutUser.matchFulfilled,
        () => {
          removeAccessCookie()
          removeRefreshCookie()
        }
      )
        builder.addMatcher(
            userAPI.endpoints.refreshUser.matchFulfilled,
            (state, { payload }) => {
                state.isAuth = payload !== null
                state.accessToken = payload !== null ? payload.accessToken : ''
                state.user = payload !== null ? payload.user : {id: 0, login: '', email: '', role: ''}
                setAccessCookie(`${payload.accessToken}`)
                setRefreshCookie(`${payload.refreshToken}`)
            }
        )
    },
})

export const {clearUser, setUser, tokenReceived} = userSlice.actions
export default userSlice.reducer
