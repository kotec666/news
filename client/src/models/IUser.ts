export interface IUser {
    id: number
    login: string
    email: string
    role: string
    refreshToken?: string
    accessToken?: string
    user: IUser
}


//запрос на сервер
export interface ILoginUserReq {
    login: string
    password: string
}


//ответ от сервера
export interface ILoginUserRes {
    accessToken: string
    refreshToken: string
    user: IUser
}

//запрос на сервер
export interface IRegistrationUserReq {
    login: string
    password: string
    email: string
}


//ответ от сервера
export interface IRegistrationUserRes {
    accessToken: string
    refreshToken: string
    user: IUser
}


//ответ от сервера
export interface IRefreshUserRes {
    accessToken: string
    refreshToken: string
    user: IUser
}

//запрос на сервер
export interface IRefreshUserReq {
    accessToken: string
    refreshToken: string
    user: IUser
}

//ответ от сервера
export interface ILogoutUserRes {
    number: number
}

