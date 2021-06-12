import React, {useCallback, useEffect, useState} from 'react';

import {ScrollView, StatusBar, Text, View} from 'react-native';
import {Colors} from "../constants/Colors";
import {useDispatch} from "react-redux";
import SumotrustSignup from "../components/Forms/SumotrustSignup";
import SumotrustSignIn from "../components/Forms/SumotrustSignin";

const SumotrustLogin = (props) => {
    const [switchSumo, setSwitchSumo] = useState(true);


    const dispatch = useDispatch()



    const toggleForm = useCallback(() => {
        setSwitchSumo(prevState => !prevState)
    }, [])

    return (
        <ScrollView
            keyboardShouldPersistTaps='handled'
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            showsVerticalScrollIndicator={false} contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.PrimaryDarkColor,
            paddingTop: StatusBar.currentHeight
        }}>

            {
                switchSumo ?
                    <SumotrustSignIn navigation={props.navigation} setSwitchSumo={toggleForm}/>

                    :
                    <SumotrustSignup navigation={props.navigation} setSwitchSumo={toggleForm}/>
            }




        </ScrollView>
    );
};



export default SumotrustLogin;
