import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert,TouchableHighlight,PermissionsAndroid } from 'react-native'
import {token,host,host_custom} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_} from '../style/Style_assets';
import Qr from '../.././Img/qr.png';
import ImagePicker from 'react-native-image-crop-picker';
import { Camera, CameraScreen } from 'react-native-camera-kit';
import {Picker} from '@react-native-picker/picker';


import { DataTable } from 'react-native-paper';

const lebar ='100%';
const lebar_tombol = '70%';
const lebar_tombol1 = '90%';
const Input_value = ({navigation,route}) => {
  //qr
const [qrvalue, setQrvalue] = useState('');
const [opneScanner, setOpneScanner] = useState(false);

const { schedule_id } = route.params;
const itbs = token;
const [usid, setUid] = useState('');
const [loading, isLoading] = useState(true);
const [regional, setRegional] = useState('');
const [data, setdata] = useState([]);
const [datadenom, setdatadenom] = useState([]);
const [data_value, setdatavalue] = useState([]);


const [denom, setDenom] = useState('');
const [denom_label, setdenomlabel] = useState('Pilih Denom');

const [lembar, setLembar] = useState('0');

const [jumlah, setJumlah] = useState('');
const [jenis, setTjenis] = useState('');
const [pecahan, setPecahan] = useState('');
const [kurs, setkurs] = useState('');
const [tukar, setnilaitukar] = useState('');
const [kurs_label, setkurslabel] = useState('Pilih Kurs');

 useEffect(() => {
   // ascdata();
    const unsubscribe = navigation.addListener('focus', () => {
    ascdata();
    });
   // ascdata();
    return unsubscribe;
      }, [navigation]);

const ascdata = async () => 
{
  isLoading(true);
const result = await AsyncStorage.getItem('usnm');
const regional = await AsyncStorage.getItem('regional');
    if (result != null) 
    {

    setUid(result);
    setRegional(regional); 
    setDenom('');
    setdenomlabel('Pilih');
    setLembar('0');
    setJumlah('');
    setTjenis('');
    setkurs('');
    setkurslabel('Pilih');
    setnilaitukar('');
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

//const link1 = ""+host+"/list_value/all?X-Api-Key="+token+"&filter=&field=&start=&limit=&filters[0][co][0][fl]=schdeule_code&filters[0][co][0][op]=equal&filters[0][co][0][vl]="+schedule_id+"&filters[0][co][0][lg]=and&sort_field=&sort_order=ASC";
const link1 = ""+host_custom+"/list_value?X-Api-Key="+token+"&schedule_id="+schedule_id;

//const link2 = ""+host+"/list_da/all?X-Api-Key="+token+"&filter=&field=&start=&limit=&fil
const Cek_value = async () => {
fetch(link1).then((response) => response.json())
           .then((responseJson) =>
           {
            //console.log(responseJson.data.schedule);
          if(responseJson.status == 1)
          {
setdatavalue(responseJson.data);
//console.log(responseJson.data.list_value);
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

  const Cek = async () => {
fetch(""+host+"/kurs/all?X-Api-Key="+token+"&filter=&field=&start=&limit=&filters[0][co][0][fl]=&filters[0][co][0][op]=equal&filters[0][co][0][vl]=&filters[0][co][0][lg]=and&sort_field=&sort_order=ASC").then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == true)
          {
          isLoading(false); 
           setdata(responseJson.data.kurs);
           //console.log(responseJson.data);
         Cek_value(); 
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


            const Cek_denom = async (val) => {
              setdatadenom('');
  
fetch(""+host+"/denom/all?X-Api-Key="+token+"&filter=&field=&start=&limit=&filters[0][co][0][fl]=denom_currency&filters[0][co][0][op]=equal&filters[0][co][0][vl]="+val+"&filters[0][co][0][lg]=and&filters[0][co][1][fl]=denom_pecahan&filters[0][co][1][op]=equal&filters[0][co][1][vl]=&filters[0][co][1][lg]=and&filters[0][co][2][fl]=denom_kertas&filters[0][co][2][op]=equal&filters[0][co][2][vl]=&filters[0][co][2][lg]=and&filters[0][co][3][fl]=denom_value&filters[0][co][3][op]=equal&filters[0][co][3][vl]=&filters[0][co][3][lg]=and&sort_field=&sort_order=ASC").then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == true)
          {
          isLoading(false); 
           setdatadenom(responseJson.data.denom);
           //console.log(responseJson.data);
      
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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Submit = () => {

  if (kurs=="" ||  lembar=="" || denom == "" || lembar=='0')
{
  isLoading(false);
  alert("Kurs,denom dan value tidak boleh kosong");
}
else {

  isLoading(true);



  var details = {
               'user' : usid,
              'kurs_id' :kurs,
              'list_value_type':jenis,
              'list_upb':pecahan,
              'list_denom':denom,
              'list_value':lembar,
              'schdeule_code' : schedule_id,
              'nilai_tukar' : tukar,
              'id_user' : usid,
              'create_date':''
};

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
fetch(""+host+"/list_value/add", 
        {
            method: 'POST',
            headers: 
            {
             'Content-Type': 'application/x-www-form-urlencoded',
              'x-api-key': token,
            },
              body: formBody
            }).then((response) => response.json())
           .then((responseJson) =>
           {
            isLoading(false);
          if(responseJson.status == true)
          {
            setDenom('');
    setdenomlabel('Pilih');
    setLembar('0');
    setJumlah('');
    setTjenis('');
    setkurs('');
    setkurslabel('Pilih');
    setnilaitukar('');
        ascdata(); 
        isLoading(false);
        alert('Berhasil');
          }
          else 
          {
          isLoading(false);
           Alert.alert(responseJson.message);
           //console.log(responseJson);
          }
           }).catch((error) =>
           {
            isLoading(false);
            console.error(error);
            alert("Gagal input Input_kaset");
           });
           }
          };

    
const change_kurs = (us) => {
  //alert(us.id);
setdatadenom('');
setkurs(us.id);
setkurslabel(us.kurs_currency);
setnilaitukar(us.buy);
Cek_denom(us.kurs_currency);
setdenomlabel('Pilih Denom');
};

const change_denom = (us) => {
setDenom(us.denom_value);
setdenomlabel(us.denom_value);
setTjenis(us.denom_kertas);
setPecahan(us.denom_pecahan);
sumdenom();
};
 


        const sumdenom =() => {

if (denom !="" && lembar!="")
{
const x=denom*lembar;
  
  setJumlah(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}

  };
  const sumlembar =(value) => {

if (denom !="" && value!="")
{
 // const x=value*denom*tukar;
 const x=value/denom;
  setJumlah(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  setLembar(x);
}


  };




  

 const conf =  (id) => {
    return Alert.alert(
      "Konfirmasi",
      "Apakah anda yakin ingin menghapus value?",
      [
        {
          text: "Yes",
          onPress: () => {
          
            Delete_val(id);
          },
        },
    
        {
          text: "No",
        },
      ]
    );
  };


  const Delete_val = (id) => {

  if (id =="")
{
  isLoading(false);
  alert("Gagal hapus data");
}
else {

  isLoading(true);



  var details = {
               'id' : id
};

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
fetch(""+host+"/list_value/delete", 
        {
            method: 'POST',
            headers: 
            {
             'Content-Type': 'application/x-www-form-urlencoded',
              'x-api-key': token,
            },
              body: formBody
            }).then((response) => response.json())
           .then((responseJson) =>
           {
            isLoading(false);
          if(responseJson.status == true)
          {
            Cek();
        alert('Berhasil Delete');
         isLoading(false);
          }
          else 
          {
          isLoading(false);
           Alert.alert(responseJson.message);
          // console.log(responseJson);
          }
           }).catch((error) =>
           {
            isLoading(false);
            console.error(error);
            alert("Gagal Delete");
           });
           }
};


  const Value= () => {
return (
   <View style={styles.menu} >
          
          <View style={{width:'100%',padding:10}}>
          <Text style={styles.Judulbox}>Value</Text>
<View>


<DataTable>
        <DataTable.Header> 
          <DataTable.Title style={{fontSize:14,color:'grey',fontWeight:'normal',justifyContent:'center'}}>Kurs</DataTable.Title>
          <DataTable.Title style={{fontSize:14,color:'grey',fontWeight:'normal',flex:2,justifyContent:'center'}}>Denom</DataTable.Title>
          <DataTable.Title style={{fontSize:14,color:'grey',fontWeight:'normal',justifyContent:'center'}}>Value</DataTable.Title>
           <DataTable.Title style={{fontSize:14,color:'grey',fontWeight:'normal',flex:3,justifyContent:'center'}}>Nilai Tukar</DataTable.Title>
           <DataTable.Title style={{fontSize:14,color:'grey',fontWeight:'normal',flex:3,justifyContent:'center'}}>Tota IDR</DataTable.Title>
           <DataTable.Title style={{fontSize:14,color:'grey',fontWeight:'normal',justifyContent:'center'}}>Delete</DataTable.Title>
        </DataTable.Header>
        
{
Array.isArray(data_value)
        ? data_value.map((us,i) => {
  
          return ( 
<DataTable.Row key={i} tyle={{textAlign:'right',alignItems:'flex-end',flex:1}}>
     
    <DataTable.Cell >
<Text style={{fontSize:12,color:'#000060',fontWeight:'normal'}}>{us.kurs_currency}</Text>
</DataTable.Cell>
     <DataTable.Cell style={{flex: 2,justifyContent:'flex-end'}}>
<Text style={{fontSize:12,color:'#000060',fontWeight:'normal'}}>{numberWithCommas(us.list_denom)}</Text>
</DataTable.Cell>
    <DataTable.Cell style={{flex: 2,justifyContent:'flex-end'}}>
<Text style={{fontSize:12,color:'#000060',fontWeight:'normal'}}>{numberWithCommas(us.list_value)}</Text>
</DataTable.Cell>
  <DataTable.Cell style={{flex: 2,justifyContent:'flex-end'}}>
  
<Text style={{ fontSize:12,color:'#000060',fontWeight:'normal'}}>{ numberWithCommas(us.nilai_tukar)}</Text>

</DataTable.Cell>
  <DataTable.Cell style={{flex: 3,justifyContent:'flex-end'}}>
  
<Text style={{ fontSize:12,color:'#000060',fontWeight:'normal'}}>{ numberWithCommas(us.list_denom * us.list_value * us.nilai_tukar)}</Text>

</DataTable.Cell>
    <DataTable.Cell style={{flex: 1,justifyContent:'flex-end'}}>
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
onPress={() => conf(us.id)}>

<Text numberOfLines={2}
style={{ color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12}}>X
</Text>
   </TouchableOpacity>
</DataTable.Cell>

        </DataTable.Row>
)

}) : <Text numberOfLines={2} style={styles.statmerah}>Belum Complete
</Text>}

  <DataTable.Header> 

           <DataTable.Title style={{flex:4,justifyContent:'center'}}><Text style={{ fontSize:16,color:'green',fontWeight:'100'}}>Total IDR : {  numberWithCommas(data_value.reduce((total, val) => total + parseInt(val.list_denom * val.list_value * val.nilai_tukar),0)
)}</Text></DataTable.Title>
       
        </DataTable.Header>
      </DataTable>




</View>
          </View>
          </View> 
          

  );
}


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


<View style={styles.Card1}>


  
<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20,color:'grey'}}>Kurs</Text>
  <Picker style={styles.picker}
  selectedValue=''
  onValueChange={(itemValue, itemIndex) =>
    change_kurs(itemValue)
  }>
     <Picker.Item label={kurs_label}  value=""  />
{Array.isArray(data)
        ? data.map((us,index) => {
          return(
  <Picker.Item key={index} label={us.kurs_currency} value={us}  />
          )
       
}) : null}

   </Picker>

 


<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20,color:'grey'}}>Denom</Text>
<Picker style={styles.picker}
  selectedValue=''
  onValueChange={(itemValue, itemIndex) =>
    change_denom(itemValue)
  }>
    <Picker.Item label={denom_label}  value=""  />
{Array.isArray(datadenom)
        ? datadenom.map((us,index) => {
          return(
  <Picker.Item key={index} label={us.denom_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" , "+ us.denom_kertas}  value={us}  />
          )
       
}) : null}
 
  
</Picker>

<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 18,color:'grey'}}>Jenis Pecahan : {pecahan}</Text>
<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 18,color:'grey'}}>Jenis Uang : {jenis}</Text>
<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 18,color:'grey'}}>Nilai Tukar : {tukar}</Text>


<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 18, color :'grey'}}>Nominal Input : </Text>
<View style={styles.cont1_}>
 <TextInput style={styles.input1}
      placeholder="Lembar"
      spellCheck={false}
      autoCorrect={false}
       keyboardType="numeric"
      onChangeText={value => sumlembar(value)}
      defaultValue={lembar}
    />
    </View>
         <Text style={{fontFamily: "sans-serif", margin:10,color:'green', fontSize: 20}}>Lembar :{lembar}</Text>
       <Text style={{fontFamily: "sans-serif", margin:10,color:'green', fontSize: 20}}>Nominal :{jumlah}</Text>

 
  



<Value/>








   


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

export default Input_value


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
    borderColor:'grey',
    color:'grey'
  },
  input1: {
    height: 40,
    margin: 0,
    borderWidth: 1,
    width:'100%',
    padding: 10,
    borderColor:'grey',
        borderStyle: 'solid',
      color:'grey'
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

       inputBox: {
      borderColor: Bg1_,
      borderStyle: 'solid',
      width:lebar_tombol,
      borderWidth:1,
      backgroundColor:Bg_,
      paddingHorizontal:2,
      fontSize:14,
      color:'grey',
      borderColor:'grey',
      marginTop:10,
      paddingHorizontal:10,
      },

      picker: {
    height: 40,
    margin: 0,
    borderWidth: 1,
    width:"100%",
    padding: 10,
    borderColor:'grey',
    backgroundColor:'#000060',
    color:'#fff'
  },
  });
