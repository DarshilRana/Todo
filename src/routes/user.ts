import { Router } from "express";
import { addUser, deleteUser, getAllUser, getUser, updateUser } from "../conrtoller/user.controller";
import { successResponse } from "../middleware/success.middleware";
import { validateUser } from "../middleware/validate.middleware";


class UserRouter{
    public router:Router
    constructor(){
        this.router = Router()
        this.mountRoutes();
    }
    private mountRoutes():void{
        this.router.post("/user",addUser,successResponse)
        this.router.put("/user/:id",validateUser,updateUser,successResponse)
        this.router.delete("/user/:id",validateUser,deleteUser,successResponse)
        this.router.get("/user",validateUser,getAllUser,successResponse)
        this.router.get("/user/:id",validateUser,getUser ,successResponse)
    }
}
export default new UserRouter().router;
