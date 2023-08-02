import { PhoneAccountDetails, Task, UserInfo } from '../types';

import { TaskDB, UserInfoDB } from './store/task-db';

import DataURIParser from 'datauri/parser';
import path from 'path';

export default class TaskUtil {
  public static convertEditInfoDBToInfo(infoDb: UserInfoDB): UserInfo {
    const info = new UserInfo();
    info.id = infoDb._id.toString();
    info.account = infoDb.account.toString();
    info.first_name = infoDb.first_name;
    info.last_name = infoDb.last_name;
    info.email = infoDb.email;
    info.profile_img = infoDb.profile_img;

    return info;
  }

  public static convertPhoneAccountDetails(
    dbAccountDetails: UserInfoDB,
  ): PhoneAccountDetails {
    const accountDetails = new PhoneAccountDetails();
    accountDetails.id = dbAccountDetails._id.toString();
    accountDetails.first_name = dbAccountDetails.first_name;
    accountDetails.last_name = dbAccountDetails.last_name;
    accountDetails.email = dbAccountDetails.email;
    accountDetails.profile_img = dbAccountDetails.profile_img;

    return accountDetails;
  }

  public static convertTaskDBToTask(taskDb: TaskDB): Task {
    const task = new Task();
    task.id = taskDb._id.toString();
    task.account = taskDb.account.toString();
    task.name = taskDb.name;
    return task;
  }

  public static async getDataUri(
    file: Express.Multer.File,
  ): Promise<DataURIParser> {
    const parser = new DataURIParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
  }
}
