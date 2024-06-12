import React, { useRef, useEffect, useState,useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  Animated,
  PanResponder,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { StyleSheet } from 'react-native';
import feedbackStyle from './feedback/feedbackStyle'
import theme from '../utils/theme';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import unities from '../utils/unities';
import Spinner from 'react-native-loading-spinner-overlay';
export default function Home({ navigation }) {
  const [currentPage, setCurrentPage] = useState('Home');
  const {userInfo,isLoading,logout} = useContext(AuthContext);
  const navigateToPage = (pageName) => {
    setCurrentPage(pageName);
    navigation.navigate(pageName);
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  const panResponder = useRef(
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
    })
  ).current;

  const [translateXValue, setTranslateXValue] = useState(new Animated.Value(-300));

  const animateDrawer = (show) => {
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

  useFocusEffect(() => {
    // Reset the animation when the screen gains focus
    animateDrawer(false);
    setCurrentPage('Home');
  });
  return (
    <ScrollView contentContainerStyle={styles.container} >
      <Spinner visible={isLoading} />
      <View style={styles.shapeContainer} {...panResponder.panHandlers}>
        <View style={styles.circle}></View>
      </View>
      <Animated.View style={[styles.drawer, { transform: [{ translateX: translateXValue }], zIndex: 1 }]}>
        <TouchableOpacity onPress={() => animateDrawer(false)} style={feedbackStyle.icon}>
          <Icon name="home" size={39} color={currentPage === 'Home' ? theme.colors.orangeColor : 'white'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToPage('TablesPage')} style={feedbackStyle.icon}>
          <Image source={require('../../assets/user.png')} style={feedbackStyle.imageIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToPage('Feedback')} style={feedbackStyle.icon}>
          <Icon name="message-reply-text-outline" size={39} color={currentPage === 'Feedback' ? theme.colors.orangeColor : 'white'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()} style={feedbackStyle.icon}>
          <Icon name="logout" size={39} color={currentPage === 'Logout' ? theme.colors.orangeColor : 'white'} />
        </TouchableOpacity>
      </Animated.View>
      <TouchableWithoutFeedback onPress={() => animateDrawer(false)}>
        <View style={{ flex: 1 }}>
          <Image source={require('../../assets/ch.png')} style={{ alignSelf: 'center', width: unities.ImageWidth, height: unities.ImageHeight, resizeMode: "contain", marginTop: unities.mediumMarginV }} />
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Welcome {userInfo?.user?.Firstname},</Text>
          </View>

      <View style={styles.BoxContainer}>
        <TouchableOpacity style={styles.whiteBoxContainer1} onPress={() => navigateToPage('TablesPage')}>
          {/* Add a white box */}
          
            <Text style={styles.Text1}>Your table</Text>
         
        </TouchableOpacity>
        <TouchableOpacity style={styles.whiteBoxContainer2} onPress={() => openLink('https://chilift.co/')}>
          {/* Add a white box */}
          
          <Text style={styles.Text2}>Accessories</Text>
        
        </TouchableOpacity>
        <TouchableOpacity style={styles.whiteBoxContainer3} onPress={() =>navigateToPage('Feedback') }>
          
          <Text style={styles.Text3}>Feedback</Text>
          
        </TouchableOpacity>
      </View>

      {/* Find us here section */}
      <View style={styles.findUsContainer}>
        <Text style={styles.findUsText}>Find us here :</Text>
        <View style={styles.findUsIcons}>
          {/* Facebook icon */}
          <TouchableOpacity onPress={() => openLink('https://www.facebook.com/chilift')}>
            <FontAwesomeIcon name="facebook" size={30} color="#607145" style={styles.icon} />
          </TouchableOpacity>          
          {/* Instagram icon */}
          <TouchableOpacity onPress={() => openLink('https://www.instagram.com/chilift.co?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==')}>
            <FontAwesomeIcon name="instagram" size={30} color="#607145" style={styles.icon} />
          </TouchableOpacity>
        {/* linkedin icon */}
          <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/company/chilift/about/?fbclid=IwAR09-1srHtGZe0Z-H25HHmmzBegZ6H9AOk-5xmJJSmYyaK2jN0UzEXATpuI')}>
            <FontAwesomeIcon name="linkedin" size={30} color="#607145" style={styles.icon} />
          </TouchableOpacity>
          {/* Website icon */}
          <TouchableOpacity onPress={() => openLink('https://chilift.co/')}>
            <AntDesignIcon name="earth" size={30} color="#607145" style={styles.icon} />
          </TouchableOpacity>          

        </View>
      </View>
      </View>
      </TouchableWithoutFeedback>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.bgColor,
  },
  drawer: {
    position: 'absolute',
    top: 15,
    left: 0,
    width: 65,
    height: '100%',
    backgroundColor: '#607145',
    padding: 15,
    borderTopRightRadius: 90,
    zIndex: 2,
  },
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
  greetingContainer: {
    marginBottom: unities.smallMarginV,
    marginTop: unities.mediumMarginV,
  },
  greetingText: {
    fontSize: unities.fontSizeXXL,
    color: '#607145',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  }
    ,
  findUsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:unities.mediumMarginV,
  },
  findUsText: {
    color:theme.colors.primary,
    fontSize: 22,
    marginBottom: 10,
    fontFamily: 'Montserrat-Bold',
  },
  icon: {
    marginHorizontal: 10,
  },
  findUsIcons: {
    flexDirection: 'row',
    marginBottom:20,
  },
  BoxContainer: {
    flexDirection: 'column', // Change to column layout
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  whiteBoxContainer1: {
    width: '70%',
    height: 100, // Adjust height as needed
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10, // Add vertical margin between white boxes
    borderTopLeftRadius:80,
    borderTopRightRadius:80,
    justifyContent:'center',
    alignItems:'center',
  },
  whiteBoxContainer2: {
    width: '70%',
    height: 70, // Adjust height as needed
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10, // Add vertical margin between white boxes
    justifyContent:'center',
    alignItems:'center'
  },
  whiteBoxContainer3: {
    width: '70%',
    height: 100, // Adjust height as needed
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10, // Add vertical margin between white boxes
    borderBottomRightRadius:80,
    borderBottomLeftRadius:80,
    justifyContent:'center',
    alignItems:'center'

  },
  
  
  Text1: {
    color: '#505E3A',
    fontSize: unities.fontSizeXL,
   
    fontFamily: 'Montserrat-Bold',
    
  },
  
  Text2: {
    color: '#505E3A',
    fontSize: unities.fontSizeXL,
    fontFamily: 'Montserrat-Bold',
    
    
  },
  
  Text3: {
    color: '#505E3A',
    fontSize: unities.fontSizeXL,
    fontFamily: 'Montserrat-Bold',
    
    
  },
});