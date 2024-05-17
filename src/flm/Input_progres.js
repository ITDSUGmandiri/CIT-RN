import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import {Link_flm_form_progres,Link_flm_update_finish,Link_flm_del_bak,token, Link_flm_del_bawal,host,Link_flm_del_foto} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_,Gr_,Kn} from '../style/Style_assets';
import Qr from '../.././Img/qr.png';
import {Picker} from '@react-native-picker/picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowRightArrowLeft'
import { faCameraAlt } from '@fortawesome/free-solid-svg-icons/faCameraAlt'
import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons/faMoneyBillAlt'
const lebar ='100%';
const lebar_tombol = '80%';
const Input_progres = ({navigation,route}) => {
const itbs = token;
const { incident_id } = route.params;

//const { status } = route.params;

const [usid, setUid] = useState('');
const [loading, isLoading] = useState(true);
const [regional, setRegional] = useState('');
const [notif, setNotif] = useState('');
const [note, setnote] = useState('');
const [stat,setStat]=useState('');

const [atm_id,setAtm_id]=useState('');
const [incident_no,setIncidentno]=useState('');
const [problem,setProblem]=useState('');
const [sc_id,setSc_id]=useState('');

const [data_bill_awal, setbillawal] = useState([]);
const [data_bill_akhir, setbillakhir] = useState([]);
const [data_seal, setSeal] = useState([]);
const [data_foto, setFoto] = useState([]);


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
fetch(Link_flm_form_progres, 
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
          isLoading(false); 
          setAtm_id(responseJson.atm_id)
          setbillawal(responseJson.baw);
          setbillakhir(responseJson.bak);
          setIncidentno(responseJson.incident_no);
          setProblem(responseJson.problem_id);
          setSc_id(responseJson.sc_id)
          setSeal(responseJson.seal);
           setFoto(responseJson.foto);
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
          
const Cek2 = async () => {
if(!Array.isArray(data_bill_awal))
{
alert('Billcount awal belum complete..')
}
else if(!Array.isArray(data_bill_akhir))
{
alert('Billcount akhir belum complete..')
}
else if(stat=='')
{
alert('Status belum di pilih')
}

else if(note=='')
{
alert('Deskripsi pekerjaan belum di input')
}


else {
  Simpan();
}
          };

const Simpan = () => {
isLoading(true);
fetch(Link_flm_update_finish, 
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
              status:6,
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
          //Cek(usid,regional); 
          navigation.navigate('Flm_detail_job',{ incident_id : incident_id});
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
           
};



const Detail = () => {
return (

<View style={styles.Card}>
 <Text style={styles.wtext}> ATM ID : {atm_id}</Text>
  <Text style={styles.wtext}> INCIDENT NO : {incident_no}</Text>
 <Text style={styles.wtext}> Problem : {problem}</Text>

</View>

  );
}


const Billcount_awal = () => {
return (
   <View style={styles.wrapper1} >
          <TouchableOpacity onPress={() => Pindah_halaman('Flm_billcount_awal',incident_id)} style={styles.Box} >
         <FontAwesomeIcon icon={ faMoneyBillAlt } style={styles.Imgbox} size={ 32 } />
          </TouchableOpacity>  
          <View style={{width:'75%',padding:10}}>
          <Text style={styles.Judulbox}>Billcount Awal</Text>
<View>
{Array.isArray(data_bill_awal)
        ? data_bill_awal.map((us,i) => {
          return ( 
            
          <View key={i} >
            <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity style={{
width: 20,
Height:20,
borderRadius:55,
flex: 1,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
backgroundColor:"red",
textAlign:'right',
padding:5 }}
onPress={() => conf(us.id,us.denom,us.foto)}>

<Text numberOfLines={2}
style={{ color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12}}>X
</Text>
   </TouchableOpacity>
   </View>
          <Text style={styles.wtext}>Denom : {us.denom}</Text>
          <Text style={styles.wtext}>Dispensed : {us.val_d}</Text>
          <Text style={styles.wtext}>Reject : {us.val_j}</Text>
          <Text style={styles.wtext}>Remaining : {us.val_r}</Text>
          <Text numberOfLines={2} style={styles.stathijau}>Complete</Text>
      </View>)
}) : <Text numberOfLines={2} style={styles.statmerah}>Belum Complete
</Text>}
</View>
          </View>
          </View> 
          

  );
}


 const conf =  (id,denom,foto) => {
    return Alert.alert(
      "Konfirmasi",
      "Apakah anda yakin ingin menghapus bilcount awal denom "+ denom+ "?",
      [
        {
          text: "Yes",
          onPress: () => {
          
            Delete_baw(id,foto);
          },
        },
    
        {
          text: "No",
        },
      ]
    );
  };


  const Delete_baw = (id,foto) => {

  if (id =="")
{
  isLoading(false);
  alert("Gagal hapus data");
}
else {

  isLoading(true);
fetch(Link_flm_del_bawal, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : usid,
              incident_id : incident_id,
              id :id,
              foto:foto,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
          //isLoading(false); 
           alert("Berhasil hapus data ");
           Cek(usid,regional);
           
            isLoading(false);
          }
          else 
          {
          isLoading(false);
          alert("Gagal hapus data ");
          }
           }).catch((error) =>
           {
            isLoading(false);
           console.error(error);
             alert("Gagal hapus data ");
           });
           }
};

const Billcount_akhir = () => {
return (
   <View style={styles.wrapper1} >
          <TouchableOpacity style={styles.Box} onPress={() => Pindah_halaman('Flm_billcount_akhir',incident_id)}>
            <FontAwesomeIcon icon={ faMoneyBillAlt } style={styles.Imgbox} size={ 32 } />
          </TouchableOpacity>  
          <View style={{width:'75%',padding:10}}>
          <Text style={styles.Judulbox}>Billcount Akhir</Text>
<View>
{Array.isArray(data_bill_akhir)
        ? data_bill_akhir.map((us,i) => {
          return ( 
          <View key={i}>
              <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity style={{
width: 20,
Height:20,
borderRadius:55,
flex: 1,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
backgroundColor:"red",
textAlign:'right',
padding:5 }}
onPress={() => conf1(us.id,us.denom,us.foto)}>

<Text numberOfLines={2}
style={{ color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12}}>X
</Text>
   </TouchableOpacity>
   </View>
      <Text style={styles.wtext}>Denom : {us.denom}</Text>
      <Text style={styles.wtext}>Dispense : {us.val_d}</Text>
          <Text style={styles.wtext}>Reject : {us.val_j}</Text>
           
          <Text style={styles.wtext}>Remaining : {us.val}</Text>
       
          <Text numberOfLines={2} style={styles.stathijau}>Complete</Text>
      </View>)
}) : <Text numberOfLines={2} style={styles.statmerah}>Belum Complete
</Text>}
</View>

          </View>
          </View> 
          
  );
}





 const conf1 =  (id,denom,foto) => {
    return Alert.alert(
      "Konfirmasi",
      "Apakah anda yakin ingin menghapus bilcount akhir denom "+ denom+ "?",
      [
        {
          text: "Yes",
          onPress: () => {
          
            Delete_bak(id,foto);
          },
        },
    
        {
          text: "No",
        },
      ]
    );
  };

const Delete_bak = (id,foto) => {

  if (id =="")
{
  isLoading(false);
  alert("Gagal hapus data");
}
else {

  isLoading(true);
fetch(Link_flm_del_bak, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : usid,
              incident_id : incident_id,
              id :id ,
              foto:foto,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
          //isLoading(false); 
            alert("Berhasil hapus data ");
           Cek(usid,regional);
          
            isLoading(false);
          }
          else 
          {
          isLoading(false);
          alert("Gagal hapus data ");
          }
           }).catch((error) =>
           {
            isLoading(false);
           //console.error(error);
             alert("Gagal hapus data ");
           });
           }
};



