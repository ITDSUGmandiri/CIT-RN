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
  PermissionsAndroid,
} from 'react-native';
import {token, host, host_custom, link_gambar} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import {DataTable} from 'react-native-paper';
import Qr from '../.././Img/qr.png';
import {
  Bg_,
  Cl_,
  Bg1_,
  Cl1_,
  Bg2_,
  Cl2_,
  Cl3_,
  Gr_,
  Kn,
} from '../style/Style_assets';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMoneyBillAlt} from '@fortawesome/free-solid-svg-icons/faMoneyBillAlt';
import {faCameraAlt} from '@fortawesome/free-solid-svg-icons/faCameraAlt';
import {Camera, CameraScreen} from 'react-native-camera-kit';
const lebar = '100%';
const lebar_tombol = '100%';
const Detail = ({navigation, route}) => {
  const {schedule_id} = route.params;

  const [usid, setUid] = useState('');
  const [username, setUsername] = useState('');
  const [loading, isLoading] = useState(true);
  const [data, setdata] = useState([]);
  const [data_value, setdatavalue] = useState([]);
  const [notif, setNotif] = useState('');

  const [documenno, setdokumenno] = useState('');

  const [dokstiker, setdocumentstiker] = useState('');
  const [schedule_kode, setschedulecode] = useState('s');
  const [data_foto, setFoto] = useState([]);

  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);
  const [qrvalue1, setQrvalue1] = useState('');
  const [opneScanner1, setOpneScanner1] = useState(false);

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
    const regional = await AsyncStorage.getItem('regional');
    const result = await AsyncStorage.getItem('usnm');
    const user_name = await AsyncStorage.getItem('username');

    if (result != null) {
      setNotif('');
      setdata('');
      setQrvalue('');
      setUsername(user_name);
      setOpneScanner(false);
      setQrvalue1('');
      setOpneScanner1(false);
      setUid(result);
      Cek();
      isLoading(false);
    } else {
      isLoading(true);
      AsyncStorage.clear();
      navigation.replace('Login');
    }
  };

  const link =
    '' +
    host_custom +
    '/detail?X-Api-Key=' +
    token +
    '&schedule_id=' +
    schedule_id;

  //const link1 = ""+host+"/list_value/all?X-Api-Key="+token+"&filter=&field=&start=&limit=&filters[0][co][0][fl]=schdeule_code&filters[0][co][0][op]=equal&filters[0][co][0][vl]="+schedule_id+"&filters[0][co][0][lg]=and&sort_field=&sort_order=ASC";
  const link1 =
    '' +
    host_custom +
    '/list_value?X-Api-Key=' +
    token +
    '&schedule_id=' +
    schedule_id;
  const link2 =
    '' +
    host_custom +
    '/list_da?X-Api-Key=' +
    token +
    '&schedule_id=' +
    schedule_id;
  //const link2 = ""+host+"/list_da/all?X-Api-Key="+token+"&filter=&field=&start=&limit=&filters[0][co][0][fl]=schedule_id&filters[0][co][0][op]=equal&filters[0][co][0][vl]="+schedule_id+"&filters[0][co][0][lg]=and&sort_field=&sort_order=ASC";
  const Cek = async () => {
    fetch(link)
      .then(response => response.json())
      .then(responseJson => {
        isLoading(false);
        if (responseJson.status == 1) {
          //setdata(responseJson.data);
          setschedulecode(responseJson.schedule_code);
          //console.log(responseJson.schedule_code)
          Cek_value();
          Cek_foto();
        } else {
          isLoading(false);
          setNotif(responseJson.status);
        }
      })
      .catch(error => {
        isLoading(false);
        //console.error(error);
        setNotif('Upps ada kesalahan mohon coba lagi !!');
      });
  };

  const Cek_value = async () => {
    fetch(link1)
      .then(response => response.json())
      .then(responseJson => {
        isLoading(false);
        // console.log(responseJson.data.schedule);
        if (responseJson.status == true) {
          setdatavalue(responseJson.data);
          //console.log(responseJson.data.list_value);
          isLoading(false);
        } else {
          isLoading(false);
          setNotif(responseJson.status);
        }
      })
      .catch(error => {
        isLoading(false);
        //console.error(error);
        setNotif('Upps ada kesalahan mohon coba lagi !!');
      });
  };

  const Cek_foto = async () => {
    fetch(link2)
      .then(response => response.json())
      .then(responseJson => {
        //  isLoading(false);
        // console.log(responseJson.data.schedule);
        if (responseJson.status == 1) {
          setFoto(responseJson.data);
          //console.log(responseJson.data.list_da);
          isLoading(false);
        } else {
          isLoading(false);
          setFoto('');
          setNotif(responseJson.status);
        }
      })
      .catch(error => {
        isLoading(false);
        //console.error(error);
        setNotif('Upps ada kesalahan mohon coba lagi !!');
      });
  };

  const Update = val => {
    if (val == '') {
      isLoading(false);
      alert('Status tidak ada');
    } else if (!Array.isArray(data_value) || data_value.length == 0) {
      alert('Value belum complete..');
    } else if (!Array.isArray(data_foto) || data_foto.length == 0) {
      alert('Foto DA belum complete');
    } else if (/* dokstiker=="" || */ qrvalue1 == '' || qrvalue == '') {
      isLoading(false);
      alert('Bag , seal tidak boleh kosong');
    } else {
      isLoading(true);

      var details = {
        user: usid,
        schedule_id: schedule_id,
        username: username,
        schedule_progress: val,
        document_bag_no: qrvalue1,
        dodument_seal_no: qrvalue,
        document_sticker: dokstiker,
      };

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch('' + host_custom + '/finish_custody', {
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
          if (responseJson.status == true) {
            alert('Berhasil');
            //ascdata();
            navigation.replace('Custody_delivery_job');
            // isLoading(false);
          } else {
            isLoading(false);
            Alert.alert(responseJson.message);
            // console.log(responseJson);
          }
        })
        .catch(error => {
          isLoading(false);
          console.error(error);
          alert('Gagal input Input_kaset');
        });
    }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const Value_denom = () => {
    return (
      <View style={styles.menu}>
        <View style={{width: '100%', padding: 10}}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={{alignItems: 'flex-start', width: '50%'}}>
              <Text style={styles.Judulbox}>Value</Text>
            </View>
            <View style={{alignItems: 'flex-end', width: '50%'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: Bg1_,
                  flex: 1,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  elevation: 8,
                  borderRadius: 8,
                }}
                onPress={() => Pindah_halaman('Custody_input_value')}>
                <Text style={{color: '#fff', fontWeight: '200', fontSize: 18}}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title
                  style={{
                    fontSize: 14,
                    color: 'grey',
                    fontWeight: 'normal',
                    justifyContent: 'center',
                  }}>
                  Kurs
                </DataTable.Title>
                <DataTable.Title
                  style={{
                    fontSize: 14,
                    color: 'grey',
                    fontWeight: 'normal',
                    flex: 2,
                    justifyContent: 'center',
                  }}>
                  Denom
                </DataTable.Title>
                <DataTable.Title
                  style={{
                    fontSize: 14,
                    color: 'grey',
                    fontWeight: 'normal',
                    justifyContent: 'center',
                  }}>
                  Value
                </DataTable.Title>
                <DataTable.Title
                  style={{
                    fontSize: 14,
                    color: 'grey',
                    fontWeight: 'normal',
                    flex: 3,
                    justifyContent: 'center',
                  }}>
                  Nilai Tukar
                </DataTable.Title>
                <DataTable.Title
                  style={{
                    fontSize: 14,
                    color: 'grey',
                    fontWeight: 'normal',
                    flex: 3,
                    justifyContent: 'center',
                  }}>
                  Tota IDR
                </DataTable.Title>
                <DataTable.Title
                  style={{
                    fontSize: 14,
                    color: 'grey',
                    fontWeight: 'normal',
                    justifyContent: 'center',
                  }}>
                  Delete
                </DataTable.Title>
              </DataTable.Header>

              {Array.isArray(data_value) ? (
                data_value.map((us, i) => {
                  return (
                    <DataTable.Row
                      key={i}
                      tyle={{
                        textAlign: 'right',
                        alignItems: 'flex-end',
                        flex: 1,
                      }}>
                      <DataTable.Cell>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#000060',
                            fontWeight: 'normal',
                          }}>
                          {us.kurs_currency}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{flex: 2, justifyContent: 'flex-end'}}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#000060',
                            fontWeight: 'normal',
                          }}>
                          {numberWithCommas(us.list_denom)}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{flex: 2, justifyContent: 'flex-end'}}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#000060',
                            fontWeight: 'normal',
                          }}>
                          {numberWithCommas(us.list_value)}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{flex: 2, justifyContent: 'flex-end'}}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#000060',
                            fontWeight: 'normal',
                          }}>
                          {numberWithCommas(us.nilai_tukar)}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{flex: 3, justifyContent: 'flex-end'}}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#000060',
                            fontWeight: 'normal',
                          }}>
                          {numberWithCommas(
                            us.list_denom * us.list_value * us.nilai_tukar,
                          )}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{flex: 1, justifyContent: 'flex-end'}}>
                        <TouchableOpacity
                          style={{
                            width: 20,
                            Height: 20,
                            borderRadius: 55,
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'red',
                            textAlign: 'right',
                            padding: 5,
                          }}
                          onPress={() => conf(us.id)}>
                          <Text
                            numberOfLines={2}
                            style={{
                              color: '#FFFFFF',
                              fontWeight: '800',
                              fontSize: 12,
                            }}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })
              ) : (
                <Text numberOfLines={2} style={styles.statmerah}>
                  Belum Complete
                </Text>
              )}

              <DataTable.Header>
                <DataTable.Title style={{flex: 4, justifyContent: 'center'}}>
                  <Text
                    style={{fontSize: 16, color: 'green', fontWeight: '100'}}>
                    Total IDR :{' '}
                    {numberWithCommas(
                      data_value.reduce(
                        (total, val) =>
                          total +
                          parseInt(
                            val.list_denom * val.list_value * val.nilai_tukar,
                          ),
                        0,
                      ),
                    )}
                  </Text>
                </DataTable.Title>
              </DataTable.Header>
            </DataTable>
          </View>
        </View>
      </View>
    );
  };

  const conf = id => {
    return Alert.alert(
      'Konfirmasi',
      'Apakah anda yakin ingin menghapus value?',
      [
        {
          text: 'Yes',
          onPress: () => {
            Delete_val(id);
          },
        },

        {
          text: 'No',
        },
      ],
    );
  };

  const Delete_val = id => {
    if (id == '') {
      isLoading(false);
      alert('Gagal hapus data');
    } else {
      isLoading(true);

      var details = {
        id: id,
      };

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch('' + host_custom + '/delete_list_value', {
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
            Cek();
            alert('Berhasil Delete');
            isLoading(false);
          } else {
            isLoading(false);
            Alert.alert(responseJson.message);
            //console.log(responseJson);
          }
        })
        .catch(error => {
          isLoading(false);
          console.error(error);
          alert('Gagal Delete');
        });
    }
  };

  const conf2 = (id, foto) => {
    return Alert.alert(
      'Konfirmasi',
      'Apakah anda yakin ingin menghapus foto ?',
      [
        {
          text: 'Yes',
          onPress: () => {
            Delete_foto(id, foto);
          },
        },

        {
          text: 'No',
        },
      ],
    );
  };

  const Delete_foto = (id, foto) => {
    if (id == '') {
      isLoading(false);
      alert('Gagal hapus data');
    } else {
      isLoading(true);

      var details = {
        id: id,
        foto: foto,
      };

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch('' + host_custom + '/delete_list_da', {
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
            alert('Berhasil Delete');
            isLoading(false);
            Cek_foto();
          } else {
            isLoading(false);
            Alert.alert(responseJson.status);
            //console.log(responseJson);
          }
        })
        .catch(error => {
          isLoading(false);
          console.error(error);
          alert('Gagal Delete');
        });
    }
  };

  const Foto = () => {
    return (
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.Box}
          onPress={() => Pindah_halaman('Foto_da', schedule_id)}>
          <FontAwesomeIcon icon={faCameraAlt} style={styles.Imgbox} size={32} />
        </TouchableOpacity>
        <View style={{width: '75%', padding: 10}}>
          <View>
            {Array.isArray(data_foto) || data_foto.length > 0 ? (
              data_foto.map((us, i) => {
                return (
                  <View key={i}>
                    <View style={{alignItems: 'flex-end'}}>
                      <TouchableOpacity
                        style={{
                          width: 20,
                          Height: 20,
                          borderRadius: 55,
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'red',
                          textAlign: 'right',
                          padding: 5,
                        }}
                        onPress={() => conf2(us.da_id, us.file_da)}>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: '#FFFFFF',
                            fontWeight: '800',
                            fontSize: 12,
                          }}>
                          X
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <Image
                      source={{uri: link_gambar + 'list_da/' + us.file_da}}
                      style={styles.logo}></Image>
                    <Text numberOfLines={2} style={styles.stathijau}>
                      {us.no_da}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text numberOfLines={2} style={styles.statmerah}>
                Belum Complete
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const onOpneScanner = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permintaan akses kamera',
          message: 'Aplikasi akan mengakses kamera anda',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setQrvalue('');
        setOpneScanner(true);
      } else {
        alert('CAMERA permission denied');
      }
    } catch (err) {
      alert('Camera permission error', err);
    }
  };
  const onBarcodeScan = qrvalue => {
    setQrvalue(qrvalue);
    setOpneScanner(false);
    alert(qrvalue);
  };

  const onOpneScanner1 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permintaan akses kamera',
          message: 'Aplikasi akan mengakses kamera anda',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setQrvalue1('');
        setOpneScanner1(true);
      } else {
        alert('CAMERA permission denied');
      }
    } catch (err) {
      alert('Camera permission error', err);
    }
  };
  const onBarcodeScan1 = qrvalue => {
    setQrvalue1(qrvalue);
    setOpneScanner1(false);
    alert(qrvalue);
  };

  const Pindah_halaman = halaman => {
    navigation.navigate(halaman, {schedule_id: schedule_id});
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
      <Modal animationType="none" visible={opneScanner}>
        <CameraScreen
          // Barcode props
          scanBarcode={true}
          onReadCode={event => onBarcodeScan(event.nativeEvent.codeStringValue)}
          showFrame={true}
          laserColor="green"
          frameColor="white"
          colorForScannerFrame={'black'}
          //cameraOptions={{
          //                torchMode	:'on'
          //  }}
        />
        <View style={styles.cnt}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setOpneScanner(false)}
            activeOpacity={0.6}>
            <Text style={styles.buttonText}>Kembali</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal animationType="none" visible={opneScanner1}>
        <CameraScreen
          // Barcode props
          scanBarcode={true}
          onReadCode={event =>
            onBarcodeScan1(event.nativeEvent.codeStringValue)
          }
          showFrame={true}
          laserColor="green"
          frameColor="white"
          colorForScannerFrame={'black'}
          //cameraOptions={{
          //                torchMode	:'on'
          //  }} setOpneScanner(false)
        />
        <View style={styles.cnt}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setOpneScanner1(false)}
            activeOpacity={0.6}>
            <Text style={styles.buttonText}>Kembali</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={ascdata} />
        }>
        <View style={styles.menu}>
          <Text numberOfLines={2} style={styles.wtext}>
            Kode Schedule :{schedule_kode}
          </Text>
        </View>
        <Value_denom />

        <Foto />

        <View style={styles.menu}>
          <View style={{width: '100%', padding: 10}}>
            {/*
            
  <Text style={styles.Judulbox}>No DA</Text>
 <TextInput style={styles.inputBox}
      placeholder="Document no"
      spellCheck={false}
      autoCorrect={false}
  
       onChangeText={value => setdokumenno(value)}
       
    />
*/}
            <Text style={styles.Judulbox}>No Bag</Text>
            <View style={styles.cont1_}>
              <TextInput
                style={styles.input}
                placeholder="Seal Lama"
                spellCheck={false}
                autoCorrect={false}
                onChangeText={value => setQrvalue1(value)}
                value={qrvalue1}
              />
              <View style={styles.Box_}>
                <TouchableOpacity style={styles.Box} onPress={onOpneScanner1}>
                  <Image source={Qr} style={styles.Imgbox}></Image>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.Judulbox}>No Seal</Text>
            <View style={styles.cont1_}>
              <TextInput
                style={styles.input}
                placeholder="Seal Lama"
                spellCheck={false}
                autoCorrect={false}
                onChangeText={value => setQrvalue(value)}
                value={qrvalue}
              />
              <View style={styles.Box_}>
                <TouchableOpacity style={styles.Box} onPress={onOpneScanner}>
                  <Image source={Qr} style={styles.Imgbox}></Image>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.Judulbox}>No Stiker</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Document no"
              spellCheck={false}
              autoCorrect={false}
              onChangeText={value => setdocumentstiker(value)}
            />
          </View>
        </View>

        <View style={styles.Sadle}></View>
      </ScrollView>
      {/*
<View style={styles.Card3}>

  
 
 <TouchableOpacity style={{backgroundColor:Bg1_,flex: 1,
    flexDirection: 'row',
     height: 50,
    alignItems: 'center',
    justifyContent: 'center',width:lebar_tombol,elevation: 8,}} onPress={() => Pindah_halaman('Custody_input_value')}>
  <Text style={{ color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 18}}>Input Value</Text> 
  </TouchableOpacity>
  <TouchableOpacity style={{backgroundColor:Gr_,flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',width:lebar_tombol}} onPress={() => Pindah_halaman('')}>
  <Text style={{ color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 18}}>CH</Text> 
  </TouchableOpacity>
  

  </View>
 */}

      <View style={styles.cnt}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Update(4)}
          activeOpacity={0.6}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  Container: {
    fontFamily: 'sans-serif',
    backgroundColor: Bg_,
    flex: 1,
    padding: 10,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Card3: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 15,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cont1_: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  inputBox: {
    borderColor: Bg1_,
    borderStyle: 'solid',
    width: lebar_tombol,
    borderWidth: 1,
    backgroundColor: Bg_,
    paddingHorizontal: 2,
    fontSize: 14,
    color: 'grey',
    borderColor: 'grey',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  input: {
    height: 40,
    margin: 0,
    borderWidth: 1,
    width: '70%',
    padding: 10,
    color: 'grey',
    borderColor: 'grey',
  },

  logo: {
    alignItems: 'center',
    height: 248,
    padding: 20,
    width: 158,
    marginBottom: 10,
    marginTop: 20,
  },
  Card: {
    fontFamily: 'sans-serif',
    backgroundColor: Bg_,
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 20,
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
  button: {
    width: lebar_tombol,
    backgroundColor: Bg2_,
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 13,
    elevation: 8,
  },
  button1: {
    width: lebar_tombol,
    backgroundColor: Cl2_,
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 13,
    elevation: 8,
  },

  wrapper1: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  wtext: {
    marginVertical: 1,
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000060',
  },

  wrapper: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    elevation: 8,
    backgroundColor: Bg1_,
    borderRadius: 5,
  },
  stepWrapper: {
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  stepText: {
    textAlign: 'center',
    padding: 5,
    fontSize: 12,
    color: Cl_,
  },
  Box_: {
    backgroundColor: Bg_,
    width: 55,
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    color: Cl1_,
    flex: 0,
  },
  Box: {
    flex: 0,
    backgroundColor: '#ffffff',
    width: '100%',
    height: 250,
    borderRadius: 15,
    alignItems: 'center',
    color: Cl1_,
  },

  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderColor: 'grey',
    padding: 10,
    elevation: 1,
  },

  Box: {
    flex: 0,
    backgroundColor: '#ffffff',
    width: 60,
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    marginRight: 10,
    marginLeft: 10,
    color: Cl1_,
  },
  Imgbox: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    width: 30,
    height: 30,
    justifyContent: 'center',
    top: 15,
  },
  Judulbox: {
    fontSize: 16,
    color: 'grey',
    marginTop: 5,
    textAlign: 'left',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 10,
  },
  statmerah: {
    marginHorizontal: 10,
    marginVertical: 1,
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
    color: Cl2_,
  },
  stathijau: {
    marginHorizontal: 10,
    marginVertical: 1,
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
    color: Gr_,
  },
  Sadle: {
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: 'transparent',
    borderRadius: 15,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
