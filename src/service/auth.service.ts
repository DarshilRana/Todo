import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../model/user.model'
import { EHttpCode, getMessage, HttpException } from '../utils'
class AuthService {
    constructor() { }

    public login = async (userEmail: string, password: string) => {
        try {
            const userData = await UserModel.findOne({ email: userEmail })
            if (!userData) {
                throw new HttpException(EHttpCode.BAD_REQUEST, getMessage("userNotFound"))
            }
            const isMatch = bcrypt.compare(password, userData.passwordHash)
            if (!isMatch) {
                throw new HttpException(EHttpCode.BAD_REQUEST, getMessage("incorrectEmailPassword"))
            }
            const token = await userData.generateAuthToken()
            if (token) return token

        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default new AuthService()