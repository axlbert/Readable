import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MONTHS } from '../utils/constants';
import { changeCommentVote, editComment } from '../actions';

class Comment extends Component {
    state = {
        edit: false,
        editMsg: ''
    };

    cancelCommentEdit() {
        this.setState({
            edit: false,
            editMsg: ''
        });
    }

    saveCommentEdit(event) {
        event.preventDefault();
        const { editMsg } = this.state;
        const { comment } = this.props;

        const id = comment.id;
        const timestamp = (new Date()).getTime();
        this.props.editComment({
            id,
            timestamp,
            body: editMsg
        });
        this.setState({
            edit: false,
            editMsg: ''
        });
    }

    render() {
        const { comment } = this.props;
        const { timestamp } = comment;
        const d = new Date(timestamp);
        const mmm = MONTHS[d.getMonth()];
        const year4 = d.getFullYear();
        const date = d.getDate();
        const { edit } = this.state;


        if (edit) {
            return (
                <form onSubmit={event => this.saveCommentEdit(event)}>
                    <div className='row'>
                        <div className='col-md-12'>
                                <textarea
                                    className='form-control'
                                    value={this.state.editMsg}
                                    onChange={(event) =>
                                        this.setState({ editMsg: event.target.value })}
                                />
                        </div>
                    </div>
                    <div className='row MT-10' >
                        <div className='col-md-12'>
                            <div className='F-right'>
                                <input
                                    className='btn M-5' type='button'
                                    value='Cancel'
                                    onClick={() => this.cancelCommentEdit()}
                                />
                                <input
                                    className='btn M-5'
                                    type='submit'
                                    value='Save'
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                </form>
            );
        }
        return (
            <div>
                <div className='row'>
                    <div className='col-md-10'>
                        {comment.body}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-2'>
                        <p className='commentAuthorLine'>
                            -by {comment.author} on {mmm} {date}, {year4}
                        </p>
                    </div>
                    <div className='col-md-4'>
                        <button
                            className='voteButton'
                            onClick={() => {
                                this.props.changeCommentVote(comment.id, 'upVote');
                            }}
                        >
                            <i className="fa fa-thumbs-up" aria-hidden="true" />
                        </button>
                        <button
                            className='voteButton'
                            onClick={() => {
                                this.props.changeCommentVote(comment.id, 'downVote');
                            }}
                        >
                            <i className="fa fa-thumbs-down" aria-hidden="true" />
                        </button>
                        <span className='ML-5'>{comment.voteScore}</span>
                        <button
                            className='deletePostButton ML-10'
                            onClick={() => this.setState({
                                edit: true,
                                editMsg: comment.body
                            })}
                        >
                            <i className="fa fa-pencil-square-o" aria-hidden="true" />
                        </button>
                        <button
                            className='deletePostButton ML-10'
                            onClick={() => {
                                this.props.deleteComment(comment.id);
                            }}
                        >
                            <i className="fa fa-trash-o" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        changeCommentVote: (commentId, voteDirection) =>
            dispatch(changeCommentVote(commentId, voteDirection)),
        editComment: (newComment) => dispatch(editComment(newComment))
    };
}


export default connect(null, mapDispatchToProps)(Comment);
