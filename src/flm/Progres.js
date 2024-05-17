import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import {Link_flm_detail_job,Link_flm_update_job,token} from '../style/Link';
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


const [atm_id, setatm_id] = useState('');
const [last_status,setLaststatus]=useState('');
const [lokasi,setlokasi]=useState('');
const [type,setType]=useState('');
const [remarks,setRemarks]=useState('');
const [pelapor,setPelapor]=useState('');
const [waktu_problem,setWaktu_Problem]=useState('');
const [problem,setProblem]=useState('');
const [status,setStatus]=useState('');
const [pending_note,setPendingnote]=useState('');
const [finish_note,setFinishnote]=useState('');
const [incident_no,setIncidentno]=useState('');

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
     Cek(result,regional);
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
    }
  };



const Cek = async (usr,reg) => {
fetch(Link_flm_detail_job, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : usr,
              regional:reg,
              incident_id:incident_id,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
setdata(responseJson.data);
setatm_id(responseJson.atm_id);
setLaststatus(responseJson.last_status);
setlokasi(responseJson.location_name);
setProblem(responseJson.problem_id);
setWaktu_Problem(responseJson.report_time);
setPelapor(responseJson.user_create);
setType(responseJson.type);
setRemarks(responseJson.remarks);
setStatus(responseJson.stat);
setPendingnote(responseJson.pending_note);
setFinishnote(responseJson.finish_note);
setIncidentno(responseJson.incident_no);

          isLoading(false); 
          }
          else 
          {
          isLoading(false);
          setNotif(responseJson.status);
          }
           }).catch((error) =>
           {
            isLoading(false);
            //console.error(error);
            setNotif('Upps ada kesalahan mohon coba lagi !!');
           });
          };



