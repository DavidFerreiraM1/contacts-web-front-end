/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import ContactService from '../../../core/services/ContactService';
import { loadSuccess, loadFailed } from './actions';
import Response from '../../../resources/utils/Response';

export function* getList() {
  const result: Response<any> = yield ContactService.getList();
  const { data, success } = result;
  if (success) yield put(loadSuccess(data));
  else yield put(loadFailed());
}
