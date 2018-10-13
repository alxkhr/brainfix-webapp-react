import { combineReducers } from 'redux';

import AppState from './app-state';
import auth from './auth/reducers';
import notes from './note/reducers';

export default combineReducers<AppState>({ auth, notes });
