import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import {host_custom,token} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_} from '../style/Style_assets';
//import ImagePicker from 'react-native-image-crop-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'
import { Camera, CameraScreen } from 'react-native-camera-kit';
const lebar ='100%';
const lebar_tombol = '80%';
const Profile = ({navigation}) => {
const itbs = token;
const [user, setUid] = useState('');
const [loading, isLoading] = useState(true);
const [nip, setnip] = useState('');
const [username, setusername] = useState('');
const [email, setemail] = useState('');
const [reg, setreg] = useState('');
const [telp, settelp] = useState('');
const [notif, setNotif] = useState('');
const [vinput, setInput] = useState(false);
const [lama, setpasslama] = useState('');
const [baru, setpassbaru] = useState('');
  useEffect(() => {
  isLoading(true);
  setTimeout(() => {
  ascdata();
}, 1000);
}, []);
const [imageSource, setImageSource] =  useState(null);
const [imagemime, setImageMime] =  useState(null);
const ascdata = async () => 
{
  isLoading(true);
const result = await AsyncStorage.getItem('usnm')
    if (result != null) 
    {
      Cek(result);
      setUid(result)
      //isLoading(false);    
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
    }
  };



const Cek = async (usr) => {

  fetch(""+host_custom+"/Profile",
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
               user : usr,
               itbs :'itbs_v1'
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
             isLoading(false);
             setnip(responseJson.nip);
             setemail(responseJson.email);
             setusername(responseJson.username);
             settelp(responseJson.telp);
             setreg(responseJson.regional);
            // setImageSource(null);
            
          }
          else 
          {
           isLoading(false);
            alert("Gagal load profil");
          }
           }).catch((error) =>
           {
            isLoading(false);
            console.error(error);
            alert('Upps ada kesalahan mohon coba lagi !!');
           });
          };

    
    


          const Simpan = async () => {


        isLoading(true);    
  if (baru=="" || lama=="")
{
  isLoading(false);
  alert("Password lama dan baru tidak boleh kosong");
}

else  if (baru== lama)
{
  isLoading(false);
  alert("Password lama dan baru tidak boleh sama");
}
else{
  fetch(""+host_custom+"/Change_pass",
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : user,
              lama:lama,
              baru:baru,
               itbs :'itbs_v1'
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
          alert('Berhasil');
          setInput(false);
          isLoading(false);
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
    
 
/*
const Submit = () => {

  if (imageSource == null)
{
  isLoading(false);
   alert("Gambar Kosong");
}

else {

  isLoading(true);
    const nm = iudstrg+'.png';
            const dataa = new FormData();
            dataa.append('image', {
                type: "image/jpeg",
                name: nm,
                uri: imageSource
              })
         fetch(Foto_profile, {
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
    
          isLoading(false);
     
                Alert.alert('Berhasil terupload');
          }
          else{
          ascdata();
          Alert.alert(responseJson.status);
          } 
           }).catch((error) =>
           {
            ascdata();
            
              isLoading(false);
             
                Alert.alert(' Foto gagal terupload');
           });
          }
          };

 */
 const gantipass = () => {
setInput(true);
setpasslama('');
setpassbaru('');
 }
 
      const Ambilfoto = () => {

        const  options = {
           
            storageOptions: {
                skipBackup:true,
              path: 'images',
              noData : true,
            },
       
          };
          //ImagePicker.openCamera({
          ImagePicker.openPicker({
            width: 350,
            height: 350,
            maxHeight: 1000,
             compressImageMaxWidth: 350,
          compressImageMaxHeight: 350,
          compressImageQuality: 1,
          //compressVideoPreset: 'HightQuality',
            cropping: true,
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

<Modal animationType="none" visible={vinput}>
<View style={{padding:10,paddingVertical:30}} >



<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20}}>Password lama</Text>

 <TextInput style={styles.inputBox}
      placeholder="password lama"
      spellCheck={false}
      value={lama}
      autoCorrect={false}
      secureTextEntry={true}
       //keyboardType="text"
      onChangeText={value => setpasslama(value)}
    />


<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20}}>Password baru</Text>

 <TextInput style={styles.inputBox}
      placeholder="password baru"
       value={baru}
      spellCheck={false}
      autoCorrect={false}
      secureTextEntry={true}
       //keyboardType="text"
      onChangeText={value => setpassbaru(value)}
    />




</View>
<View  style={styles.cnt} >
<TouchableOpacity style={styles.button2} 
       onPress={() => setInput(false)}
       activeOpacity={0.6}>
<Text style={styles.buttonText}>Kembali</Text>
</TouchableOpacity> 
<TouchableOpacity style={styles.button1} 
       onPress={() => Simpan()}
       
       activeOpacity={0.6}>
<Text style={styles.buttonText}>Reset</Text>
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
        }
      >
<View style={styles.Card1}>  
{ /*
<View style={styles.Card}>  

<TouchableOpacity onPress={Ambilfoto}>
<View style={{backgroundColor:Bg_,width:150,height:200,alignItems:'center',justifyContent:'center' ,margin:20}} 
activeOpacity={0.5}>
<Image source={{uri : imageSource}} 
style={{width:150,height:200,borderWidth:2,borderColor:'#5DCAED',resizeMode:'contain'}}/>
</View>
</TouchableOpacity>
<TouchableOpacity style={styles.button} 
 onPress={() => Submit()}
activeOpacity={0.6}>
<Text style={styles.buttonText}>Save Picture</Text>
</TouchableOpacity> 
</View>
*/
}

<Text style={styles.label}>NIP :</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'normal'}}>{nip}</Text>
<Text style={styles.label}>Username :</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'normal'}}>{username}</Text>
<Text style={styles.label}>Email :</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'normal'}}>{email}</Text>
<Text style={styles.label}>Telp :</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'normal'}}>{telp}</Text>
<Text style={styles.label}>Regional :</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'normal'}}>{reg}</Text>
 <View style={styles.Box_}>
          <TouchableOpacity style={styles.Box}   onPress={() => gantipass()}>
            <FontAwesomeIcon icon={ faGear } style={styles.Imgbox} size={ 32 } />
          </TouchableOpacity>  
          <Text style={styles.Judulbox}>Ganti Password</Text>
          </View> 
