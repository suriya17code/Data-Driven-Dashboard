import { createAsyncThunk } from "@reduxjs/toolkit";
import {  addTask, deletetask, tasklist, updateTask } from "../../services/auth.service";

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
        console.error("error",error);
        
      }
    }
  )
  export const TaskPost =createAsyncThunk(
    "auth/TaskPost",
    async(data:any)=>{
      try {
        const response= await addTask(data);
        console.log('thunkresponse',response);
        return response
      } catch (error) {
        console.error("error",error);
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
        console.error("error",error);
        
      }
    }
  )
  export const TaskUpdate =createAsyncThunk(
    "auth/TaskUpdate",
    async(  payload: { id: string; title: string; status: string },)=>{
      try { 
        const { id } = payload;
        const response= await updateTask(id,payload); 
        return response
      } catch (error) {
        console.error("error",error);
        
      }
    }
  )
  export const editmode =createAsyncThunk(
    "auth/editmode",
    async(data:any)=>data
  )
