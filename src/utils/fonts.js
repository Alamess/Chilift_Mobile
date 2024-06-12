import { Platform } from "react-native";

const fonts={
    ...Platform.select({
        ios: {
            montserrat:'Montserrat-Regular',
            montserratBold:'Montserrat-Bold'
        },
        android:{
            montserrat:'Montserrat-Regular',
            montserratBold:'Montserrat-Bold'
        },
    }),
};
export default fonts