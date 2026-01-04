import { MaterialIcons } from "@expo/vector-icons";
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();
export default function Layout(){
    return(
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{flex:1}}>
                <Drawer screenOptions={({route})=>({
                    headerShown:false,
                    drawerActiveTintColor:"tomato",
                    drawerInactiveTintColor:"gray",
                    drawerLabelStyle:{fontSize:18, marginLeft:10},
                    drawerIcon:()=>{
                        let iconName;
                        if(route.name==="index"){
                            iconName="adf-scanner";
                        }
                        if(route.name==="(iniciar-sesion)"){
                            iconName="airplanemode-active";
                        }
                        return <MaterialIcons name={iconName}/>
                    }
                })}>
                    <Drawer.Screen
                        name="index" // This is the name of the page and must match the url from root
                        options={{
                        drawerLabel: 'Inicio',
                        title: 'Inicio',
                        }}
                    />
                    
                    {/* <Stack screenOptions={{headerShown:false}}>
                        <Stack.Screen name="index"/>
                    </Stack>         */}
                </Drawer>
                
            </GestureHandlerRootView>
        </QueryClientProvider>

        

        

    )
}