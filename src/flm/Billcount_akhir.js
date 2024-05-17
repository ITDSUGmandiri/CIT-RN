import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import {Link_flm_pic,Link_flm_bak,token} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_,Gr_} from '../style/Style_assets';
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
const lebar ='100%';
const lebar_tombol = '80%';
const Billcount_akhir = ({navigation,route}) => {

const { sc_id } = route.params;
const { incident_id } = route.params;

const itbs = token;
const [user, setUid] = useState('');
const [loading, isLoading] = useState(true);

const [notif, setNotif] = useState('');
const [regional, setRegional] = useState('');


const [denom, setDenom] = useState('');
const [rem, setRem] = useState('');
const [rej, setRej] = useState('');

const [dis, setDis] = useState('');


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
  const regional = await AsyncStorage.getItem('regional');
  const result = await AsyncStorage.getItem('usnm')
    if (result != null) 
    {
    setUid(result)
    setRegional(regional);
    setDenom("");
    setRem("");
    setRej("");
    setImageSource(null);
    setImageMime(null);
    isLoading(false);    
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
    }
  };







 

   const Simpan = async () => {
 if (denom=="" || rem=="" || rej=="" || dis=="" || imageSource == null)
      {
    isLoading(false);
    alert("Denom,remaining,reject,dispense dan foto  tidak boleh kosong");
      }
   /*   else if (lokasi_khusus==0 && imageSource == null)
      {
         isLoading(false);
        alert("Gambar tidak boleh kosong");
      } */
      else{
      


  isLoading(true);
fetch(Link_flm_bak, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : user,
              incident_id:incident_id,
              sc_id : sc_id,
              regional: regional,
              val :rem,
              val_j :rej,
              denom :denom,
              val_d :dis,
              itbs:itbs
            
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {

            if (imageSource == null)
            {
                 navigation.navigate('Flm_input_progres',{ incident_id : incident_id});
            Alert.alert(' Berhasil namun tidak ada foto');
          
              //isLoading(false);
            }
            else{

  const nm = responseJson.nama;
            const dataa = new FormData();
            dataa.append('image', {
                type: "image/jpeg",
                name: nm,
                uri: imageSource
              })
         fetch(Link_flm_pic, {
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
          //ascdata();
              navigation.navigate('Flm_input_progres',{ incident_id : incident_id});
          Alert.alert('Berhasil');
           
          }
          else{
          ascdata();
          Alert.alert(responseJson.status);
          } 
           }).catch((error) =>
           {
            //ascdata();
                navigation.navigate('Flm_input_progres',{ incident_id : incident_id});
            Alert.alert(' Berhasil namun foto gagal terupload');
           
           });  
            }
          
          }
          else 
          {
          isLoading(false);
           Alert.alert(responseJson.status);
          }
           }).catch((error) =>
           {
            isLoading(false);
            //console.error(error);
            alert("Gagal input");
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
             width: 350,
            height: 350,
            maxHeight: 1000,
             compressImageMaxWidth: 350,
          compressImageMaxHeight: 350,
          compressImageQuality: 1,
          //compressVideoPreset: 'HightQuality',
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



<ScrollView
contentContainerStyle={styles.scrollView}
refreshControl={
          <RefreshControl
            refreshing={loading}
             onRefresh={ascdata}
          />
        }>

        
<View style={{padding:10,paddingVertical:30}} >

<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20}}>Denom</Text>
<Picker style={styles.input}
  selectedValue={denom}
  onValueChange={(itemValue, itemIndex) =>
    setDenom(itemValue)
  }>
    <Picker.Item label="Pilih Denom" value="" />
  <Picker.Item label="Rp.100.000" value="100000" />
  <Picker.Item label="Rp.50.000" value="50000" />
   <Picker.Item label="Rp.20.000" value="20000" />
</Picker>
<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20}}>Remaining</Text>
<TextInput style={styles.input}
      placeholder="Input remaining"
      spellCheck={false}
      autoCorrect={false}
       keyboardType="numeric"
      onChangeText={value => setRem(value)}
    />
 <Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20}}>Dispensed</Text>
<TextInput style={styles.input}
      placeholder="Input dispend"
      spellCheck={false}
      autoCorrect={false}
       keyboardType="numeric"
      onChangeText={value => setDis(value)}/>

<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20}}>Reject</Text>
<TextInput style={styles.input}
      placeholder="Input Reject"
      spellCheck={false}
      autoCorrect={false}
       keyboardType="numeric"
      onChangeText={value => setRej(value)}
    />

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
       onPress={() => Simpan()}
       activeOpacity={0.6}>
<Text style={styles.buttonText}>Simpan</Text>
</TouchableOpacity> 
</View>
        </View>
    )
}

export default Billcount_akhir


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
