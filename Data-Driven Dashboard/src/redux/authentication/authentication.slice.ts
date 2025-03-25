import { createSlice } from "@reduxjs/toolkit";
import * as thunk from "../thunk"

interface initialState{
    token:any,
    userDetails:any,
    loading:boolean,
    error:any,
}
const initialState:initialState={
    token:"",
    userDetails:{},
    loading:false,
    error:{},
}
const authentication=createSlice(
    {
        initialState,
        name:"auth",
        reducers:{},
        extraReducers:(builder) =>{
 // signup
            builder.addCase(thunk.setuserDetails.fulfilled,(state:any,action:any)=>{
                state.userDetails = action.payload; 
                state.loading=false
                state.error=null
            }) 
            builder.addCase(thunk.setToken.fulfilled,(state:any,action:any)=>{
                state.token = action.payload.token;
                state.loading=false
                state.error=null
            }) 

        },
    })
export default authentication.reducer