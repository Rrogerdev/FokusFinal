import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer
      screenOptions={{        
        headerStyle: {                       // Define o estilo do cabecalho das telas
          backgroundColor: "#021123",      // Define a cor de fundo do header
        },
        headerTintColor: '#FFF',           // Ajusa a cor do texto
        drawerStyle: {
          backgroundColor: "#021123",       // Cor de fundo do drawer
        },
        drawerLabelStyle: {
          color: "#FFF",                    // Cor do texto do drawer
        }
      }
    }
    >
      <Drawer.Screen                          // Configurações da tela index
        name='index'
        options={{
          headerShown: false,                  // Oculta o cabeçalho da tela index
          drawerItemStyle: {
            display: "none",}                  // Oculta o index do drawer
        }}
      />

      <Drawer.Screen 
        name='pomodoro'
        options={{
          drawerLabel: "Timer",                // Nome que vai ser apresentado no drawer
          title: ''                            // Ajusta o título do cabeçalho
        }}
      />

      <Drawer.Screen 
        name='viacep'
        options={{
          drawerLabel: "Meu CEP",               
          title: ''                            
        }}
      />

      <Drawer.Screen 
        name='tasks/index'
        options={{
          drawerLabel: "Lista de Tarefas",               
          title: ''                            
        }}
      />

      <Drawer.Screen
        name='add-task/index'
        options={{
          headerShown: false,
          drawerItemStyle: {
            display: 'none'
          }
        }}
      />

      <Drawer.Screen
        name='login'
        options={{
          drawerLabel: "Login",
          title: ''
        }}
      />



      
    
    </Drawer>)

}
