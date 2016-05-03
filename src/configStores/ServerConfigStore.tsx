/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { injectable } from 'inversify';
import { Store } from 'redux';
import { ConfigStore } from 'retax-utils';
import { retaxConfig } from 'retax-core';

import { IServerConfig } from './interfaces';

export const initialConfig: IServerConfig = {
  dynamicIndex: (app: JSX.Element, store: Store<any>): JSX.Element => <div>Hello</div>,
  retaxConfig,
  serverRendering: false,
  staticIndex: (): string => 'Hello',
};

@injectable()
export default class ServerConfigStore extends ConfigStore<IServerConfig> {
  constructor() {
    super();
    this.config = initialConfig;
  }
}
