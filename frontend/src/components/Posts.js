import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { deletePost } from '../actions';
import sortBy from 'sort-by';
import SweetAlert from 'sweetalert2-react';

class Posts extends Component {
    state = {
        sortKey: '-voteScore',
        showPostDeleteAlert: false,
        deletePostId: ''
    };

    handleDeletePost(postId) {
        this.setState({
            showPostDeleteAlert: true,
            deletePostId: postId
        });
    }

    handleSort(sortKey) {
        this.setState({
            sortKey
        });
    }

    render() {
        let { posts } = this.props;
        const { sortKey } = this.state;
        posts = posts.sort(sortBy(sortKey));

        return (
            <div>
                <SweetAlert
                    show={this.state.showPostDeleteAlert}
                    title="remove post?"
                    text="Sure you want to delete?"
                    showCancelButton
                    onConfirm={() => {
                        const { deletePostId } = this.state;
                        this.props.deletePost({
                            id: deletePostId
                        });
                        this.setState({
                            showPostDeleteAlert: false,
                            deletePostId: ''
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            showPostDeleteAlert: false,
                            deletePostId: ''
                        });
                    }}
                />
                <div className='col-md-12'>
                    <div className='row'>
                        <div
                            className='sortText col-md-12'
                        >
                            Sort posts by
                        </div>
                        <select
                            value={sortKey}
                            onChange={event => this.handleSort(event.target.value)}
                            className="my-form-control col-md-3"
                        >
                            <option value='-voteScore'>Max to Min Votes</option>
                            <option value='voteScore'>Min to Max Votes</option>
                            <option value='-timestamp'>New to Old Posts</option>
                            <option value='timestamp'>Old to New Posts</option>
                        </select>
                    </div>
                    <div className='row MT-20'>
                        {posts.map((p, i) =>
                            (<Post key={i} post={p} handleDeletePost={(postId) => this.handleDeletePost(postId)}/>)
                        )}
                    </div>
                </div>
            </div>
        );}}

function mapDispatchToProps(dispatch) {
    return {
        deletePost: (post) => dispatch(deletePost(post))
    };
}

export default connect(null, mapDispatchToProps)(Posts);
