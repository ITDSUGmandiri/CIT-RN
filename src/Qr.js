import React, {useState} from 'react';
import {
Switch,
  Share,
  Text,
  View,
  Linking,
  Alert,
  TouchableHighlight,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
 
// import CameraKitCameraScreen
import { Camera, CameraScreen } from 'react-native-camera-kit';
 
const App = () => {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);
 const [switchValue, setSwitchValue] = useState(false);
 const [switchFlash, setflashmod] = useState('off');

 
  const onBarcodeScan = (qrvalue) => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    setOpneScanner(false);
//alert(qrvalue);
  };
 
  const onOpneScanner = async () => {
  
        try {
              const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
            {
        title: "Permintaan akses kamera",
        message:
          "Aplikasi akan mengakses kamera anda",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue("");
            setOpneScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission error', err);
          //console.warn(err);
        }
  };

  
 const onShare = async () => {
    try {
       const msg ={message:qrvalue};
      const option = await Share.share(msg);
      if (option.action === Share.sharedAction) {
        if (option.activityType) 
        {
          
        } 
        else 
        {
          
        }
      } else if (option.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert("gagal share");
    }
  };


   const onsub = () => {


    if (qrvalue.substring(0, 4) === 'http') {
      Linking.openURL(result).catch(err =>
        console.error('An error occured', err)
      );
    } else {
      Alert.alert(qrvalue + " bukan alamat url");
    }
  };

  const toggleSwitch = (value) => {
    setSwitchValue(value);
    
    if (value == true)
    {
    setflashmod('on');
    }
    else{
setflashmod('off');
    }
  };
 
  return !opneScanner? ( <View style = {styles.container}>
 <Text style={styles.textStyle}>
            {qrvalue ? 'Scanned Result: ' + qrvalue : ''}
          </Text>
    { qrvalue ?
<View>

    <TouchableHighlight
            onPress={onsub}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              Cek Browser
            </Text>
          </TouchableHighlight>
          
 <TouchableHighlight
            onPress={onShare}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              Share
            </Text>
          </TouchableHighlight>
          </View>
:
<View>
         

         
          </View>
    }
      <TouchableHighlight
            onPress={onOpneScanner}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              Open QR Scanner
            </Text>
          </TouchableHighlight>
</View>
  ) : ( <View >
    {   /*    <View style = {{height:30, margin:10}}>
      <Text style={styles.centerText}>
       Flash : {''}
       <Text>{switchValue ? 'Switch is ON' : 'Switch is OFF'}</Text>
    <Switch
      onValueChange={toggleSwitch}
      value={switchValue}/></Text>
  </View> */}
 <CameraScreen
  // Barcode props
  scanBarcode={true}
  onReadCode={(event) =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
  }
  showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
  laserColor='green' // (default red) optional, color of laser in scanner frame
  frameColor='white'
  colorForScannerFrame={'black'}
  //cameraOptions={{
  //                torchMode	:'on' 
 //  }}
/>

   
</View>
  );
};
 
export default App;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
    margin :5

  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
    centerText: {
    flex: 1,
    fontSize: 18,
    top: 0,
    color: '#777'
  },
});
