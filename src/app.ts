import express, { Request, Response } from 'express';
import { connectDb } from './config/db'
import mainRouter from "./routes/index";
import { errorHandler, errorLogger } from './middleware/error.middleware';
import { scheduleFunction } from './utils';
class App {
  DB_URL = "localhost:127.0.0.1/"

  public express: express.Express;
  constructor() {
    this.express = express();
    this.express.disable("x-powered-by");
    this.mountRoutes()
    connectDb(this.DB_URL)
  }

  private mountRoutes(): void {
    this.express.use(express.json());
    this.express.use('/v1', mainRouter)
    this.express.use(errorLogger)
    this.express.use(errorHandler)
    scheduleFunction()
    this.express.get('/', (req: Request, res: Response) => {
      res.send('Hello from TypeScript + Express!');
    });
  }

}

export default new App().express;



