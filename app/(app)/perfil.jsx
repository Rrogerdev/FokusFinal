import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Get } from '../api';
import { Storage } from '../security_store';

const { width, height } = Dimensions.get('window');

export default function Perfil() {
  const [data, setData] = useState({ username: 'Carregando...', email: '...' });
  const [numMetas, setNumMetas] = useState(0)

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const username = await Storage.getItem('nome');
        const email = await Storage.getItem('email');
        
        setData({
          username: username || 'Usuário',
          email: email || 'usuario@email.com'
        });
        const auth = await Storage.getItem('auth_data');
        const id = JSON.parse(auth).id
        const token = JSON.parse(auth).token

        const metas = await Get(`meta/contarPorUsuario/${id}`, token);
        setNumMetas(metas)
      } catch (e) {
        console.log("Erro ao carregar", e);
      }
    };
    
    carregarDados();
  }, []);

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const handleFakeAction = (action) => {
    Alert.alert("Em desenvolvimento", `A funcionalidade ${action} estará disponível em breve!`);
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/images/b_rose_wallpaper.png')} 
        blurRadius={3} 
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Meu Perfil</Text>
            </View>

            <View style={styles.card}>
              
              <View style={styles.avatarContainer}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{getInitials(data.username)}</Text>
                </View>
                <Text style={styles.usernameText}>{data.username}</Text>
                <Text style={styles.emailText}>{data.email}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Membro Novo</Text>
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{numMetas}</Text>
                  <Text style={styles.statLabel}>Metas Criadas</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>4.8</Text>
                  <Text style={styles.statLabel}>Pontuação</Text>
                </View>
                <View style={styles.statDivider} />
              </View>

              <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleFakeAction('Editar Perfil')}>
                  <Text style={styles.menuText}>Editar Dados Pessoais</Text>
                  <Text style={styles.arrowText}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]} onPress={() => Alert.alert('Sair', 'Deseja realmente sair?')}>
                  <Text style={[styles.menuText, {color: '#d63031'}]}>Sair da Conta</Text>
                </TouchableOpacity>
              </View>

            </View>
            
            <Text style={styles.footerText}>Feito por mim ebaaa</Text>

          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: 'rgba(100, 100, 100, 0.9)',
    flex: 1,
    width: width,
    height: height,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: -50,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#911963',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  usernameText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#fce4ec',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 5,
  },
  badgeText: {
    color: '#911963',
    fontSize: 12,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#911963',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#e0e0e0',
  },
  menuContainer: {
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
  arrowText: {
    fontSize: 18,
    color: '#ccc',
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 30,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  }
});