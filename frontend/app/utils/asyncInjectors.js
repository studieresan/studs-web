import { conformsTo, isEmpty, isFunction, isObject, isString } from 'lodash';
import invariant from 'invariant';
import warning from 'warning';
import createReducer from 'reducers';

/**
 * Validate the shape of redux store
 */
export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    asyncReducers: isObject,
  };
  invariant(
    conformsTo(store, shape),
    '(app/utils...) asyncInjectors: Expected a valid redux store'
  );
}

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name) && isFunction(asyncReducer),
      '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
    );

    if (Reflect.has(store.asyncReducers, name)) return;

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
  };
}
