import { useState } from "react";
import { Button, Keyboard, Pressable, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native";
import { View } from "react-native";
import { FokusButton } from "../src/components/FokusButton";

export default function ViaCep() {
    // CEP
    // ENDEREÇO(DADOS) -> produtos -> id, nome, marca, preco dados.id, dados.nome...
    // ERROR
    // hook useState -> Pega o estado atual, modifica o estado.

    // --- ESTADOS DO COMPONENTE ---
    const [cepInput, setCepInput] = useState(''); // É o cep que você digitou
    const [dados, setDados] = useState(null); // -> É o que eu recebo na resposta
    const [error, setError] = useState(null);  // -> ERRO(quando não encontro o CEP)
    // ERROR -> é o erro que estamos tratando.
    
    const buscarCep = async () => { 
        setDados(null) // -> Limpa resultado anterior.
        setError(null) // -> Limppa erro anterior.

        Keyboard.dismiss() // -> Fecha o teclado ao iniciar a busca.

        try {
            // Faz a requisição HTTP para a API VIACEP com o cep informado.
            const url = `https://viacep.com.br/ws/${cepInput}/json/`  // WS
            const response = await fetch(url);

            // Converte a resposta para obj do js. 
            const data = await response.json();

            if(data.erro) {
                // Atualiza a mensagem de erro vinda do VIACEP
                setError('CEP não encontrado ou inválido!');
            } else {
                // Salva o objeto no estado
                setDados(data);
            }
        } catch(error) {
            // Em qualquer falha de rede/conexao.
            setError("Falha na rede. Verifique sua conexão ou tente mais tarde!")
        }    
    }

    const limparResultado = () => {
        setCepInput("");
        setDados(null);
        setError(null);
    };

    // --- INTERFACE UI ---
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Buscador de Endereço via CEP
            </Text>
            <TextInput 
                placeholder="Digite o CEP (apenas números)" 
                style={styles.input} 
                value={cepInput}  
                onChangeText={setCepInput}
                keyboardType="numeric"
                maxLength={8}
            />
            {/* Nosso componente sendo reutilizado. s2 */}
            <FokusButton 
                onPress={buscarCep}
                title={"Buscar"}
            />

            <View style={styles.results}>

                {/* Mensagem de erro */}
                { error && <Text style={styles.error}> {error} </Text>}

                {/* Se há dados, renderizar um card com as informações */}
                { dados && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}> Endereço encontrado </Text>
                        <Text style={styles.cardText}> Logradouro: {dados.logradouro} </Text>
                        <Text style={styles.cardText}> Bairro: {dados.bairro} </Text>
                        <Text style={styles.cardText}> Cidade: {dados.localidade} </Text>
                        <Text style={styles.cardText}> UF: {dados.uf} </Text>
                        <Text style={styles.cardText}> DDD: {dados.ddd} </Text>
                    </View>
                )}
            </View>
                {/* Botão para limpar o resultado */}
                {(dados || error) && (
                 <FokusButton 
                    title="Limpar Resultado"
                    onPress={limparResultado}
                 />
                )}

        </View>
    )
}
// --- ESTILOS ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#021123",
        padding: 20,
        alignItems: "stretch",
        gap: 18
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: "#fff",
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "#fff",
        marginBottom: 20,
    },
    error: {
        color: "#FF7A7A",
        textAlign: "center",
        fontSize: 16,
    },
    card: {
        backgroundColor: "#0E253F",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#294763",
        padding: 16,
        gap: 4,
        marginTop: 35
    },
    cardTitle: {
        color: '#D6E4F0',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    cardText: {
        color: '#98A0A8',
        fontSize: 16,
    }
})