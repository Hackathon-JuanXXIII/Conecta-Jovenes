import { NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AuthContext from "../contexts/authContext";
import { loadUser } from "../services/authService";
import OlvidePass from "./ayudaPass";
import HomeScreen from "./homeScreen";
import LoginScreen from "./loginScreen";
import NuevaPass from "./nuevaPass";
import SplashScreen from "./splashScreen";
import VerificacionEmail from "./verificacionEmail";
import VerificacionTelefono from "./verificacionTelefono";

const Stack=createNativeStackNavigator();

export default function Layout(){
    // Estado que guarda el usuario autenticado
    const [user, setUser]=useState();
    // Estado para controlar la carga inicial de la app
    const [status,setStatus]=useState("loading");

    useEffect(()=>{
        async function runEffect(){
            try{
                const user=await loadUser();
                setUser(user);
            } catch(e){
                // Si no hay usuario o ocurre un error
                console.log("No se pudo cargar el usuario", e);
            }

            setStatus("inactivo");
        }

        runEffect();
    },[]);

    // Mientras se carga el usuario, mostramos la pantalla splash
    if(status==="loading"){
        return <SplashScreen/>
    }

    return(
        <AuthContext.Provider value={{user,setUser}}>
            <NavigationIndependentTree>
                <Stack.Navigator screenOptions={{headerShown:false}}>
                    {user?(
                        <>
                        <Stack.Screen name="Home" component={HomeScreen}/>
                        </>
                    ):(
                        <>
                        <Stack.Screen name="Login" component={LoginScreen}/>
                        <Stack.Screen name="OlvidePass" component={OlvidePass}/>
                        <Stack.Screen name="VerificacionEmail" component={VerificacionEmail}/>
                        <Stack.Screen name="VerificacionTel" component={VerificacionTelefono}/>
                        <Stack.Screen name="NuevaPass" component={NuevaPass}/>
                        </>
                    )}
                    
                </Stack.Navigator>
            </NavigationIndependentTree> 
        </AuthContext.Provider> 
    );
}