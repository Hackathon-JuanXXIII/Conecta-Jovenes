import axiosLib from "axios";
import { getToken } from "../services/tokenService";
const axios = axiosLib.create({
    baseURL:"http://10.0.2.2:8000/api/v1",
    headers:{
        Accept:"application/json",
    },
});

axios.interceptors.request.use(async(res)=>{
    const token = await getToken();

    if(token !==null){
        res.headers["Authorization"]=`Bearer ${token}`;
    }

    return res;
})

export default axios;