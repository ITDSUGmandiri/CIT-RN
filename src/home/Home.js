
import React,{useState,useEffect} from 'react';
import { RefreshControl,Alert,StyleSheet,TouchableOpacity,ActivityIndicator,ScrollView,Image, View, Text,TextInput,Modal,Linking } from 'react-native';
import {Link_Permission,host,host_custom,token} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_} from '../style/Style_assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons/faBagShopping'
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowRightArrowLeft'
import { faTruckPickup } from '@fortawesome/free-solid-svg-icons/faTruckPickup'
import { faListCheck } from '@fortawesome/free-solid-svg-icons/faListCheck'
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons/faUnlockKeyhole'
import { faKeyboard } from '@fortawesome/free-solid-svg-icons/faKeyboard'
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey'
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons/faMoneyBillTransfer'
import { faExchange } from '@fortawesome/free-solid-svg-icons/faExchange'
import pp from '../.././Img/profile.png';
import Qr from '../.././Img/qr.png';
const lebar_tombol = '80%';

//const wd = '100%';
const Home  = ({navigation}) => {
  const itbs = token;
  const [loading, isLoading] = useState(true);
  const [usname, setUname] = useState('');
  const [type, setType] = useState('');
    const [uid, setUid] = useState('');
  const [notif, setNotif] = useState('');
  const [status,setStatus] = useState(0);
const [data, setdata] = useState([]);
 // const imageURL = host+"foto_user/"+uid+".png?time=" + new Date();
   useEffect(() => {
   // ascdata();
    const unsubscribe = navigation.addListener('focus', () => {
    ascdata();
    });
    ascdata();
    return unsubscribe;
      }, [navigation]);


const ascdata = async () => {
  isLoading(true);
    const result = await AsyncStorage.getItem('usnm');
    const typ = await AsyncStorage.getItem('user_type');
    const usname = await AsyncStorage.getItem('username');
     const tk = await AsyncStorage.getItem('tk');
 
    if (typ != null) 
    {
      Cek(result,tk);
      setType(typ);
      setUid(result);
      setUname(usname);
      setNotif("");
      isLoading(false);  
     
    }
   else
   {
     isLoading(true);
    AsyncStorage.clear ()
    navigation.replace('Login');
  }
};





const Cek = async (result,tk) => {
  const link = ""+host_custom+"/Permission";
fetch(link, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : result,
              tk :tk
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
          isLoading(false); 
          //alert(responseJson.status)
          setStatus('1');
          }
          else if (responseJson.status == '2')
          {
          isLoading(false);
          
          alert('Update tersedia');
             Linking.openURL(responseJson.msg);
          }

           else
          {
          isLoading(false);
          AsyncStorage.clear();
          navigation.replace('Login');
            isLoading(false);
           alert(responseJson.msg);
          }
           }).catch((error) =>
           {
            isLoading(false);
            //console.error(error);
            setNotif('Upps ada kesalahan mohon coba lagi !!');
           });
          };






  const Pindah_halaman = (halaman) => {

    navigation.navigate(halaman);

  };



const Permission  = ({id,per}) => {
return (
<View>
 { 
 status == 1?
 type=='custody1'?
 <View>
  <View style={styles.Box_}>
          <TouchableOpacity style={styles.Box} onPress={() => Pindah_halaman('Custody_list_job')}>
       <FontAwesomeIcon icon={ faSort } style={styles.Imgbox} size={ 32 } />
          </TouchableOpacity>  
          <Text style={styles.Judulbox}>List Job </Text>
          </View>   


            <View style={styles.Box_}>
          <TouchableOpacity style={styles.Box} onPress={() => Pindah_halaman('Custody_delivery_job')}>
       <FontAwesomeIcon icon={ faTruckPickup } style={styles.Imgbox} size={ 32 } />
          </TouchableOpacity>  
          <Text style={styles.Judulbox}>Delivery Job / CPC </Text>
          </View>  

            <View style={styles.Box_}>
          <TouchableOpacity style={styles.Box} onPress={() => Pindah_halaman('Custody_history_job')}>
       <FontAwesomeIcon icon={ faListCheck } style={styles.Imgbox} size={ 32 } />
          </TouchableOpacity>  
          <Text style={styles.Judulbox}>History Job </Text>
          </View>
            </View>  
          :type=='cpc'?
           <View>
            <View style={styles.Box_}>
          <TouchableOpacity style={styles.Box} onPress={() => Pindah_halaman('Cpc_list_job')}>
       <FontAwesomeIcon icon={ faMoneyBillTransfer } style={styles.Imgbox} size={ 32 } />
          </TouchableOpacity>  
          <Text style={styles.Judulbox}>CPC Job </Text>
          </View>  
          </View>  
 :type=='security'?
 <View>

              <View style={styles.Box_}>
          <TouchableOpacity style={styles.Box} onPress={() => Pindah_halaman('Scu_in')}>
       <FontAwesomeIcon icon={ faMoneyBillTransfer } style={styles.Imgbox} size={ 32 } />
          </TouchableOpacity>  
          <Text style={styles.Judulbox}>SCU IN </Text>
          </View>  

                <View style={styles.Box_}>
          <TouchableOpacity style={styles.Box} onPress={() => Pindah_halaman('Scu_out')}>
       <FontAwesomeIcon icon={ faMoneyBillTransfer } style={styles.Imgbox} size={ 32 } />
          </TouchableOpacity>  
          <Text style={styles.Judulbox}>SCU OUT </Text>
          </View>  

          </View>
        
          :
          <View></View>
          :
           <View></View>
 }

</View>
  );
}



  
  return (
    <View style={{backgroundColor:Bg_,
      flex: 1}}>
      <Modal  animationType="none"
      visible={loading}>
     <View style={{  flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Bg1_
    }}>
        <ActivityIndicator size="large" color={Cl_} />
        </View>
      </Modal>
       <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={ascdata}
          />
        }
      >
      <View style={styles.Container}>
      
   
          
          <Text style={{fontSize:24,color:'#fff',fontWeight:'bold', flexWrap: 'wrap'}}>{usname}</Text>
           </View>
  


