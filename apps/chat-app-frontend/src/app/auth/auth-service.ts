import { makeRequest } from '@/api/api-client';
import { SignupPayload } from './signup/_model';
import { SigninPayload } from './signin/_model';
import { SIGNIN_ENDPOINT, SIGNUP_ENDPOINT } from './signup/constants';

export const signup = (payload: SignupPayload) => {
  return makeRequest({
    isPrivate: false,
    method: 'post',
    endpoint: SIGNUP_ENDPOINT,
    body: payload,
  });
};

export const signin = (payload: SigninPayload) => {
  return makeRequest({
    isPrivate: false,
    method: 'post',
    endpoint: SIGNIN_ENDPOINT,
    body: payload,
  });
};
