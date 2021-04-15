import React from 'react';

import {Text, TouchableOpacity} from 'react-native';

const MyButton = ({title, buttonStyle, action,textStyle}) => {
    return (
        <TouchableOpacity style={{...buttonStyle}} onPress={action}>
          <Text style={{...textStyle}}>
              {title}
          </Text>
        </TouchableOpacity>
    );
};

export default MyButton;
