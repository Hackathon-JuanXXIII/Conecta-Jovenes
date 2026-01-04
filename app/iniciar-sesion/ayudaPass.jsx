import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Platform
} from "react-native";
import styled from "styled-components/native";

export default function AyudaContrasena({navigation}) {

  // Estado que guarda el email o teléfono introducido por el usuario
  const [emailOrPhone, setEmailOrPhone] = useState("");


  // Función que valida si el valor introducido es un teléfono
  // Acepta números con o sin prefijo internacional (+)
  const esTelefono = (valor) => {
    const telefonoRegex = /^\+?\d{7,15}$/;
    return telefonoRegex.test(valor);
    };

    // Función que valida si el valor introducido es un email
    const esEmail = (valor) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(valor);
    };

  return (
    <Contenedor style={Platform.OS==="ios"?{paddingTop:0}:{paddingTop:50}}>
        <StatusBar style="dark"/>
  
        <Title>Ayuda de contraseña</Title>

        <Descripcion>
          Introduzca la dirección de correo electrónico o el número de teléfono
          móvil asociados con su cuenta de Alcorcon conecta.
        </Descripcion>

        <InputText
          placeholder="Introduzca su email o telefono"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          keyboardType="email-address"
        />
        

        <Boton onPress={() => {
            if (esTelefono(emailOrPhone)) {
              navigation.navigate('VerificacionTel', {
                TEL: emailOrPhone,
              });
              
            } else if (esEmail(emailOrPhone)) {
              navigation.navigate('VerificacionEmail', {
                EMAIL: emailOrPhone,
              });
            } else {
              alert('Introduce un email o teléfono válido');
            }
        }}>
          <BotonTexto>Recuperar contraseña</BotonTexto>
        </Boton>
  
    </Contenedor>
  );
}

const Contenedor = styled.SafeAreaView`
    flex: 1;
    background-color: "#fff";
    padding:24px;
`;

const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
    color: "#000";
`;

const Descripcion = styled.Text`
    font-size: 14px;
    color: "#333";
    margin-bottom: 20px;
`;

const InputText = styled.TextInput`
    height: 44px;
    border-color: gray;
    border-radius: 4px;
    border-width:1px;
    padding: 10px;
    margin-bottom: 20px;
    
`;

const Boton = styled.TouchableOpacity`
    background-color: #f5b70cff;
    padding: 12px;
    border-radius: 4px;
    align-items: center;
`;

const BotonTexto = styled.Text`
    color: "#000";
    font-weight: bold;
    font-size: 14px;
`;