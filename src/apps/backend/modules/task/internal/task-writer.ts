import {
  CreateTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  Task,
  TaskWithNameExistsError,
} from '../types';

import TaskRepository from './store/task-repository';
import TaskReader from './task-reader';
import TaskUtil from './task-util';

export default class TaskWriter {
  public static async editInfo(params) {
    const editedInfo = await TaskRepository.userInfoDB.create({
      account: params.accountId,
      first_name: params.first_name,
      last_name: params.last_name,
      email: params.email,
      active: true,
      profile_img: params.profile_img,
    });

    return TaskUtil.convertEditInfoDBToInfo(editedInfo);
  }

  public static async createTask(params: CreateTaskParams): Promise<Task> {
    const existingTask = await TaskRepository.taskDB.findOne({
      account: params.accountId,
      name: params.name,
      active: true,
    });
    if (existingTask) {
      throw new TaskWithNameExistsError(params.name);
    }
    const createdTask = await TaskRepository.taskDB.create({
      account: params.accountId,
      name: params.name,
      active: true,
    });
    return TaskUtil.convertTaskDBToTask(createdTask);
  }

  public static async deleteTask(params: DeleteTaskParams): Promise<void> {
    const taskParams: GetTaskParams = {
      accountId: params.accountId,
      taskId: params.taskId,
    };
    const task = await TaskReader.getTaskForAccount(taskParams);
    await TaskRepository.taskDB.findOneAndUpdate(
      {
        _id: task.id,
      },
      {
        $set: {
          active: false,
        },
      },
    );
  }
}
