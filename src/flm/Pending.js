import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import {Link_flm_update_pending,token} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import Bg from '../.././Img/centang.png';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_,Gr_,Kn} from '../style/Style_assets';
const lebar ='100%';
const lebar_tombol = '80%';
const Progres = ({navigation,route}) => {
const itbs = token;
const { incident_id } = route.params;
//const { status } = route.params;

const [usid, setUid] = useState('');
const [loading, isLoading] = useState(true);
const [data, setdata] = useState([]);
const [regional, setRegional] = useState('');
const [notif, setNotif] = useState('');


const [note, setnote] = useState('');

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
     setNotif('');
     setdata('');
     setRegional(regional);
     setUid(result)
     isLoading(false);
   
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
    }
  };




const Update = () => {
isLoading(true);
if (note=='')
{ isLoading(false);
alert('Catatn tidak boleh kosong'); }
  else {
fetch(Link_flm_update_pending, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : usid,
              incident_id:incident_id,
              status:5,
              note:note,
              regional:regional,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
        
         alert('Berhasil');
         navigation.navigate('Flm_detail_job',{incident_id:incident_id});
          }
          else 
          {
          isLoading(false);
          alert(responseJson.status);
          }
           }).catch((error) =>
           {
            isLoading(false);
            console.error(error);
            alert('Upps ada kesalahan mohon coba lagi !!');
           });
           }
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
contentContainerStyle={styles.Card}
refreshControl={
          <RefreshControl
            refreshing={loading}
             onRefresh={ascdata}
          />
        }>



<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20}}>Note</Text>

 <TextInput style={styles.inputBox}
      placeholder="Note"
      spellCheck={false}
      autoCorrect={false}
        numberOfLines={4}
        multiline = {true}
      onChangeText={value => setnote(value)}
    />

    
 <View style={styles.Sadle}></View>
  <View style={styles.Sadle}></View>


</ScrollView>


<View  style={styles.cnt} >

  
 <TouchableOpacity style={styles.button} 
      onPress={() => Update()}
activeOpacity={0.6}>
<Text style={styles.buttonText}>SIMPAN</Text>
</TouchableOpacity> 
</View>
 </View>  
)
}

export default Progres


const styles = StyleSheet.create({

     Container: {
       fontFamily: "sans-serif",
      backgroundColor:Bg_,
      flex: 1,
      // remove width and height to override fixed static size
      width: null,
      height: null,
      justifyContent: "center",
      padding :10,
      
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
      logo: {
      alignItems:"center",
      height: 110,
      padding:20,
      width: 160,
      marginBottom:10,
      marginTop:20
    },
     Card: { 
       fontFamily: "sans-serif",
      backgroundColor:Bg_,
      flex: 1,
      flexDirection: 'column',
    paddingVertical:50
      },

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
  
  });
