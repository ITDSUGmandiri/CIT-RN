import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect,useState} from 'react'
import { NativeModules } from 'react-native';
import {Cl_,Bg1_} from '../style/Style_assets';
import { StyleSheet, Text, View,Modal } from 'react-native'
const { RNStorage } = NativeModules;
const Logout = ({navigation}) => {
  const [loading, isLoading] = useState(true);
        setTimeout(() => {
        AsyncStorage.clear();
        //RNStorage.clearAppData();
        navigation.replace('Login');
        }, 2000);
      
     

       return (
        <View style={styles.container}>
        <Modal  animationType="none"
      visible={loading}>
     <View style={{  flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Bg1_
    }}>
      <Text style={styles.Textbox}>Terimakasih</Text>
        </View>
      </Modal>
       
  
    
            
         </View>
      );

}

const styles = StyleSheet.create({
    container: { 
      justifyContent: "center",
      alignItems:"center",
      backgroundColor:Bg1_,
      flex: 1,
      // remove width and height to override fixed static size
      width: null,
      height: null,
    },
  
    Textbox: {
      color:Cl_,
      fontSize:30,
      fontWeight:'bold',
      textAlign:'center',
    
      }
  
  });
  

export default Logout

