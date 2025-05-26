import { UserModel } from "../model/user.model"
import { EHttpCode, getMessage, HttpException } from "../utils"
import bcrypt from 'bcrypt'
class UserService {
    constructor() { }

    public addUser = async (user: any) => {
        try {
            user.createdAt= user.updatedAt = Date.now()/1000 
            user.dueDate = new Date(user.dueDate * 1000)
            const userExist = await UserModel.findOne({email:user.email})
            if(userExist){
                throw new HttpException(EHttpCode.CONFLICT,getMessage("emailAlreadyExist"))
            }
            user.passwordHash = await bcrypt.hash(user.passwordHash.toString(),10)
            const data = await UserModel.create(user)
            return data
        } catch (error) {
            console.error("error while executing addUser() \n",error)
            throw error;
        }
    }
    
    public updateUser = async (user: any) => {
        try {
            if (!user.id) {
                throw new HttpException(EHttpCode.BAD_REQUEST, getMessage("dataNotFound"));
            }
    
            const userExist = await UserModel.findById(user.id);
            if (!userExist) {
                throw new HttpException(EHttpCode.NOT_FOUND, getMessage("userNotFound"));
            }
    
            const updateData: any = {
                ...user,
                updatedAt: Math.floor(Date.now() / 1000),
            };
    
            if (user.password) {
                updateData.passwordHash = await bcrypt.hash(user.password, 10);
                delete updateData.password;
            }
    
            const result = await UserModel.findByIdAndUpdate(user._id, updateData, { new: true });
            return result;
        } catch (error) {
            console.error("Error while executing updateUser():", error);
            throw error;
        }
    };

    public deleteUser = async (id: string) => {
        try {
            const userExist = await UserModel.findById(id);
            if (!userExist) {
                throw new HttpException(EHttpCode.NOT_FOUND, getMessage("userNotFound"));
            }
            await UserModel.findByIdAndDelete(id);
            return { message: getMessage("userDeleted") };
        } catch (error) {
            console.error("Error while executing deleteUser():", error);
            throw error;
        }
    };
    public getUser = async (id: string) => {
        try {
            const userExist = await UserModel.findById(id);
            if (!userExist) {
                throw new HttpException(EHttpCode.NOT_FOUND, getMessage("userNotFound"));
            }
            return userExist;
        } catch (error) {
            console.error("Error while executing getUser():", error);
            throw error;
        }
    }
    public getAllUser = async () => {
        try {
            const users = await UserModel.find({});
            if (!users || users.length === 0) {
                throw new HttpException(EHttpCode.NOT_FOUND, getMessage("dataNotFound"));
            }
            const mappedUsers = users.map(user => {
                return {
                    id: user._id,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                };
            });
            return mappedUsers;
        } catch (error) {
            console.error("Error while executing getAllUsers():", error);
            throw error;
        }
    }
}

export default new UserService();
