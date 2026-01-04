import { StatusBar } from "expo-status-bar";
import { useContext, useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import styled from 'styled-components/native';
import AuthCotext from "../contexts/authContext";
import { loadUser, login } from "../services/authService";
export default function LoginScreen({navigation}) {
  const {setUser} = useContext(AuthCotext);
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [generalError, setGeneralError] = useState("");

  // Función que maneja el proceso de inicio de sesión
  async function manejoLogin() {
    console.log(email);
    console.log(password);
    try{
      await login(
        {
          email,
          password
        },  
      );

      // Si el login es correcto, se carga el usuario
      const user = await loadUser();
      setUser(user);

      console.log("res",data);
    } catch(e){
      if (e.response?.status === 422) {
        setGeneralError(e.response.data.mensaje);
      }

      if (e.response?.status === 401) {
        setGeneralError(e.response.data.mensaje);
      }
    }
    
  }



  return (
    
    <Contenedor style={{paddingTop:Platform.OS==="ios"?0:50,flex: 1 }} >
      <StatusBar style="auto"/>
      <View style={styles.container}>
        <View style={styles.header}>
         <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/247774434?s=200&v=4' }}
          style={styles.headerImg}
          resizeMode="contain"
        />
          <Text style={styles.title}>
           Vuelve a <Text style={{ color: '#075eec' }}>Alcorcón Conecta</Text>
          </Text>
          <Text style={styles.subtitle}>
Accede a planes y eventos de tu alrededor          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            {generalError !== "" && (
              <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
                {generalError}
              </Text>
            )}
            <Text style={styles.inputLabel}>Correo electrónico</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email} 
              />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(text) => setPassword(text)}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={password} 
              />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={manejoLogin}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Iniciar Sesión</Text>
              </View>
            </TouchableOpacity>

          </View>
          <TouchableOpacity
            onPress={()=> {
              navigation.navigate("OlvidePass");
            }}>
            <Text style={styles.formLink}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          //navigation.navigate("Crear cuenta");
        }}>
        <Text style={styles.formFooter}>
          ¿No tienes cuenta?{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </Contenedor>
  );
}


const Contenedor = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffffff;
`;


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 25,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  /** Formulario */
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#662E9B',
    textAlign: 'center',
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Campos de texto */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  /** Botones */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#43BCCD',
    borderColor: '#43BCCD',
  },
 btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