<View style={styles.Card}>
<View style={styles.cont1}>
<View style={styles.cont1_}>

<Permission/>



   
</View>
</View>
</View>






<View style={styles.Card}>
<View style={styles.cont2}>
<Text style={{fontSize:12,color:'red',fontWeight:'normal'}}>{notif}</Text>
 </View>


</View>
 <View style={styles.sadle}>

</View>
  
         


          </ScrollView>
       





































     





       
     </View>


  );
}



const styles = StyleSheet.create({
  Container: {
    elevation: 8,
    height:80,
    flex:1,
    justifyContent: "center",
    alignItems:"center",
    backgroundColor:Bg1_,
    fontFamily: 'sans-serif-light',
    fontWeight: 'normal',
    marginBottom:20,
       flexDirection: 'column',
  },
   cont1: {
      fontFamily: "sans-serif",
      justifyContent: "center",
      alignItems:'center',
      backgroundColor:Bg_,
      paddingVertical: 10,
      elevation: 5,
      flexDirection: 'column',
      color:'grey',
      marginTop: 10,
      marginBottom: 5,
      borderRadius:15,
      flex:1,
      //height:120
    },
  cont1_: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10
    },
   
 cont2: {
      fontFamily: "sans-serif",
      alignItems:"center",
      backgroundColor:Bg_,
      flex: 1,
      paddingVertical: 15,
      // remove width and height to override fixed static size
      width: null,
      height: null,
    },
    logo: {
      alignItems:"center",
      borderRadius:560,
      height: 100,
      padding:20,
      width: 100,
      marginBottom:10,
      marginTop:20
    },
    Card:{
      backgroundColor: Bg_,
      borderRadius: 15,
      flexDirection: 'column',
      padding: 10,
      color:'grey',
      marginBottom: 0,
      marginLeft: 10,
      marginRight: 10,
    },
    button: {
          width:lebar_tombol,
          backgroundColor:Bg_,
          borderRadius: 8,
          paddingVertical: 13,
          borderColor:Bg1_,
          borderWidth:2,
          //elevation: 8,
          },
    buttonText: {
        fontSize:14,
        fontWeight:'500',
        color:Bg1_,
        textAlign:'center',
        fontWeight: 'bold',
        elevation: 8,
        },
     Box_: {
     backgroundColor:Bg_,
     width:55,height:100,
     borderRadius:15,
     alignItems: "center",
     marginRight:10,
     marginLeft:10,
     color : Cl1_,
     flex:0,
     padding:10
    },
    Box: {
      flex:0,
     backgroundColor:'#ffffff',
     width:60,height:60,
     borderRadius:15,
     alignItems: "center",
     elevation: 5,
     marginRight:10,
     marginLeft:10,
     color : Cl1_,
    },
    Imgbox: { 
     backgroundColor:'transparent',
     resizeMode:"cover",
     width:30,
     height:30,
     justifyContent: "center",
     top:15, 
    },
    Judulbox: {
      fontSize:10,
      color:'grey',
      marginTop:5,
      width:65,
      height:60,
      textAlign:'center',
      fontFamily: 'sans-serif',
      //fontWeight: 'normal',
       margin:10
    },
    sadle: {
    backgroundColor:"transparent",
    height:50,
    width:"auto",
    bottom:0,
    },
});

export default Home;