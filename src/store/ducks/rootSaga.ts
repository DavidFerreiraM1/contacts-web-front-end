import { all, takeLatest } from 'redux-saga/effects';

import { ContactTypes } from './contacts/types';
import { getList } from './contacts/sagas';

export default function* rootSagas() {
  return yield all([takeLatest(ContactTypes.LOAD_REQUEST, getList)]);
}
