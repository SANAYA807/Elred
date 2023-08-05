import { createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
    about: 'No about me added yet',
    bloodGroup: 'select',
    resume: '',
    softSkills: {},
    ethicalCount: 0,
    count: 0,
    resume: null



}
const appReducerSlice = createSlice({
    initialState,
    name: 'app',
    reducers: {
        addResume: (state, action) => {
            state.resume = action.payload;
        },
        removeResume: (state, action) => {
            state.resume = null
        },
        addAbout: (state, action) => {
            state.about = action.payload.about;
            state.bloodGroup = action.payload.bloodGroup;
            state.count = action.payload.count


        },
        addBloodGroup: (state, action) => {
            state.bloodGroup = action.payload.bloodGroup
        },
        addSkills: (state, action) => {
            state.softSkills = action.payload
        },
        addEthicalCount: (state, action) => {
            state.ethicalCount = action.payload
        }

    }
})
export const { addAbout, addSkills, addEthicalCount, addResume, removeResume } = appReducerSlice.actions
export default appReducerSlice