import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert,TouchableHighlight,PermissionsAndroid } from 'react-native'
import {Link_input_ganti_seal_kaset,Link_ganti_seal_pic,token} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_} from '../style/Style_assets';
import Qr from '../.././Img/qr.png';
import ImagePicker from 'react-native-image-crop-picker';
import { Camera, CameraScreen } from 'react-native-camera-kit';

const lebar ='100%';
const lebar_tombol = '70%';
const Ganti_seal_kaset = ({navigation,route}) => {
 const { incident_id } = route.params;
  //qr
const [qrvalue, setQrvalue] = useState('');
const [opneScanner, setOpneScanner] = useState(false);
const [qrvalue1, setQrvalue1] = useState('');
const [opneScanner1, setOpneScanner1] = useState(false);




const itbs = token;
const [usid, setUid] = useState('');
const [loading, isLoading] = useState(true);
const [regional, setRegional] = useState('');
const [imageSource, setImageSource] =  useState(null);
const [imagemime, setImageMime] =  useState(null);
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
 
const result = await AsyncStorage.getItem('usnm');
const regional = await AsyncStorage.getItem('regional');
    if (result != null) 
    {
    setImageSource(null);
    setImageMime(null);
    setUid(result);
    setRegional(regional);
    isLoading(false);    
    setQrvalue('');
    setOpneScanner(false);
    setQrvalue1('');
    setOpneScanner1(false);
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
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
            setQrvalue("");
            setOpneScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission error', err);
        }
  };
    const onBarcodeScan = (qrvalue) => {
    setQrvalue(qrvalue);
    setOpneScanner(false);
    alert(qrvalue);
  };



   const onOpneScanner1 = async () => {
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
            setQrvalue1("");
            setOpneScanner1(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission error', err);
        }
  };
    const onBarcodeScan1 = (qrvalue) => {
    setQrvalue1(qrvalue);
    setOpneScanner1(false);
    alert(qrvalue);
  };



const Submit = () => {

  if (qrvalue=="" || qrvalue1=="" || imageSource == null)
{
  isLoading(false);
  alert("Seal lama ,Seal baru dan gambar tidak boleh kosong");
}

 else if (qrvalue == qrvalue1)
{
  isLoading(false);
  alert("Seal lama dan Seal baru tidak boleh sama");
}
else {

  isLoading(true);
fetch(Link_input_ganti_seal_kaset, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : usid,
              regional: regional,
              incident_id: incident_id,
              seal_lama :qrvalue,
              seal_baru : qrvalue1,
              itbs:itbs
            
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
            const nm = responseJson.nama;
            const dataa = new FormData();
            dataa.append('image', {
                type: "image/jpeg",
                name: nm,
                uri: imageSource
              })
         fetch(Link_ganti_seal_pic, {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            },
              body:dataa
           }
           )
           .then((response) => response.json())
           .then((responseJson) =>
           {
  if(responseJson.status == '1')
          {
          ascdata();
          Alert.alert('Berhasil terupload');
            isLoading(false);
          }
          else{
          ascdata();
          Alert.alert(responseJson.status);
          } 
           }).catch((error) =>
           {
            ascdata();
            Alert.alert(' Berhasil namun foto gagal terupload');
              isLoading(false);
           });
          }
          else 
          {
          isLoading(false);
           Alert.alert(responseJson.status);
          }
           }).catch((error) =>
           {
            isLoading(false);
            console.error(error);
            alert("Gagal ganti seal");
           });
           }
          };

    

 




  const Ambilfoto = () => {

        const  options = {
           
            storageOptions: {
                skipBackup:true,
              path: 'images',
              noData : true,
            },
       
          };
          ImagePicker.openCamera({
          //ImagePicker.openPicker({
            width: 300,
            height: 300,
            maxHeight: 1000,
             compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          compressImageQuality: 1,
          //compressVideoPreset: 'MediumQuality',
            //cropping: true,
          }).then(image => {
            //console.log(image);
            setImageSource(image.path);
            setImageMime(image.mime);
          }).catch(e => {
            if (e.code !== 'E_PICKER_CANCELLED') {
              //console.log(e);
              Alert.alert('Sorry, there was an issue attempting to get the image/video you selected. Please try again');
            }
          });

        
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


<Modal animationType="none" visible={opneScanner1}>
  <CameraScreen
  // Barcode props
  scanBarcode={true}
  onReadCode={(event) =>
  onBarcodeScan1(event.nativeEvent.codeStringValue)
  }
  showFrame={true}
  laserColor='green'
  frameColor='white'
  colorForScannerFrame={'black'}
  //cameraOptions={{
  //                torchMode	:'on' 
 //  }} setOpneScanner(false)
/>
<View  style={styles.cnt} >
<TouchableOpacity style={styles.button} 
       onPress={() => setOpneScanner1(false)}
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
<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20}}>Seal Lama {incident_id}</Text>

