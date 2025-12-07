import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const ColapseButton = ({ onPress }) => {

  const [direction, setDirection] = useState('180deg');
  const changeDirection = () => {
    setDirection(prev => (prev === '0deg' ? '180deg' : '0deg'));
  };

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => {changeDirection(); onPress()}}
      activeOpacity={0.7}
    >
      <Image source={require('../../assets/images/colapse_icon.png')}
       style={[styles.imageStyle, { transform: [{ rotate: direction }] }]}></Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginRight: 10,
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
    }
  },
  imageStyle : {
    width: 30, 
    height: 30, 
  }

});

    
export default ColapseButton;