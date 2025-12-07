import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    // Simular login - em produção, integrar com API
    Alert.alert('Sucesso', 'Login realizado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formSection}>
        <Image source={require('../src/assets/svg/logo.svg')} style={styles.logo} />
        <Text style={styles.title}>Login into your account</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="johndoe@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Login Now</Text>
          </TouchableOpacity>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Signup Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.illustrationSection}>
        <Text style={styles.illustrationText}>You Should, MoveIt!</Text>
        <Image source={require('../src/assets/svg/main-illustration.svg')} style={styles.illustration} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 45,
    color: '#555555',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 34,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F1F3F6',
    backgroundColor: '#F1F3F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    fontSize: 16,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#1E2772',
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#7001FD',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#EEEEEE',
  },
  dividerText: {
    marginHorizontal: 20,
    fontSize: 14,
    color: '#EEEEEE',
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#7001FD',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#7001FD',
    fontSize: 16,
  },
  illustrationSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  illustrationText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#555555',
  },
  illustration: {
    width: 200,
    height: 200,
  },
});
