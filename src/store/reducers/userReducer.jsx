const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FIRST_NAME':
            return { ...state, firstName: action.payload };
        case 'SET_LAST_NAME':
            return { ...state, lastName: action.payload };
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'SAVE_DATA_SUCCESS':
            return {
                ...state,
            };
        case 'SAVE_DATA_ERROR':
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default userReducer;
