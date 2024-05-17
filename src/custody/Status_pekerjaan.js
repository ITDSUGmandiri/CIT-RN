import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import {token,host, host_custom} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import { DataTable } from 'react-native-paper';
import Bg from '../.././Img/del.png';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_,Gr_,Kn} from '../style/Style_assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTruckArrowRight } from '@fortawesome/free-solid-svg-icons/faTruckArrowRight';
import { faCameraAlt } from '@fortawesome/free-solid-svg-icons/faCameraAlt';
import {Picker} from '@react-native-picker/picker';


const lebar ='100%';
const lebar_tombol = '80%';
const Detail = ({navigation,route}) => {
const { schedule_id } = route.params;


const [usid, setUid] = useState('');
const [username, setUsername] = useState('');
const [loading, isLoading] = useState(true);
const [data, setdata] = useState([]);
const [data_value, setdatavalue] = useState([]);
const [regional, setRegional] = useState('');
const [notif, setNotif] = useState('');
const [file_upload,setfileupload]=useState('');
const [data_value_list, setdatavaluelist] = useState([]);

const [document_no,setdocument_no]=useState('');
const [document_sticker,setdocument_sticker]=useState('');
const [document_bag_no,setdocument_bag_no]=useState('');
const [document_seal_no,setdocument_seal_no]=useState('');



const [type_client,settypeclient]=useState('');
const [idclient1,setidclient1]=useState('');
const [idclient2,setidclient2]=useState('');
const [alamatclient,setalamatclent]=useState('');
const [branch,setbranch]=useState('');
const [schedule_date,setScheduledate]=useState('');
const [schdeule_custody2,setschdeule_custody2]=useState('');
const [schdeule_custody1,setschdeule_custody1]=useState('');
const [schedule_security,setschdeule_security]=useState('');
const [vehicle_no,setvehicle_no]=useState('');
const [status,setStatus]=useState('');
const [pending_note,setPendingnote]=useState('');
const [finish_note,setFinishnote]=useState('');
const [schedule_code,setschedulecode]=useState('');
const [date_now,setCurrentDate]=useState('');
const [cis,changecis]=useState('');
const [cpc,setcpc]=useState('');
 useEffect(() => {
   // ascdata();
   
    const unsubscribe = navigation.addListener('focus', () => {
    ascdata();
    });
    //ascdata();
    return unsubscribe;
      }, [navigation]);

const ascdata = async () => 
{

  isLoading(true);
  const regional = await AsyncStorage.getItem('regional');
const result = await AsyncStorage.getItem('usnm')
const user_name = await AsyncStorage.getItem('username')
    if (result != null) 
    {
        var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
     setCurrentDate(date + '/' + month + '/' + year);
   
     setNotif('');
     setRegional(regional);
     setUid(result)
     setUsername(user_name)
       Cek();
     Cek_value();
   
      isLoading(false);
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
    }
  };
//const link12 = ""+host+"/list_value/all?X-Api-Key="+token+"&filter=&field=&start=&limit=&filters[0][co][0][fl]=schdeule_code&filters[0][co][0][op]=equal&filters[0][co][0][vl]="+schedule_id+"&filters[0][co][0][lg]=and&sort_field=&sort_order=ASC";
const link = ""+host_custom+"/allstatusjob?X-Api-Key="+token+"&schedule_id="+schedule_id;
const link1 = ""+host_custom+"/list_value?X-Api-Key="+token+"&schedule_id="+schedule_id;
const Cek_value = async () => {
fetch(link1).then((response) => response.json())
           .then((responseJson) =>
           {
            isLoading(false);
          if(responseJson.status == 1)
          {
setdatavaluelist(responseJson.data);
console.log(responseJson.data);
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
fetch(link).then((response) => response.json())
           .then((responseJson) =>
           {
              isLoading(false);
        //console.log(responseJson);
          if(responseJson.status == 1)
          {
setbranch(responseJson.branch_name);
setschedulecode(responseJson.schedule_code);
settypeclient(responseJson.type_name);
setidclient1(responseJson.client1_name);
setidclient2(responseJson.client2_name);
setalamatclent(responseJson.schedule_delivery_address);
setStatus(responseJson.schedule_progress);
setScheduledate(responseJson.schedule_date);
setschdeule_security(responseJson.schedule_security); //belom ada
setvehicle_no(responseJson.schedule_vehicle_no);//belom ada
setschdeule_custody1(responseJson.user_name);
setschdeule_custody2(responseJson.schdeule_custody2);//belom ada
setdocument_no(responseJson.document_no);
setdocument_sticker(responseJson.document_sticker);
setdocument_bag_no(responseJson.document_bag_no);
setdocument_seal_no(responseJson.dodument_seal_no);
setfileupload(responseJson.file_upload);
changecis(responseJson.schedule_is_cis);
setcpc(responseJson.schedule_is_cpc);
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
//alert(val);
const currentDate = new Date();
const dateValue = new Date(schedule_date);
  if (val=="")
{
  isLoading(false);
  alert("Status tidak ada");
}
else if (val==9 && file_upload=='') {
  alert("Gambar belum di input");
}

else if (dateValue > currentDate.getTime()  ) {
  alert("Tanggal schedule adalah " +schedule_date +" Schedule belum dapat di proses" );
}

else {
  isLoading(true);
  var details = {
               'user' : usid,
               'username':username,
               'schedule_id' : schedule_id,
               'schedule_progress' :val,
};
//console.log(details);
var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
//fetch(""+host+"/schedule/update", 
fetch(""+host_custom+"/update_status",
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
          if(responseJson.status == 1)
          {
        alert('Berhasil');
        ascdata();
         isLoading(false);
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
            alert("Gagal input data");
           });
           }
           
          };



/*

const Update_complete = (val) => {

  if (val=="")
{
  isLoading(false);
  alert("Status tidak ada");
}

else {
  isLoading(true);
  var details = {
               'user' : usid,
              'schedule_id' : schedule_id,
               'schedule_progress' :val,
              'document_bag_no' : document_bag_no,
              'dodument_seal_no' :document_seal_no,
              'document_sticker' : document_sticker,
              'schedule_is_cis' :cis,
              'schedule_is_cpc' :cpc,
};

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
fetch(""+host_xxx+"/schedule/update", 
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
        alert('Berhasil');
        ascdata();
         isLoading(false);
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

*/












function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Value_denom = () => {
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
       
        </DataTable.Header>
        
{
Array.isArray(data_value_list)
        ? data_value_list.map((us,i) => {
  
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
   

        </DataTable.Row>
)

}) : <Text numberOfLines={2} style={styles.statmerah}>Belum Complete
</Text>}

  <DataTable.Header> 

           <DataTable.Title style={{flex:4,justifyContent:'center'}}><Text style={{ fontSize:16,color:'green',fontWeight:'bold'}}>Total IDR : {  numberWithCommas(data_value_list.reduce((total, val) => total + parseInt(val.list_denom * val.list_value * val.nilai_tukar),0)
)}</Text></DataTable.Title>
       
        </DataTable.Header>
      </DataTable>




</View>
          </View>
          </View> 
          

  );
}



const Foto = () => {
return (
  <View>
   <View style={styles.menu} >
          <TouchableOpacity style={styles.Box1} onPress={() => Pindah_halaman('Foto_slip'
        )}>
      <FontAwesomeIcon icon={ faCameraAlt } style={styles.Imgbox} size={ 32 } />
          </TouchableOpacity>  
          <View style={{width:'75%',padding:10}}>
          <Text style={styles.Judulbox}>Foto Slip</Text>
<Image source={{uri:'http://cit.slmugmandiri.co.id/v2_0_3/uploads/schedule/'+file_upload}} style={styles.logo}></Image>
          </View>
</View>
{/*
<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20,color:'#000060'}}>CIS</Text>
<View style={styles.menu} >

  <Picker style={styles.picker}
  selectedValue={cis}
  onValueChange={(itemValue, itemIndex) =>
    changecis(itemValue)
  }>
    <Picker.Item  label='pilih' value={0}   />
     <Picker.Item  label='tidak' value={1}   />
  <Picker.Item  label='Ya' value={2}  />
 </Picker>
          </View> 

          <Text style={{fontFamily: "sans-serif", margin:1, fontSize: 20,color:'#000060'}}>CPC</Text>
<View style={styles.menu} >

  <Picker style={styles.picker}
  selectedValue={cpc}
  onValueChange={(itemValue, itemIndex) =>
    setcpc(itemValue)
  }>
    <Picker.Item  label='pilih' value={0}   />
     <Picker.Item  label='tidak' value={1}   />
  <Picker.Item  label='Ya' value={2}  />
 </Picker>
          </View> 
*/}
         </View> 
          
  );
}








const Pindah_halaman = (halaman) => {
navigation.navigate(halaman,{schedule_id:schedule_id,
          status:status,
          document_bag_no:document_bag_no,
          document_seal_no:document_seal_no,
          document_sticker:document_sticker});
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
{/*
<View style={styles.Sadle}></View>
      */}

<View>
<DataTable>
        <DataTable.Header > 
          <DataTable.Title ><Text style={styles.Judulbox}>Branch : { branch}</Text></DataTable.Title>
            <DataTable.Title style={{borderLeftWidth:1,padding:5}} ><Text style={styles.Judulbox}>Tanggal : { schedule_date}</Text></DataTable.Title>
           </DataTable.Header>


            <DataTable.Header>
            <DataTable.Title ><Text style={styles.Judulbox}>Custody 1  : { schdeule_custody1}</Text></DataTable.Title>
      
           </DataTable.Header>

        


            <DataTable.Header>
            <DataTable.Title ><Text style={styles.Judulbox}>Custody 2  : { schdeule_custody2}</Text></DataTable.Title>
        
        </DataTable.Header>

           <DataTable.Header>
    <DataTable.Title ><Text style={styles.Judulbox}>Security / Polisi : {schedule_security}</Text></DataTable.Title>
           </DataTable.Header>

            <DataTable.Header>
  <DataTable.Title ><Text style={styles.Judulbox}>No Mobil  : {vehicle_no}</Text></DataTable.Title>
           </DataTable.Header>
        </DataTable>
        
<DataTable>
        <DataTable.Header> 
          <DataTable.Title ><Text style={styles.Judulbox}>Kode Schedule : {schedule_code}</Text></DataTable.Title>
           </DataTable.Header>

  <DataTable.Header> 
          <DataTable.Title ><Text style={styles.Judulbox}>Type Client : {type_client}</Text></DataTable.Title>
           </DataTable.Header>

             <DataTable.Header> 
          <DataTable.Title ><Text style={{flex: 1, flexWrap: 'wrap',width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold'}}>Id Client 1 : {idclient1}</Text></DataTable.Title>
           </DataTable.Header>


             <DataTable.Header> 
          <DataTable.Title ><Text style={{flex: 1, flexWrap: 'wrap',width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold'}}>Id Client 2 : {idclient2}</Text></DataTable.Title>
           </DataTable.Header>

             <DataTable.Header> 
          <DataTable.Title ><Text style={styles.Judulbox}>CIS :{cis==1?'Tidak':cis==2?'Ya':''}</Text></DataTable.Title>
           </DataTable.Header>

              <DataTable.Header> 
          <DataTable.Title ><Text style={styles.Judulbox}>CPC :{cpc==1?'Tidak':cpc==2?'Ya':''}</Text></DataTable.Title>
           </DataTable.Header>

              <DataTable.Header> 
          <DataTable.Title ><Text style={styles.Judulbox}>No Sticker :{document_sticker}</Text></DataTable.Title>
           </DataTable.Header>


              <DataTable.Header> 
          <DataTable.Title ><Text style={styles.Judulbox}>No Bag :{document_bag_no}</Text></DataTable.Title>
           </DataTable.Header>


              <DataTable.Header> 
          <DataTable.Title ><Text style={styles.Judulbox}>No Seal :{document_seal_no}</Text></DataTable.Title>
           </DataTable.Header>


             <DataTable.Header> 
           <DataTable.Title><Text style={styles.Judulbox}>Total : {  numberWithCommas(data_value_list.reduce((total, val) => total + parseInt(val.list_denom * val.list_value*val.nilai_tukar),0)
)}</Text></DataTable.Title>
       
        </DataTable.Header>

        </DataTable>
</View>

<Value_denom/>
{
status == 4 || status==8?
<Foto/>
:
<View></View>


}







    








{/*
  status ==4?
  <View>
<View style={styles.Box}>
<FontAwesomeIcon icon={ faTruckArrowRight } style={styles.Imgbox} size={ 100 } />
</View>


</View>
:
<Text style={styles.stepText}></Text>
*/
}














 <View style={styles.Sadle}></View>
</ScrollView>
<View style={styles.Card3}>
 

   { /*<TouchableOpacity style={{backgroundColor:Gr_,flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',width:lebar_tombol}} onPress={() => Pindah_halaman('')}>
  <Text style={{ color: '#FFFFFF',
    fontWeight: '200',
    fontSize: 16}}>CH</Text> 
  </TouchableOpacity>
   */}

  </View>

<View  style={styles.cnt} >

  {status == 0 && schedule_code !=''?
        <TouchableOpacity style={styles.button} 
    onPress={() => Update(1)}
activeOpacity={0.6}>
<Text style={styles.buttonText}>PROSES</Text>
</TouchableOpacity> 
          :status == 1?
       <TouchableOpacity style={styles.button} 
      onPress={() => Update(2)}
activeOpacity={0.6}>
<Text style={styles.buttonText}>ARRIVE</Text>
</TouchableOpacity> 

    :status == 2?
       <TouchableOpacity style={styles.button} 
      onPress={() => Update(3)}
activeOpacity={0.6}>
<Text style={styles.buttonText}>START WORK</Text>
</TouchableOpacity> 

          :status == 3?
          <View style={{width:"100%",flex:1,alignItems:'center'}}>


{
/*  
<TouchableOpacity style={styles.button1} 
onPress={() => Pindah_halaman('Flm_pending',incident_id)}
activeOpacity={0.6}>
<Text style={styles.buttonText}>UBAH KE PENDING</Text>
</TouchableOpacity> 
*/
}


 <TouchableOpacity style={styles.button} 
      onPress={() => Pindah_halaman('Custody_detail_job',{schedule_id :schedule_id})}
activeOpacity={0.6}>
<Text style={styles.buttonText}>Detail Input</Text>
</TouchableOpacity> 
</View>


:status == 4 && schedule_code !='' || status==8 && schedule_code !=''?
          <View style={{width:"100%",flex:1,alignItems:'center'}}>
 <TouchableOpacity style={styles.button} 
      onPress={() => Update(9)}
activeOpacity={0.6}>
<Text style={styles.buttonText}>Complete</Text>
</TouchableOpacity> 
</View>

        :
         <Text style={styles.stepText}></Text>
          
         }



</View>
        </View>
    )
}

export default Detail


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
      Card3: { 
                  position :'absolute',
                  top:0,
                  left : 0,
                  right :0,
                  borderRadius:15,
                  height : 40,
                  flexDirection:'row',
                  justifyContent:'space-around',
                  
      },
    logo: {
      alignItems:"center",
      height: 248,
      padding:20,
      //width: 158,
      width:'100%',
      marginBottom:10,
      marginTop:20
    },
     Card: { 
       fontFamily: "sans-serif",
      backgroundColor:Bg_,
      flex: 1,
      flexDirection: 'column',
    paddingVertical:20
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
      fontWeight:'bold',
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
        fontWeight:'bold',
        
        },
         button1: {
        width:lebar_tombol,
        backgroundColor:Cl2_,
        borderRadius: 8,
        marginVertical: 10,
        paddingVertical: 13,
        elevation: 8,
          fontWeight:'bold',
        },

 wrapper1: {
    flexDirection: 'row',
     marginHorizontal:10
  },

   wtext: {
       marginVertical:1,
       width:'100%',
    fontSize:16,
    fontWeight:'bold',
    color:'#000060'
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
    width: '100%',
       flexDirection: 'column',
     textAlign: 'center',
    justifyContent: 'center',
    flex:1
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
     width:'100%',height:400,
     borderRadius:15,
     alignItems: "center",
     color : Cl1_,
    },

       Box1: {
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

     menu: {
    flexDirection: 'row',
    alignItems:"center",
    marginBottom:5,
    borderColor: '#000060',
    padding:10,
     elevation: 1,
  },


    
    Imgbox: { 
     Color:Gr_,
     resizeMode:"cover",
     justifyContent: "center",
     top:15, 
    },
    Judulbox: {
      fontSize:16,
      color:'#000060',
      marginTop:5,
      textAlign:'left',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
       marginRight:10,
       marginLeft:10, 
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
        picker: {
    height: 40,
    margin: 0,
    borderWidth: 1,
    width:"100%",
    padding: 10,
    borderColor:'#000060',
    backgroundColor:'#000060',
    color:'#fff'
  },
  });
