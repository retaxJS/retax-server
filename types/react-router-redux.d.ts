// Type definitions for react-router-redux v4.0.0
// Project: https://github.com/rackt/react-router-redux
// Definitions by: Isman Usoh <http://github.com/isman-usoh>, Noah Shipley <https://github.com/noah79>, Dimitri Rosenberg <https://github.com/rosendi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


declare module "react-router-redux" {
  import { Store, Reducer, Middleware } from 'redux';

  import H = HistoryModule;

  const CALL_HISTORY_METHOD: string;
  const LOCATION_CHANGE: string;

  const push: PushAction;
  const replace: ReplaceAction;
  const go: GoAction;
  const goBack: GoForwardAction;
  const goForward: GoBackAction;
  const routerActions: RouteActions;

  type LocationDescriptor = H.Location | H.Path;
  type PushAction = (nextLocation: LocationDescriptor) => RouterAction;
  type ReplaceAction = (nextLocation: LocationDescriptor) => RouterAction;
  type GoAction = (n: number) => RouterAction;
  type GoForwardAction = () => RouterAction;
  type GoBackAction = () => RouterAction;

  type RouterAction = {
      type: string
      payload?: any
  }

  interface RouteActions {
      push: PushAction;
      replace: ReplaceAction;
      go: GoAction;
      goForward: GoForwardAction;
      goBack: GoBackAction;
  }
  interface ReactRouterReduxHistory extends H.History {
      unsubscribe(): void;
  }

  interface DefaultSelectLocationState extends Function {
      (state: any): any;
  }

  interface SyncHistoryWithStoreOptions {
      selectLocationState?: DefaultSelectLocationState;
      adjustUrlOnReplay?: boolean;
  }

  function routerReducer(state?: any, options?: any): Reducer<any>;
  function syncHistoryWithStore(history: H.History, store: Store<any>, options?: SyncHistoryWithStoreOptions): ReactRouterReduxHistory;
  function routerMiddleware(history: H.History): Middleware;
}
