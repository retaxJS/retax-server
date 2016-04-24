import { IConfigStore } from 'retax-utils';
import { IRetaxConfig, IIsomorphicTools } from 'retax-core';

export interface IServerConfig {
  serverRendering?: boolean;
  isomorphicTools?: IIsomorphicTools;
  retaxConfig?: IRetaxConfig;
}

export interface IServerConfigStore extends IConfigStore<IServerConfig> {}
