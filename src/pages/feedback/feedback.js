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
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import unities from '../../utils/unities';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';
import theme from '../../utils/theme';
import feedbackStyle from './feedbackStyle';
import { submitFeedback } from '../../../routes/api';
import { AuthContext } from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
export default function Feedback({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('Feedback');
  const navigateToPage = (pageName) => {
    setCurrentPage(pageName);
  };
  const {logout,userInfo} = useContext(AuthContext);
  useEffect(() => {
    if (currentPage !== null) {
      navigation.navigate(currentPage);
    }
  }, [currentPage]);

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
    setCurrentPage('Feedback');
  });

  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingPress = (rating) => {
    setSelectedRating(rating);
  };

  const [selectedAnswers, setSelectedAnswers] = useState({
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null,
  });

  const [comment, setComment] = useState('');

  const handleAnswer = (questionNumber, answer) => {
    setSelectedAnswers((prevAnswers) => ({ ...prevAnswers, [questionNumber]: answer }));
  };

  const handleSubmit = async () => {
    
    // Check if all fields are filled
    if (
      !selectedRating ||
      !selectedAnswers.question1 ||
      !selectedAnswers.question2 ||
      !selectedAnswers.question3 ||
      !selectedAnswers.question4 ||
      !selectedAnswers.question5 ||
      !comment
    ) {
      Alert.alert(
        'Missing Information',
        'Please fill in all required fields before submitting.',
        [{ text: 'OK', style: 'cancel' }],
        { cancelable: false }
      );
      return;
    }

    try {
      const feedbackData = {
        name: userInfo.user.Firstname,
        email:userInfo.user.email,
        rating: selectedRating,
        question1: selectedAnswers.question1,
        question2: selectedAnswers.question2,
        question3: selectedAnswers.question3,
        question4: selectedAnswers.question4,
        question5: selectedAnswers.question5,
        comment: comment,
        
      };
      setIsLoading(true);
      const feedbackDataWithSavedDate = await submitFeedback(feedbackData);
      setIsLoading(false);
      // Display success alert
      Alert.alert(
        '✅ Feedback Sent!',
        'Thank you for sharing your thoughts! We appreciate your feedback.',
        [
          {
            text: 'OK',
            onPress: () => {
            console.log('Success alert dismissed');
            setSelectedAnswers({question1: null, question2: null,question3: null,});
            setSelectedRating(null);
            setComment('');
          },
            style: 'cancel',
          },
        ],
        { cancelable: false },
        { backgroundColor: '#F6EFE9', icon: <Icon name="checkmark-circle" size={50} color='#F6EFE9' /> }
      );

      // Additional logic after successful submission (e.g., clear form fields, navigate to a different screen)
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setIsLoading(false);
      Alert.alert(
        '⚠️ Submission Failed',
        'Something went wrong. Please check your connection and try again.',
        [
          {
            text: 'Retry',
            onPress: () => handleSubmit(),
            style: 'cancel',
          },
        ],
        { cancelable: false },
        { backgroundColor: 'lightcoral', icon: <Icon name="exclamation-circle" size={50} color="red" /> }
      );
    }
  };


  return (
    <KeyboardAwareScrollView  style={feedbackStyle.container}>
      <Spinner visible={isLoading}/>
      {/* Shape on the left */}
      <View style={feedbackStyle.shapeContainer} {...panResponder.panHandlers}>
        <View style={feedbackStyle.circle}></View>
      </View>

      {/* Icons for navigation */  }
      <Animated.View style={[feedbackStyle.drawer, { transform: [{ translateX: translateXValue }],zIndex:1 }]}>
        <TouchableOpacity onPress={() => navigateToPage('Home')} style={feedbackStyle.icon}>
          <Icon name="home" size={39} color={currentPage === 'Home' ? theme.colors.orangeColor : 'white'} />
        </TouchableOpacity>
        <TouchableOpacity style={feedbackStyle.icon} onPress={() => navigateToPage('TablesPage')}>
          <Image source={require('../../../assets/user.png')} style={feedbackStyle.imageIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => animateDrawer(false)} style={feedbackStyle.icon}>
          <Icon
            name="message-reply-text-outline"
            size={39}
            color={currentPage === 'Feedback' ? theme.colors.orangeColor : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()} style={feedbackStyle.icon}>
          <Icon name="logout" size={39} color={currentPage === 'Login' ? theme.colors.orangeColor : 'white'} />
        </TouchableOpacity>
      </Animated.View>


      {/* Greeting paragraph */}
      <TouchableWithoutFeedback onPress={() => animateDrawer(false)}>
      <View style={{ alignItems: 'center', marginTop:unities.smallMarginV,flex:1}}>
        <Image source={require('../../../assets/ch.png')} style={feedbackStyle.logo} />
        <Text style={feedbackStyle.title}>
          Feedback
        </Text>
       
        <View style={feedbackStyle.roundedContainer}>
          <Text style={feedbackStyle.roundedText}>Your Opinion Matters</Text>
        </View>

        <View style={feedbackStyle.bigContainer}>
          <View style={feedbackStyle.feedbackContainer}>
            <View style={feedbackStyle.ratingContainer}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  onPress={() => handleRatingPress(rating)}
                  style={[feedbackStyle.ratingIcon, selectedRating >= rating && { color: '#FFA500' }]}
                >
                  {selectedRating >= rating ? (
                     <Image source={require('../../../assets/orangeA.png')} style={feedbackStyle.RatingLogo} />
                    ) : (
                     <Image source={require('../../../assets/orangeB.png')} style={feedbackStyle.RatingLogo} />
                        )}
                </TouchableOpacity>
              ))}
            </View>

            <Text style={feedbackStyle.questionText}>- Do you often adjust the desk height? </Text>
            <View style={feedbackStyle.answerContainer}>
              <Text style={feedbackStyle.radioButtonLabel}>Yes</Text>
              <Checkbox
                value="Yes"
                status={selectedAnswers.question1 === 'Yes' ? 'checked' : 'unchecked'}
                onPress={() => handleAnswer('question1', 'Yes')}
                color={theme.colors.lightBeige}
                uncheckedColor={theme.colors.lightBeige}
                size={50}
              />
              <View style={{ marginLeft:unities.espaceWidth }}></View>

              <Text style={feedbackStyle.radioButtonLabel}>No</Text>
              <Checkbox
                value="No"
                status={selectedAnswers.question1 === 'No' ? 'checked' : 'unchecked'}
                onPress={() => handleAnswer('question1', 'No')}
                color={theme.colors.lightBeige}
                uncheckedColor={theme.colors.lightBeige}
                size={50}                
              />
            </View>

            <Text style={feedbackStyle.questionText}>- Did you notice improved well-being from posture change(  throughout the day )? </Text>
            <View style={feedbackStyle.answerContainer}>
              <Text style={feedbackStyle.radioButtonLabel}>Yes</Text>
              <Checkbox
                value="Yes"
                status={selectedAnswers.question2 === 'Yes' ? 'checked' : 'unchecked'}
                onPress={() => handleAnswer('question2', 'Yes')}
                color={theme.colors.lightBeige}
                uncheckedColor={theme.colors.lightBeige}
                size={50}                
              />
              <View style={{ marginLeft: unities.espaceWidth }}></View>

              <Text style={feedbackStyle.radioButtonLabel}>No</Text>
              <Checkbox
                value="No"
                status={selectedAnswers.question2 === 'No' ? 'checked' : 'unchecked'}
                onPress={() => handleAnswer('question2', 'No')}
                color={theme.colors.lightBeige}
                uncheckedColor={theme.colors.lightBeige}
                size={50}                
              />
            </View>

            <Text style={feedbackStyle.questionText}>- Are you satisfied with the integration between the desk and the app?</Text>
            <View style={feedbackStyle.answerContainer}>
              <Text style={feedbackStyle.radioButtonLabel}>Yes</Text>
              <Checkbox
                value="Yes"
                status={selectedAnswers.question3 === 'Yes' ? 'checked' : 'unchecked'}
                onPress={() => handleAnswer('question3', 'Yes')}
                color={theme.colors.lightBeige}
                uncheckedColor={theme.colors.lightBeige}
                size={50}                
              />
              <View style={{ marginLeft: unities.espaceWidth }}></View>

              <Text style={feedbackStyle.radioButtonLabel}>No</Text>
              <Checkbox
                value="No"
                status={selectedAnswers.question3 === 'No' ? 'checked' : 'unchecked'}
                onPress={() => handleAnswer('question3', 'No')}
                color={theme.colors.lightBeige}
                uncheckedColor={theme.colors.lightBeige}
                size={50}                
              />
            </View>
            <Text style={feedbackStyle.questionText}>- Has the standing desk application met your expectations in terms of usability and functionality?</Text>
            <View style={feedbackStyle.answerContainer}>
              <Text style={feedbackStyle.radioButtonLabel}>Yes</Text>
              <Checkbox
                value="Yes"
                status={selectedAnswers.question4 === 'Yes' ? 'checked' : 'unchecked'}
                onPress={() => handleAnswer('question4', 'Yes')}
                color={theme.colors.lightBeige}
                uncheckedColor={theme.colors.lightBeige}
                size={50}                
              />
              <View style={{ marginLeft: unities.espaceWidth }}></View>

              <Text style={feedbackStyle.radioButtonLabel}>No</Text>
              <Checkbox
                value="No"
                status={selectedAnswers.question4 === 'No' ? 'checked' : 'unchecked'}
                onPress={() => handleAnswer('question4', 'No')}
                color={theme.colors.lightBeige}
                uncheckedColor={theme.colors.lightBeige}
                size={50}                
              />
            </View>
            <Text style={feedbackStyle.questionText}>- Would you like to see additional features added to the desk or to the app? If yes, please let us know</Text>
            <View style={feedbackStyle.answerContainer}>
              <Text style={feedbackStyle.radioButtonLabel}>Yes</Text>
              <Checkbox
                value="Yes"
                status={selectedAnswers.question5 === 'Yes' ? 'checked' : 'unchecked'}
                onPress={() => handleAnswer('question5', 'Yes')}
                color={theme.colors.lightBeige}
                uncheckedColor={theme.colors.lightBeige}
                size={50}                
              />
              <View style={{ marginLeft: unities.espaceWidth }}></View>

              <Text style={feedbackStyle.radioButtonLabel}>No</Text>
              <Checkbox
                value="No"
                status={selectedAnswers.question5 === 'No' ? 'checked' : 'unchecked'}
                onPress={() => handleAnswer('question5', 'No')}
                color={theme.colors.lightBeige}
                uncheckedColor={theme.colors.lightBeige}
                size={50}                
              />
            </View>

            <Text style={feedbackStyle.commentLabel}>Add a Comment:</Text>
            <TextInput
              style={feedbackStyle.commentInput}
              value={comment}
              onChangeText={(text) => setComment(text)}
              placeholder="Type your comment here..."
              multiline
              placeholderTextColor={theme.colors.secondary}
            />
            <TouchableOpacity style={feedbackStyle.submitButton} onPress={handleSubmit}>
              <Text style={feedbackStyle.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

