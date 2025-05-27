import { Types } from "mongoose";

export interface ITodo {
  title: string;
  description: string;
  dueDate: any;
  completed: boolean;
  user: Types.ObjectId; // reference to the User who created it
  createdAt?: Number;
  updatedAt?: Number;
}
