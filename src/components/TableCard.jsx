// TableCard.jsx
import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import TableIcon from '../../assets/tableIcon.png'; // Adjust the path accordingly

const TableCard = ({tableName}) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#f4ede7',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Image source={TableIcon} />
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 21,
          color: '#6e7e58',
        }}
      >
        {tableName}
      </Text>
    </View>
  );
};

export default TableCard;
