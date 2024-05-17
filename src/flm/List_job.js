import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import {Link_flm_list_job,token} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_, Kn, Gr_} from '../style/Style_assets';
const lebar ='100%';
const lebar_tombol = '80%';
const List_job = ({navigation}) => {
const itbs = token;
const [iudstrg, setUid] = useState('');
const [loading, isLoading] = useState(true);
const [load, setload] = useState(true);
const [data, setdata] = useState([]);
const [halaman, sethalaman] = useState(false);
const [notif, setNotif] = useState('');
const [regional, setRegional] = useState('');
const [limit, setlimit] = useState(1);
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};
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
        sethalaman(false);
     setNotif('');
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
   //lm = parseInt(limit);
fetch(Link_flm_list_job, 
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
              limit:0,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
          isLoading(false); 
           setdata(responseJson.data);
          //setlimit(limit);
          }
          else 
          {
          isLoading(false);
          setNotif(responseJson.status);
          //setlimit(0);
          }
           }).catch((error) =>
           {
            isLoading(false);
            console.error(error);
            setNotif('Upps ada kesalahan mohon coba lagi !!');
           });
          };



           const Load_more = async (usr,reg) => {
sethalaman(true);
setload(false);
setlimit(limit+1);
alert("Halaman "+limit);
fetch(Link_flm_list_job, 
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
              limit:limit,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
          isLoading(false); 
           setdata([...data,...responseJson.data]);
          setlimit(limit+1);
           setload(true);
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
    
const Pindah_halaman = (us) => {
navigation.navigate('Flm_detail_job',{incident_id:us.incident_id});
};

const All = ({detail,last_status,id,type,incident_no,atm_id,report_time,problem_id,remarks,location_name}) => {
return (
<View>  
<TouchableOpacity  onPress={detail} style={styles.Card1}>

{last_status=="OPEN"?
<Text numberOfLines={2}
style={{width: lebar,fontSize:20,color:Cl2_,fontWeight:'bold',marginBottom:2}}>{last_status}
</Text>
:last_status=="TAKE WORK"?
<Text numberOfLines={2}
style={{width: lebar,fontSize:20,color:Kn,fontWeight:'bold',marginBottom:2}}>{last_status}
</Text>
:last_status=="ARIVE"?
<Text numberOfLines={2}
style={{width: lebar,fontSize:20,color:Kn,fontWeight:'bold',marginBottom:2}}>{last_status}
</Text>
:last_status=="START"?
<Text numberOfLines={2}
style={{width: lebar,fontSize:20,color:Gr_,fontWeight:'bold',marginBottom:2}}>{last_status}
</Text>
:last_status=="PENDING"?
<Text numberOfLines={2}
style={{width: lebar,fontSize:20,color:Cl2_,fontWeight:'bold',marginBottom:2}}>{last_status}
</Text>
:
<Text numberOfLines={2}
style={{width: lebar,fontSize:20,color:Gr_,fontWeight:'bold',marginBottom:2}}>
</Text>
}


<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>No Incident : {incident_no} 
</Text>
<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>ATM ID : {atm_id}
</Text>
<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>Lokasi : {location_name} 
</Text>
<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>Problem : {problem_id} 
</Text>
<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>Waktu Problem : {report_time} 
</Text>
<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>Type : {type} 
</Text>
<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>Remarks : {remarks} 
</Text>
</TouchableOpacity>
</View>
)
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
        }
        
         onScroll={({nativeEvent}) => {
      if (isCloseToBottom(nativeEvent)) {
      if(load)
      {
        Load_more(iudstrg,regional);
      }

      }
    }}
    scrollEventThrottle={100}
        >
{Array.isArray(data)
        ? data.map((us,index) => {
return <All 
key={index}
index={index}
last_status={us.stat} 
id={us.incident_id} 
type={us.type} 
incident_no={us.incident_no} 
atm_id={us.atm_id} 
report_time={us.report_time} 
problem_id={us.problem_id} 
remarks={us.remarks} 
location_name={us.location_name} 

detail={() => Pindah_halaman(us)}
/>
}) : null}
<View style={{ margin: 10}}>
<Text numberOfLines={2}
style={{width: lebar,fontSize:12,color:Cl2_,marginBottom:2}}> 
{notif}
</Text>
</View>
{halaman?
<View style={styles.cont2}>
<ActivityIndicator size="large" color={Bg1_} />
 </View>
 :
 <View>

<Text></Text>

 </View>
  }
 <View style={styles.Sadle}></View>
</ScrollView>
<View  style={styles.cnt} >
<TouchableOpacity style={styles.button} 
 onPress={() => navigation.navigate('Flm_create_pm')}
activeOpacity={0.6}>
<Text style={styles.buttonText}>Buat Tiket PM</Text>
</TouchableOpacity> 
</View>
        </View>
    )
}

export default List_job


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
    
      Card1: { 
       fontFamily: "sans-serif",
      justifyContent: "center",
      //alignItems:"center",
      backgroundColor:Bg_,
      flex: 1,
      paddingVertical: 15,
      elevation: 8,
      flexDirection: 'column',
      padding: 10,
      color:'blue',
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
