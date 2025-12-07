import { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Get } from '../api';
import ListaOtimizada from '../components/meta_list';
import MissaoModal from '../components/missao_creation_modal';
import { Storage } from '../security_store';

const { width, height } = Dimensions.get('window');

export default function Main() {
  const [sections, setSections] = useState([]);
  const [MetaModalVisible, setMetaModalVisible] = useState(false);
  const [metaIdSelecionada, setMetaIdSelecionada] = useState(null);

  const abrirMissaoModal = (id) => {
    setMetaIdSelecionada(id); 
    setMetaModalVisible(true);
  };

  const fecharMissaoModal = () => {
    setMetaModalVisible(false);
    setMetaIdSelecionada(null);
  };

  const carregarDados = async () => {
    try {
      const auth = await Storage.getItem('auth_data');
      if (!auth) return;

      const id = JSON.parse(auth).id;
      const token = JSON.parse(auth).token;

      const data = await Get(`meta/listarPorUsuario/${id}`, token);

      if (Array.isArray(data)) {
        const metasOrdenadas = data.slice().sort((b, a) => {
          return a.meta_id - b.meta_id;
        });

        const sectionsMapeadas = metasOrdenadas.map(meta => {
          const missoes = Array.isArray(meta.missoes) ? meta.missoes : [];
          
          const missoesOrdenadas = missoes.slice().sort((b, a) => {
            return a.missao_id - b.missao_id;
          });
          
          const metaModificada = { ...meta, showMeta: true };
          return {
            title: metaModificada,
            data: missoesOrdenadas,
            backupData: missoesOrdenadas,
            metaId: meta.meta_id,
          };
        });

        setSections(sectionsMapeadas);
      } else {
        setSections([]); 
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const toggleMeta = (metaId) => {
    const novasSections = sections.map(section => {
      if (section.metaId === metaId) {
        const isVisible = section.title.showMeta;
        return {
          ...section,
          title: {
            ...section.title,
            showMeta: !isVisible
          },
          data: isVisible ? [] : [...section.backupData]
        };
      }
      return section;
    });
    setSections(novasSections);
  };

  useEffect(() => {
    carregarDados(); 
  }, []);

  return (
    <View style={styles.container}>
      {/* StatusBar clara para contrastar com o wallpaper escuro */}
      <StatusBar barStyle="light-content" />
      
      <ImageBackground 
        source={require('../../assets/images/b_rose_wallpaper.png')}
        blurRadius={3} // Mesmo blur do perfil
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          
          {/* Header Estilizado */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Minhas Metas</Text>
            <Text style={styles.headerSubtitle}>
              {sections.length} {sections.length === 1 ? 'meta ativa' : 'metas ativas'}
            </Text>
          </View>

          {/* Área Principal da Lista */}
          <View style={styles.listContainer}>
             {/* Verifica se tem metas, se não tiver, mostra mensagem bonita */}
             {sections.length > 0 ? (
                <ListaOtimizada 
                  sections={sections} 
                  OpenMissaoModal={abrirMissaoModal} 
                  onToggle={toggleMeta} 
                />
             ) : (
               <View style={styles.emptyContainer}>
                 <Text style={styles.emptyText}>Nenhuma meta encontrada.</Text>
                 <Text style={styles.emptySubText}>Comece criando uma nova meta!</Text>
               </View>
             )}
          </View>

          <MissaoModal 
            visible={MetaModalVisible} 
            onClose={fecharMissaoModal} 
            id={metaIdSelecionada} 
            reload={carregarDados} 
          />
          
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
    flex: 1,
    width: width,
    height: height,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Overlay escuro para melhorar leitura
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(145, 25, 99, 0.2)', // Leve tom roxo no topo
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffcce6', // Um rosa bem claro
    marginTop: 5,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptySubText: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 5,
  }
});