import {createConstants} from '../utils/reduxUtils';

export const actionConstants = createConstants(
  'REQUEST',
  'REQUEST_SUCCESS',
  'REQUEST_FAIL',
  'SIGN_IN',
  'SIGN_OUT',
  'SIGN_IN_SUCCESS',
  'SIGN_IN_FAIL',
  'SIGN_OUT_SUCCESS',
  'SIGN_OUT_FAILE'
);
