jest.unmock('inversify');
jest.unmock('../StaticMiddlewareFactory');

import StaticMiddlewareFactory from '../StaticMiddlewareFactory';

describe('StaticMiddlewareFactory', () => {
  // serverConfigStore mock
  const serverConfigStore = {
    config: {
      staticIndex: (): string => 'Hey',
    },
  };

  it('creates a middleware and respond to a request', () => {
    const factory = new StaticMiddlewareFactory(
      <any>serverConfigStore
    );
    const middleware = factory.create();

    // express mock
    const send = jest.fn();
    const res = {
      send,
    };
    const next = jest.fn();

    middleware(undefined, <any>res, <any>next);

    expect(send).toBeCalledWith('Hey');
  });

  it('creates a middleware and handle error', () => {
    const factory = new StaticMiddlewareFactory(
      <any>serverConfigStore
    );
    const middleware = factory.create();

    // express mock
    const send = jest.fn();
    const status = jest.fn(() => ({
      send,
    }));
    const res = {
      status,
    };
    const next = jest.fn();

    middleware(undefined, <any>res, <any>next);
    expect(next).toBeCalled();
  });
});
