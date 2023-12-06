import {User} from "../../classes/user";


const setUserReducer = (state: { user: User } | null = { user: new User() }, action: { type: string; user: User }): { user: User } | null => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            };
        case "LOGOUT_USER":
            return null;
        default:
            return state;
    }
}


export default setUserReducer;