import { createAsyncThunk } from "@reduxjs/toolkit"; 

export const onboardingDetails = createAsyncThunk(
  "onboard/onboardingDetails",
  async (data: any) => data
);

 


 
