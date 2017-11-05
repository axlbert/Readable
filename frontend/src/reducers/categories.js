import { GET_CATEGORIES } from '../actions/type';

export default function categories(state = [], action) {
    const { payload } = action;
    
    switch (action.type) {
        case GET_CATEGORIES:
            return payload.categories;

        default:
            return state;
    }
}
