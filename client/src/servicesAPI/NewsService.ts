import {
    createApi,
} from '@reduxjs/toolkit/dist/query/react'
import {INews} from '../models/INews'
import {getAccessCookie, getRefreshCookie} from '../utils/cookie'
import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {clearUser, tokenReceived} from '../store/reducers/UserSlice'


const baseQuery = fetchBaseQuery({baseUrl: `http://localhost:5000/api`, prepareHeaders(headers) {return headers}, credentials: 'include'})
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
    > = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult = await baseQuery('/user/refresh', api, extraOptions)
        if (refreshResult.data) {
            // store the new token
            api.dispatch(tokenReceived(refreshResult.data as string))
            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(clearUser())
        }
    }
    return result
}


export const newsAPI = createApi({
    reducerPath: 'newsAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['News'],
    endpoints: (build) => ({
        getAll: build.query<INews[], ''>({
            query: (user) => ({
                url: `/news/get`,
                method: 'GET',
            }),
            providesTags: ['News']
        }),
        deleteNews: build.mutation<INews, { newsId: number }>({
            query: (news) => ({
                url: `/news/delete`,
                method: 'DELETE',
                body: news,
                headers: {
                    Authorization: `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: ['News']
        }),
        updateNews: build.mutation<INews, FormData>({
            query: (news) => ({
                url: `/news/change`,
                method: 'PUT',
                body: news,
                headers: {
                    Authorization: `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: ['News']
        }),
        createNews: build.mutation<INews, FormData>({
            query: (news) => ({
                url: `/news/add`,
                method: 'POST',
                body: news,
                headers: {
                    Authorization: `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: result => ['News']
        }),
    })
})
