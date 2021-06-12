import React from 'react';

import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import MyButton from "./MyButton";

const UserProjectCard = ({projectName, totalUnits, totalAmount, imageName, target, pricePerUnit,action, theme}) => {
    return (
        <TouchableOpacity onPress={action} activeOpacity={0.6} style={[
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
                }} source={{uri: imageName}}/>
            </View>

            <View style={styles.projectBody}>
                <Text style={[
                    {
                        color: theme === 'Dark' ? '#fff' :
                            '#131313'
                    },
                    styles.projectTitle]}>
                    {
                        projectName
                    }
                </Text>



                <View style={styles.totalUnit}>
                    <Text style={{
                        color:'#eee',
                        fontSize:12,
                    }}>
                       Units: {totalUnits}
                    </Text>

                </View>
                <View style={styles.totalAmount}>
                    <Text  style={{
                        color:'#eee',
                        fontSize:12,
                        fontFamily:'Gordita-medium'
                    }}>


                    Amount: {totalAmount}
                    </Text>
                </View>


            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    projectCard: {
        width: wp('42%'),
        margin: 5,
        height: 240,
borderColor:DayColors.cream,
        borderWidth:1,
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
        fontSize:12,
        textTransform:'capitalize',

    },
    projectTarget:{
        width:"100%",
        fontFamily:'Gordita-medium',
        fontSize:10,
        marginTop:3,

        textTransform:'capitalize',
    },
    pricePerUnit:{
        marginTop:8,
        width:"100%",
        fontFamily:'Gordita-bold',
        fontSize:12,
        textTransform:'capitalize'
    },

    totalAmount:{
        marginTop:18,
        width: '100%',
        height: 35,
        borderColor: Colors.Primary,
        borderWidth:1,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    totalUnit:{
        padding: 10,
        marginTop:18,
        width: '100%',
        height: 35,
        borderWidth:1,
        borderColor:'#333',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
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


export default UserProjectCard;
