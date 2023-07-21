import { NextFunction, Request, Response } from 'express';
import TaskService from '../task-service';
import {
  Task,
  CreateTaskParams,
  GetAllTaskParams,
  DeleteTaskParams,
  GetTaskParams,
} from '../types';
import cloudinary, { UploadApiResponse } from 'cloudinary';
import ConfigService from '../../config/config-service';
import TaskUtil from '../internal/task-util';
import DataURIParser from 'datauri/parser';

cloudinary.v2.config({
  cloud_name: ConfigService.getStringValue('cloudinary.verify.cloud_name'),
  api_key: ConfigService.getStringValue('cloudinary.verify.api_key'),
  api_secret: ConfigService.getStringValue('cloudinary.verify.api_secret'),
});

export default class TaskController {
  public static async editInfo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      let myCloudinary: UploadApiResponse;
      if (req.file) {
        const fileUri: DataURIParser = await TaskUtil.getDataUri(req.file);
        myCloudinary = await cloudinary.v2.uploader.upload(fileUri.content);
      }

      const params = {
        accountId: req.params.accountId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        profile_img: myCloudinary?.secure_url || null,
      };

      await TaskService.editInfo(params);
      res.status(201).send(`user info added successfully`);
    } catch (e) {
      next(e);
    }
  }

  public static async createTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: CreateTaskParams = {
        accountId: req.params.accountId,
        name: req.body.name as string,
      };
      const task: Task = await TaskService.createTask(params);
      res.status(201).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }
  }

  public static async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: DeleteTaskParams = {
        accountId: req.params.accountId,
        taskId: req.params.id,
      };
      await TaskService.deleteTask(params);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }

  public static async getAllTasks(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = +req.query.page;
      const size = +req.query.size;
      const params: GetAllTaskParams = {
        accountId: req.params.accountId,
        page,
        size,
      };
      const tasks = await TaskService.getTasksForAccount(params);
      res
        .status(200)
        .send(tasks.map((task) => TaskController.serializeTaskAsJSON(task)));
    } catch (e) {
      next(e);
    }
  }

  public static async getTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: GetTaskParams = {
        accountId: req.params.accountId,
        taskId: req.params.id,
      };
      const task = await TaskService.getTaskForAccount(params);
      res.status(200).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }
  }

  private static serializeTaskAsJSON(task: Task): unknown {
    return {
      id: task.id,
      account: task.account,
      name: task.name,
    };
  }
}
