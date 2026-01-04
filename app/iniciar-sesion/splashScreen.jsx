import { Platform } from "react-native";
import styled from "styled-components/native";
// Pantalla de carga (Splash / Loading)
export default function(){
    return(
        <Container style={{paddingTop:Platform.OS==="ios"?0:50,flex: 1 }}>
            <Texto>Cargando...</Texto>
        </Container>
    )
}
const Container = styled.SafeAreaView`
    flex:1;
`;

const Texto = styled.Text`

`;