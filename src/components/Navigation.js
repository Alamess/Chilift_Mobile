
import React, { useState,useContext } from 'react';
import TablesPage from '../pages/TablesPage/TablesPage';
import TablePage from '../pages/TablePage/TablePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feedback from '../pages/feedback/feedback';
import Home from '../pages/home';
import SignUp from '../pages/Auth/Login/SignUp';
import Login from '../pages/Auth/Login/Login';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import Welcome from '../pages/Auth/Welcome/Welcome';
import Welcome2 from '../pages/Auth/Welcome2/Welcome2';
import ForgotPassword from '../pages/Forgot your password/forgotPassword';
import VerificationCode from '../pages/Forgot your password/VerificationCode';
import SetPassword from '../pages/Forgot your password/SetPassword';
const Stack = createNativeStackNavigator();
const Navigation = () => {
    const {userInfo} = useContext(AuthContext);
    return (
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        { userInfo.mytoken ? (
         
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Feedback" component={Feedback} />
              <Stack.Screen name="TablesPage" component={TablesPage} />
              <Stack.Screen name="TablePage" component={TablePage} />
            </>
  
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Welcome2" component={Welcome2} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="VerificationCode" component={VerificationCode} />
            <Stack.Screen name="SetPassword" component={SetPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>);
    
};
export default Navigation;