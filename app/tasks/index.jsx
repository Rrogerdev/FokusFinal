import { View, Text } from "react-native";
import TaskItem from "../../src/components/TaskItem";

export default function Tasks() {
    return(
        <View>
            <Text> Página para listar tarefas</Text>
            <TaskItem 
                text="Estudar história do Brasil"
            />
            <TaskItem 
                text="Estudar lingua portuguesa"
            />
        </View>
    )
}