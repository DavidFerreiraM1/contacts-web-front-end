import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { ContactsState } from './ducks/contacts/types';

import rootReducer from './ducks/rootReducer';
import rootSagas from './ducks/rootSaga';

export interface ApplicationState {
    contacts: ContactsState;
}
const sagamiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagamiddleware));

sagamiddleware.run(rootSagas);

export default store;
