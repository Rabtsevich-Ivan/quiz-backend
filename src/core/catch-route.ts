import { Request, Response, NextFunction } from 'express';
import { sendError } from './response-helper';

// eslint-disable-next-line
export const catchRoute = (routeHandler: (req: Request, res: Response, next: NextFunction) => Promise<void> | void): any =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await routeHandler(req, res, next);
    } catch (e) {
      console.error(e);
      sendError(res, 'Something went wrong', 500);
    }
  };
