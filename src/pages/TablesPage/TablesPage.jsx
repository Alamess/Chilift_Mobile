/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useCallback,useContext} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  PanResponder,
  PermissionsAndroid,
  Pressable,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import axios from 'axios';
import TableCard from '../../components/TableCard';
import bluetoothIcon from '../../../assets/bluetooth.png';
import tableImage from '../../../assets/tablebg.png';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';
import unities from '../../utils/unities';
import fonts from '../../utils/fonts';
import theme from '../../utils/theme';
import { AuthContext } from '../../context/AuthContext';
const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const CHARACTERISTIC_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
const TablesPage = () => {
  const {logout,userInfo} = useContext(AuthContext);
  const navigation = useNavigation();
  const [tables, setTables] = useState([]);
  const [currentPage, setCurrentPage] = useState('TablesPage');
  const [devices, setDevices] = useState([]);
 
  const [selectedDevice, setSelectedDevice] = useState({});
  const [selectedCharacteristic, setSelectedCharacteristic] = useState({});
  const [isScanning, setIsScanning] = useState(false);
  const [connected, setConnected] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const fetchTableIfExists = async (device) => {
    setIsLoading(true);
    try {
      const resTable = await axios.get(`http://102.211.209.102:3001/api/table/${device.id}`);
      let Last;
  
      if (resTable.data.exist) {
        console.log(resTable.data);
        Last = resTable.data.updatedTable.lastHeight;
      } else {
        Ajoutertable(device.id, device.name);
        Last = 75;
      }
  
      const resUser = await axios.get(`http://102.211.209.102:3001/user/${userInfo.user._id}`);
      setIsLoading(false);
      handleNavigation({
        id: device.id,
        name: device.name,
        lastheight: Last,
        height1: resUser.data.height1,
        height2: resUser.data.height2
      });
    } catch (err) {
      console.error('Erreur lors de la récupération des données:', err);
      setIsLoading(false);
    }
  };
  
  async function checkPermissions() {
    try {
      const grantedFineLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      console.log(
        'ACCESS_FINE_LOCATION',
        grantedFineLocation === PermissionsAndroid.RESULTS.GRANTED
      );
  
      const grantedCoarseLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      );
      console.log(
        'ACCESS_COARSE_LOCATION',
        grantedCoarseLocation === PermissionsAndroid.RESULTS.GRANTED
      );
        const grantedBluetoothScan = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      );
      console.log(
        'BLUETOOTH_SCAN',
        grantedBluetoothScan === PermissionsAndroid.RESULTS.GRANTED,
      );

      const grantedBluetoothConnect = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      );
      console.log(
        'BLUETOOTH_CONNECT',
        grantedBluetoothConnect === PermissionsAndroid.RESULTS.GRANTED,
      );
    } catch (err) {
      console.warn(err);
    }
  }
  const stopScan = useCallback(async () => {
    try {
      await BleManager.stopScan();
      setIsScanning(false);
      console.log('scan stopped');
      
    } catch (error) {
      console.error('Error stopping scan:', error);
      throw error;
    }
  }, []);

  const delay = milliseconds => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  };
  const clearDevicesCache = () => {
    setDevices([]); 
    console.log('Devices cache cleared');
  };
  const disconnectDevice = async (device) => {
    try {
      await BleManager.disconnect(device.id);
      console.log(`Disconnected from device: ${device.name}(${device.id})`);
    } catch (error) {
      console.log(`Failed to disconnect device: ${device.name}(${device.id})`, error);
    }
  };
  const startScan = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        await checkPermissions();
        if(connected && selectedDevice){
          disconnectDevice(selectedDevice);
        }
        clearDevicesCache();
        await BleManager.enableBluetooth();
        console.log('Bluetooth is already enabled');
  
        await BleManager.start({ showAlert: true });
        console.log('BleManager started');
  
        setIsScanning(true);
        await BleManager.scan([], 3, false,{})
        await delay(3000)
        var devicesBLE = await BleManager.getDiscoveredPeripherals([]);
        setDevices(devicesBLE);

        
        console.log('Scanning done');
        stopScan();
        console.log("discoveredPeripherals",devices)
        resolve();
      } catch (error) {
        console.error('Error starting scan:', error);
        reject(error);
      }
    });
  }, []);
  const connectToDevice = async device => {
    try {
      setSelectedDevice(device);
      console.log(`Connecting to device: ${device.name}(${device.id})`);
      await BleManager.connect(device.id);
      console.log(`Connected to device: ${device.name}(${device.id})`);
      setSelectedDevice(device);
      setConnected(true);
      discoverServices(device);
      console.log()
    } catch (error) {
      console.error(
        `Failed to connect to device: ${device.name}(${device.id})\n`,
        error,
      );
    }
  };

  const discoverServices = async selectedDevice => {
    try {
      console.log('Discovering services for device: ', selectedDevice.id);
      await BleManager.retrieveServices(selectedDevice.id);
      console.log('Services discovered for device: ', selectedDevice.name);
      setSelectedCharacteristic(CHARACTERISTIC_UUID);
    } catch (error) {
      console.error(
        'Failed to discover services for device:',
        selectedDevice.name,
        error,
      );
    }
  };
  const Ajoutertable = async (id,name) => {
      axios.post(
        `http://102.211.209.102:3001/api/table/save`,
        {
          id : id ,
          name : name,
          lastHeight : 75,
        },
      )
      .then(res => {
        let tableInfo = res.data
        console.log("table added success",tableInfo);
        
      })
     .catch(e => {
      console.log(`Save Table error ${e}`);})
  };
  const navigateToPage = pageName => {
    setCurrentPage(pageName);
  };
  useEffect(() => {
    if (currentPage !== null) {
      navigation.navigate(currentPage);
    }
  }, [currentPage]);
  // useEffect(() => {
  //   const fetchTables = async () => {
  //     try {
  //       const response = await fetch('http://10.0.2.2:3001/api/tables');

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setTables(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchTables();
  // }, [tables]);

  const handleNavigation = table => {
    navigation.navigate('TablePage', {
      table,
    });
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Slide in the drawer
        if (gestureState.dx < -50) {
          setTranslateXValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // If swiped more than 50 to the right, slide out the drawer
        if (gestureState.dx > 50) {
          animateDrawer(true);
        } else {
          // If not, slide in the drawer
          animateDrawer(false);
        }
      },
    }),
  ).current;

  const [translateXValue, setTranslateXValue] = useState(
    new Animated.Value(-300),
  );

  const animateDrawer = show => {
    Animated.timing(translateXValue, {
      toValue: show ? 0 : -300,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Reset sidebar state when component unmounts
  useEffect(() => {
    return () => animateDrawer(false);
  }, []);

  const [selectedRating, setSelectedRating] = useState(null);

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'start',
        alignItems: 'center',
        gap: 10,
        flex: 1,
        paddingTop: 20,
        position: 'relative',
        zIndex: 0,
        backgroundColor: '#fcf5f0',
      }}
    >
      <Spinner visible={isLoading}/>
      {/* Shape on the left */}
      <View style={styles.shapeContainer} {...panResponder.panHandlers}>
        <View style={styles.circle}></View>
      </View>

      {/* Icons for navigation */}
      <Animated.View
        style={[styles.drawer, {transform: [{translateX: translateXValue}],zIndex:2}]}
      >
        <TouchableOpacity
          onPress={() => navigateToPage('Home')}
          style={styles.icon}
        >
          <Icon
            name="home"
            size={39}
            color={currentPage === 'Home' ? '#DC8E1AB2' : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => animateDrawer(false)}>
          <Image
            source={require('../../../assets/user.png')}
            style={styles.imageIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToPage('Feedback')}
          style={styles.icon}
        >
          <Icon
            name="message-reply-text-outline"
            size={39}
            color='white'
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => logout()}
          style={styles.icon}
        >
          <Icon
            name="logout"
            size={39}
            color={currentPage === 'Logout' ? '#DC8E1AB2' : 'white'}
          />
        </TouchableOpacity>
      </Animated.View>
      <TouchableWithoutFeedback onPress={()=>{animateDrawer(false)}} style={{flex:1}}>
        <View style={{flex:1,alignItems:"center",marginTop:unities.smallMarginV }}>
      <Image source={require('../../../assets/ch.png')} style={styles.logo}/>
      <Text
        style={{
          fontSize:unities.fontSizeXXXL,
          fontFamily:fonts.montserratBold,
          color: theme.colors.secondary, 
        }}
      >
        Table
      </Text>
      <View
        style={{
          backgroundColor: '#68784e',
          marginVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 50,
        }}
      >
        <TouchableOpacity>
        <Text
          onPress={startScan}
          style={{
            fontSize: unities.fontSizeXL,
            color: '#fff',
            fontFamily: 'Montserrat-SemiBold',
          }}
        >
          {devices.length > 0 ? 'Available Devices' : 'Scan Devices'}
        </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: 'rgba(96, 113, 69, 0.7)',
          height: '57%',
          width: '85%',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          position: 'absolute',
          bottom: 20,
          zIndex: 1,
          alignItems: 'center',
          
        }}
      >
        <Image source={bluetoothIcon} style={{top: -32,height:70,width:70}} />

        {isScanning ? (
          <ActivityIndicator
            style={{
              paddingVertical: 20,
            }}
            size="large"
            color="#fff"
          />
        ) : (
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'start',
              alignItems: 'center',
              gap: 20,
            }}
            showsVerticalScrollIndicator={false}
            style={{
              width: '100%',
              paddingHorizontal: 20,
            }}
          >
            {devices.filter(device => device.name !== null).map((device, index) => (
              <TouchableOpacity
                style={{
                  width: '100%',
                }}
                key={device.id}
                onPress={() => {connectToDevice(device);
                fetchTableIfExists(device);
                
                }}
                

              >
                <TableCard tableName={device.name || device.id } />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        <TouchableOpacity onPress={startScan}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 21,
              color: 'white',
              paddingBottom: 25,
              paddingTop:10,
              textDecorationLine: 'underline',
            }}
          >
            FIND ANOTHER TABLE ?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop:unities.XSMarginV }}>
        <Image source={tableImage} />
      </View>
      </View>
      </TouchableWithoutFeedback >
  
    </ScrollView>
  );
};

const styles = {
  shapeContainer: {
    position: 'absolute',
    top: 5,
    left: 0,
    width: 70,
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  circle: {
    width: 40,
    height: 150,
    borderTopLeftRadius: 75,
    borderBottomLeftRadius: 75,
    borderBottomRightRadius: 70,
    borderTopRightRadius: 70,
    backgroundColor: theme.colors.orangeColor, 
    position: 'absolute',
    top: '10%',
    left: -25,
  },
  drawer: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: 65,
    height: '100%',
    backgroundColor: '#607145',
    padding: 15,
    borderTopRightRadius: 90,
    zIndex: 2,
  },
  icon: {
    marginTop: unities.mediumMarginV,  
    marginBottom: unities.mediumMarginV,
  },
  imageIcon: {
    width: 42,
    height: 40,
    borderRadius: 25,
  },
  logo: {
    width: unities.ImageWidth,
    height: unities.ImageHeight,
    resizeMode:"contain",
  }
};

export default TablesPage;
