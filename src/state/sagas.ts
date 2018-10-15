import { ForkEffect, takeEvery } from 'redux-saga/effects';

import { LOG_IN, LOG_OUT } from './auth/actions';
import { removeToken, requestToken } from './auth/sagas';
import { GET_NOTES, SET_NOTES } from './note/actions';
import { getNotes, setNotes } from './note/sagas';

function* root(): Iterator<ForkEffect> {
  yield takeEvery(LOG_IN, requestToken);
  yield takeEvery(LOG_OUT, removeToken);
  yield takeEvery(GET_NOTES, getNotes);
  yield takeEvery(SET_NOTES, setNotes);
}

export default root;
