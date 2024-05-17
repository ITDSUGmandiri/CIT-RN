// In App.js in a new project

import * as React from 'react';
import { View,Image,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Splash_screen,
  Login,Logout,
  Home,
  Qr,
  Profile,
Custody_delivery_job,
Foto_slip,
Custody_detail_job,
Custody_history_job,
Foto_da,
Custody_list_job,
Status_job,
Custody_input_value,
Cpc_list_job,Cpc_detail,Cpc_sortir,
Scu_in,
Scu_out


} from '../pages/Pages';
import logout from '../.././Img/logout.png';
import gm from '../.././Img/home.png';
import pp from '../.././Img/profile.png';
import {Bg_,Cl_,Bg1_,Cl1_} from '../style/Style_assets';
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();



const IconBottom = (warna) => {
  const { color, focused } = warna.data
  let colorSelected = focused ? color : Cl1_
  return (
  <View>
  <Image source={warna.im} style={{ width: 22, height: 20,margin:0, tintColor: colorSelected }} />
  </View>
  )}


const Bottom_navigasi = () => {
    return (
        <Tab.Navigator screenOptions= {{
          tabBarActiveTintColor: Bg1_,
            tabBarStyle :{
                position :'absolute',
                  bottom:10,
                  left : 20,
                  right :20,
                  elevation: 8,
                  paddingBottom:10,
                  backgroundColor:Bg_,
                  borderRadius:15,
                  height : 60,
                  flexDirection:'row',
                  justifyContent:'space-around',}
        }}>
        <Tab.Screen style={{fontSize:18}}
          name="Home" component={Home} 
          options={{
            headerShown:false,
            title: "Beranda",
            tabBarIcon: (warna) => (
                <IconBottom data={warna} im={gm}/>
            )
        }}
          
          />
{
           <Tab.Screen style={{fontSize:18}}
          name="Profile" component={Profile} 
          options={{
            headerShown:false,
            title: "Profile",
            tabBarIcon: (warna) => (
                <IconBottom data={warna} im={pp}/>
            )
        }}
          
          />
}
           <Tab.Screen style={{fontSize:18}}
          name="Logout" component={Logout} 
          options={{
            headerShown:false,
            title: "Keluar",
            tabBarIcon: (warna) => (
                <IconBottom data={warna} im={logout}/>
            )
        }}
          
          />
  
      </Tab.Navigator>
    );
};




const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash_screen">
        <Stack.Screen  name="Bottom_navigasi" component={Bottom_navigasi} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Splash_screen" component={Splash_screen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>

        
      



<Stack.Screen name="Custody_history_job" component={Custody_history_job} options={{headerShown:true,
            title:"Custody History Job"}}/>

 <Stack.Screen name="Custody_list_job" component={Custody_list_job} options={{headerShown:true,
            title:"Custody List Job"}}/>

            <Stack.Screen name="Custody_delivery_job" component={Custody_delivery_job} options={{headerShown:true,
            title:"Custody Delivery Job"}}/>

             <Stack.Screen name="Custody_detail_job" component={Custody_detail_job} options={{headerShown:true,
            title:"Custody Detail Job"}}/>
             <Stack.Screen name="Status_job" component={Status_job} options={{headerShown:true,
            title:"Custody status Job"}}/>


               <Stack.Screen name="Custody_input_value" component={Custody_input_value} options={{headerShown:true,
            title:"Custody Input Value"}}/>
    <Stack.Screen name="Foto_slip" component={Foto_slip} options={{headerShown:true,
            title:"Foto slip"}}/>

              <Stack.Screen name="Foto_da" component={Foto_da} options={{headerShown:true,
            title:"Foto DA"}}/>

                <Stack.Screen name="Cpc_list_job" component={Cpc_list_job} options={{headerShown:true,
            title:"Cpc List Job"}}/>

             <Stack.Screen name="Scu_in" component={Scu_in} options={{headerShown:true,
            title:"CIT IN"}}/>

                <Stack.Screen name="Scu_out" component={Scu_out} options={{headerShown:true,
            title:"CIT OUT"}}/>


             <Stack.Screen name="Cpc_detail" component={Cpc_detail} options={{headerShown:true,
            title:"CPC Detail"}}/>

                <Stack.Screen name="Cpc_sortir" component={Cpc_sortir} options={{headerShown:true,
            title:"CPC Sortir"}}/>

        <Stack.Screen name="Qr" component={Qr} options={{headerShown:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;