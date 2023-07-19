import bodyParser from 'body-parser';
import express, { Application } from 'express';
import ErrorHandler from '../../error/error-handler';
import TaskRepository from '../internal/store/task-repository';
import TaskRouter from './task-router';
import multer from 'multer';

export default class TaskRESTApiServer {
  public static async create(): Promise<Application> {
    const upload = multer({
      storage: multer.memoryStorage(),
      fileFilter: (_req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png']; // Add any other allowed mime types.
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type.'));
        }
      },
    });

    await TaskRepository.createDBConnection();

    const app = express();
    // app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(
      '/accounts/:accountId/tasks',
      upload.single('profile_img'),
      TaskRouter.getRoutes(),
    );

    app.use(ErrorHandler.AppErrorHandler);

    return Promise.resolve(app);
  }
}
