(jest as any).disableAutomock();

jest.mock('react-helmet');

/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { renderToString } from 'react-dom/server';
import { Kernel } from 'inversify';
import { diModule } from 'retax-di';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { IServerBootstrapper } from '../bootstrap';
import { serverModule, middlewareFactoryModuleFactory, SERVER_BOOTSTRAPPER } from '../inversify';

describe('Retax Server', () => {

  const About = connect(state => {
    return {
      counter: state.counter,
    };
  })(
    (props) => <div>Hello About! {`TheCounterValue${props.counter}`}</div>
  );

  function counterReducer(state: number = 0, action: any): number {
    switch (action.type) {
      case 'INC':
        return state + 1;
      default:
        return state;
    }
  }

  const retaxConfig = {
    lifecycle: undefined,
    react: {
      appendChild: undefined,
    },
    router: {
      static: (
        <Route path="/">
          <Route path="about" component={About}/>
        </Route>
      ),
    },
    store: {
      reducers: {
        counter: counterReducer,
      },
    },
  };

  const serverConfig = {
    dynamicIndex: (app, store): JSX.Element => {
      const content = renderToString(app);

      return (
        <div
          id="root"
          className="flex layout vertical"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    },
    retaxConfig,
    serverRendering: undefined,
    staticIndex: (): string => 'Hey Static',
  };

  pit('bootstraps a retax on server without server rendering', async () => {
    const kernel = new Kernel();
    kernel.load(diModule, serverModule, middlewareFactoryModuleFactory(false));
    const bootstrapper = kernel.get<IServerBootstrapper>(SERVER_BOOTSTRAPPER);

    bootstrapper.config(serverConfig as any);
    const middleware = bootstrapper.bootstrap();

    // express mock
    const send = jest.fn();
    const req = {
      originalUrl: '/home',
    };
    const res = {
      send,
    };
    const next = jest.fn();

    middleware(req as any, res as any, next as any);

    expect(res.send).toBeCalledWith('Hey Static');
  });

  pit('bootstraps a retax on server with server rendering', async () => {
    const kernel = new Kernel();
    kernel.load(diModule, serverModule, middlewareFactoryModuleFactory(true));
    const bootstrapper = kernel.get<IServerBootstrapper>(SERVER_BOOTSTRAPPER);

    bootstrapper.config(serverConfig as any);
    const middleware = bootstrapper.bootstrap();

    // express mock
    const send = jest.fn();
    const req = {
      cookies: jest.fn(() => '1234'),
      originalUrl: '/about',
    };
    const res = {
      send,
    };
    const next = jest.fn();

    await middleware(req as any, res as any, next as any);

    expect(res.send.mock.calls[0][0]).toContain('Hello About!');
    expect(res.send.mock.calls[0][0]).toContain('TheCounterValue0');
  });
});
