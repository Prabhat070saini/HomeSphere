import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser: null,
    error: "",
    loading: false,
};
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, value) => {
            state.currentUser = value.payload;
            state.loading = false;
            state.error = "";
            console.log(`asdlkkldsjkldsfj${value.payload}`)
        },
        signInFailure: (state, value) => {
            console.log(`singig${value.payload}`)
            state.error = value.payload;
            state.loading = false;
        },
        signInEnd: (state) => {
            state.loading = false;
        }
        ,
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});
export const { signInFailure, signInStart, signInSuccess, signInEnd, updateUserStart, updateUserSuccess, updateUserFailure } = userSlice.actions;
export default userSlice.reducer;