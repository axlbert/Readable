/* eslint-disable no-case-declarations */
import {
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    GET_COMMENTS_FOR_POST,
    DELETE_POST
} from '../actions/type';

export default function comments(state = {}, action) {
    const { payload } = action;
    switch (action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                [payload.comment.id]: payload.comment
            };
        case EDIT_COMMENT:
            return {
                ...state,
                [payload.comment.id]: payload.comment
            };
        case DELETE_COMMENT:
            if (!payload.comment.deleted) {
                return state;
            }
            return Object.keys(state)
                .filter(cId => cId !== payload.comment.id)
                .reduce((obj, cId) => {
                    const newObj = obj;
                    newObj[cId] = state[cId];
                    return newObj;
                }, {});
        case GET_COMMENTS_FOR_POST:
            const newComments = payload.comments.reduce((obj, c) => {
                const newObj = obj;
                newObj[c.id] = c;
                return newObj;
            }, {});
            return {
                ...state,
                ...newComments
            };
        case DELETE_POST:
            if (!payload.post.deleted) {
                return state;
            }
            return Object.keys(state)
                .filter(cId => state[cId].parentId !== payload.post.id)
                .reduce((obj, cId) => {
                    const newObj = obj;
                    newObj[cId] = state[cId];
                    return newObj;
                }, {});
        default:
            return state;
    }
}
