jest.unmock('inversify');
jest.unmock('retax-utils');
jest.unmock('retax-core');

jest.unmock('../ServerConfigStore');

import { retaxConfig } from 'retax-core';
import ServerConfigStore from '../ServerConfigStore';

describe('ServerConfigStore', () => {
  it('set the default config', () => {
    const store = new ServerConfigStore();

    expect(store.config.retaxConfig).toEqual(retaxConfig);
    expect(store.config.serverRendering).toEqual(false);
  });
});
