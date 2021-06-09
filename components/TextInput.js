import React  from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import { Entypo as Icon, FontAwesome } from '@expo/vector-icons';
import {Colors, DarkColors} from "../constants/Colors";

export default function TextInput({  icon, error,touched,color, ...otherProps  }) {

    const validationColor = !touched ? "#ddd" : error ? '#FF5A5F' :  "#ddd";
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 65,
                borderRadius: 20,
                borderColor: validationColor,
                borderWidth: 2,
              //  backgroundColor: DarkColors.primaryDark,
                padding: 8
            }}
        >
            <View style={{ padding: 10,flex:0.1, alignItems:"center" }}>
                {
                    color ? <FontAwesome name={icon} color={Colors.Primary} size={16}/>
                    :

                    <Icon name={icon} color={Colors.Primary} size={16} />
                }
            </View>
            <View style={{ flex: 0.9 }}>
                <RNTextInput
                    style={{
                        color:color ? color : "#eee",
                        fontFamily:"Gordita-medium"
                    }}
                    underlineColorAndroid='transparent'
                    placeholderTextColor={
                       color ? color : "#eee"
                    }
                    {...otherProps}
                />
            </View>


        </View>
    );
}