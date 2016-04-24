import { injectable } from 'inversify';
import { ConfigStore } from 'retax-utils';
import { retaxConfig } from 'retax-core';

import { IServerConfig } from './interfaces';

export const initialConfig: IServerConfig = {
  isomorphicTools: undefined,
  retaxConfig,
  serverRendering: true,
};

@injectable()
export default class ServerConfigStore extends ConfigStore<IServerConfig> {
  constructor() {
    super();
    this.config = initialConfig;
  }
}
