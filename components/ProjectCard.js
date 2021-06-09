import React from 'react';

import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import MyButton from "./MyButton";

const ProjectCard = ({image,theme, projectTitle, action, target, totalCap, pricePerUnit, projectId,UpComing, Active, SoldOut}) => {
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
                }} source={require('../assets/images/bg.jpg')}/>
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


                {
                    SoldOut === '1' &&  <MyButton title='SOLDOUT'
                                                  buttonStyle={theme === 'Dark' ? styles.projectBtn : styles.projectBtnW}
                                                  textStyle={theme === 'Dark' ? styles.textStyle : styles.textStyleW}>

                    </MyButton>
                }

                {
                    UpComing === '1' &&  <MyButton title='UP COMING'
                                                   buttonStyle={theme === 'Dark' ? styles.projectBtn : styles.projectBtnW}
                                                   textStyle={theme === 'Dark' ? styles.textStyle : styles.textStyleW}
                    >

                    </MyButton>
                }
                {
                    Active === '1' &&   <MyButton textStyle={styles.textStyleW}
                                                  title='INVEST NOW'
                                                  buttonStyle={styles.activeBtnB }>


                    </MyButton>
                }
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    projectCard: {
        width: wp('42%'),
        margin: 5,
        height: 240,

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
        flexDirection:'column',
        alignItems:'flex-start',
        alignContent:'space-between',
        justifyContent:'space-between'
    },
    projectTitle:{
        width:"100%",
        fontFamily:'Gordita-Black',
        fontSize:16,
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
    activeBtnB:{
        marginTop:18,
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


export default ProjectCard;
