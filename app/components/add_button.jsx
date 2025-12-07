import { StyleSheet, Text, TouchableOpacity } from 'react-native';


const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.plusSign}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {

    width: 30,
    height: 30,
    borderRadius: 15, 
    backgroundColor: '#007AFF',
    

    justifyContent: 'center',
    alignItems: 'center',


    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plusSign: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 32, 
  },
});

export default AddButton;