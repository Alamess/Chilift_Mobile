import React,{useState,useContext} from 'react';
import { View, Text, ScrollView , StyleSheet,TouchableOpacity ,onChangeText,Image,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
const VerificationCode = ()=>{
    const {isLoading,verifcation} = useContext(AuthContext);
    const navigation = useNavigation();
    const [code, setCode] = useState(null);
    return(
    <ScrollView style={styles.container}>
    <Spinner visible={isLoading}/>
    <View style={{ flex: 3, backgroundColor: 'white' }} >
     <Image source={require('../../../assets/image.png') }style={styles.logo} />
     <Text style={styles.line2}/>
    </View>
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={{ color: '#6E7E58', fontSize: 30, fontFamily: 'Montserrat', fontWeight: '700',marginTop:10}}>
        Verification Code
      </Text>
    </View>
    <View style={{ flex: 2, backgroundColor: 'white',marginTop:10 }}>
      <Text style={[styles.text1, styles.customStyle]}>
        Enter your Code.
      </Text>
    </View>
    <View style={{ flex: 4, backgroundColor: 'white' ,marginTop:60}}>
     <View style={{ flex: 1, backgroundColor: 'white' }}>
       <Text style={styles.text}>
          Code:
       </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
        <TextInput
         value={code}
         onChangeText={text => setCode(text)}
          style={styles.line}
        />
     </View>
     </View>
     <View style={{ flex:2, backgroundColor: 'white', alignItems: 'center' ,marginTop : 58}}>
          <TouchableOpacity style={styles.gradient}  onPress={() =>{verifcation(navigation,code);
                                                                    setCode("");}} >
            <Text style={{color: '#F6EFE9', fontSize: 20, fontFamily: 'Montserrat', fontWeight: '700', textAlign:'center' }}>
               Reset Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 2, backgroundColor: 'white' }} onPress={() =>{navigation.navigate('ForgotPassword');}}>
            <Text style={{color: '#D9D9D9', fontSize: 20, fontFamily: 'Montserrat', fontWeight: '700' ,textAlign:'center',marginTop:20}}>
               Resent code 
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
export default VerificationCode;
