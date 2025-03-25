import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setActiveMenu,  setHeaderContent } from "./navbarThunk";

export interface NavbarState {
  activeMenu: string | null;
  setHeaderContent: string|null;
  sessionstorage:any
}

const initialState: NavbarState = {
  activeMenu: 'dashboard',
  setHeaderContent: 'Dashboard',
  sessionstorage:''
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setActiveMenu.fulfilled, (state, action: PayloadAction<string | null>) => {
      state.activeMenu = action.payload;
    });
    builder.addCase(setHeaderContent.fulfilled, (state, action: PayloadAction<string>) => {
      state.setHeaderContent = action.payload;
    }); 
  },
});

export default navbarSlice.reducer;
