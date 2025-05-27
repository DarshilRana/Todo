import { model, Schema, Types } from "mongoose";
import { ITodo } from "../utils";

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  { timestamps: true }
);

// 3. Create and export the Todo model
export const TodoModel = model<ITodo>("Todo", todoSchema);
