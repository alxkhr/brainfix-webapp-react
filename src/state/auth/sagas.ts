import { AnyAction } from 'redux';
import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';

import { serverUrl } from '../../api/config';
import { LOG_OUT, LOGGED_IN } from './actions';

export function* requestToken(action: AnyAction): Iterator<CallEffect | PutEffect<AnyAction>> {
  const token = yield call(() =>
    fetch(`${serverUrl}/api/requestToken?username=${action.username}&password=${action.password}`, {
      method: 'POST',
    }).then((response: Response) => {
      if (!response.ok) {
        return '';
      }
      return response.text();
    }),
  );
  if (token) {
    localStorage.setItem('authToken', token);
    yield put({ type: LOGGED_IN });
  } else {
    yield put({ type: LOG_OUT });
  }
}

export function* removeToken(): Iterator<void> {
  localStorage.removeItem('authToken');
}
