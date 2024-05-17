import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert,PermissionsAndroid } from 'react-native'
import {Link_flm_pm,Link_flm_problem,token} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_,Gr_} from '../style/Style_assets';
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import { Camera, CameraScreen } from 'react-native-camera-kit';
import Qr from '../.././Img/qr.png';
const lebar ='100%';
const lebar_tombol = '80%';
const Buat_tiket_PM = ({navigation}) => {


const itbs = token;
const [user, setUid] = useState('');
const [loading, isLoading] = useState(true);

const [notif, setNotif] = useState('');
const [regional, setRegional] = useState('');
const [data, setdata] = useState([]);

const [problem, setProblem] = useState('');
const [atm, setAtm] = useState('');
const [opneScanner, setOpneScanner] = useState(false);








useEffect(() => {
    ascdata();
    const unsubscribe = navigation.addListener('focus', () => {
    ascdata();
    });
    ascdata();
    return unsubscribe;
      }, [navigation]);

const ascdata = async () => 
{
  isLoading(true);
  const regional = await AsyncStorage.getItem('regional');
  const result = await AsyncStorage.getItem('usnm')
    if (result != null) 
    {
    setUid(result)
    setRegional(regional);
    setProblem("");
    setAtm("");
   setOpneScanner(false);
    Cek();

    isLoading(false);    
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
    }
  };




const Cek = async () => {
  
fetch(Link_flm_problem, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
          isLoading(false); 
           setdata(responseJson.data);
           console.log(responseJson.data);
      
          }
          else 
          {
          isLoading(false);
          setNotif(responseJson.status);
        
          }
           }).catch((error) =>
           {
            isLoading(false);
            console.error(error);
            setNotif('Upps ada kesalahan mohon coba lagi !!');
           });
          };



 

const Simpan = () => {
isLoading(true);
 if (problem=="" || atm=="" )
      {
    isLoading(false);
    alert("ATM dan Problem tidak boleh kosong");
      }
 
      else{
fetch(Link_flm_pm, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : user,
              atm:atm,
              problem:problem,
              regional:regional,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
        
         alert('Berhasil');
          //Cek(usid,regional); 
          navigation.navigate('Flm_detail_job',{ incident_id : responseJson.incident});
          }
          else 
          {
          isLoading(false);
          alert(responseJson.status);
          }
           }).catch((error) =>
           {
            isLoading(false);
            //console.error(error);
            alert('Upps ada kesalahan mohon coba lagi !!');
           });
          }
           
};
       

   const onOpneScanner = async () => {
        try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
        title: "Permintaan akses kamera",
        message:
          "Aplikasi akan mengakses kamera anda",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setAtm("");
            setOpneScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission error', err);
        }
  };
    const onBarcodeScan = (qrvalue) => {
    setAtm(qrvalue);
    setOpneScanner(false);
    alert(qrvalue);
  };
 



return (
<View  style={styles.Container}> 
<Modal animationType="none" visible={loading}>
<View 
    style={{  flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Bg1_
    }}>
<ActivityIndicator size="large" color={Cl_} />
</View>
</Modal>

<Modal animationType="none" visible={opneScanner}>
   <CameraScreen
  // Barcode props
  scanBarcode={true}
  onReadCode={(event) =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
  }
  showFrame={true}
  laserColor='green'
  frameColor='white'
  colorForScannerFrame={'black'}
  //cameraOptions={{
  //                torchMode	:'on' 
 //  }}
/>
<View  style={styles.cnt} >
<TouchableOpacity style={styles.button} 
       onPress={() => setOpneScanner(false)}
       activeOpacity={0.6}>
<Text style={styles.buttonText}>Kembali</Text>
</TouchableOpacity> 
</View>
</Modal>

<ScrollView
contentContainerStyle={styles.scrollView}
refreshControl={
          <RefreshControl
            refreshing={loading}
             onRefresh={ascdata}
          />
        }>


<View style={styles.Card1}>
<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20}}>ID Mesin</Text>
<View style={styles.cont1_}>
 <TextInput style={styles.inputBox}
  placeholder="ID Mesin"
  spellCheck={false}
  autoCorrect={false}
  onChangeText={value => setAtm(value)}
  value={atm}
 />
  <View style={styles.Box_}>
  <TouchableOpacity style={styles.Box}  onPress={onOpneScanner}>
  <Image source={Qr} style={styles.Imgbox}></Image>
  </TouchableOpacity>  
  </View> 
</View>



<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20}}>Problem</Text>
  <Picker style={styles.inputBox}
  selectedValue={problem}
  onValueChange={(itemValue, itemIndex) =>
    setProblem(itemValue)
  }>
     <Picker.Item label="Pilih" value=""  />
{Array.isArray(data)
        ? data.map((us,index) => {
          return(
  <Picker.Item label={us.description} value={us.description}  />
          )
       
}) : null}

   </Picker>





</View>




<View style={styles.Sadle}></View>
</ScrollView>
<View  style={styles.cnt} >
<TouchableOpacity style={styles.button} 
       onPress={() => Simpan()}
       activeOpacity={0.6}>
<Text style={styles.buttonText}>Simpan</Text>
</TouchableOpacity> 
</View>
        </View>
    )
}

export default Buat_tiket_PM


const styles = StyleSheet.create({

     Container: {
      fontFamily: "sans-serif",
      backgroundColor:Bg_,
      flex: 1,
      // remove width and height to override fixed static size
      width: null,
      height: null,
      justifyContent: "center",
      
    },
          input: {
    height: 40,
    margin: 0,
    borderWidth: 1,
    width:lebar_tombol,
    padding: 10,
    borderColor:'grey'
  },
    
      Card1: { 
       fontFamily: "sans-serif",
      justifyContent: "center",
      //alignItems:"center",
      backgroundColor:Bg_,
      flex: 1,
      paddingVertical: 35,
      paddingHorizontal:15,
      elevation: 8,
      flexDirection: 'column',
      margin: 10,
      marginBottom: 5,
      borderRadius:15,
      },
      buttonText: {
      fontSize:20,
      fontWeight:'600',
      color:Cl_,
      textAlign:'center',
      
      },
         Sadle: { 
                  bottom:10,
                  left : 20,
                  right :20,
                  backgroundColor:'transparent',
                  borderRadius:15,
                  height : 70,
                  flexDirection:'row',
                  justifyContent:'space-around'
      },
         button: {
        width:lebar_tombol,
        backgroundColor:Bg2_,
        borderRadius: 8,
        marginVertical: 10,
        paddingVertical: 13,
        elevation: 8,
        
        },
         cnt: {
      fontFamily: "sans-serif",
      justifyContent: "center",
      alignItems:"center",
     position :"absolute",
     bottom:5,
      flex: 1,
      // remove width and height to override fixed static size
      width: lebar,
      height: null,
       flexDirection:'row',
                  justifyContent:'space-around'
    },
       inputBox: {
      borderColor: Bg1_,
      borderStyle: 'solid',
      width:lebar_tombol,
      borderWidth:1,
      backgroundColor:Bg_,
      paddingHorizontal:2,
      fontSize:14,
      color:'grey',
      marginTop:10,
      paddingHorizontal:10,
      },

        cont1_: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  
     backgroundColor:'transparent',
    },
    
         Box_: {
     backgroundColor:Bg_,
     width:55,height:60,
     borderRadius:15,
     alignItems: "center",
     marginRight:10,
     marginLeft:10,
     color : Cl1_,
     flex:1,
    },
    Box: {
      flex:0,
     backgroundColor:'#ffffff',
     width:60,height:60,
     borderRadius:15,
     alignItems: "center",
     elevation: 5,
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
  });
