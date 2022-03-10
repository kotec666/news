import React from 'react'
import LoginPage from './pages/LoginPage/LoginPage'
import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
} from './utils/consts'
import NewsPage from './pages/NewsPage/NewsPage'


export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: <NewsPage />
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: <NewsPage />
    },
    {
        path: LOGIN_ROUTE,
        Component: <LoginPage />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <LoginPage />
    },
]
