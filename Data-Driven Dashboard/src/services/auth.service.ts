import { DASHBOARD, LOGIN, ONBOARDING, SIGNUP, TASKLIST } from "../constants/api.constants"
import { apiDelete, apiGet, apiPost, apiPut } from "./api.service"

export const LogIn =(data:any)=>{
    return apiPost(LOGIN,data)
}
export const SignUp=(data:any)=>{
    return apiPost(SIGNUP,data)
}
export const onboard=(data:any)=>{
    return apiPost(ONBOARDING,data)
}
export const dashboard=()=>{
    return apiGet(DASHBOARD)
}
export const tasklist=()=>{
    return apiGet(TASKLIST)
}
export const deletetask=(taskId:any)=>{
    return apiDelete(`${TASKLIST}/${taskId}`)
}
export const updateTask=(taskId:any,data:any)=>{
    return apiPut(`${TASKLIST}/${taskId}`,data)
}
export const addTask=(data:any)=>{
    return apiPost(TASKLIST,data)
}