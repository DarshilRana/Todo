import { Router } from "express";
import { successResponse } from "../middleware/success.middleware";
import { validateUser } from "../middleware/validate.middleware";
import { addList, deleteList, getList, getallList, updateList } from "../conrtoller/list.controller";

class ListRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.mountRoutes();
  }
  private mountRoutes(): void {
    this.router.post("/list", validateUser, addList, successResponse);
    this.router.put("/list/:id", validateUser, updateList, successResponse);
    this.router.delete("/list/:id", validateUser, deleteList, successResponse);
    this.router.get("/list", validateUser, getallList, successResponse);
    this.router.get("/list/:id", validateUser, getList, successResponse);
  }
}
export default new ListRouter().router;
