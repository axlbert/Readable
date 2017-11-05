import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import * as actions from '../actions';
import Comment from './Comment';
import { MONTHS } from '../utils/constants';
import uuid from 'uuid';
import sortBy from 'sort-by';


class PostDetail extends Component {

    state = {
        showPostDeleteAlert: false,
        showCommentDeleteAlert: false,
        commentIdToDelete: '',
        newCommentBody: '',
        newCommentUser: '',
        newCommentError: false
    };

    componentDidMount() {
        const { postId } = this.props.match.params;
        if (Object.keys(this.props.posts).length === 0) {
            this.props.getPosts();
        }
        if (this.props.comments.filter(c => postId === c.parentId).length === 0) {
            this.props.getCommentsForPost(postId);
        }
    }

    handleNewCommentSubmit(event) {
        //better with
        event.preventDefault();
        const { newCommentBody, newCommentUser } = this.state;
        if (newCommentBody.trim() === '' || newCommentUser.trim() === '') {
            this.setState({
                newCommentError: true
            });
        } else {
            const { postId } = this.props.match.params;
            this.props.addComment({
                id: uuid().replace(/-/gi, ''),
                body: newCommentBody,
                author: newCommentUser,
                timestamp: (new Date()).getTime(),
                parentId: postId
            });
            this.setState({
                newCommentBody: '',
                newCommentUser: '',
                newCommentError: false
            });
        }
    }

    deleteComment(commentId) {
        this.setState({
            commentIdToDelete: commentId,
            showCommentDeleteAlert: true
        });
    }

    render() {

        const { postId } = this.props.match.params;
        const { posts, comments, postsFetching } = this.props;
        const { newCommentBody, newCommentUser, newCommentError } = this.state;

        if (postsFetching) {
            return (
                <div>
                    Loading
                </div>
            );
        }

        const post = posts[postId];
        if (typeof post === 'undefined') {
            return (
                <div>
                    404 page
                </div>
            );
        }

        const { timestamp } = post;
        const d = new Date(timestamp);
        const mmm = MONTHS[d.getMonth()];
        const yyyy = d.getFullYear();
        const date = d.getDate();
        const editPath = `/post/edit/${postId}`;
        const commentsForPost = comments.filter(c =>
            postId === c.parentId).sort(sortBy('-voteScore'));
        let commentsLine = 'comments';
        if (commentsForPost.length === 1) {
            commentsLine = 'comment';
        }
        const newCommentErrorClassDisplay = newCommentError ? 'block' : 'none';
        return (
            <div>
                <SweetAlert
                    show={this.state.showPostDeleteAlert}
                    title="Delete Post?"
                    text="Do you want to delete this post?"
                    showCancelButton
                    onConfirm={() => {
                        this.props.deletePost(post);
                        const { history } = this.props;
                        history.push('/');
                    }}
                    onCancel={() => {
                        this.setState({ showPostDeleteAlert: false });
                    }}
                />
                <SweetAlert
                    show={this.state.showCommentDeleteAlert}
                    title="Delete Comment?"
                    text="Do you want to delete this comment?"
                    showCancelButton
                    onConfirm={() => {
                        this.props.deleteComment(this.state.commentIdToDelete);
                        this.setState({
                            commentIdToDelete: '',
                            showCommentDeleteAlert: false
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            commentIdToDelete: '',
                            showCommentDeleteAlert: false
                        });
                    }}
                />
                <div className='row'>
                    <div className='col-md-8'>
                        <h2>{post.title}</h2>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-2 TA-L' >
                        <h4>
                            <p className='commentAuthorLine'>
                                -by {post.author} on {mmm} {date}, {yyyy} in {post.category}
                            </p>
                        </h4>
                    </div>
                    <div className='col-md-4'>
                        <h4>
                            <button
                                className='voteButton'
                                onClick={() => {
                                    this.props.changePostVote(post.id, 'upVote');
                                    const newPost = post;
                                    newPost.voteScore += 1;
                                    this.props.addPostNoServerUpdate(newPost);
                                }}
                            >
                                <i className="fa fa-thumbs-up" aria-hidden="true" />
                            </button>
                            <button
                                className='voteButton'
                                onClick={() => {
                                    this.props.changePostVote(post.id, 'downVote');
                                    const newPost = post;
                                    newPost.voteScore -= 1;
                                    this.props.addPostNoServerUpdate(newPost);
                                }}
                            >
                                <i className="fa fa-thumbs-down" aria-hidden="true" />
                            </button>
                            <span className='ML-5' >{post.voteScore}</span>
                            <Link to={editPath} className='ML-15'>
                                <i className="fa fa-pencil-square-o" aria-hidden="true" />
                            </Link>
                            <button
                                className='deletePostButton ML-10'
                                onClick={() => {
                                    // this.deletePost(post);
                                    this.setState({
                                        showPostDeleteAlert: true
                                    });
                                }}
                            >
                                <i className="fa fa-trash-o" aria-hidden="true" />
                            </button>
                        </h4>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-10'>
                        <h4>{posts[postId].body}</h4>
                    </div>
                </div>

                <div className='row MT-5' >
                    <div
                        className='col-md-2 inlineCommentAuthorLine'
                    >
                        {commentsForPost.length} {commentsLine}
                    </div>
                </div>


                <hr className='MT-0' />

                {commentsForPost.map(comment => (
                    <Comment
                        key={comment.id} comment={comment}
                        deleteComment={commentId => this.deleteComment(commentId)}
                    />
                ))}

                <form onSubmit={event => this.handleNewCommentSubmit(event)}>
                    <div className='row MT-5'>
                        <div className='col-md-10'>
                            <textarea
                                onChange={event => this.setState({
                                    newCommentBody: event.target.value
                                })}
                                placeholder='comment body' className='form-control'
                                value={newCommentBody}
                            />
                        </div>
                    </div>

                    <div className='row MT-5'>
                        <div className='col-md-10'>
                            <input
                                onChange={event => this.setState({
                                    newCommentUser: event.target.value
                                })}
                                placeholder='your name'
                                type='text'
                                className='form-control commentUserInput'
                                value={newCommentUser}
                            />
                        </div>
                    </div>

                    <div
                        className='row'
                        style={{ marginTop: '5px', display: newCommentErrorClassDisplay }}
                    >
                        <div className='col-md-10'>
                            <div className='errorMessage'>
                                Invalid or missing comment body or username.
                            </div>
                        </div>
                    </div>

                    <div className='row MT-15'>
                        <div className='col-md-10'>
                            <input
                                type='submit'
                                value='Add New Comment'
                                className='newCommentButton btn'
                            />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ posts, comments }) {
    const { items, isFetching } = posts;
    const commentsArr = Object.keys(comments).reduce((arr, cId) => {
        const newArr = arr;
        newArr.push(comments[cId]);
        return newArr;
    }, []);

    return {
        posts: items,
        postsFetching: isFetching,
        comments: commentsArr
    };
}

export default connect(mapStateToProps, actions)(PostDetail);
