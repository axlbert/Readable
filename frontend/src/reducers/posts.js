/* eslint-disable no-case-declarations */
import {
    GET_POSTS,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    FETCH_POSTS
} from '../actions/type';

const initPosts = {
    isFetching: true,
    items: {}
};

export default function posts(state = initPosts, action) {
    const { payload } = action;
    const { items } = state;
    switch (action.type) {
        case GET_POSTS:
            const newPosts = payload.posts.reduce((obj, p) => {
                const newObj = obj;
                newObj[p.id] = p;
                return newObj;
            }, {});
            return {
                isFetching: false,
                items: newPosts
            };
        case ADD_POST:
            return {
                isFetching: false,
                items: {
                    ...items,
                    [payload.post.id]: payload.post
                }

            };
        case EDIT_POST:
            return {
                isFetching: false,
                items: {
                    ...items,
                    [payload.post.id]: payload.post
                }

            };
        case DELETE_POST:
            if (!payload.post.deleted) {
                return state;
            }
            const postsWithoutDeleted = Object.keys(items)
                .filter(pId => pId !== payload.post.id)
                .reduce((obj, pId) => {
                    const newObj = obj;
                    newObj[pId] = items[pId];
                    return newObj;
                }, {});
            return {
                isFetching: false,
                items: postsWithoutDeleted
            };
        case FETCH_POSTS:
            return {
                isFetching: true,
                items
            };
        default:
            return state;
    }
}
