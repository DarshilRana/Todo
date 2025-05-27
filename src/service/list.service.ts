import { TodoModel } from "../model/todo.model";
import { EHttpCode, getMessage, HttpException } from "../utils";
import { ITodo } from "../utils";

class ListService {
  constructor() {}

  public addList = async (listData: ITodo) => {
    try {
      if (!listData) {
        throw new HttpException(EHttpCode.BAD_REQUEST, getMessage("dataNotFound"));
      }
      listData.createdAt = listData.updatedAt = Math.floor(Date.now() / 1000);
      listData.dueDate = new Date(listData.dueDate * 1000);

      const result = await TodoModel.create(listData);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add list");
    }
  };

  public getList = async (list: any) => {
    try {
      if (!list || !list._id) {
        throw new HttpException(EHttpCode.BAD_REQUEST, getMessage("dataNotFound"));
      }
      const result = await TodoModel.findOne({ _id: list._id, user: list.user });
      if (!result) {
        throw new HttpException(EHttpCode.NOT_FOUND, getMessage("dataNotFound"));
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to retrieve list");
    }
  };
  // write a method to delete list by id
  public deleteList = async (listId: string, userId: string) => {
    try {
      const result = await TodoModel.deleteOne({ _id: listId, user: userId });
      if (result.deletedCount === 0) {
        throw new HttpException(EHttpCode.NOT_FOUND, getMessage("dataNotFound"));
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete list");
    }
  };

  public getAllList = async (userId: string) => {
    try {
      if (!userId) {
        throw new HttpException(EHttpCode.BAD_REQUEST, getMessage("dataNotFound"));
      }
      const result = await TodoModel.find({ user: userId });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to retrieve all lists");
    }
  };
  public updateList = async (listId: string, list: any) => {
    try {
      const result = await TodoModel.findOneAndUpdate({ _id: listId }, list, { new: true, runValidators: true });
      console.log("result ", result);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update the todo list");
    }
  };
}

export default new ListService();
