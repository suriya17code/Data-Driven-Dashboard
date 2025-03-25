import { createAsyncThunk } from "@reduxjs/toolkit";
import {  deletetask, tasklist, updateTask } from "../../services/auth.service";

export const saveEditTask =createAsyncThunk(
    "task/editmode",
    async(data:any)=>data
)
export const gettasklist =createAsyncThunk(
    "auth/gettasklist",
    async()=>{
      try {
        const response= await tasklist();
        return response
      } catch (error) {
        console.log("error",error);
        
      }
    }
  )
  export const Taskdelete =createAsyncThunk(
    "auth/Taskdelete",
    async(data:any)=>{
      try {
        const response= await deletetask(data);
        return response
      } catch (error) {
        console.log("error",error);
        
      }
    }
  )
  export const TaskUpdate =createAsyncThunk(
    "auth/TaskUpdate",
    async(id:any,data:any)=>{
      try {
        const response= await updateTask(id,data);
        console.log('thunkresponse',response);
        return response
      } catch (error) {
        console.log("error",error);
        
      }
    }
  )
