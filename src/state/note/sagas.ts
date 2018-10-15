import { AnyAction } from 'redux';
import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';

import { serverUrl } from '../../api/config';
import Note from '../../shared/model/note';
import { GET_NOTES, RECEIVED_NOTES } from './actions';

export function* getNotes(): Iterator<CallEffect | PutEffect<AnyAction>> {
  const token = localStorage.getItem('authToken');
  const notes: Note[] = JSON.parse(
    yield call(() =>
      fetch(`${serverUrl}/api/getNotes?token=${token}&lastSync=${0}`).then((response: Response) =>
        response.text(),
      ),
    ),
  );
  yield put({ type: RECEIVED_NOTES, notes });
}

export function* setNotes(action: AnyAction): Iterator<CallEffect | PutEffect<AnyAction>> {
  const token = localStorage.getItem('authToken');
  const success = yield call(() =>
    fetch(`${serverUrl}/api/setNotes?token=${token}`, {
      method: 'POST',
      body: JSON.stringify(action.notes),
    }).then((response: Response) => response.ok),
  );
  if (success) {
    yield put({ type: GET_NOTES });
  }
}
