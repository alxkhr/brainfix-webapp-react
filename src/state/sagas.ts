import { AnyAction } from 'redux';
import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';

import Note from '../shared/model/note';
import { LOG_IN, LOGGED_IN } from './auth/actions';
import { GET_NOTES, RECEIVED_NOTES, SET_NOTES } from './note/actions';

function* requestToken(action: AnyAction): Iterator<CallEffect | PutEffect<AnyAction>> {
  try {
    const token = yield call(() =>
      fetch(
        `https://brainfix.herokuapp.com/api/requestToken?username=${action.username}&password=${
          action.password
        }`,
        {
          method: 'POST',
        },
      ).then((response: Response) => response.text()),
    );
    localStorage.setItem('authToken', token);
    yield put({ type: LOGGED_IN });
  } catch (e) {
    console.error('ERROR_ON_REQUEST_TOKEN', e);
  }
}

function* getNotes(): Iterator<CallEffect | PutEffect<AnyAction>> {
  try {
    const token = localStorage.getItem('authToken');
    const notes: Note[] = JSON.parse(
      yield call(() =>
        fetch(`https://brainfix.herokuapp.com/api/getNotes?token=${token}&lastSync=${0}`).then(
          (response: Response) => response.text(),
        ),
      ),
    );
    yield put({ type: RECEIVED_NOTES, notes });
  } catch (e) {
    console.error('ERROR_ON_GET_NOTES', e);
  }
}

function* setNotes(action: AnyAction): Iterator<CallEffect | PutEffect<AnyAction>> {
  try {
    const token = localStorage.getItem('authToken');
    yield call(() =>
      fetch(`/api/setNotes?token=${token}`, {
        method: 'POST',
        body: JSON.stringify(action.notes),
      }),
    );
    yield put({ type: GET_NOTES });
  } catch (e) {
    console.error('ERROR_ON_SET_NOTE', e);
  }
}

function* root(): Iterator<ForkEffect> {
  yield takeEvery(LOG_IN, requestToken);
  yield takeEvery(GET_NOTES, getNotes);
  yield takeEvery(SET_NOTES, setNotes);
}

export default root;
