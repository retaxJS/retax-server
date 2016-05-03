import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { IRetaxMiddlewareFactory, IRetaxMiddleware } from './interfaces';

import { IServerConfigStore } from '../configStores';
import {
  SERVER_CONFIG_STORE,
} from '../inversify/identifiers';

@injectable()
export default class StaticMiddlewareFactory implements IRetaxMiddlewareFactory {
  constructor(
    @inject(SERVER_CONFIG_STORE) private _serverConfigStore: IServerConfigStore
  ) {}

  public create(): IRetaxMiddleware {
    const markup = this._serverConfigStore.config.staticIndex();

    return (req: Request, res: Response, next: NextFunction) => {
      try {
        res.send(markup);
      } catch (e) {
        next(e);
      }
    };
  }
}
