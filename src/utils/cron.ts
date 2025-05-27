import { schedule } from "node-cron";
import { TodoModel } from "../model/todo.model";

export function scheduleFunction(): void {
  console.log("schedule started");
  schedule("* * */23 * * *", async () => {
    // fetch all the data from the user table a
    try {
      const now = new Date();
      const result = await TodoModel.updateMany(
        {
          dueDate: { $lt: now },
          completed: false,
        },
        {
          $set: {
            completed: true,
            updatedAt: Date.now(),
          },
        }
      );
    } catch (error) {}
  });
}
