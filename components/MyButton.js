import React from 'react';

import {Text, TouchableOpacity} from 'react-native';

const MyButton = ({title, buttonStyle,disable, action,textStyle, children}) => {
    return (
        <TouchableOpacity disabled={disable} activeOpacity={0.7} style={{...buttonStyle}} onPress={action}>

            {children}
            <Text style={{...textStyle}}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default MyButton;
