import { combineReducers } from 'redux';
import categories from './categories';
import comments from './comments';
import posts from './posts';

export default combineReducers({
    posts,
    comments,
    categories
});
