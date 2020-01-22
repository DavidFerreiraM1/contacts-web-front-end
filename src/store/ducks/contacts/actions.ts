import { action } from 'typesafe-actions';
import { ContactTypes } from './types';
import { IContact } from '../../../core/interfaces/ContactInterface';

export const loadRequest = () => action(ContactTypes.LOAD_REQUEST);
export const loadSuccess = (data: IContact[]) => action(ContactTypes.LOAD_SUCCESS, data);
export const loadFailed = () => action(ContactTypes.LOAD_FAILED);
