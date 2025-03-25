import { createSlice } from "@reduxjs/toolkit"; 
import * as thunk from "../thunk"
export interface DashboardState {
  dashboardDetails:any
}

const initialState: DashboardState = {
  dashboardDetails:{}, 
};

const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunk.getdashboard.fulfilled, (state:any, action:any) => {
      state.dashboardDetails = action.payload;
      
    });

  },
});

export default dashboard.reducer;
