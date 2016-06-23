import { KernelModule, interfaces } from 'inversify';

import { IServerBootstrapper, ServerBootstrapper } from '../../bootstrap';
import { IServerConfigStore, ServerConfigStore } from '../../configStores';
import { IRetaxMiddlewareFactory, StaticMiddlewareFactory, RenderingMiddlewareFactory } from '../../middlewares';

import {
  SERVER_BOOTSTRAPPER,
  SERVER_CONFIG_STORE,
  MIDDLEWARE_FACTORY,
} from '../identifiers';

export default new KernelModule((bind: interfaces.Bind) => {
  bind<IServerBootstrapper>(SERVER_BOOTSTRAPPER).to(ServerBootstrapper);

  bind<IServerConfigStore>(SERVER_CONFIG_STORE).to(ServerConfigStore).inSingletonScope();
});

export function middlewareFactoryModuleFactory(serverRendering: boolean): interfaces.KernelModule {
  return new KernelModule((bind: interfaces.Bind) => {
    if (serverRendering) {
      bind<IRetaxMiddlewareFactory>(MIDDLEWARE_FACTORY).to(RenderingMiddlewareFactory);
    } else {
      bind<IRetaxMiddlewareFactory>(MIDDLEWARE_FACTORY).to(StaticMiddlewareFactory);
    }
  });
}
