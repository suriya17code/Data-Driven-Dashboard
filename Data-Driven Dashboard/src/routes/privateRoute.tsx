import { Navigate } from "react-router-dom"; 
import Layout from "../layout/layout";


export const PrivateRoute = () => {
    const token=()=>sessionStorage.getItem('Access');
        return (
            <>
            {token() ? <Layout/>:<Navigate to ="/login" />} 
            </>)
};