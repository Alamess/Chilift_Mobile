import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
export const AuthContext = createContext();
import {BASE_URL} from '../config';
import { Alert } from 'react-native';
export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const[userchercher,SetUserChercher] = useState({});
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}
  const verification_mail=(email)=>{
    axios.post(`${BASE_URL}/email`, {
      email:email
    }).then(res => {
      let Data = res.data;
      SetUserChercher(Data);
    })
    .catch(e => {

    });
  }
  const verifcation=(navigation,code)=>{
    setIsLoading(true);
    if(!code){
      Alert.alert('Empty Field', 'Please fill in the field.');
    }
    else {
      if(code == userInfo.token){
      navigation.navigate("SetPassword");
      }
      else{
        Alert.alert("Erreur","Code Incorrect");
      }
    }
    setIsLoading(false);
    }
   
  
  const forgotPassword = (email,navigation)=>{
    if(!email){
      Alert.alert('Empty Field', 'Please fill in the field.');
    }
    else{
      setIsLoading(true);
      axios
        .post(`${BASE_URL}/resetPassword`, {
          email:email.toLowerCase().trim()
        })
        .then(res => {
          let userInfo = res.data;
          setUserInfo(userInfo);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          setIsLoading(false);
          console.log(userInfo);
          Alert.alert('Success', 'Email Sent');
          navigation.navigate('VerificationCode');
        })
        .catch(e => {
          console.log(`register error ${e}`);
          Alert.alert('User not found')
          setIsLoading(false);
        });
    }
      }
  
  const update = (navigation,id,Firstname,lastname, email,Phonenumber, password,passwordconfirme,Job,Gender,HealthIssues,Height)=>{
    if (!password || !passwordconfirme  ) {
      Alert.alert('Empty Fields', 'Please fill in all fields.');
    }
    else{
      if(password !== passwordconfirme) {
        Alert.alert("Passwords don't match", 'Please confirm your password.');
      }
      else{
        setIsLoading(true);
    axios
          .put(`${BASE_URL}/update/${id}`, {
            Firstname,
            lastname,
            email,
            Phonenumber,
            password,
            Height,
            HealthIssues,
            Gender,
            Job
          })
          .then(res => {
            let user = res.data;
            setIsLoading(false);
            console.log(user);
            navigation.navigate("Login");
            Alert.alert("Passwords Changed Successfully", 'Login now.');
          })
          .catch(e => {
            console.log(`update error ${e}`);
            setIsLoading(false);
          });
      }
    
  }
}
  const suivant = (navigation,Firstname,lastname,email,Phonenumber, password,passwordconfirme) => {
    if (!lastname || !Firstname || !password || !passwordconfirme || !Phonenumber || !email) {
      Alert.alert('Empty Fields', 'Please fill in all sign-up fields.');
    }
    else if (password !== passwordconfirme) {
      Alert.alert("Passwords don't match", 'Please confirm your password.');
    }
    else if (Phonenumber.length !== 8) {
      Alert.alert('Invalid Phone Number', 'Phone number must be 8 characters long.');
    }
    else if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
    }
    else if (userchercher.email==email) {
      Alert.alert('Email Used', 'Change your mail please.');
    }
    else{
      setIsLoading(true);
      let userInfo={
        "Firstname":Firstname,
        "lastname":lastname,
        "email":email,
        "Phonenumber":Phonenumber,
        "password":password
      };
      setUserInfo(userInfo);
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLoading(false);
      navigation.navigate('Welcome2');
    }
  }

  const register = (navigation,Firstname,lastname, email,Phonenumber, password,Job,Gender,HealthIssues,Height) => {
    if (!Job || !Firstname || !Gender || !HealthIssues || !Height ) {
      Alert.alert('Empty Fields', 'Please fill in all fields.');
    }
    else{
      setIsLoading(true);
      axios
        .post(`${BASE_URL}/register`, {
            Firstname,
            lastname,
            email :email.toLowerCase().trim(),
            Phonenumber,
            password,
            Height,
            HealthIssues,
            Gender,
            Job
        })
        .then(res => {
          let userInfo = res.data;
          setUserInfo(userInfo);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          setIsLoading(false);
          console.log(userInfo);
          navigation.navigate('Login');
          Alert.alert('Sign Up Successful', 'You have successfully signed up!');
        })
        .catch(e => {
          console.log(`register error ${e}`);
          setIsLoading(false);
        });
      }
  };

  const login = (email, password) => {
    setIsLoading(true);
    const Email=email.toLowerCase().trim()
    axios
      .post(`${BASE_URL}/login`, {
        email:Email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
        Alert.alert('Login Failed', 'Invalid email or password. Please try again.') ;
      });
  };
  const logout = () => {
    setIsLoading(true);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      } ;
  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
  

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        suivant,
        logout,
        update,
        forgotPassword,
        verifcation,
        verification_mail
      }}>
      {children}
    </AuthContext.Provider>
  );
};