import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import unities from '../../../utils/unities';
const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('../../../../assets/ch.png')}
          style={{   width: unities.ImageWidth,
            height: unities.ImageHeight,
            resizeMode:"contain",
            marginTop:unities.mediumMarginV
          }}
        />

        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: '#6E7E58',
            width: 200,
            marginTop: 5,
          }}
        />
      </View>
      <View style={{marginTop: unities.XLMargin, alignItems: 'center', }}>
        <Image
          source={require('../../../../assets/Welcomeimg.png')}
          style={{
            borderTopRightRadius: 320,
            overflow: 'hidden',
            width: '100%',
            marginTop:unities.smallMarginV,
          }}
        />
      </View>
      <View style={{marginVertical:unities.smallMarginV, alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#6E7E58',
            alignItems: 'center',
            borderRadius: 150,
            width: 200,
          }}
          onPress={() => {
           navigation.navigate('Login') ;
          }}
        >
          <Text style={{color: 'white', fontFamily: 'Montserrat-SemiBold', backgroundColor: '#6E7E58',}}>
            Get Started Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;