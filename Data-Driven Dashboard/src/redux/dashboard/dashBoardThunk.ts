import { createAsyncThunk } from "@reduxjs/toolkit";
import { dashboard } from "../../services/auth.service";

export const getdashboard =createAsyncThunk(
    "auth/getdashboard",
    async()=>{
      try {
        const response= await dashboard();
        return response
      } catch (error) {
        console.log("error",error);
        
      }
    }
  )