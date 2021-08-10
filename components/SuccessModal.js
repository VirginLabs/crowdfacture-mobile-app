import React from 'react';

import {Modal, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {FontAwesome5} from "@expo/vector-icons";
import {toggleUserGuide} from "../redux/actions/data-action";

const SuccessModal = ({theme,isSuccessful,toggle}) => {



    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `I just invested in Crowdfacture a manufacturing company that let's you co-own a factory at 30% equity stake for life click the link to register https://crowdfacture.com/auth?refCode=${ReferralID}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Modal

    animated={true}
    animationType="slide"
    transparent={true}
    visible={isSuccessful}>
            <ScrollView contentContainerStyle={styles.knowMoreScreen}>

                <TouchableOpacity style={styles.closeButton} onPress={toggle}>
                    <Ionicons name='close' size={18}/>
                </TouchableOpacity>

                <View style={[{
                    backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
                },styles.modalContent]}>

                    <View style={{
                        width:120,
                        height:120,
                        backgroundColor:DayColors.green,
                        borderRadius:100,
                        marginVertical:10,
                        alignItems:'center',
                        flexDirection:'row',
                        justifyContent:'center'
                    }}>
                        <Ionicons name="checkmark" size={64} color="#444" />
                    </View>

                    <View style={{
                        marginVertical:10,
                    }}>
                        <Text style={{
                            fontFamily:'Gordita-bold',
                            fontSize:18,
                            color: theme === 'Dark' ? '#fff' : '#555'
                        }}>
Successful
                        </Text>

                    </View>

                    <View style={{
                        marginTop:50,
                    }}>
                    <TouchableOpacity
                        onPress={onShare}
                        style={{
                            backgroundColor:DayColors.primaryColor,
                            width:200,
                            height:45,
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            flexDirection: 'row',
                            borderRadius:10
                        }}>
                        <FontAwesome5 name='share-alt' size={20} color={'#131313'}/>
                        <Text style={{
                            color: '#131313',
                            fontFamily:'Gordita-bold'
                        }}>
                            Share referral link
                        </Text>


                    </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>

        </Modal>
    );
};


const styles = StyleSheet.create({
    knowMoreScreen: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(47,47,47,0.4)'

    },
    modalContent: {
        width: '100%',
        flex: 0.6,

        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeButton: {
        width: 40,
        height: 40,
        backgroundColor: DayColors.primaryColor,
        borderRadius: 100,
        marginBottom: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },

})

export default SuccessModal;
