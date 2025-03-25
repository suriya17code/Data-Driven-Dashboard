import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./authentication/authentication.slice";
import {TypedUseSelectorHook,useDispatch,useSelector,useStore,} from "react-redux";
import NavbarReducer from "./navbar/navbarslice"
import TaskReducer from "./taskManager/taskSlice"
import OnboardReducer from "./onboarding/onboardingSlice"
import DashboardReducer from "./dashboard/dashboardSlice"
const rootReducer = combineReducers({
  auth: AuthenticationReducer,
  navbar:NavbarReducer,
  task:TaskReducer,
  onboard:OnboardReducer,
  dashboard:DashboardReducer,
});


const saveState =(state:RootState)=>{
      try {
        const serializedState =JSON.stringify(state)
        sessionStorage.setItem("appstate",serializedState)
      } catch (error) {
        console.error("could not load state", error);
      }
}
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("appstate");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("could not load state", error);
  }
};


const persistedState = loadState();


const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  devTools: true,
});

store.subscribe(()=>{
    saveState(store.getState())
})

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

export default store;
