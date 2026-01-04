import axios from "../utils/axios";
import { setToken } from "./tokenService";

export async function login(credenciales) {
    const{data} = await axios.post("/login", credenciales);
    await setToken(data.token);
}

export async function loadUser() {
    const {data: user} = await axios.get("/profile");
    return user;
}

export async function logout() {
    await axios.post("/logout",{});

    await setToken(null);
}



      