const Update = (val) => {
isLoading(true);
if (status=='')
{ isLoading(false);
alert('Upps ada kesalahan mohon coba lagi !!'); }
  else {
fetch(Link_flm_update_job, 
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
              status:val,
              regional:regional,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
        
         alert('Berhasil');
          Cek(usid,regional); 
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


const All = ({}) => {
return (
<View style={styles.wrapper}>
{Array.isArray(data)
        ? data.map((us,i) => {
          return ( 
  <View style={styles.stepWrapper} key={i}>
         <Text style={styles.stepText}>{us.create_date}</Text>
         {us.stat == 1?
         <Text style={styles.stepText}>OPEN</Text>
          :us.stat == 3?
         <Text style={styles.stepText}>ARRIVE</Text>
          :us.stat == 4?
         <Text style={styles.stepText}>START WORK</Text>
          :us.stat == 6?
         <Text style={styles.stepText}>FINISH</Text>
          :
         <Text style={styles.stepText}></Text>
         }
      </View>)
}) : null}
</View>
  );
}

const Pindah_halaman = (halaman,val) => {
navigation.navigate(halaman,{incident_id:val});
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


<View style={styles.wrapper1}>{
last_status=="OPEN"?
<Text numberOfLines={2}
style={{width: lebar,fontSize:22,color:Cl2_,fontWeight:'bold',marginBottom:10,textAlign:'center'}}>{last_status}
</Text>
:last_status=="TAKE WORK"?
<Text numberOfLines={2}
style={{width: lebar,fontSize:22,color:Kn,fontWeight:'bold',marginBottom:10,textAlign:'center'}}>{last_status}
</Text>
:last_status=="ARRIVE"?
<Text numberOfLines={2}
style={{width: lebar,fontSize:22,color:Kn,fontWeight:'bold',marginBottom:10,textAlign:'center'}}>{last_status}
</Text>
:last_status=="START"?
<Text numberOfLines={2}
style={{width: lebar,fontSize:22,color:Gr_,fontWeight:'bold',marginBottom:10,textAlign:'center'}}>{last_status}
</Text>
:last_status=="PENDING"?
<Text numberOfLines={2}
style={{width: lebar,fontSize:22,color:Cl2_,fontWeight:'bold',marginBottom:10,textAlign:'center'}}>{last_status}
</Text>
:last_status=="FINISH"?
<Text numberOfLines={2}
style={{width: lebar,fontSize:22,color:Gr_,fontWeight:'bold',marginBottom:10,textAlign:'center'}}>{last_status}
</Text>
:
<Text numberOfLines={2}
style={{width: lebar,fontSize:22,color:Gr_,fontWeight:'bold',marginBottom:10,textAlign:'center'}}>
</Text>
}
</View>
<View style={styles.wrapper1}>
  <Text numberOfLines={2} style={styles.wtext}>Kode Kunjungan :
{ incident_no}
</Text>
</View>
<View style={styles.wrapper1}>
  <Text numberOfLines={2} style={styles.wtext}>ATM ID :
{ atm_id}
</Text>
</View>
<View style={styles.wrapper1}>
  <Text numberOfLines={2} style={styles.wtext}>Lokasi :
{ lokasi}
</Text>
</View>
<View style={styles.wrapper1}>
  <Text numberOfLines={2} style={styles.wtext}>Problem :
{ problem}
</Text>
</View>
<View style={styles.wrapper1}>
  <Text numberOfLines={2} style={styles.wtext}>Waktu Problem : 
{ waktu_problem}
</Text>
</View>
<View style={styles.wrapper1}>
  <Text numberOfLines={2} style={styles.wtext}>Type :
{ type } FLM
</Text>
</View>

<View style={styles.wrapper1}>
  <Text numberOfLines={2} style={styles.wtext}>Pelapor :
{ pelapor}
</Text>
</View>

<View style={styles.wrapper1}>
  <Text numberOfLines={2} style={styles.wtext}>Remarks :
{ remarks}
</Text>
</View>
{
pending_note?
<View style={styles.wrapper1}>
  <Text numberOfLines={0} style={{flex: 1, flexWrap: 'wrap',marginTop:5}}>Pending Note :
{ pending_note}
</Text>
</View>
:
<View style={styles.wrapper1}>
</View>

}


{
finish_note?
<View style={styles.wrapper1}>
  <Text numberOfLines={0} style={{flex: 1, flexWrap: 'wrap',marginTop:5}}>Deskripsi Pekerjaan :
{ finish_note}
</Text>
</View>
:
<View style={styles.wrapper1}>
</View>

}



    


<All/>


{
  status ==6?
             <View style={styles.Box}>
          <Image source={Bg} style={styles.logo}></Image>
            <Text style={{fontSize:24,color:'#fff',fontWeight:'bold', color:Gr_}}>Done</Text>
            </View>
          :
   <Text style={styles.stepText}></Text>
          }
 <View style={styles.Sadle}></View>

</ScrollView>

<View  style={styles.cnt} >

  {status == 1?
        <TouchableOpacity style={styles.button} 
    onPress={() => Update(2)}
activeOpacity={0.6}>
<Text style={styles.buttonText}>TAKE WORK</Text>
</TouchableOpacity> 
          :status == 2?
       <TouchableOpacity style={styles.button} 
      onPress={() => Update(3)}
activeOpacity={0.6}>
<Text style={styles.buttonText}>ARRIVE</Text>
</TouchableOpacity> 

    :status == 3?
       <TouchableOpacity style={styles.button} 
      onPress={() => Update(4)}
activeOpacity={0.6}>
<Text style={styles.buttonText}>START WORK</Text>
</TouchableOpacity> 

          :status == 4 || status == 5 ?
          <View style={{width:"100%",flex:1,alignItems:'center'}}>
        <TouchableOpacity style={styles.button1} 
      onPress={() => Pindah_halaman('Flm_pending',incident_id)}
activeOpacity={0.6}>
<Text style={styles.buttonText}>UBAH KE PENDING</Text>
</TouchableOpacity> 
 <TouchableOpacity style={styles.button} 
      onPress={() => Pindah_halaman('Flm_input_progres',incident_id)}
activeOpacity={0.6}>
<Text style={styles.buttonText}>PROGRES PENGERJAAN</Text>
</TouchableOpacity> 
</View>
        :
         <Text style={styles.stepText}></Text>
          
         }



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
      padding: 10,
      // remove width and height to override fixed static size
      width: null,
      height: null,
      justifyContent: "center",
      alignItems:'center'
      
      
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
         button1: {
        width:lebar_tombol,
        backgroundColor:Cl2_,
        borderRadius: 8,
        marginVertical: 10,
        paddingVertical: 13,
        elevation: 8,
        
        },

 wrapper1: {
    flexDirection: 'row',
     marginHorizontal:10
  },

   wtext: {
       marginVertical:1,
       width:'100%',
    fontSize:16,
    fontWeight:'bold'
  },


        wrapper: {
    flexDirection: 'row',
     textAlign: 'center',
    justifyContent: 'center',
    marginVertical:20,
       elevation: 8,
       backgroundColor:Bg1_,
         borderRadius: 5,
  },
  stepWrapper: {
    textAlign: 'center',
    justifyContent: 'center',
    width: '25%',
  },
  stepText: {
    textAlign: 'center',
    padding: 5,
    fontSize: 12,
    color :Cl_
  },
    Box: {
      flex:0,
     backgroundColor:'#ffffff',
     width:'100%',height:250,
     borderRadius:15,
     alignItems: "center",
     color : Cl1_,
    }
  
  });
