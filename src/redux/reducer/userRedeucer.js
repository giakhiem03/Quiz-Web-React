import {
    FETCH_USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    UPDATE_USER_SUCCESS,
} from "../action/userAction";

const INITIAL_STATE = {
    account: {
        access_token: "",
        refresh_token: "",
        username: "",
        image: "",
        role: "",
        email: "",
    },
    isAuthenticated: false,
};

function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    image: action?.payload?.DT?.image,
                    role: action?.payload?.DT?.role,
                    email: action?.payload?.DT?.email,
                },
                isAuthenticated: true,
            };
        case USER_LOGOUT_SUCCESS:
            return INITIAL_STATE;
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                account: {
                    ...state.account,
                    username: action?.payload?.username,
                    image: action?.payload?.image,
                },
            };
        default:
            console.log("default value error!");
            return state;
    }
}

export default userReducer;
