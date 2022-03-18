import Cookies from 'js-cookie'

export const setAccessCookie = (token: string) => {
	removeAccessCookie()
	Cookies.set('accessToken', token)
}

export const getAccessCookie = () => {
	return Cookies.get('accessToken')
}

export const removeAccessCookie = () => {
	Cookies.remove('accessToken')
}


export const setRefreshCookie = (token: string) => {
	removeRefreshCookie()
	Cookies.set('refreshToken', token)
}

export const getRefreshCookie = () => {
	return Cookies.get('refreshToken')
}

export const removeRefreshCookie = () => {
	Cookies.remove('refreshToken')
}
