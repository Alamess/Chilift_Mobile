import React,{useState,useContext} from 'react';
import { View, Text, ScrollView , StyleSheet,TouchableOpacity ,onChangeText,Image,TextInput} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
const SetPassword = ()=>{
  const navigation = useNavigation();
    const {isLoading,update,userInfo} = useContext(AuthContext);
    const [password, setPassword] = useState(null);
    const [passwordconfirme, setPasswordconfirme] = useState(null);
    return(
    <ScrollView style={styles.container}>
    <Spinner visible={isLoading}/>
    <View style={{ flex: 3, backgroundColor: 'white' }} >
     <Image source={require('../../../assets/image.png') }style={styles.logo} />
     <Text style={styles.line2}/>
    </View>
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={{ color: '#6E7E58', fontSize: 30, fontFamily: 'Montserrat', fontWeight: '700',marginTop:30}}>
        Reset Password
      </Text>
    </View>
    
    <View style={{ flex: 4, backgroundColor: 'white' ,marginTop:70}}>
     <View style={{ flex: 1, backgroundColor: 'white' }}>
       <Text style={styles.text}>
          New Password:
       </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
        <TextInput
         value={password}
         onChangeText={text => setPassword(text)}
          style={styles.line}
          secureTextEntry
        />
     </View>
     <View style={{ flex: 1, backgroundColor: 'white' , marginTop:40}}>
       <Text style={styles.text}>
          Confirm Password:
       </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
        <TextInput
         value={passwordconfirme}
         onChangeText={text => setPasswordconfirme(text)}
          style={styles.line}
          secureTextEntry
        />
     </View>
     </View>
     <View style={{ flex:2, backgroundColor: 'white', alignItems: 'center' ,marginTop : 58}}>
          <TouchableOpacity style={styles.gradient}  onPress={() =>{update(navigation,userInfo.user._id,userInfo.user.Firstname,userInfo.user.lastname, userInfo.user.email,userInfo.user.Phonenumber, password,passwordconfirme,userInfo.user.Job,userInfo.user.Gender,userInfo.user.HealthIssues,userInfo.user.Height);}} >
            <Text style={{color: '#F6EFE9', fontSize: 20, fontFamily: 'Montserrat', fontWeight: '700', textAlign:'center' }}>
               Submit
            </Text>
          </TouchableOpacity>
    </View>
     </ScrollView>
     );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor:'white',
      flex: 1,
      padding: 20,
      flexDirection: 'column',
    },
    logo:{
      width: 251,
      height: 100,
      alignSelf: 'center',
    },
    text: {
      color: '#B9B3AE',
      fontSize: 20,
      fontFamily: 'Montserrat',
      fontWeight: '700',
      textAlign: 'center',
    },
    text1:{
      color: '#B9B3AE',
      fontSize: 20,
      fontFamily: 'Montserrat',
      fontWeight: '700',
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
      alignSelf: 'center',
      color:'black'

    },
    line2: {
      borderBottomWidth: 4,
      width: '60%',
      borderBottomColor: '#6E7E58',
      alignSelf: 'center',
      color:'black'

    },
    input: {
      width: '80%',
      height: 0,
      borderWidth: 2,
      borderColor: 'rgba(246, 239, 232, 0.85)',
      borderStyle: 'solid',
      alignSelf: 'center',
    },
    gradient: {
      width: 250,
      height: 44,
      borderRadius: 25,
      alignItems:'center',
      backgroundColor: '#607145',
      justifyContent:'center',
      marginTop:40
    },
  
   
  });
export default SetPassword;
