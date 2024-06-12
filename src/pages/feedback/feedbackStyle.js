import { StyleSheet } from "react-native";
import theme from "../../utils/theme";
import unities from "../../utils/unities";
import fonts from "../../utils/fonts";

export default feedbackStyle = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.colors.bgColor,
    },
    title:{ 
      fontSize:unities.fontSizeXXXL,
      fontFamily:fonts.montserratBold,
      color: theme.colors.secondary, 
    },
    roundedContainer: {
      marginTop: 25,
      padding:1,
      width: unities.opinionWidth,
      backgroundColor:theme.colors.primary,
      borderRadius: 20,
      alignItems: 'center',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 7,
      shadowColor: '#000000',
    },
    roundedText: {
      fontFamily:fonts.montserratBold,
      color:theme.colors.whiteColor,
      fontSize: unities.fontSizeXL,
    },
    bigContainer: {
      flex:1,
      backgroundColor:theme.colors.primary,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      marginTop: 25,
      width: '100%',
      alignSelf:"center",
      opacity:0.9,
    },
    logo: {
      width: unities.ImageWidth,
      height: unities.ImageHeight,
      resizeMode:"contain",
    },
    RatingLogo: {
      width: 40,
      height: 47,
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
      backgroundColor: theme.colors.orangeColor, //#DC8E1AB2
      position: 'absolute',
      top: '10%',
      left: -25,
    },
    feedbackContainer: {
      flex:1,
      marginTop: 20,
      alignSelf:"center",
      width:'85%',

    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent:"center",
      marginBottom: 20,
    },
    ratingIcon: {
      marginRight:10,
    },
    questionText: {
      fontSize: unities.fontSizel,
      color: theme.colors.lightBeige,
      fontFamily:fonts.montserratBold,
    },
    answerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:"center",
      marginTop: 15,
      marginBottom: 15,
    },
    radioButtonLabel: {
      marginRight: 19,
      fontSize: unities.fontSizel,
      color:theme.colors.lightBeige,
      fontFamily:fonts.montserratBold,
  
    },
    commentLabel: {
      fontSize: unities.fontSizel,
      color:theme.colors.lightBeige,
      fontFamily:fonts.montserratBold,
      marginTop:20
    },
    commentInput: {
      width:unities.TextInput,
      height: 88,
      fontSize:unities.fontSizel,
      borderColor: theme.colors.lightBeige,
      borderWidth: 1,
      borderRadius: 15,
      backgroundColor:theme.colors.lightBeige,
      padding: 10,
      marginTop: 10,
      marginBottom: 20,
      alignSelf:'center',
      color:theme.colors.secondary,
      fontFamily:fonts.montserrat,
    
  
    },
    submitButton: {
      marginBottom: 40,
      backgroundColor:theme.colors.lightBeige,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: '#607145C7',
      padding: 10,
      width: unities.ButtonsWidth,
      alignItems: 'center',
      alignSelf:"center"
    },
    submitButtonText: {
      color: theme.colors.secondary,
      fontSize: unities.fontSizeXL,
      fontFamily:fonts.montserratBold,
  
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
    icon: {
      marginTop: unities.mediumMarginV,  
      marginBottom: unities.mediumMarginV,
    },
    imageIcon: {
      width: 42,
      height: 40,
      borderRadius: 25,
    },
  });