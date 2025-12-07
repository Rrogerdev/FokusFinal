import { Link, router } from 'expo-router';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FokusButton } from '../src/components/FokusButton';


export default function Index() {
 return (
   <View style={styles.container}>
    <Image source={require('../src/assets/images/logo.png')}/>
    <View style={styles.inner}>
      <Text style={styles.title}>
            Otimize sua produtividade,{'\n'}
          <Text style={styles.bold}>
              mergulhe no que importa
          </Text>
      </Text>
      <Image source={require('../src/assets/images/tela_inicial.png')}/>
      <FokusButton 
        title='Quero Iniciar!'
        onPress={() => router.navigate('/viacep')}
        />
    </View>

    {/* <Link href={{ pathname: '/pomodoro'}}>Quero Iniciar!</Link>  */}

    <View style={styles.footer}>
            <Text style={styles.footerText}>
              Projeto fictício e sem fins comerciais.
            </Text>
            <Text style={styles.footerText}>
              Desenvolvido por Aluno. 
            </Text>
          </View>
   </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#021123',
    gap: 40
  },
  inner: {
    gap: 16,
  },
  title: {
    color: '#FFF',
    textAlign: "center",
    fontSize: 26,
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    width: '80%',
  },
  footerText: {
    textAlign: 'center',
    color: '#98A0A8',
    fontSize: 12.5
  }
})

