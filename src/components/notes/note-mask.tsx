import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as uuid from 'uuid';

import Note from '../../shared/model/note';
import { setNotes } from '../../state/note/actions';

interface NoteMaskPropTypes {
  doSetNotes: (notes: Note[]) => void;
}

interface NoteMaskState {
  content: string;
}

class NoteMask extends React.PureComponent<NoteMaskPropTypes, NoteMaskState> {
  constructor(props: NoteMaskPropTypes) {
    super(props);
    this.state = {
      content: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
  }

  public render(): JSX.Element {
    return (
      <form>
        <input onChange={this.onChangeContent} value={this.state.content} />
        <button onClick={this.onSubmit}>submit</button>
      </form>
    );
  }

  public onChangeContent(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ content: event.target.value });
  }

  public onSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    this.props.doSetNotes([
      {
        id: 0,
        uuid: uuid.v4(),
        userId: 0,
        encryptionType: 0,
        content: this.state.content,
        dateCreated: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        dateSync: '',
      },
    ]);
  }
}

export default connect(
  null, // TODO save to delete?
  (dispatch: Dispatch) => ({
    doSetNotes: (notes: Note[]) => {
      dispatch(setNotes(notes));
    },
  }),
)(NoteMask);
