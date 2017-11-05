import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { addPost, editPost,getPosts,getCategories} from '../actions';

class PostEditCreate extends Component {

    state = {
        msgError: false,
        msgHeadline: '',
        msgContent: '',
        msgCreator: '',
        msgCat: ''
    };

    componentDidMount() {
        const { postId } = this.props.match.params;
        if (typeof postId !== 'undefined') {
            const { postsFetching, posts } = this.props;
            let fetchPosts = true;
            if (!postsFetching && posts.length > 0) {
                const post = posts[postId];
                if (typeof post !== 'undefined') {
                    fetchPosts = false;}
            }
            if (fetchPosts) {
                this.props.getPosts();
            }
        } else {
            this.props.getCategories();
        }
    }


    componentWillReceiveProps(nextProps) {
        const { posts, postsFetching } = nextProps;
        const { postId } = this.props.match.params;
        if (!postsFetching && typeof postId !== 'undefined') {
            const post = posts[postId];
            if (typeof post !== 'undefined') {
                this.setState({
                    msgHeadline: post.title,
                    msgContent: post.body
                });
            } else {
                const { history } = this.props;
                history.push('/');
            }
        }
    }

    handlePostSubmit(event) {
        event.preventDefault();
        const { postId } = this.props.match.params;
        if (typeof postId !== 'undefined') {
            this.handleEditPostSubmit();
        } else {
            this.handleNewPostSubmit();
        }
    }

    handleNewPostSubmit() {
        const { msgHeadline, msgContent, msgCreator, msgCat } = this.state;
        if (msgHeadline.trim() === '' || msgContent.trim() === '' ||
            msgCreator.trim() === '' || msgCat.trim() === '') {
            this.setState({
                msgError: true});
        } else {
            const timestamp = (new Date()).getTime();
            const id = uuid().replace(/-/gi, '');
            this.props.addPost({
                id,
                title: msgHeadline,
                body: msgContent,
                timestamp,
                category: msgCat,
                author: msgCreator
            });


            const { history } = this.props;

            history.push('/');
        }
    }

    handleEditPostSubmit() {
        const { msgHeadline, msgContent } = this.state;
        if (msgHeadline.trim() === '' || msgContent.trim() === '') {
            this.setState({
                msgError: true
            });
        } else {

            const { postId } = this.props.match.params;

            this.props.editPost({
                id: postId,
                title: msgHeadline,
                body: msgContent
            });


            const { history } = this.props;
            history.push('/');
        }
    }

    render() {

        
        const { postId } = this.props.match.params;
        const { msgError } = this.state;
        const newmsgErrorClassDisplay = msgError ? 'block' : 'none';
        const isCreate = typeof postId === 'undefined';
        const { categories } = this.props;
        return (
            <div>
                <div className='row'>
                    <div className='col-md-12'>
                        {isCreate ? 'Create Post' : 'Edit Post' }
                    </div>
                </div>
                <form onSubmit={event => this.handlePostSubmit(event)}>
                    <div className='row MT-15'>
                        <div className='col-md-12'>
                            <input
                                placeholder='post title'
                                className='form-control'
                                value={this.state.msgHeadline}
                                onChange={event => this.setState({ msgHeadline: event.target.value })}
                            />
                        </div>
                    </div>
                    <div className='row MT-15'>
                        <div className='col-md-12'>
                            <textarea
                                placeholder='post body'
                                className='form-control'
                                value={this.state.msgContent}
                                onChange={event => this.setState({ msgContent: event.target.value })}
                            />
                        </div>
                    </div>

                    {isCreate ?
                        <div className='row MT-15'>
                            <div className='col-md-12'>
                                <select
                                    value={this.state.msgCat}
                                    onChange={event => this.setState({
                                        msgCat: event.target.value
                                    })}
                                    className="form-control"
                                >
                                    <option value=''>Select Category</option>
                                    {categories.map((c, i) =>
                                        <option key={i} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                        </div> : ''
                    }

                    {isCreate ?
                        <div className='row MT-15'>
                            <div className='col-md-12'>
                                <input
                                    className='form-control'
                                    placeholder='your name'
                                    type='text'
                                    value={this.state.msgCreator}
                                    onChange={event =>
                                        this.setState({ msgCreator: event.target.value })}
                                />
                            </div>
                        </div> : ''
                    }

                    <div
                        className='row'
                        style={{ marginTop: '5px', display: newmsgErrorClassDisplay }}
                    >
                        <div className='col-md-12'>
                            <div className='errorMessage'>
                                Invalid or missing post info.
                            </div>
                        </div>
                    </div>

                    <div className='row MT-15 F-right'>
                        <div className='col-md-12'>
                            <input className='btn' type='submit' value='Save Post' />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ posts, categories }) {
    const { items, isFetching } = posts;
    return {
        posts: items,
        postsFetching: isFetching,
        categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: newPost => dispatch(addPost(newPost)),
        editPost: post => dispatch(editPost(post)),
        getPosts: () => dispatch(getPosts()),
        getCategories: () => dispatch(getCategories())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditCreate);
