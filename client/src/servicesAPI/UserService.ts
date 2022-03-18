import {
    createApi,
} from '@reduxjs/toolkit/dist/query/react'
import {
    ILoginUserReq,
    ILoginUserRes,
    ILogoutUserRes,
    IRefreshUserReq,
    IRefreshUserRes,
    IRegistrationUserReq,
    IRegistrationUserRes, IUser
} from '../models/IUser'
import { getRefreshCookie } from '../utils/cookie'
import { baseQueryWithReauth } from './UnauthorizedInterceptor'


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: (build) => ({
        loginUser: build.mutation<ILoginUserRes, ILoginUserReq>({
            query: (user) => ({
                url: `/user/login`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        registrationUser: build.mutation<IRegistrationUserRes, IRegistrationUserReq>({
            query: (user) => ({
                url: `/user/registration`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        logoutUser: build.mutation<ILogoutUserRes, string>({
            query: (user) => ({
                url: `/user/logout`,
                method: 'POST',
                body: user,
                headers: {
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: ['User']
        }),
        refreshUser: build.query<IRefreshUserRes, IRefreshUserReq>({
            query: () => ({
                url: `/user/refresh`,
                method: 'GET',
                headers: {
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            providesTags: result => ['User']
        }),
    })
})
