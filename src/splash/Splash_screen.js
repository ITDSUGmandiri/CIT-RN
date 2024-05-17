import React,{useEffect} from 'react'
import { StyleSheet, Text, View,Image, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../.././Img/ug-logo.png';
import {Bg_,Cl1_,Bg1_} from '../style/Style_assets';
import { PermissionsAndroid,BackHandler  } from 'react-native';
const lebar = '100%';
const Splash_screen = ({navigation}) => {
       useEffect(() => {
        setTimeout(() => {
          lok();
    }, 1000);
      }, []);
    
    
     //const [usname, setUname] = useState('');
    
    
     
  const ascdata = async () => {
  try {
   const result = await AsyncStorage.getItem('usnm')
  // alert(result)
    if(result !== null) {
      navigation.replace('Bottom_navigasi');
    }
       else {
          AsyncStorage.clear();
          navigation.replace('Login');
       
        }
  } catch(e) {
       AsyncStorage.clear();
          navigation.replace('Login');
  }
}
     

      const lok = async () => {
       try {
         const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
        title: "Permintaan akses lokasi",
        message:
          "Aplikasi akan mengakses lokasi anda",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           // console.log("You can use the location")
           // alert("You can use the location");
            ascdata();
          } else {
            //console.log("location permission denied")
            alert("Mohon berikan akses lokasi");
            BackHandler.exitApp();
          }
      } catch (err) {
         //console.warn(err)
         }
       
    };
  
  


    return (
        <View style={styles.container}>
             <View style={styles.logo}>
      <Image source={Logo} style={{width:300,height:80}}></Image>
      
    </View>
        </View>
    )
}

export default Splash_screen


const styles = StyleSheet.create({

    container: {
        justifyContent: "center",
        alignItems:"center",
        backgroundColor:Bg1_,
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
        fontFamily: "sans-serif"
    },
    logo: {
        backgroundColor:Bg_,
        color:Cl1_,
        justifyContent: "center",
        alignItems:"center",
        //borderRadius:50,
        width:lebar,
        height:80
        }
     


});

