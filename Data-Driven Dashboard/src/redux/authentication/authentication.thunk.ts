import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { onboard } from "../../services/auth.service";

export const setToken =createAsyncThunk(
  "auth/setToken",
  async(data:any)=>data
)
export const setuserDetails =createAsyncThunk(
  "auth/setuserDetails",
  async(data:any)=>data
)

export const onBoarding =createAsyncThunk(
  "auth/onBoarding",
  async(data:any)=>{
    try {
      const response= await onboard(data);
      return response
    } catch (error) {
      console.log("error",error);
      
    }
  }
)