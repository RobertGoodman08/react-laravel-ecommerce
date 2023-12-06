import {User} from "../../classes/user";


export const setUser = (user: User) => {
    return {
        type: 'SET_USER',
        user: user
    };
};

export default setUser;