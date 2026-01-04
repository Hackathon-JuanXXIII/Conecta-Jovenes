import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
export default function Index(){
    const datarutas=[
        {name:'Iniciar Sesion', href:'/iniciar-sesion'},
        {name:'Registrarse', href:'/(registrarse)'},
    ];

    const renderItem=({item})=>{
        
        return(
            <TouchableOpacity onPress={()=>router.push(item.href)}>
                <LinnkButton href={item.href}>
                <IconContainer>
                    <MaterialIcons name="insert-drive-file" size={24} color="#fff"/>
                    <Name>{item.name}</Name>
                </IconContainer>
                
                <Arrow name="chevron-right"/>
            </LinnkButton>
            </TouchableOpacity>
            
        )
    };
    return(
        <Container style={{paddingTop:Platform.OS==="ios"?0:50}}>
            <StatusBar style="light"/>
            <Title>MENU</Title>
            <List keyExtractor={(item)=>item.name} data={datarutas} renderItem={renderItem}/>
        </Container>
    )
}
const Container = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color: #000;
`;

const Title = styled.Text`
    color:#fff;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight:bold;
`;
//estilos para el render item
const LinnkButton = styled.View`
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 20px;
    flex-direction: row;
    align-items:center;
    border: 2px solid #333;
    justify-content: space-between;
    width: 100%; 
`;
const Name =styled.Text`
    color:#fff;
    font-size: 20px;
`;

const Arrow = styled(MaterialIcons)`
    color:#fff;
    font-size:30px;
`;

const IconContainer = styled.View`
    flex-direction: row;
    align-items:center;
    gap: 5px;
`;
const List = styled(FlatList)`
    
    width:100%;
    padding: 10px;
`;