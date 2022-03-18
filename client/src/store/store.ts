import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {userAPI} from '../servicesAPI/UserService'
import {newsAPI} from '../servicesAPI/NewsService'
import userReducer from './reducers/UserSlice'
import newsReducer from './reducers/NewsSlice'

const rootReducer = combineReducers({
    userReducer,
    newsReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [newsAPI.reducerPath]: newsAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(
            userAPI.middleware,
            newsAPI.middleware,
        ))
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