const Ganti_kaset = () => {
return (

   <View style={styles.wrapper1} >
   <TouchableOpacity style={styles.Box} onPress={() => Pindah_halaman('Flm_ganti_seal',incident_id)}>
            <FontAwesomeIcon icon={ faArrowRightArrowLeft } style={styles.Imgbox} size={ 32 } />
          </TouchableOpacity>  
           <View style={{width:'75%',padding:10}}>
          <Text style={styles.Judulbox}>Pergantian Seal Kaset</Text>
<View>
{Array.isArray(data_seal)
        ? data_seal.map((us,i) => {
          return ( 
          <View key={i}>
          <Text style={styles.wtext}>Seal lama : {us.lama}</Text>
   <Text style={styles.wtext}>Seal Baru : {us.baru}</Text>
      </View>)
}) : <Text numberOfLines={2} style={styles.statmerah}>
</Text>}
</View>
          </View>
          </View> 
        
  );
};



const Foto = () => {
return (
   <View style={styles.wrapper1} >
          <TouchableOpacity style={styles.Box} onPress={() => Pindah_halaman('Flm_foto',incident_id)}>
      <FontAwesomeIcon icon={ faCameraAlt } style={styles.Imgbox} size={ 32 } />
          </TouchableOpacity>  
          <View style={{width:'75%',padding:10}}>
          <Text style={styles.Judulbox}>Foto</Text>
<View>
{Array.isArray(data_foto)
        ? data_foto.map((us,i) => {
          return ( 
          <View key={i}>
              <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity style={{
width: 20,
Height:20,
borderRadius:55,
flex: 1,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
backgroundColor:"red",
textAlign:'right',
padding:5 }}
onPress={() => conf2(us.id,us.fot)}>

<Text numberOfLines={2}
style={{ color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12}}>X
</Text>

   </TouchableOpacity>
   </View>
    
      <Image source={{uri:host+"foto/flm/"+us.fot}} style={styles.logo}></Image>
       <Text style={styles.wtext}>{us.lat},{us.lon}</Text>
       
          <Text numberOfLines={2} style={styles.stathijau}>Complete</Text>
      </View>)
}) : <Text numberOfLines={2} style={styles.statmerah}>Belum Complete
</Text>}
</View>

          </View>
          </View> 
          
  );
}




 const conf2 =  (id,foto) => {
    return Alert.alert(
      "Konfirmasi",
      "Apakah anda yakin ingin menghapus foto ?",
      [
        {
          text: "Yes",
          onPress: () => {
          
            Delete_foto(id,foto);
          },
        },
    
        {
          text: "No",
        },
      ]
    );
  };

