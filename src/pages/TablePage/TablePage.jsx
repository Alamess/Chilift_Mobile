/* eslint-disable react-native/no-inline-styles */
import React, {useState,useContext} from 'react';
import BleManager from 'react-native-ble-manager';
import { AuthContext } from '../../context/AuthContext';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import chiliftLogo from '../../../assets/logo.png';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import { Buffer } from 'buffer';
const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const CHARACTERISTIC_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
const TablePage = () => {
  const route = useRoute();
  var {table} = route.params;
  const {userInfo} = useContext(AuthContext);
  const [heights, setHeights] = useState([]);
  const [height, setHeight] = useState(table.lastheight);
  const [position75, setPosition75] = useState(table.height1);
  const [position105, setPosition105] = useState(table.height2);
  
 const decreaseNumber = () => {
    if (height > 70) {
      setHeight(heightNumber => heightNumber - 1);
    }
  };
  const increaseNumber = () => {
    if (height < 120) {
      setHeight(heightNumber => heightNumber + 1);
    }
  };
  
  const addHeight = () => {
    if (heights.length >= 10) {
      didWeReachTheMaximumNumberOfHeights.current = true;
      setHaveWeJustReachedTheMaximumNumberOfHeights(true);
      console.log('maximum number of heights');
      return;
    }
    const isHeightPresent = heights.some(item => item.text === height);
    if (isHeightPresent) {
      console.log('height is already present');
      return;
    }
    const ar = [...heights];
    ar.unshift({text: height, key: Math.random().toString()});
    setHeights(ar);
  };
  const [tableHeight, setTableHeight] = useState(parseInt(table.lastHeight));
  

  const handleHeightUpdate = async (height) => {
    // Première mise à jour
    axios.put(`102.211.209.102:3001/api/tables/${table.id}/updateHeight`, { newHeight: height })
      .then(res => {
        if (res.data.success) {
          
          console.log('Hauteur mise à jour avec succès pour la première URL',res.data);
          
          // Deuxième mise à jour
          axios.put(`102.211.209.102:3001/user/${userInfo.user._id}/updateHeight1`, { newHeight: height })
            .then(res => {
              if (res.data.success) {
                
                console.log('Hauteur mise à jour avec succès pour la deuxième URL',res.data);
                axios.put(`102.211.209.102:3001/user/${userInfo.user._id}/updateHeight2`, { newHeight: position75 })
                .then(res => {
                  if (res.data.success) {
                    Alert.alert('Success', 'height changed successfully');
                    console.log('Hauteur mise à jour avec succès pour la troisieme URL',res.data);
                  } else {
                    Alert.alert( 'Error', 'Failed to update the height');
                    console.error('Échec de la mise à jour de la hauteur pour la deuxième URL');
                  }
                })
                .catch(e => {
                  Alert.alert('Error', 'Failed to update the height');
                  console.error('Erreur lors de la mise à jour de la hauteur pour la deuxième URL:', e);
            });
          
              } else {
                Alert.alert('Error', 'Failed to update the height');
                console.error('Échec de la mise à jour de la hauteur pour la deuxième URL');
                
              }
            })
            .catch(e => {
              Alert.alert('Error', 'Failed to update the height');
              console.error('Erreur lors de la mise à jour de la hauteur pour la deuxième URL:', e);
            });
          
        } else {
          Alert.alert('Error', 'Failed to update the height');
          console.error('Échec de la mise à jour de la hauteur pour la première URL');
        }
      })
      .catch(e => {
        Alert.alert('Error', 'Failed to update the height');
        console.error('Erreur lors de la mise à jour de la hauteur pour la première URL:', e);
      });
  };
  const saveHeightAtPosition = position => {
    if (position === 75 || position === 105) {
      setTableHeight(height);
      handleHeightUpdate(height);
  
      // Shift the positions in a circular manner
      const newPosition75 = height;
      const newPosition105 = position75;
  
      setPosition75(newPosition75);
      setPosition105(newPosition105);
      console.log(position75,position105);
    }
  };
  const writeValue = value => {
    const buffer = Buffer.from(value, 'utf-8');
    console.log(buffer);
    BleManager.write(
      table.id,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      buffer.toJSON().data,
    )
      .then(() => {
        // Success code
        console.log('Write: ' + value);
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  };


  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'start',
        alignItems: 'center',
        gap: 10,
        paddingTop: 20,
        backgroundColor: '#fcf5f0',
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Image source={chiliftLogo} />
      <Text style={{ fontSize: 32, color: '#68784e', fontFamily: 'Montserrat-Bold' }}>
        {table.name}
      </Text>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#68784e', paddingVertical: 0, paddingHorizontal: 20, borderRadius: 50 }}>
        <Image source={require('../../../assets/connected.png')} />
        <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat-SemiBold' }}>
          CONNECTED
        </Text>
      </View>
      <Image source={require('../../../assets/tablebg.png')} />
      <Text style={{ fontSize: 32, color: '#68784e', fontFamily: 'Montserrat-Bold' }}>
        HEIGHT
      </Text>
      <View style={{ gap: 10, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 56 }}>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 10, backgroundColor: '#d2cfcc', alignItems: 'center' }} onPress={decreaseNumber}>
            <Text style={{ fontSize: 32, color: '#68784e', fontFamily: 'Montserrat-Bold' }}>-</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 36, color: '#68784e', fontFamily: 'Montserrat-Bold' }}>{height}</Text>
          <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 10, backgroundColor: '#d2cfcc', alignItems: 'center' }} onPress={increaseNumber}>
            <Text style={{ fontSize: 32, color: '#68784e', fontFamily: 'Montserrat-Bold' }}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => {
            setHeight(position75);
            writeValue(position75.toString());
          }}
          style={{
            height: 50,
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: '#68784e',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: '#fff',
              fontFamily: 'Montserrat-Bold',
            }}
          >
            {position75}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 50,
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: '#68784e',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {saveHeightAtPosition(105);
            writeValue(height.toString());}}
        >
          <Text
            style={{
              fontSize: 25,
              color: '#fff',
              fontFamily: 'Montserrat-Bold',
            }}
          >
            SAVE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setHeight(position105);
            writeValue(position105.toString());
          }}
          style={{
            height: 50,
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: '#68784e',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: '#fff',
              fontFamily: 'Montserrat-Bold',
            }}
          >
            {position105}
            </Text>
        </TouchableOpacity>
        </View>
        <View>

        </View>
        <View>

        </View>
      </View>
    </ScrollView>
  );
};

export default TablePage;
