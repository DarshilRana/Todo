import { Router } from "express";
import userRoute from './user'
import authRoute from "./auth";
import listRouter from "./todo";

class MainRouter {
    public router: Router;

    constructor() {
        this.router = Router()
        this.Routes()
    }
    private Routes(): void {
        this.router.use("/", userRoute)
        this.router.use("/", authRoute)
        this.router.use("/",listRouter)
    }
}

export default new MainRouter().router;
