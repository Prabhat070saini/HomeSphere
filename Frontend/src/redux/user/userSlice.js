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
    }
});
export const { signInFailure, signInStart, signInSuccess, signInEnd } = userSlice.actions;
export default userSlice.reducer;