import { createSlice } from '@reduxjs/toolkit'
import {INews} from '../../models/INews'
import {newsAPI} from '../../servicesAPI/NewsService'

interface NewsState {
    news: INews[] | [{id: 0, title: '', body: '', imageUrl: '', createdAt: '', updatedAt: '', userId: 0}]
    isLoading: boolean
    error: string,
}

const initialState: NewsState = {
    news: [{id: 0, title: '', body: '', imageUrl: '', createdAt: '', updatedAt: '', userId: 0}],
    isLoading: false,
    error: '',
}

export const newsSlice = createSlice({
    name:'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            newsAPI.endpoints.getAll.matchFulfilled,
            (state, { payload }) => {
                state.news = payload !== null ? payload : [{id: 0, title: '', body: '', imageUrl: '', createdAt: '', updatedAt: '', userId: 0}]
            }
        )
    },
})

export default newsSlice.reducer
