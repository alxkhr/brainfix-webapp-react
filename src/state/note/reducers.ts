import { AnyAction } from 'redux';

import Note from '../../shared/model/note';
import { RECEIVED_NOTES } from './actions';
import NoteState from './model/note-state';

function receivedNotes(state: NoteState, notes: Note[]): NoteState {
  return {
    ...state,
    // notes: mergeNotes(state.notes, notes),
    notes,
  };
}

// function mergeNotes(notes: Note[], newNotes: Note[]): Note[] {
//   return newNotes.reduce((base, note) => {
//     const existingNote = base.find((baseNote) => baseNote.uuid === note.uuid);
//     if (existingNote) {
//       base[base.indexOf(existingNote)] = note;
//     } else {
//       base.push(note);
//     }
//     return base;
//   }, [...notes]);
// }

const defaultNoteState: NoteState = {
  notes: [],
};

export default function(state: NoteState = defaultNoteState, action: AnyAction): NoteState {
  switch (action.type) {
    case RECEIVED_NOTES:
      return receivedNotes(state, action.notes);
    default:
      return state;
  }
}
