import { Router } from "express";
import { successResponse } from "../middleware/success.middleware";
import { login } from "../conrtoller/auth.controller";

class AuthRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.mountRoutes();
  }
  private mountRoutes(): void {
    this.router.post("/login", login, successResponse);
  }
}
export default new AuthRouter().router;
