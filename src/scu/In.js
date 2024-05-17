import React, {useState, useEffect} from 'react';
import {
  RefreshControl,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import {token, host, host_custom} from '../style/Link';
import {
  Bg_,
  Cl_,
  Bg1_,
  Cl1_,
  Bg2_,
  Cl2_,
  Cl3_,
  Kn,
  Gr_,
} from '../style/Style_assets';
const lebar = '100%';
const lebar_tombol = '80%';
const In = ({navigation}) => {
  const [usid, setUid] = useState('');
  const [username, setUsername] = useState('');
  const [branch, setBranch] = useState('');
  const [loading, isLoading] = useState(true);
  const [data, setdata] = useState([]);
  const [notif, setNotif] = useState('');
  //const [regional, setRegional] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    //ascdata();
    const unsubscribe = navigation.addListener('focus', () => {
      ascdata();
    });
    // ascdata();
    return unsubscribe;
  }, [navigation]);

  const ascdata = async () => {
    isLoading(true);
    const result = await AsyncStorage.getItem('usnm');
    const reg = await AsyncStorage.getItem('regional');
    const user_name = await AsyncStorage.getItem('username');
    if (result != null) {
      setUsername(user_name);
      setNotif('');
      setBranch(reg);
      setUid(result);
      Cek(reg);
      isLoading(false);
    } else {
      isLoading(true);
      AsyncStorage.clear();
      navigation.replace('Login');
    }
  };

  const Cek = async reg => {
    //alert(reg);
    const link =
      '' +
      host_custom +
      '/listscuin?X-Api-Key=' +
      token +
      '&regional=' +
      reg +
      '';
    //lm = parseInt(limit);
    fetch(link)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status == 1) {
          isLoading(false);
          setdata(responseJson.data);
          setFilteredDataSource(responseJson.data);
          //setlimit(limit);
          // console.log(responseJson.data.schedule);
        } else {
          isLoading(false);
          setNotif(responseJson.status);
          //setlimit(0);
        }
      })
      .catch(error => {
        isLoading(false);
        console.error(error);
        setNotif('Upps ada kesalahan mohon coba lagi !!');
      });
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text && data.length > 0) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(function (item) {
        const itemData = item.schedule_code
          ? item.schedule_code.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      //setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      //setSearch(text);
    }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const Pindah_halaman = us => {
    navigation.navigate('Status_job', {schedule_id: us.schedule_id});
  };

  const Retract = id => {
    if (id == '') {
      isLoading(false);
      alert('Gagal Proses');
    } else {
      isLoading(true);
      var details = {
        user: usid,
        username: username,
        schedule_id: id,
        schedule_progress: 8,
      };

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      //fetch(""+host+"/schedule/update",
      fetch('' + host_custom + '/update_status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': token,
        },
        body: formBody,
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("xxx",responseJson)
          isLoading(false);
          if (responseJson.status == 1) {
            alert('Berhasil');
            ascdata();
            isLoading(false);
          } else {
            isLoading(false);
            Alert.alert(responseJson.status);
            //console.log(responseJson);
          }
        })
        .catch(error => {
          isLoading(false);
          console.error(error);
          alert('Gagal input Input_kaset');
        });
    }
  };

  const Approve = id => {
    if (id == '') {
      isLoading(false);
      alert('Gagal Approve');
    } else {
      isLoading(true);
      var details = {
        user: usid,
        username: username,
        schedule_id: id,
        schedule_progress: 6,
      };

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      //fetch(""+host+"/schedule/update",
      fetch('' + host_custom + '/update_status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': token,
        },
        body: formBody,
      })
        .then(response => response.json())
        .then(responseJson => {
          isLoading(false);
          if (responseJson.status == 1) {
            alert('Berhasil');
            ascdata();
            isLoading(false);
          } else {
            isLoading(false);
            Alert.alert(responseJson.status);
            //console.log(responseJson);
          }
        })
        .catch(error => {
          isLoading(false);
          console.error(error);
          alert('Gagal input Input_kaset');
        });
    }
  };

  const conf = us => {
    var id = us.schedule_id;
    return Alert.alert('Konfirmasi', 'Approve CIT masuk ?', [
      {
        text: 'Yes',
        onPress: () => {
          Approve(id);
        },
      },

      {
        text: 'No',
      },
    ]);
  };

  const tolak = us => {
    var id = us.schedule_id;
    return Alert.alert('Konfirmasi', 'Transaksi dengan no '+us.schedule_id+' akan di kembalikan ke Custody ?', [
      {
        text: 'Yes',
        onPress: () => {
          Retract(id);
        },
      },

      {
        text: 'No',
      },
    ]);
  };

  const All = ({
    detail,
    detail2,
    schedule_id,
    schedule_code,
    document_bag_no,
    document_sticker,
    document_seal_no,
    client_type,
    schedule_date,
    nominal_pickup,
    schdeule_delivery_type,
    schedule_delivery_name,
    schedule_progress,
    client2_name,
    no_da,
    document_bag_cpc,
    document_seal_cpc,
    document_sticker_cpc,
    nominal_custody,
    schedule_delivery_address,
  }) => {
    return (
      <View>
        <TouchableOpacity  style={styles.Card1}>
          {schedule_progress == 0 ? (
            <Text
              numberOfLines={2}
              style={{
                width: lebar,
                fontSize: 20,
                color: Cl2_,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              Open
            </Text>
          ) : schedule_progress == 5 ? (
            <Text
              numberOfLines={2}
              style={{
                width: lebar,
                fontSize: 20,
                color: Gr_,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              Cpc
            </Text>
          ) : (
            <Text
              numberOfLines={2}
              style={{
                width: lebar,
                fontSize: 20,
                color: Gr_,
                fontWeight: 'bold',
                marginBottom: 2,
              }}></Text>
          )}

          <Text
            numberOfLines={1}
            style={{
              width: lebar,
              fontSize: 16,
              color: Cl3_,
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
            Kode Schedule : {schedule_code}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              width: lebar,
              fontSize: 16,
              color: Cl3_,
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
            Tgl Schedule : {schedule_date}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              width: lebar,
              fontSize: 16,
              color: Cl3_,
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
            Type : {schdeule_delivery_type}
          </Text>
          {/*
<Text numberOfLines={0}
style={{flex: 1, flexWrap: 'wrap',width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>ID Client 1 : {client1_name} 
</Text>
*/}
          <Text
            numberOfLines={0}
            style={{
              flex: 1,
              flexWrap: 'wrap',
              width: lebar,
              fontSize: 16,
              color: Cl3_,
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
            Client 2 : {client2_name}
          </Text>
          <Text
            numberOfLines={0}
            style={{
              flex: 1,
              flexWrap: 'wrap',
              width: lebar,
              fontSize: 16,
              color: Cl3_,
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
            Nama Pengirim : {schedule_delivery_name}
          </Text>

          {
            <Text
              numberOfLines={0}
              style={{
                flex: 1,
                flexWrap: 'wrap',
                width: lebar,
                fontSize: 16,
                color: Cl3_,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              Alamat Kirim : {schedule_delivery_address}
            </Text>
          }
          <Text
            numberOfLines={1}
            style={{
              width: lebar,
              fontSize: 16,
              color: Cl3_,
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
            No Bag Custody : {document_bag_no}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              width: lebar,
              fontSize: 16,
              color: Cl3_,
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
            No Sticker Custody : {document_sticker}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              width: lebar,
              fontSize: 16,
              color: Cl3_,
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
            No Seal Custody : {document_seal_no}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              width: lebar,
              fontSize: 16,
              color: Cl3_,
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
            No DA : {no_da}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              width: lebar,
              fontSize: 16,
              color: Cl3_,
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
            Nominal Schedule : {numberWithCommas(nominal_pickup)}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              width: lebar,
              fontSize: 16,
              color: Cl3_,
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
            Nominal Custody : {numberWithCommas(nominal_custody)}
          </Text>
          <View style={styles.Sadle}></View>
          <View style={styles.Card3}>
            <TouchableOpacity
              style={{
                backgroundColor: Bg1_,
                flex: 1,
                flexDirection: 'row',
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%',
                elevation: 5,
                borderBottomLeftRadius: 15,
              }}
              onPress={detail}>
              <Text style={{color: '#FFFFFF', fontWeight: '600', fontSize: 18}}>
                KONFIRM
              </Text>
            </TouchableOpacity>

         
            <TouchableOpacity
              style={{
                backgroundColor: "orange",
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%',
                height: 40,
                elevation: 8,
                borderBottomRightRadius: 15,
              }}
              onPress={detail2}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontWeight: '600',

                  fontSize: 18,
                }}>
                TOLAK
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.Container}>
      <Modal animationType="none" visible={loading}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Bg1_,
          }}>
          <ActivityIndicator size="large" color={Cl_} />
        </View>
      </Modal>
      <View style={{margin: 10}}>
        {Array.isArray(data) ? (
          <TextInput
            style={styles.inputBox}
            placeholder="Cari by kode schedule"
            spellCheck={false}
            autoCorrect={false}
            onChangeText={value => searchFilterFunction(value)}
          />
        ) : null}
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={ascdata} />
        }>
        {Array.isArray(filteredDataSource)
          ? filteredDataSource.map((us, index) => {
              return (
                <All
                  key={index}
                  schedule_id={index}
                  schedule_code={us.schedule_code}
                  branch_id={us.branch_id}
                  client1_id={us.client1_id}
                  client2_id={us.client2_id}
                  client_type={us.client_type}
                  schedule_date={us.schedule_date}
                  schedule_time={us.schedule_time}
                  schdeule_delivery_type={us.schdeule_delivery_type}
                  schedule_delivery_name={us.schedule_delivery_name}
                  schedule_delivery_address={us.schedule_delivery_address}
                  schedule_is_cpc={us.schedule_is_cpc}
                  schedule_custody1={us.schedule_custody1}
                  schdeule_custody2={us.schdeule_custody2}
                  schedule_security={us.schedule_security}
                  schedule_vehicle_no={us.schedule_vehicle_no}
                  document_no={us.document_no}
                  document_transcation={us.document_transcation}
                  document_kurs={us.document_kurs}
                  document_bag_no={us.document_bag_no}
                  document_seal_no={us.document_seal_no}
                  document_sticker={us.document_sticker}
                  create_date={us.create_date}
                  schedule_user={us.schedule_user}
                  schedule_progress={us.schedule_progress}
                  client2_name={us.client2_name}
                  client1_name={us.client1_name}
                  nominal_pickup={us.nominal_pickup}
                  nominal_custody={us.nominal_custody}
                  no_da={us.no_da}
                  detail={() => conf(us)}
                  detail2={() => tolak(us)}
                />
              );
            })
          : null}
        <View style={{margin: 10}}>
          <Text
            numberOfLines={2}
            style={{width: lebar, fontSize: 12, color: Cl2_, marginBottom: 2}}>
            {notif}
          </Text>
        </View>
        <View style={styles.Sadle}></View>
      </ScrollView>
      <View style={styles.cnt}></View>
    </View>
  );
};

export default In;

const styles = StyleSheet.create({
  Container: {
    fontFamily: 'sans-serif',
    backgroundColor: Bg_,
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    justifyContent: 'center',
  },
  inputBox: {
    borderColor: Bg1_,
    borderStyle: 'solid',
    width: lebar,
    borderWidth: 2,
    backgroundColor: Bg_,
    paddingHorizontal: 2,
    fontSize: 14,
    color: 'grey',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  Card1: {
    fontFamily: 'sans-serif',
    justifyContent: 'center',
    //alignItems:"center",
    backgroundColor: Bg_,
    flex: 1,
    paddingVertical: 15,
    elevation: 8,
    flexDirection: 'column',
    padding: 10,
    color: 'blue',
    margin: 10,
    marginBottom: 5,
    borderRadius: 15,
  },
  Card3: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 15,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  button: {
    width: lebar_tombol,
    backgroundColor: Bg2_,
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 13,
    elevation: 8,
  },
  cnt: {
    fontFamily: 'sans-serif',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    flex: 1,
    // remove width and height to override fixed static size
    width: lebar,
    height: null,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: Cl_,
    textAlign: 'center',
  },
  Sadle: {
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: 'transparent',
    borderRadius: 15,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
