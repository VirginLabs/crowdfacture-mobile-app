import React  from 'react';
import { TextInput as RNTextInput, View } from 'react-native';


    export default function ListingInputs({ height, icon, error,touched,color, ...otherProps  }) {

    const validationColor = !touched ? "#ddd" : error ? '#FF5A5F' :  "#ddd";
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems:  'center',
                height: 65,
                borderRadius: 20,
                borderColor: validationColor,
                borderWidth: 2,
                padding: 10
            }}
        >
            <View style={{ flex: 1 }}>
                <RNTextInput
                    style={{
                        color:color ? color : "#eee",
                        fontFamily:"Gordita-medium",
                        fontSize:9,
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