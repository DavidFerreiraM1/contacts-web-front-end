import { IContact } from '../../../core/interfaces/ContactInterface';

/**
 * ACTIONS TYPES
 */
export enum ContactTypes {
  LOAD_REQUEST = '@contacts/LOAD_REQUEST',
  LOAD_SUCCESS = '@contacts/LOAD_SUCCESS',
  LOAD_FAILED = '@contacts/LOAD_FAILED'
}

/**
 * STATE TYPES
 */
export interface ContactsState {
  readonly list: IContact[];
  readonly loading: boolean;
  readonly error: boolean
}
