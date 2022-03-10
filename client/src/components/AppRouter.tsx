import { Routes, Route, Navigate } from 'react-router-dom'
import {authRoutes, publicRoutes} from '../routes'
import {HOME_ROUTE} from '../utils/consts'
import React from 'react'


export const AppRouter = () => {
    const isAuth = false

    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) => {
                return <Route key={path} path={path} element={Component} />
            })}
            {publicRoutes.map(({path, Component}) => {
                return <Route key={path} path={path} element={Component} />
            })}
            <Route path="*" element={<Navigate to={HOME_ROUTE} />}/>
        </Routes>
    )
}
