import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Bg_, Cl_, Bg1_, Cl1_, Bg2_, Cl2_, Kn} from '../style/Style_assets';
import {host, host_custom, token} from '../style/Link';
import Logo from '../.././Img/ug-logo.png';
import GetLocation from 'react-native-get-location';
import messaging from '@react-native-firebase/messaging';

const lebar = '90%';
const tinggi = '36%';
const lebar_logo = '100%';
const lebar_tombol = '80%';
const Login = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      ascdata();
      //CheckConnectivity()
      isLoading(false);
    }, 1000);
  }, []);
  const ascdata = async () => {
    const result = await AsyncStorage.getItem('usnm');
    cektoken();
    if (result != null) {
      navigation.replace('Bottom_navigasi');
    } else {
      AsyncStorage.clear();
    }
  };

  /*

  const  CheckConnectivity  = () => {
       NetInfo.fetch().then(isConnected => {
        if (isConnected==false) {
          Alert.alert("You are online!");
        } 
   });
  }
*/

  /*

const [registerToken,setRegisterToken]=useState('');
const cektoken = async () => {  
const fcmToken = await messaging().getToken();
 if (fcmToken) {
setRegisterToken(fcmToken);
 } 
 else{
  await messaging().registerDeviceForRemoteMessages();
  const fcmToken1 = await messaging().getToken();
  setRegisterToken(fcmToken1);
 }

    };
    */

  const itbs = token;
  const [notif, setNotif] = useState('');
  const [usnm, setText] = useState('');
  const [pass, setPass] = useState('');
  const [iudstrg, setUid] = useState('');

  const [loading, isLoading] = useState(true);
  //const link = ""+host+"/user_mobile/all?X-Api-Key=FF94460CBE3597A8C46A0F3C56A91E6B&filter=&field=&start=&limit=&filters[0][co][0][fl]=user_username&filters[0][co][0][op]=equal&filters[0][co][0][vl]="+usnm+"&filters[0][co][0][lg]=and&filters[0][co][2][fl]=user_userpass&filters[0][co][2][op]=equal&filters[0][co][2][vl]="+pass+"&filters[0][co][2][lg]=and&sort_field=&sort_order=ASC";

  const link = '' + host_custom + '/Login';

  const daftar = () => {
    navigation.navigate('Formdaftar');
  };

  const lupapass = () => {
    navigation.navigate('Lupapassword');
  };

  const [registerToken, setRegisterToken] = useState('');
  const cektoken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      setRegisterToken(fcmToken);
    } else {
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken1 = await messaging().getToken();
      setRegisterToken(fcmToken1);
    }
  };

  const onsub = () => {
    if (usnm == '') {
      setNotif('Username tidak boleh kosong');
    } else if (pass == '') {
      setNotif('Password tidak boleh kosong');
    } else {
      isLoading(true);
      fetch(link, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: usnm,
          password: pass,
          tok_ken: registerToken,
          itbs: itbs,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson)
          if (responseJson.status == '1') {
            console.log(responseJson);
            AsyncStorage.setItem('usnm', responseJson.user_mobile_id);
            AsyncStorage.setItem('username', responseJson.user_name);
            AsyncStorage.setItem('regional', responseJson.id_branch);
            AsyncStorage.setItem('user_type', responseJson.user_type);
            AsyncStorage.setItem('tk', responseJson.srt);
            navigation.replace('Splash_screen');
          } else {
            isLoading(false);
            setNotif(responseJson.status);
          }
        })
        .catch(error => {
          isLoading(false);
          setNotif('Mohon maaf anda gagal masuk');
          console.error(error);
        });
    }
  };

  const onsub_backup = () => {
    NetInfo.fetch().then(net => {
      /*   GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
      })
      .then(location => {*/

      if (net.isConnected == false) {
        alert('Internet tidak terkoneksi');
      } else {
        if (usnm == '') {
          setNotif('Username tidak boleh kosong');
        } else if (pass == '') {
          setNotif('Password tidak boleh kosong');
        } else {
          isLoading(true);
          fetch(link)
            .then(response => response.json())
            .then(responseJson => {
              //console.log(responseJson.data.custody1);

              if (responseJson.status === true) {
                AsyncStorage.setItem(
                  'usnm',
                  responseJson.data.user_mobile[0].user_mobile_id,
                );
                AsyncStorage.setItem(
                  'username',
                  responseJson.data.user_mobile[0].user_name,
                );
                AsyncStorage.setItem(
                  'regional',
                  responseJson.data.user_mobile[0].id_branch,
                );
                AsyncStorage.setItem(
                  'user_type',
                  responseJson.data.user_mobile[0].user_type,
                );
                navigation.replace('Splash_screen');

                // isLoading(false);
                // alert(responseJson.data.custody1[0].custody_id);
              } else {
                isLoading(false);
                setNotif(responseJson.status);
              }
            })
            .catch(error => {
              isLoading(false);
              setNotif('Mohon maaf anda gagal masuk');
              console.error(error);
            });
        }

        /*   })
      .catch(error => {
        Alert.alert(
           "Upss",
          "Sedang mencari lokasi anda, mohon aktifkan GPS",
          [
            { text: "OK", onPress: () => 
            //GetLocation.openGpsSettings()
                      GetLocation.getCurrentPosition({
 //enableHighAccuracy: false,
  
    //maximumAge: 10000
      })
          
          }
          ]
        );
        

      })*/
      }
    });
  };
  return (
    <View style={styles.container}>
      <Modal animationType="none" visible={loading}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Bg1_,
          }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </Modal>
      <View style={styles.logo}>
        <Image source={Logo} style={{width: 300, height: 80}}></Image>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: lebar_logo,
        }}>
        <Text
          style={{
            color: Cl_,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 25,
          }}>
          C.I.T
        </Text>
        <Text
          style={{margin: 5, fontSize: 12, color: Cl2_, fontWeight: 'normal'}}>
          {notif}
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Username"
          spellCheck={false}
          autoCorrect={false}
          onChangeText={text => setText(text)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          secureTextEntry={true}
          //value={pass}
          onChangeText={pass => setPass(pass)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={onsub}
          activeOpacity={0.6}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity 
onPress={daftar}
activeOpacity={0.6}>
<Text style={{fontFamily: "sans-serif",color: Cl_,fontWeight:'bold',}}> Belum punya akun ? Daftar di sini </Text>
</TouchableOpacity> */}
        <TouchableOpacity
          style={{
            //borderStyle: 'solid',
            //borderWidth: 1,
            borderColor: Cl1_,
            backgroundColor: Bg1_,
            borderRadius: 10,
            marginVertical: 5,
            padding: 5,
          }}
          onPress={lupapass}
          activeOpacity={0.6}>
          {/*<Text style={{  fontFamily: "sans-serif",color: Cl_,fontWeight:'bold'}}>Lupa password</Text> */}
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: Bg_,
          fontSize: 12,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 25,
        }}>
        powered by ITBS UG MANDIRI
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    fontFamily: 'sans-serif',
    alignItems: 'center',
    backgroundColor: Bg1_,
    flex: 1,
    margin: 0,
  },

  inputBox: {
    width: lebar,
    backgroundColor: Bg_,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Cl1_,
    marginVertical: 10,
    elevation: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Cl_,
    textAlign: 'center',
  },
  button: {
    width: lebar_tombol,
    backgroundColor: Bg2_,
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 13,
    elevation: 8,
  },
  logo: {
    alignItems: 'center',
    //borderBottomRightRadius:50,
    //borderBottomLeftRadius:50,
    justifyContent: 'center',
    height: tinggi,
    width: lebar_logo,
    backgroundColor: Bg_,
    top: 0,
  },
});

export default Login;
