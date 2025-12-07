import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Storage } from '../security_store';

export default function HomeScreen() {

    const [username, setUsername] = useState('');


useEffect(() => {
    const fetchName = async () => {
      try {
        const value = await Storage.getItem("nome"); 
        if (value) {
          setUsername(value);
        } else {
          setUsername(""); 
        }
      } catch (err) {
        console.log("Erro ao ler Storage:", err);
        setUsername(""); 
      }
    };

    fetchName();
  }, []);

  return (
    <View style={styles.main}>
      <ImageBackground source={require('../../assets/images/b_rose_wallpaper.png')}
        blurRadius={5}
        style={styles.background}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleName}>bem vindo, {username}!</Text>
          <Text style={styles.titleText}>Agenda Motivadora - DEI</Text>
        </View>       
        <StartButton></StartButton>
        </ImageBackground>

    </View>
  );
}

const StartButton = () => {
   const navigation = useNavigation();
  return (
    <View style={styles.buttonStyle}>
      <Button title="Iniciar"  onPress={() => {
        router.replace('tabs')
        }} />
    </View>
  )
}   

const styles = StyleSheet.create({
  main:{
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
  },
  titleText: {
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 32,
    color: 'red',
  },
    titleName: {
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
  buttonStyle: {
    width: 300,
    alignSelf: 'center',
    borderRadius: 90
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  background : {
    justifyContent: 'center',
    alignContent: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(207, 147, 172, 0.5)',
  }
});
