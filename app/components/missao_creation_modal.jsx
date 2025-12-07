import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
// 1. IMPORTAR O PLATFORM
import { Alert, Button, Modal, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Post } from '../api';
import { Storage } from '../security_store';

export default function MissaoModal({visible, onClose, id, reload}){

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [missaoTitulo, setMissaoTitulo] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;


        setShowPicker(Platform.OS === 'ios'); 
        setDate(currentDate);
        
        setIsDateSelected(true);
    };


    const handleClose = () => {

        setShowPicker(false);
        setIsDateSelected(false);
        setMissaoTitulo('');
        setDate(new Date());
        reload();
        onClose();
    };

    return(
        <Modal
            animationType="fade"
            transparent={true} 
            visible={visible}
            onRequestClose={handleClose}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#5a5959ff', padding: 20, borderRadius: 10, borderWidth: 2 }}>
                    <Text style={{alignSelf: 'center', marginBottom : 10}}>Criação de Missão</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Insira o titulo da missão"
                        onChangeText={setMissaoTitulo}
                        value={missaoTitulo} 
                    />
                    
                    {isDateSelected && (
                        <Text style={{ marginVertical: 10 }}>
                            Data selecionada: {date.toLocaleDateString()}
                        </Text>
                    )}

                    <View style={styles.pickerButton}>
                        <Button color='#3a002bff' style={styles.buttonStyle} title='Escolher prazo' onPress={() => setShowPicker(true)} />
                    </View>
                    
                    {showPicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display="default" 
                            onChange={onChange}
                        />
                    )}
                    {isDateSelected && missaoTitulo != "" && (
                        <CreateButton 
                            titulo={missaoTitulo} 
                            date={date} 
                            meta_id={id} 
                            onCreationComplete={handleClose}
                        />
                    )}
                    

                    <Button color='#3a002bff' title="Fechar" onPress={handleClose} />
                </View>
            </View>
        </Modal>
    )
}

const showErrorAlert = () =>
    Alert.alert('Erro ao criar missão!', 'Verifique as informações e tente novamente', [
        {text: 'OK'},
]);

const showSuccessAlert = () =>
    Alert.alert('Missão criada!', 'Você já pode verifica-la', [
        {text: 'OK'},
]);


const CreateButton = ({titulo, date, meta_id, onCreationComplete}) => {

    return (
        <View style={styles.buttonStyle}>
            <Button title="Criar missão" color='#3a002bff' onPress={async () =>
            {
                const horaAtual = new Date().toISOString()
                const newMissao = {
                    'missao_titulo' : titulo,
                    'missao_inicio' : horaAtual,
                    'missao_prazo' : date.toISOString(),
                    'meta_id' : meta_id
                }
                const auth = await Storage.getItem('auth_data');
                const token = JSON.parse(auth).token
                const data = await Post('missao/criar', newMissao, token)

                if (data) {
                    showSuccessAlert();
                } else {
                    showErrorAlert();
                }


                onCreationComplete();
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
        backgroundColor: '#f1f1f1ff', 
    },

    buttonStyle: {
        marginVertical: 10,
    },
    pickerButton : {
        alignSelf: 'center',
        width: 200,
        paddingBottom: 30,
    },
})