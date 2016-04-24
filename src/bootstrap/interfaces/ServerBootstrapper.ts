import { IBootstrapper } from 'retax-utils';

import { IServerConfig } from '../../configStores';
import { IRetaxMiddleware } from '../../middlewares';

export interface IServerBootstrapper extends IBootstrapper<
  IServerConfig,
  void,
  IRetaxMiddleware
> {}
