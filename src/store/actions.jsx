export const saveDataSuccess = () => ({
    type: 'SAVE_DATA_SUCCESS',
});

export const saveDataError = (error) => ({
    type: 'SAVE_DATA_ERROR',
    error,
});
