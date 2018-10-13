import { AnyAction } from 'redux';

import Note from '../../shared/model/note';

export const GET_NOTES = 'GET_NOTES';
export const RECEIVED_NOTES = 'RECEIVED_NOTES';
export const SET_NOTES = 'SET_NOTES';

export function getNotes(): AnyAction {
  return { type: GET_NOTES };
}

export function receivedNotes(notes: Note[]): AnyAction {
  return { type: RECEIVED_NOTES, notes };
}

export function setNotes(notes: Note[]): AnyAction {
  return { type: SET_NOTES, notes };
}
