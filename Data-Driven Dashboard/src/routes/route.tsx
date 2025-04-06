import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/auth/Auth"; 
import { PrivateRoute } from "./privateRoute";
import Dashboard from "../pages/dashboard/dashboard";
import TaskManager from "../pages/taskmanager/taskmanager"; 
import OnboardingPage from "../pages/onboarding/onboarding";
import Extra from "../pages/taskmanager/extra";
export const RouterApp=()=>{


  const router=createBrowserRouter([
    { path: "/login",element: <Login />},
    { 
        path: "/", element: <PrivateRoute />,
        children: [
        { index: true, element: <Dashboard /> },
        {path:"/dashboard",element:<Dashboard/>},
        {path:"/task",element:<TaskManager/>},
        {path:"/Onboarding",element:<OnboardingPage/>},
        {path:"/extra",element:<Extra/>},
  
      ]
  }
])

  return (
    <RouterProvider router={router} />
)
}
  export default RouterApp