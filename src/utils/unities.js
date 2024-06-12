import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const unities = {
  fullWidth: width,
  fullHeight: height,
  ImageWidth: width * 0.65, //feedback
  ImageHeight: height *0.15, //feedback
  ButtonsHeight: height / 15,
  TextInput: width*0.85, //feedback
  opinionWidth:width * 0.67, //feedback
  ButtonsWidth: width *0.35, //feedback
  espaceWidth:width*0.25,   //feedback

  // font size
  fontSizeXXXL: height / 25, // ==28
  fontSizeXXL: height / 32, //==22
  fontSizeXL: height / 38, // ==20
  fontSizel: height / 47, //==16
  fontSizeM: height / 48, //==15
  fontsizeS: height / 51, //==14
  fontSizeXs: height / 55, //==13
  fontSizeXXS: height / 60, //==12
  fontSizeSelect: height / 65, //==11
  fontSizeXXXS: height / 72, // ==10
  // margin Horizontal
  largeMarginH: width / 2.2,
  mediumMargin: width / 10,
  SMD_Margin: width / 30, // ==15
  smallMargin: width / 50, // ==8
  xSmallMargin: width / 80,
  // margin Vertical
  XXXLMargin: height / 5,
  XLMargin: height / 10, // ==180
  largeMargin: height / 15, // ==53
  mediumMarginV: height / 19, // ==45
  smallMarginV: height / 38.5, // ==21
  XSMarginV: height / 70, // ==10
};
export default unities;
