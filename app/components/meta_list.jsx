import { Dimensions, SectionList, StyleSheet, Text, View } from 'react-native';
import { displayNowNotification, scheduleLocalNotification } from '../notifications';
import AddButton from './add_button';
import AddNotificationButton from './add_notification_button';
import ColapseButton from './colapse_button';

const { width } = Dimensions.get('window');

const ListaOtimizada = ({ sections, OpenMissaoModal, onToggle, OpenTarefaModal }) => { 
  
  const formatarData = (data) =>
    new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    }).replace('.', '');
    
  // Renderiza o Cabeçalho (A Meta em si)
  const renderMetaHeader = ({ section: { title }}) => (
    <View style={styles.metaContainer}>
      <View style={styles.metaContent}>
        <View style={styles.metaHeaderTop}>
          <Text style={styles.metaTituloText}>{title.meta_titulo}</Text>
          <View style={styles.metaBadge}>
             <Text style={styles.metaBadgeText}>Prioridade Alta</Text>
          </View>
        </View>
        
        <Text style={styles.metaDetalheText} numberOfLines={2}>
          {title.meta_detalhe || "Sem descrição detalhada."}
        </Text>
        
        <View style={styles.metaFooter}>
           <Text style={styles.metaDataText}>📅 {formatarData(title.meta_inicio)} até {formatarData(title.meta_prazo)}</Text>
           {/* Barra de progresso fake para encher linguiça */}
           <View style={styles.fakeProgressContainer}>
              <Text style={styles.progressText}>65%</Text>
              <View style={styles.progressBarBg}>
                <View style={styles.progressBarFill} />
              </View>
           </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <ColapseButton onPress={() => onToggle(title.meta_id)} />
        <View style={{height: 10}} /> 
        <AddButton title='+' onPress={() => OpenMissaoModal(title.meta_id)} />
      </View>
    </View>
  );

  // Renderiza o Item (A Missão e suas tarefas)
  const renderMissaoItem = ({ item: missao }) => (
    <View style={styles.missaoCard} key={missao.missao_id.toString()}>
      
      {/* Cabeçalho da Missão */}
      <View style={styles.missaoHeader}>
        <View style={styles.missaoTitleBlock}>
           <Text style={styles.missaoIcon}>🎯</Text>
           <Text style={styles.missaoTitulo}>{missao.missao_titulo}</Text>
        </View>
        <Text style={styles.missaoPrazo}>Até {formatarData(missao.missao_prazo)}</Text>
      </View>

      <View style={styles.divider} />

      {/* Lista de Tarefas dentro da Missão */}
      <View style={styles.tarefasContainer}>
        {missao.tarefas && missao.tarefas.length > 0 ? (
          missao.tarefas.map((tarefa, index) => (
            <View key={`${missao.missao_id}-${tarefa.tarefa_id}`} style={styles.tarefaRow}>
              {/* Fake Checkbox visual */}
              <View style={styles.checkboxOutline}>
                 {/* Se quiser simular marcado, coloque uma View colorida aqui dentro */}
              </View>
              
              <View style={styles.tarefaInfo}>
                <Text style={styles.tarefaNome}>{tarefa.tarefa_titulo}</Text>
                {tarefa.tarefa_detalhe ? <Text style={styles.tarefaDetalhe}>{tarefa.tarefa_detalhe}</Text> : null}
              </View>

              <AddNotificationButton onPress={async () => {
                const date = new Date(Date.now());
                date.setMinutes(date.getMinutes() + 1);
                await scheduleLocalNotification(date, tarefa.tarefa_titulo);
                await displayNowNotification()
              }}>
                🔔
              </AddNotificationButton>
            </View>
          ))
        ) : (
          <Text style={styles.emptyTasksText}>Nenhuma tarefa cadastrada nesta missão.</Text>
        )}
      </View>
      
      {/* Rodapé decorativo da missão */}
      <View style={styles.cardFooter}>
         <Text style={styles.statusText}>Status: Em andamento</Text>
      </View>
    </View>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.missao_id.toString()} 
      renderItem={renderMissaoItem} 
      renderSectionHeader={renderMetaHeader} 
      style={styles.listStyle}
      contentContainerStyle={styles.contentContainer}
      stickySectionHeadersEnabled={false} // Desliga o sticky header para não bugar o visual "card"
      SectionSeparatorComponent={() => <View style={{ height: 15 }}/>} 
      ListFooterComponent={<View style={{ height: 50 }} />}
    />
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    paddingBottom: 40,
    paddingHorizontal: 5, 
  },
  
  // --- Estilos da META (Header da Seção) ---
  metaContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(57, 0, 71, 0.9)', // Roxo escuro translúcido
    borderRadius: 16,
    padding: 15,
    marginTop: 20,
    marginBottom: 10, // Espaço entre o header da meta e a primeira missão
    borderLeftWidth: 5,
    borderLeftColor: '#f3228b', // Faixa rosa lateral
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    alignItems: 'center',
  },
  metaContent: {
    flex: 1,
    paddingRight: 10,
  },
  metaHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  metaTituloText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  metaBadge: {
    backgroundColor: 'rgba(243, 34, 139, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f3228b',
  },
  metaBadgeText: {
    fontSize: 10,
    color: '#ff8dc7',
    fontWeight: 'bold',
  },
  metaDetalheText: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  metaFooter: {
    marginTop: 5,
  },
  metaDataText: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 5,
  },
  fakeProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    color: '#f3228b',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 8,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
  },
  progressBarFill: {
    width: '65%', // Fake width
    height: '100%',
    backgroundColor: '#f3228b',
    borderRadius: 3,
  },
  actionButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },

  // --- Estilos da MISSÃO (Item da Lista) ---
  missaoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    
    // ALTERAÇÕES AQUI PARA O CARD FICAR MENOR E SEPARADO
    marginVertical: 8,      // Espaçamento vertical entre missões
    marginHorizontal: 15,   // Espaçamento lateral maior (indentação)
    
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  missaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12, // Reduzi um pouco o padding
    backgroundColor: '#fdfdfd',
  },
  missaoTitleBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  missaoIcon: {
    fontSize: 16, // Ícone um pouco menor
    marginRight: 8,
  },
  missaoTitulo: {
    fontSize: 15, // Fonte levemente menor para hierarquia
    fontWeight: '700',
    color: '#333',
    flexShrink: 1,
  },
  missaoPrazo: {
    fontSize: 10,
    color: '#888',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    width: '100%',
  },
  tarefasContainer: {
    padding: 12, // Reduzi o padding interno
    backgroundColor: '#fff',
  },
  tarefaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Espaçamento entre tarefas levemente reduzido
  },
  checkboxOutline: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 10,
  },
  tarefaInfo: {
    flex: 1,
  },
  tarefaNome: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  tarefaDetalhe: {
    fontSize: 11,
    color: '#999',
  },
  emptyTasksText: {
    fontStyle: 'italic',
    color: '#bbb',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 5,
  },
  cardFooter: {
    backgroundColor: '#fafafa',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statusText: {
    fontSize: 9, // Texto de rodapé menor
    color: '#aaa',
    textAlign: 'right',
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});

export default ListaOtimizada;