const Delete_foto = (id,foto) => {

  if (id =="")
{
  isLoading(false);
  alert("Gagal hapus foto");
}
else {

  isLoading(true);
fetch(Link_flm_del_foto, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : usid,
              incident_id : incident_id,
              id :id ,
              foto:foto,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {
          //isLoading(false); 
            alert("Berhasil hapus data ");
           Cek(usid,regional);
          
            isLoading(false);
          }
          else 
          {
          isLoading(false);
          alert("Gagal hapus data ");
          }
           }).catch((error) =>
           {
            isLoading(false);
           //console.error(error);
             alert("Gagal hapus data ");
           });
           }
};






const Pindah_halaman = (halaman,val) => {
navigation.navigate(halaman,{ incident_id : val,sc_id:sc_id});
//alert(us.sc_id+us.last_status);
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

refreshControl={
          <RefreshControl
            refreshing={loading}
             onRefresh={ascdata}
          />
        }>
<Detail/>
<Billcount_awal/>
<Billcount_akhir/>
<Ganti_kaset/>
<Foto/>
<View style={styles.wrapper1} >
       
          <View style={{width:'100%',padding:10}}>
          <Text style={styles.Judulbox}>Status</Text>
          <Picker style={styles.input}
  selectedValue={stat}
  onValueChange={(itemValue, itemIndex) =>
    setStat(itemValue)
  }>
    <Picker.Item label="Pilih" value="" />
  <Picker.Item label="Finish" value="6" />
</Picker>

          <Text style={styles.Judulbox}>Deskripsi Pekerjaan </Text>
           <TextInput style={styles.inputBox}
      placeholder="Note"
      spellCheck={false}
      autoCorrect={false}
      numberOfLines={4}
      multiline = {true}
      onChangeText={value => setnote(value)}
    />
<View>
{stat !='' && note !=''
        ?
          <Text numberOfLines={2} style={styles.stathijau}>Complete</Text>
: <Text numberOfLines={2} style={styles.statmerah}>Belum Complete
</Text>}
</View>

          </View>
          </View> 

 <View style={styles.Sadle}></View>
 <View style={styles.Sadle}></View>
</ScrollView>
<View  style={styles.cnt} >
<TouchableOpacity style={styles.button} 
       onPress={() => Cek2()}
activeOpacity={0.6}>
<Text style={styles.buttonText}>Simpan</Text>
</TouchableOpacity> 
       



</View>
        </View>
    )
}

export default Input_progres


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
      
      
    },
     Card: { 
       fontFamily: "sans-serif",
      backgroundColor:Bg_,
      flexDirection: 'column',
    paddingVertical:10,
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
      button: {
        width:lebar_tombol,
        backgroundColor:Bg2_,
        borderRadius: 8,
        marginVertical: 10,
        paddingVertical: 13,
        elevation: 8,
        
        },
          logo: {
      alignItems:"center",
      height: 50,
      padding:20,
      width: 50,
      marginBottom:10,
      marginTop:20
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
      fontSize:16,
      color:'grey',
      marginTop:5,
      textAlign:'left',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
       marginRight:10,
       marginLeft:10, 
    },

 wrapper1: {
    flexDirection: 'row',
    alignItems:"center",
    marginBottom:5,
    borderColor: 'grey',
    padding:10,
     elevation: 1,
  },

   wtext: {
    marginHorizontal:10,
       marginVertical:1,
       width:'100%',
    fontSize:12,
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
         padding:10
  },
  stepWrapper: {
    textAlign: 'center',
    justifyContent: 'center',
    width: '25%',
  },
  stepText: {
    textAlign: 'center',
    padding: 5,
    fontSize: 14,
    color :Cl_
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
      statmerah : {
        marginHorizontal:10,
       marginVertical:1,
       width:'100%',
    fontSize:14,
    fontWeight:'bold',
    color:Cl2_
      },
        stathijau : {
        marginHorizontal:10,
       marginVertical:1,
       width:'100%',
    fontSize:14,
    fontWeight:'bold',
    color:Gr_
      }
  });
