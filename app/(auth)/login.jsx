import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, Dimensions, ImageBackground, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Get, Post } from '../api';
import { Storage } from '../security_store';
export default function LoginScreen() {
    
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');




  return (
    <View style={styles.main}>
      <ImageBackground source={require('../../assets/images/b_rose_wallpaper.png')}
        blurRadius={5}
        style={styles.background}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Username:</Text>
        <TextInput
            style={styles.input}
            placeholder="Insira o username"
            onChangeText={setUsername}
            value={username}
        />

        <Text style={styles.labelText}>Senha:</Text>
        <TextInput
            style={styles.input}
            placeholder="Insira a senha"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}/> 
          <LoginButton username={username} password={password} usernameState={setUsername} passwordState={setPassword}></LoginButton>





      </View>
        </ImageBackground>

    </View>
  );






}
const showErrorAlert = (usernameState, passwordState) =>
    Alert.alert('Erro ao logar!', 'Verifique as informações e tente novamente', [
      {text: 'OK', onPress: () => {usernameState(''); passwordState('')}},
    ]);

const LoginButton = ({username, password, usernameState, passwordState}) => {
  return (
    <View style={styles.buttonStyle}>
      <Button title="Fazer Login" onPress={async () => {
        if(username && password){
        const token = await Post('usuario/login', {'email' : username, 'password': password})
        
        if (!token){
          showErrorAlert(usernameState, passwordState);
          const isWeb = Platform.OS === "web";
          if (isWeb) window.alert("ERRO NO LOGIN")
          return
        }

        const dataString = JSON.stringify(token)
        await Storage.setItem('auth_data', dataString)
        
        const userDetails = await Get(`usuario/info/${token.id}`, token.token)


        await Storage.setItem('email', userDetails.usuario_email)
        await Storage.setItem('nome', userDetails.usuario_nome)
        router.replace("/home")
        }
      }}/>
    </View>
  )
}   


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    alignSelf: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 300,
    backgroundColor: 'pink',
  },
  labelText: {
    color: 'white',
    fontSize: 22
  },
    background : {
      justifyContent: 'center',
      alignContent: 'center',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      backgroundColor: 'rgba(207, 147, 172, 0.5)',
    },
      main:{
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
  },
    buttonStyle: {
    width: 300,
    alignSelf: 'center',
    borderRadius: 90
  }
});