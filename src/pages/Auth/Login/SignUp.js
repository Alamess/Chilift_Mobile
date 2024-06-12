import React,{useState,useContext} from 'react';
import { View, Text, ScrollView , StyleSheet,TouchableOpacity ,onChangeText,Image,TextInput} from 'react-native';
import {AuthContext} from '../../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import unities from '../../../utils/unities';
const SignUp = ()=>{
  const navigation = useNavigation();
  const [Firstname, setFirstName] = useState(null);
  const [lastname, setlastName] = useState(null);
  const [Phonenumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordconfirme, setPasswordconfirme] = useState(null);
  const {suivant,isLoading,verification_mail} = useContext(AuthContext);

  return (
        <ScrollView style={styles.container}>
          <Spinner visible={isLoading} />
          <View style={{  backgroundColor: 'white' }} >
            <Image source={ require('../../../../assets/ch.png') }style={styles.logo} />
              <Text style={styles.line2}/>
          </View>
          <View style={{  backgroundColor: 'white',marginTop:25}}>
           <Text style={{ color: '#6E7E58', fontSize: 28, fontFamily: 'Montserrat-Bold', fontWeight: '700', marginLeft: 70}}>
             Welcome !
           </Text>
          </View>
          <View style={{ backgroundColor: 'white',marginTop:30}}>
           <View style={{ marginTop: 5 }}>
              <Text style={styles.text}>First Name:</Text>
              <TextInput style={styles.line}
              value={Firstname}
              onChangeText={text => setFirstName(text)} />
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.text}>Last Name:</Text>
              <TextInput style={styles.line} 
              value={lastname} 
              onChangeText={text => setlastName(text)} />
              </View>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.text}>Email:</Text>
              <TextInput style={styles.line}
              value={email}
               onChangeText={text => {setEmail(text);
                  verification_mail(text);}} />
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.text}>Phone Number:</Text>
              <TextInput style={styles.line}
              value={Phonenumber} 
              keyboardType='numeric'
              onChangeText={text => setPhoneNumber(text)} />
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.text}>Password:</Text>
              <TextInput style={styles.line}
              value={password} 
                onChangeText={text => setPassword(text)} 
                secureTextEntry
              />
            </View>
            <View style={{ marginTop: 5 , marginBottom:15 }}>
              <Text style={styles.text}>Confirm Password:</Text>
              <TextInput style={styles.line} 
              value={passwordconfirme} 
              onChangeText={text => setPasswordconfirme(text)} 
              secureTextEntry/>
            </View>
          </View >
          <View style={{ backgroundColor: 'white', alignItems: 'center' }}>
            <TouchableOpacity style={styles.gradient}  onPress={() => {suivant(navigation,Firstname,lastname,email,Phonenumber,password,passwordconfirme);}}>
              <Text style={{color: '#F6EFE9', fontSize: 20, fontFamily: 'Montserrat-Bold', fontWeight: '700', textAlign:'center'}}>
                Next
              </Text>
            </TouchableOpacity>
         </View>
        </ScrollView>
      );
}
const styles = StyleSheet.create({
    container: {
      display:'flex',
      padding: 20,
      backgroundColor : 'white' 
    },
    logo:{
      width: unities.ImageWidth,
      height: unities.ImageHeight,
      resizeMode:"contain",
      alignSelf: 'center',
    },
    text: {
      color: '#B9B3AE',
      fontSize: 20,
      fontFamily: 'Montserrat-Bold',
      fontWeight: '700',
      marginLeft:30,
      marginTop:20,
    },
    
    customStyle: {
      width: 167,
      height: 24,
      marginLeft: 70,
    },
    
    line: {
      borderBottomWidth: 4,
      width: '75%',
      borderBottomColor: 'rgba(246, 239, 232, 0.85)',
      marginLeft:30,
      color:'black'
    },
    line2: {
      borderBottomWidth: 4,
      width: '60%',
      borderBottomColor: '#6E7E58',
      alignSelf: 'center',

    },
  
    gradient: {
      width: 250,
      height: 44,
      borderRadius: 25,
      alignItems:'center',
      backgroundColor: '#607145',
      justifyContent:'center',
      marginTop:10,
      marginBottom:30 ,
    },
  
   
  });
  
  export default SignUp;
