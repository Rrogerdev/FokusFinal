import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const AddNotificationButton = ({ onPress }) => {



  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={require('../../assets/images/notification_icon.png')}
       style={styles.imageStyle}></Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: 5,
    marginTop: 2,
    width: 20,
    height: 20,
    borderRadius: 10, 
    backgroundColor: '#a9c335ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  imageStyle : {
    width: 20, 
    height: 20, 
  }

});

    
export default AddNotificationButton;