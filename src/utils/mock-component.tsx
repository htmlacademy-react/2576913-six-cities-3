import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { RootState } from '../types/store';
import { createAPI } from '../services/api';
import { AppThunkDispatch } from './mocks';
import { MemoryRouter } from 'react-router-dom';

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<RootState> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}

export function withRouter(children: JSX.Element): JSX.Element {
  return (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );
}
