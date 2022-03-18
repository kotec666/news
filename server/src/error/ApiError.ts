interface IBadReq {
  status: number
  message: string
}

class ApiError {
  status: number
  message: string

    constructor(status: number, message: string) {
        this.status = status
        this.message = message
    }

    static unauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static badRequest(message: string): IBadReq {
        return new ApiError(400, message)
    }

    static internal(message: string, errors = []) {
        return new ApiError(500, message)
    }

    static forbidden(message: string, errors = []) {
        return new ApiError(403, message)
    }


}

export default ApiError
