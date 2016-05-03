(jest as any).disableAutomock();

jest.mock('react-dom/server');

/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import RenderingMiddlewareFactory from '../RenderingMiddlewareFactory';

describe('RenderingMiddlewareFactory Flow', () => {
  // serverConfig mock
  const retaxConfig = {
    lifecycle: {},
  };
  const serverConfig = {
    config: {
      dynamicIndex: (app, store): JSX.Element => <div>Hey</div>,
      retaxConfig,
    },
  };

  // kernelMediator mock
  const run = jest.fn();
  const getService = jest.fn(() => ({
    run,
  }));
  const kernelMediator = {
    create: jest.fn(() => ({
      getService,
    })),
    reload: jest.fn(),
  };

  pit('controls the bootstrapping process', async () => {
    const factory = new RenderingMiddlewareFactory(
      serverConfig as any,
      kernelMediator as any
    );

    const middleware = factory.create();

    // express mock
    const send = jest.fn();
    const req = {
      originalUrl: '/home',
    };
    const res = {
      send,
    };
    const next = jest.fn();

    await middleware(req as any, res as any, next as any);

    expect(kernelMediator.create).toBeCalled();
    expect(kernelMediator.reload).toBeCalled();
    expect(res.send).toBeCalled();
  });
});
