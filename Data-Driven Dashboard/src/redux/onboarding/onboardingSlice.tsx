import { createSlice } from "@reduxjs/toolkit";
import * as thunk from "../thunk"

interface initialState{
 
    onBoardDetails:any,
    loading:boolean,
    error:any,
}
const initialState:initialState={
   
    onBoardDetails:{},
    loading:false,
    error:{},
}
const onboardingprofile=createSlice(
    {
        initialState,
        name:"onboard",
        reducers:{},
        extraReducers:(builder) =>{
 // signup
            builder.addCase(thunk.onboardingDetails.fulfilled,(state:any,action:any)=>{
                state.onBoardDetails = action.payload; 
                state.loading=false
                state.error=null
            }) 
            

        },
    })
export default onboardingprofile.reducer