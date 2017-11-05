import axios from 'axios';

import {
    GET_POSTS,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    FETCH_POSTS,
    ADD_COMMENT,
    GET_COMMENTS_FOR_POST,
    EDIT_COMMENT,
    DELETE_COMMENT,
    GET_CATEGORIES
} from './type';

const AUTH_TOKEN = 'testAuthToken';
const API_URL = 'http://localhost:3001';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Authorization = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function getCategories() {
    return dispatch => {
        axios.get('/categories')
            .then(resp => {
                dispatch({
                    type: GET_CATEGORIES,
                    payload: {
                        categories: resp.data.categories
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function getPosts() {
    return dispatch => {
        axios.get('/posts')
            .then(resp => {
                dispatch({
                    type: GET_POSTS,
                    payload: {
                        posts: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
        dispatch({ type: FETCH_POSTS });
    };
}

export function getPost(postId) {
    return dispatch => {
        axios.get(`/posts/${postId}`)
            .then(resp => {
                dispatch({
                    type: ADD_POST,
                    payload: {
                        post: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function changePostVote(postId, voteDirection) {
    return dispatch => {
        axios.post(`/posts/${postId}`, { option: voteDirection })
            .then(resp => {
                dispatch({
                    type: ADD_POST,
                    payload: {
                        post: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function addPost(post) {
    return dispatch => {
        axios.post('/posts', post)
            .then(resp => {
                // console.log(resp);
                dispatch({
                    type: ADD_POST,
                    payload: {
                        post: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function addPostNoServerUpdate(post) {
    return {
        type: ADD_POST,
        payload: {
            post
        }
    };
}

export function editPost({ id, title, body }) {
    return dispatch => {
        axios.put(`/posts/${id}`, { title, body })
            .then(resp => {
                // console.log(resp);
                dispatch({
                    type: EDIT_POST,
                    payload: {
                        post: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function deletePost({ id }) {
    return dispatch => {
        axios.delete(`/posts/${id}`)
            .then(resp => {
                // console.log(resp);
                dispatch({
                    type: DELETE_POST,
                    payload: {
                        post: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function getCommentsForPost(postId) {
    return dispatch => {
        axios.get(`/posts/${postId}/comments`)
            .then(resp => {
                // console.log(resp);
                dispatch({
                    type: GET_COMMENTS_FOR_POST,
                    payload: {
                        comments: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function addComment(comment) {
    return dispatch => {
        axios.post('/comments', comment)
            .then(resp => {
                // console.log(resp);
                dispatch({
                    type: ADD_COMMENT,
                    payload: {
                        comment: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function changeCommentVote(commentId, voteDirection) {
    return dispatch => {
        axios.post(`/comments/${commentId}`, { option: voteDirection })
            .then(resp => {
                dispatch({
                    type: ADD_COMMENT,
                    payload: {
                        comment: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function editComment({ id, timestamp, body }) {
    return dispatch => {
        axios.put(`/comments/${id}`, { timestamp, body })
            .then(resp => {
                // console.log(resp);
                dispatch({
                    type: EDIT_COMMENT,
                    payload: {
                        comment: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function deleteComment(commentId) {
    return dispatch => {
        axios.delete(`/comments/${commentId}`)
            .then(resp => {
                // console.log(resp);
                dispatch({
                    type: DELETE_COMMENT,
                    payload: {
                        comment: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}
