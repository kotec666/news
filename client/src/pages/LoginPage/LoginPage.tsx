import React, {useEffect, useState} from 'react'
import s from './LoginPage.module.scss'
import {Navigate, useLocation} from 'react-router-dom'
import {HOME_ROUTE, LOGIN_ROUTE} from '../../utils/consts'
import {userAPI} from '../../servicesAPI/UserService'
import {useAppSelector} from '../../hooks/redux'
import {ILoginUserReq, IRegistrationUserReq} from '../../models/IUser'

const LoginPage = () => {
    const [regError, setRegError] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    const location = useLocation()

    const {isAuth} = useAppSelector(state => state.userReducer)
    const [loginUser, { isLoading: isLoadingLogin }] = userAPI.useLoginUserMutation()
    const [registrationUser, { isLoading: isLoadingRegistration }] = userAPI.useRegistrationUserMutation()

    useEffect(() => {
        const currentPath = location.pathname.split('/')

        if (currentPath[1] === LOGIN_ROUTE.slice(1)) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [location])


    const authorizeHandler =  async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            setRegError('')
            if (isLogin) {
                await loginUser({login, password} as ILoginUserReq).unwrap()
            } else {
                await registrationUser({login, password, email} as IRegistrationUserReq).unwrap()
                await loginUser({login, password} as ILoginUserReq).unwrap()
            }
        } catch (e) {
            setRegError(e.data.message)
        }
    }

    if (isAuth === true) {
        return (
            <Navigate to={HOME_ROUTE} />
        )
    }

    return (
        <div className={s.authPageWrapper}>
            <div className={s.wrapper}>
                <div className={s.actionText}>
                    {isLogin ? <span>Вход</span> : <span>Регистрация</span>}
                </div>
                <form onSubmit={authorizeHandler} className={s.formWrapper}>
                    {regError && <div style={{color: 'red'}}>{regError}</div>}
                    <div className={s.inputWrapper}>
                        <label htmlFor="login">
                            Логин
                        </label>
                        <input id={'login'} type="text" value={login}  onChange={(e) => setLogin(e.target.value)} />
                    </div>
                    <div className={s.inputWrapper}>
                        {
                            !isLogin && <> <label htmlFor="email">
                                email
                            </label>
                                <input id={'email'} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </>
                        }
                    </div>
                    <div className={s.inputWrapper}>
                        <label htmlFor="password">
                            Пароль
                        </label>
                        <input id={'password'} type="password" value={password}  onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {
                        isLogin ? <button type="submit" className={s.authBtn} disabled={isLoadingLogin} >Вход</button>
                            : <button type="submit" className={s.authBtn} disabled={isLoadingRegistration} >Регистрация</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default LoginPage
