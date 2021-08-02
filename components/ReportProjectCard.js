import React from 'react';
import { RFValue } from "react-native-responsive-fontsize";
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import {TapGestureHandler} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
const ReportProjectCard = ({image,theme, projectTitle, action, target, pricePerUnit}) => {
    return (
        <TapGestureHandler onActivated={action}>

        <Animated.View style={[
            {
                backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkFour : '#fff',
            },
            styles.projectCard]}>
            <View style={styles.projectImage}>
                <Image style={{
                    width: '100%',
                    resizeMode: 'cover',
                    height: 90,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                }} source={{uri: image}}/>
            </View>

            <View style={styles.projectBody}>
                <Text style={[
                    {
                        color: theme === 'Dark' ? '#fff' :
                            '#131313'
                    },
                    styles.projectTitle]}>
                    {
                        projectTitle
                    }
                </Text>
                <Text style={[
                    {
                        color:theme === 'Dark' ? DayColors.cream : '#6e6e6e'
                    },
                    styles.projectTarget]}>
                    Target: ₦{
                    target
                }
                </Text>

                <Text style={[
                    {
                        color:theme === 'Dark' ? "#fff" : '#121212'
                    },
                    styles.pricePerUnit]}>
                    Price/unit: ₦{
                    pricePerUnit
                }
                </Text>


            </View>
        </Animated.View>

        </TapGestureHandler>
    );
};

const styles = StyleSheet.create({
    projectCard: {
        width: wp('42%'),
        marginHorizontal:5,
        height:200,
        marginVertical:10,
        borderRadius: 20,
    },
    projectImage: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        width: '100%',
        height: 90,
    },
    projectBody:{
        width: '100%',
        padding:10,
        height:'60%',
        flexDirection:'column',
        alignItems:'flex-start',
        alignContent:'space-between',
        justifyContent:'space-between'
    },
    projectTitle:{
        width:"100%",
        fontFamily:'Gordita-Black',
        fontSize:RFValue(10),
        textTransform:'capitalize',

    },
    projectTarget:{
        width:"100%",
        fontFamily:'Gordita-medium',
        fontSize:RFValue(8),
        marginVertical:hp('0.5%'),

        textTransform:'capitalize',
    },
    pricePerUnit:{
        marginVertical:8,
        width:"100%",
        fontFamily:'Gordita-bold',
        fontSize:RFValue(9),
        textTransform:'capitalize'
    },
    activeBtnB:{
        marginVertical:18,
        width: '100%',
        height: 35,
        backgroundColor: Colors.Primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeBtn:{
        marginTop:18,
        width: '100%',
        height: 35,
        borderColor: Colors.Primary,
        borderWidth:1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    projectBtn:{
        marginTop:18,
        width: '100%',
        height: 35,
        borderColor: Colors.Primary,
        borderWidth:1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    projectBtnW:{
        marginTop:18,
        width: '100%',
        height: 35,
        borderWidth:1,
        borderColor:'#333',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle:{
        color:'#fff',
        fontFamily:'Gordita-bold',
        fontSize:12,
    },
    textStyleW:{
        color:'#333',
        fontFamily:'Gordita-bold',
        fontSize:12,
    }
})


export default ReportProjectCard;
