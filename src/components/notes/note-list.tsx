import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Note from '../../shared/model/note';
import AppState from '../../state/app-state';
import { getNotes } from '../../state/note/actions';
import NoteMask from './note-mask';

interface NoteListPropTypes {
  notes: Note[];
  doGetNotes: () => void;
}

class NoteList extends React.PureComponent<NoteListPropTypes> {
  constructor(props: NoteListPropTypes) {
    super(props);
  }

  public componentDidMount(): void {
    this.props.doGetNotes();
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.props.notes.map((note: Note) => (
          <div key={note.uuid}>{note.content}</div>
        ))}
        <NoteMask />
      </div>
    );
  }
}

export default connect(
  (state: AppState) => ({ notes: state.notes.notes }),
  (dispatch: Dispatch) => ({
    doGetNotes: () => {
      dispatch(getNotes());
    },
  }),
)(NoteList);
