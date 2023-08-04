import mongoose, { CallbackError, Connection } from 'mongoose';

import ConfigService from '../../../config/config-service';

import { TaskDB, UserInfoDB, taskDbSchema, userInfoDBSchema } from './task-db';

export default class TaskRepository {
  public static taskDB: mongoose.Model<TaskDB>;
  public static userInfoDB: mongoose.Model<UserInfoDB>;

  static async createDBConnection(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      const mongoURI = ConfigService.getStringValue('mongoDb.uri');
      mongoose.createConnection(
        mongoURI,
        {},
        (error: CallbackError, result: Connection): void => {
          if (error) {
            reject(error);
          } else {
            TaskRepository.userInfoDB = result.model(
              'User_Information',
              userInfoDBSchema,
            ) as mongoose.Model<UserInfoDB>;
            TaskRepository.taskDB = result.model(
              'Task',
              taskDbSchema,
            ) as unknown as mongoose.Model<TaskDB>;
            resolve(result);
          }
        },
      );
    });
  }
}
