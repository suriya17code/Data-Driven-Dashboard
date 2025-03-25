import { createAsyncThunk } from "@reduxjs/toolkit"; 

export const setActiveMenu = createAsyncThunk(
  "navbar/setActiveMenu",
  async (menu: string | null) => menu
);

export const setHeaderContent = createAsyncThunk(
  "navbar/setHeaderContent",
  async (content: string) => content
);



 
