import AuthState from './auth/model/auth-state';
import NoteState from './note/model/note-state';

export default interface AppState {
  auth: AuthState;
  notes: NoteState;
}
