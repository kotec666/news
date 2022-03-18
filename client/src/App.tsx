import React, {useEffect} from 'react'
import s from './App.module.scss'
import Navbar from './components/Navbar/Navbar'
import {AppRouter} from  './components/AppRouter'
import {useAppDispatch, useAppSelector} from './hooks/redux'
import {getAccessCookie, removeAccessCookie, setAccessCookie} from './utils/cookie'
import { setUser } from './store/reducers/UserSlice'

function App() {
    const dispatch = useAppDispatch()

    const {accessToken} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        const accessCookie = getAccessCookie()
        if(accessCookie)
            dispatch(setUser(accessCookie))
        console.log(accessCookie)
    }, [])

    useEffect(() => {
        console.log('Token refreshed')
        const authStatus = !!accessToken

        if(authStatus) {
            if (accessToken) {
                setAccessCookie(accessToken)
            } else {
                removeAccessCookie()
            }
        } else {
            removeAccessCookie()
        }
    }, [accessToken])
  return (
      <div className={s.App}>
          <div className={s.navBar}>
              <Navbar />
          </div>
          <div className={s.pageWrapper}>
              <AppRouter/>
          </div>
      </div>
  )
}

export default App
