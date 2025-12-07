import { Pressable, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { IconCheck, IconPencil, IconTrash} from "../Icons"

// Componente que recebe status de conclusão e texto da tarefa
export default function TaskItem( {text}) {
    return (
        <View style={styles.container}>
            <Pressable> 
                <IconCheck /> {/* Icone para ação de completar */} 
            </Pressable>

            <Text style={styles.text}>
                {text}
            </Text>

            <Pressable>
                <IconPencil />  {/* Icone para ação de editar */}                 
            </Pressable>

            <Pressable>
                <IconTrash />   {/* Icone para ação de excluir */}
            </Pressable>
        </View>
    )   
}

// Declaração dos estilos usados no card
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: "#98A0A8",
        paddingHorizontal: 8,
        paddingVertical: 18,
        justifyContent: 'space-between',
        borderRadius: 8,  
    },
    text: {
        color: "#021123",
        fontSize: 18,
    }
})
