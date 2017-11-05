import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { MONTHS } from '../utils/constants';

class Post extends Component {
    componentDidMount() {
        if (this.props.comments.filter(c => this.props.post.id === c.parentId).length === 0) {
            this.props.getCommentsForPost(this.props.post.id);
        }
    }

    render() {
        const { post, comments } = this.props;
        const commentsForPost = comments.filter(c => this.props.post.id === c.parentId);

        const { timestamp } = post;
        const d = new Date(timestamp);
        //console.log(d)
        const mmm = MONTHS[d.getMonth()];
        const year4 = d.getFullYear();
        const date = d.getDate();
        let commentsLine = 'comments';
        if (commentsForPost.length === 1) {
            commentsLine = 'comment';
        }
        const pathHref = `/${post.category}/${post.id}`;
        const pathEdit = `/post/edit/${post.id}`;
        return (
            <div className="col-xs-12 col-md-12">
                <div className="jumbotron">
                    <div className="caption">
                        <h4 className='MB-1'>
                            <Link to={pathHref}>{post.title}</Link>
                        </h4>
                        <p className='commentAuthorLine'>
                            -by {post.author} on {mmm} {date}, {year4} in {post.category}
                        </p>
                        <p>{post.body}</p>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <p className='commentAuthorLine ML-9'>
                                {commentsForPost.length} {commentsLine}
                            </p>
                        </div>
                        <div className='col-md-4 P-0'>
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
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <Link to={pathEdit} className='ML-15' >
                                <i className="fa fa-pencil-square-o" aria-hidden="true" />
                            </Link>
                            <button
                                className='deletePostButton ML-10'
                                onClick={() => {
                                    this.props.handleDeletePost(post.id);
                                }}
                            >
                                <i className="fa fa-trash-o" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps({ comments }) {
    const commentsArr = Object.keys(comments).reduce((arr, cId) => {
        const newArr = arr;
        newArr.push(comments[cId]);
        return newArr;}, []);

    return {comments: commentsArr};
}

export default connect(mapStateToProps, actions)(Post);
