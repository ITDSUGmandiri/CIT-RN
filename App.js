import React,{Component,useState} from 'react';
import { StyleSheet,View,SafeAreaView } from 'react-native';
import Navigasi from './src/navigasi/Navigasi';
//import { NavigationContainer } from '@react-navigation/native';
import GlobalStyles from './src/style/GlobalStyles';

import NotifService from './NotifService';
import { LogBox } from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import { ReactNativeFirebase } from '@react-native-firebase/app';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); 
const App = () => {
const [registerToken,setRegisterToken]=useState('');
const [fcmRegistered,setFcmRegistered]=useState('');


const onRegister=(token)=> {
  setRegisterToken(token.token);
  setFcmRegistered(true);
}
const onNotif =(notif) => {
  alert(notif.title);
}

const notif = new NotifService(onRegister,onNotif);
const handlePerm =(perms) => {
  alert('Permission',JSON.stringify(perms))
}
  
  
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
    
  
    <View style={styles.container}>
    <Navigasi/>
     
   </View>
  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container: {
  backgroundColor:'#ffffff',
  flex: 1,
  // remove width and height to override fixed static size
  resizeMode: 'cover',
},


});
export default App;