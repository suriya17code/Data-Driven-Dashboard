import { createSlice } from "@reduxjs/toolkit";
import * as thunk from "../thunk"
interface initialState{
    savedTask:any
    editstatus:any
    loading:boolean,
    getTasks:any
    error:any,
    updatedtask:any
}
const initialState:initialState={
    savedTask:{},
    editstatus:false,
    loading:false,
    updatedtask:null,
    getTasks:[],
    error:{},
}
const task=createSlice({
    initialState,
    name:"taskmanger",
    reducers:{
        resetSavedTask:(state)=>{
            state.savedTask={}
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(thunk.saveEditTask.fulfilled,((state:any,action:any)=>{
            state.savedTask=action.payload 
        }))
        builder.addCase(thunk.editmode.fulfilled,((state:any,action:any)=>{
            state.editstatus=action.payload 
        }))
        builder.addCase(thunk.gettasklist.fulfilled,((state:any,action:any)=>{
            state.getTasks=action.payload 
            state.error=null
            state.loading=false
        }))
        builder.addCase(thunk.gettasklist.pending,((state:any)=>{
            state.loading=true
        }))
        builder.addCase(thunk.gettasklist.rejected,((state:any,action:any)=>{
            state.error=action.payload 
        }))
        builder.addCase(thunk.TaskUpdate.fulfilled,((state:any,action:any)=>{
            state.updatedtask=action.payload 
            state.error=null
            state.loading=false
        }))
        builder.addCase(thunk.TaskUpdate.pending,((state:any)=>{
            state.loading=true
        }))
        builder.addCase(thunk.TaskUpdate.rejected,((state:any,action:any)=>{
            state.error=action.payload 
        }))
       
    },
})
export const {resetSavedTask}=task.actions
export default task.reducer