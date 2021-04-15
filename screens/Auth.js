import React from 'react'
import {View, StyleSheet, Text, Button} from "react-native";

const Auth = (props) =>{
    return (
        <View style={Styles.container}>
<Text>
    LOGIN HERE
</Text>

            <Button title='GO TO DASHBOARD' onPress={() => props.navigation.navigate('Dashboard')}/>
        </View>
    )
}

const Styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
}
})

export default Auth