</View>

 
</ScrollView>
        </View>
    )
}

export default Profile


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

      Card: { 
        justifyContent: "center",
    alignItems:"center",
    fontFamily: 'sans-serif-light',
    fontWeight: 'normal',
    marginBottom:20
      },
    
      Card1: { 
       fontFamily: "sans-serif",
      justifyContent: "center",
      //alignItems:"center",
      backgroundColor:Bg_,
      flex: 1,
      paddingVertical: 15,
      elevation: 5,
      flexDirection: 'column',
      padding: 10,
      color:'grey',
      margin: 10,
      marginBottom: 5,
      borderRadius:15,
      },
          button: {
        width:lebar_tombol,
        backgroundColor:Bg2_,
        borderRadius: 8,
        marginVertical: 10,
        paddingVertical: 13,
        elevation: 8,
        
        },

           buttonText: {
      fontSize:18,
      fontWeight:'600',
      color:Cl_,
      textAlign:'center',
      
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
      button1: {
         width:'50%',
        backgroundColor:Bg2_,
        marginVertical: 10,
        paddingVertical: 13,
        },
         button2: {
        width:'50%',
        backgroundColor:Cl2_,
        marginVertical: 10,
        paddingVertical: 13,
        },

             buttonText: {
      fontSize:20,
      fontWeight:'600',
      color:Cl_,
      textAlign:'center',
      
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
      width:lebar,
      borderWidth:1,
      backgroundColor:Bg_,
      paddingHorizontal:2,
      fontSize:14,
      color:'grey',
      marginTop:10,
      paddingHorizontal:10,
      },
  });
