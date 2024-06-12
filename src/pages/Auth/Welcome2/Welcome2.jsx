import React, {useState,useContext} from 'react';
import {View, Text, Image,ScrollView, TextInput, TouchableOpacity,onChangeText} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import unities from '../../../utils/unities';

const Welcome2 = () => {
  const navigation = useNavigation();
  const {userInfo,register,logout} = useContext(AuthContext);
  const [Gender, setGender] = useState('');
  const [Height, setHeight] = useState('');
  const [HealthIssues, setHealthIssues] = useState('');
  const [Job, setJob] = useState('');
  return (
    <ScrollView>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
      }}
    >
      {/* View for the Logo */}
      <View style={{alignItems: 'center'}}>
        <Image source={require('../../../../assets/ch.png')} style={{  width: unities.ImageWidth,height: unities.ImageHeight,resizeMode:"contain",}} />
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: '#6E7E58',
            width: 200,
            marginTop: 5,
          }}
        />

        {/* Welcome Text */}
        <Text
          style={{
            color: '#6E7E58',
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 30,
            marginLeft: -60,
            marginTop: 30,
          }}
        >
          Welcome!
        </Text>

        {/* Input for Job with Label */}
        <View style={{marginTop: 40, alignItems: 'flex-start'}}>
          <View>
            <Text
              style={{
                color: '#B9B3AE',
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 20,
                marginLeft: -5,
              }}
            >
              Job:
            </Text>
            <TextInput
              placeholder=""
              value={Job}
              onChangeText={ text => setJob(text)}
              style={{
                borderBottomWidth: 3,
                borderBottomColor: 'rgba(246, 239, 232, 0.85)',
                width: 250,
                color: '#6E7E58',
                marginTop: -10,
              }}
            />
          </View>
        </View>

        {/* Dropdown for Gender */}
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: '#B9B3AE',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 20,
              marginLeft: -5,
              marginBottom: 20,
            }}
          >
            Gender:
          </Text>
          <Picker
            selectedValue={Gender}
            style={{
              height: 40,
              width: 250,
              backgroundColor: '#F6EFE9',
              color: '#6E7E58',
            }}
            itemStyle={{
              backgroundColor: '#F6EFE9',
              color: '#6E7E58',
              fontSize: 16,
            }}
            onValueChange={itemValue => setGender(itemValue)}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        {/* Input for Height with Label */}
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: '#B9B3AE',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 20,
              marginLeft: -5,
            }}
          >
            Height:
          </Text>
          <TextInput
             value={Height}
             onChangeText={ text => setHeight(text)}
            placeholder=""
            style={{
              borderBottomWidth: 3,
              borderBottomColor: '#F6EFE9',
              width: 250,
              color: '#6E7E58',
              marginTop: 5,
            }}
          />
        </View>

        {/* Dropdown for Health Issues */}
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: '#B9B3AE',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 20,
              marginLeft: -5,
              marginBottom: 20,
            }}
          >
            Health Issues:
          </Text>
          <Picker
            selectedValue={HealthIssues}
            style={{
              height: 40,
              width: 250,
              backgroundColor: '#F6EFE9',
              color: '#6E7E58',
            }}
            itemStyle={{
              backgroundColor: '#F6EFE9',
              color: '#6E7E58',
              fontSize: 16,
            }}
            onValueChange={itemValue => setHealthIssues(itemValue)}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Posture" value="posture" />
            <Picker.Item label="Mobility" value="mobility" />
            <Picker.Item label="None" value="none" />
          </Picker>
        </View>
        <View style={{marginTop: 10, alignItems: 'center', marginTop:30}}>
          <TouchableOpacity onPress={() =>register(navigation,userInfo.Firstname,userInfo.lastname, userInfo.email,userInfo.Phonenumber, userInfo.password,Job,Gender,HealthIssues,Height)}
            style={{
              backgroundColor: '#6E7E58',
              padding: 15,
              borderRadius: 18,
              marginTop: 40,
              marginBottom: 10,
              marginLeft: 5,
              width: 200,
              display:'flex',
              justifyContent:"center"
            }}
            
          >
            <Text style={{color: '#F6EFE9', fontWeight: 'bold', fontSize: 20,textAlign:"center"}}>
              Sign Up
            </Text>
          </TouchableOpacity >
          <TouchableOpacity onPress={()=>{logout();
          }} >
          <Text
            style={{
              color: '#B9B3AE',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 20,
              marginTop: 20,
            }}
          >
            Already a member?{' '}
            <Text style={{color: '#6E7E58', fontWeight: 'bold'}}>Sign in</Text>
          </Text>
          </TouchableOpacity >
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default Welcome2;