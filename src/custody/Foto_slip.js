import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_,Gr_} from '../style/Style_assets';
//import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import GetLocation from 'react-native-get-location';
import {token,host,host_custom} from '../style/Link';
const lebar ='100%';
const lebar_tombol = '80%';
const Foto_slip = ({navigation,route}) => {

const { schedule_id } = route.params;
const { status } = route.params;
const { document_bag_no } = route.params;
const { document_seal_no } = route.params;
const { document_sticker } = route.params;
const itbs = token;
const [user, setUid] = useState('');
const [loading, isLoading] = useState(true);



const [lat, setLat] = useState('');
const [lon, setLon] = useState('');




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

  const result = await AsyncStorage.getItem('usnm')
    if (result != null) 
    {
       console.log(status);
    setUid(result)
    setImageSource(null);
    setImageMime(null);
     //Cek_lokasi();  
    isLoading(false);  
    
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
    }
  };



 

const  Simpan = async () => {

isLoading(true);
if (imagemime == null) 
{Alert.alert("Foto tidak boleh kosong");
isLoading(false); }
else {
   isLoading(true);
            const dataa = new FormData();
          //  dataa.append('foto', {
            //    type: "image/jpeg",
            //    name: new Date()+'.png',
           //     uri: imageSource
             // });
                dataa.append('schedule_id',schedule_id);
              dataa.append('foto',imagemime);
               // dataa.append('schedule_progress',status);
               // dataa.append('document_bag_no',document_bag_no);
               // dataa.append('dodument_seal_no',document_seal_no);
               // dataa.append('document_sticker',document_sticker);
         fetch(""+host_custom+"/fotosign", {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
                 'x-api-key': token,
            },
              body:dataa
           }
           )
           .then((response) => response.json())
           .then((responseJson) =>
           {
            console.log(responseJson);
              if(responseJson.status == true)
          {
          //ascdata();
            navigation.navigate('Status_job',{ schedule_id : schedule_id});
          Alert.alert('Berhasil');
            //isLoading(false);
          }
          else{
          ascdata();
          Alert.alert(responseJson.status);
          } 
           }).catch((error) =>
           {
            //ascdata();
          
            Alert.alert('Gagal upload');
              //isLoading(false);
           });  
          }
        };

const  Cek_lokasi = async () => {
isLoading(true);
if (lat==''){
GetLocation.getCurrentPosition({
      })
.then(location => {
   isLoading(false);
  setLat(location.latitude);
  setLon(location.longitude);

        })
      .catch(error => {
        isLoading(false);
      
        Alert.alert(
          "Upss",
           "Sedang mencari lokasi anda, mohon aktifkan GPS",
          [
          
            { text: "OK", onPress: () => 
           GetLocation.getCurrentPosition({
      })}
          ]
        );
      })
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
            width: 793,
            height: 1247,
            compressImageMaxWidth: 793,
            compressImageMaxHeight: 1247,
          compressImageQuality: 0.8,
          includeBase64:true,
          //compressVideoPreset: 'HightQuality',
            //cropping: true,
          }).then(image => {
            //console.log(image);
            setImageSource(image.path);
            setImageMime(`data:${image.mime};base64,${image.data}`);
             //console.log(image.mime);
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



<ScrollView
contentContainerStyle={styles.scrollView}
refreshControl={
          <RefreshControl
            refreshing={loading}
             onRefresh={ascdata}
          />
        }>

        
<View style={{padding:10,paddingVertical:30}} >


<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 12}}>Koordinat {lat},{lon}</Text>

<View style={styles.Card}>
  <Text style={{color:'grey',fontSize:16,fontWeight:'bold',textAlign:'center'}} >Foto</Text> 
<TouchableOpacity onPress={Ambilfoto}>
<View style={{backgroundColor:Bg_,height:311,width:198,alignItems:'center',justifyContent:'center'}} 
activeOpacity={0.5}>
<Image source={{uri : imageSource}} 
style={{width:198,height:311,borderWidth:2,borderColor:'#5DCAED',resizeMode:'contain'}}/>
</View>
</TouchableOpacity>
</View>


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

export default Foto_slip


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
       fontFamily: "sans-serif",
      justifyContent: "center",
      alignItems:"center",
      backgroundColor:Bg_,
      flex: 1,
      paddingVertical: 15,
      flexDirection: 'column',
      padding: 10,
      color:'blue',
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