<View style={styles.cont1_}>
 <TextInput style={styles.input}
  placeholder="Seal Lama"
  spellCheck={false}
  autoCorrect={false}
  onChangeText={value => setQrvalue(value)}
  value={qrvalue}
 />
  <View style={styles.Box_}>
  <TouchableOpacity style={styles.Box}  onPress={onOpneScanner}>
  <Image source={Qr} style={styles.Imgbox}></Image>
  </TouchableOpacity>  
  </View> 
</View>


<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20}}>Seal Baru</Text>

<View style={styles.cont1_}>
 <TextInput style={styles.input}
  placeholder="Seal Baru"
  spellCheck={false}
  autoCorrect={false}
  onChangeText={value => setQrvalue1(value)}
  value={qrvalue1}
 />
  <View style={styles.Box_}>
  <TouchableOpacity style={styles.Box}  onPress={onOpneScanner1}>
  <Image source={Qr} style={styles.Imgbox}></Image>
  </TouchableOpacity>  
  </View> 
</View>






   
<View style={styles.Card}>
  <Text style={{color:'grey',fontSize:16,fontWeight:'bold',textAlign:'center'}} >Foto</Text> 
<TouchableOpacity onPress={Ambilfoto}>
<View style={{backgroundColor:Bg_,width:180,height:220,alignItems:'center',justifyContent:'center'}} 
activeOpacity={0.5}>
<Image source={{uri : imageSource}} 
style={{width:180,height:220,borderWidth:2,borderColor:'#5DCAED',resizeMode:'contain'}}/>
</View>

</TouchableOpacity>
</View>

</View>

 <View style={styles.Sadle}></View>

</ScrollView>
<View  style={styles.cnt} >
<TouchableOpacity style={styles.button} 
       onPress={Submit}
       activeOpacity={0.6}>
<Text style={styles.buttonText}>Simpan</Text>
</TouchableOpacity> 
</View>
        </View>
    )
}

export default Ganti_seal_kaset


const styles = StyleSheet.create({
  cnt: {
      fontFamily: "sans-serif",
      justifyContent: "center",
      alignItems:"center",
     position :"absolute",
     bottom:10,
      flex: 1,
      // remove width and height to override fixed static size
      width: lebar,
      height: null,
       flexDirection:'row',
                  justifyContent:'space-around'
    },
     Container: {
      fontFamily: "sans-serif",
      backgroundColor:Bg_,
      flex: 1,
      // remove width and height to override fixed static size
      width: null,
      height: null,
      justifyContent: "center",
      
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
       input: {
    height: 40,
    margin: 0,
    borderWidth: 1,
    width:lebar_tombol,
    padding: 10,
    borderColor:'grey'
  },
      buttonText: {
      fontSize:20,
      fontWeight:'600',
      color:Cl_,
      textAlign:'center',
      
      },
      button: {
        width:lebar_tombol,
        backgroundColor:Bg2_,
        borderRadius: 8,
        marginVertical: 10,
        paddingVertical: 13,
        elevation: 8,
        
        },
          Card: { 
        backgroundColor: Bg_,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 10,
        marginRight: 10,
        alignItems:"center",
      },
        Sadle: { 
                  bottom:10,
                  left : 20,
                  right :20,
                  backgroundColor:'transparent',
                  borderRadius:15,
                  height : 80,
                  flexDirection:'row',
                  justifyContent:'space-around'
      },

         Box_: {
     backgroundColor:Bg_,
     width:55,height:60,
     borderRadius:15,
     alignItems: "center",
     marginRight:10,
     marginLeft:10,
     color : Cl1_,
     flex:0,
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
      cont1_: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
     backgroundColor:'transparent',
    },
   
  });
