import { Store } from 'redux';
import { IConfigStore } from 'retax-utils';
import { IRetaxConfig } from 'retax-core';

export interface IServerConfig {
  serverRendering?: boolean;
  staticIndex?: () => string;
  dynamicIndex?: (app: JSX.Element, store: Store<any>) => JSX.Element;
  retaxConfig?: IRetaxConfig;
}

export interface IServerConfigStore extends IConfigStore<IServerConfig> {}
