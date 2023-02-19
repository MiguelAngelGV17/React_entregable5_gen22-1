import { createSlice } from "@reduxjs/toolkit";

const openPokeSlice = createSlice({
    name: 'openPokeBall',
    initialState: true,
    reducers:{
        setOpenPokeball:state => !state 
    }
})
export const {setOpenPokeball} = openPokeSlice.actions
export default openPokeSlice.reducer