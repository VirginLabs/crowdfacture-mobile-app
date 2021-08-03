import React, {useState} from 'react';

import { Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from "react-redux";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import Listing from "../components/ListingComponent";
import {SafeAreaView} from "react-native-safe-area-context";

const ListingScreen = (props) => {

    const {
        navigation
    } = props
    const data = useSelector(state => state.data)
    const {theme} = data
    const [showListing, setShowListing] = useState(false);
    const toggleShowListing = () => {
        setShowListing(prevState => !prevState)
    }

    return (
        <SafeAreaView style={{
            flex:1
        }}>
            
       
        <ScrollView scrollEnabled
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[styles.container, {
                        backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                            : "#f5f5f5"
                    }]}
        >

            <View style={styles.top}>
                <BackButton theme={theme} navigation={navigation}/>
            </View>
            <Text style={[
                {
                    color: theme === 'Dark' ? Colors.White : '#333',
                },
                styles.title]}>
          APPLY FOR CROWDFACTURE LISTING
            </Text>


            <View style={{
                margin:10,
                width:'100%',
                padding:8,
                alignItems:'center'
            }}>
                <Text style={[
                    {
                      color: theme === 'Dark' ? '#eee' : '#333'
                    },
                    styles.text]}>
                    Are you a small-medium scale manufacturer with an idea or an existing production factory looking to
                    expand operation with cooperate structure? Are you open to welcoming investors into your business
                    and giving out some part of your company out as equity for life?</Text>
                <Text style={[
                    {
                        marginVertical:10,
                        color: theme === 'Dark' ? '#eee' : '#333'
                    },
                    styles.text
                ]}>
                    Apply and submit your factory for
                    possible listing on our manufacturing investment directory. Do note that only one factory funding is
                    made open at a time for crowdfunding.
                </Text>
            </View>


            <TouchableOpacity onPress={toggleShowListing} style={{
                alignItems:'center',
                flexDirection:'row',
                justifyContent:'space-evenly',
                width:150,
                height:55,
                borderRadius:15,
                backgroundColor:theme === 'Dark' ? DayColors.cream: DayColors.cardDark
            }}>
                <Text style={{
                    fontSize:15,
                    color: theme === 'Dark' ?'#333': '#eee',
                    fontFamily:'Gordita-Black'
                }}>
                    Proceed
                </Text>

            </TouchableOpacity>
            <Modal

                animated={true}
                animationType="slide"
                transparent={true}
                visible={showListing}>
                <Listing action={() => toggleShowListing()} theme={theme}/>
            </Modal>
        </ScrollView>
        </SafeAreaView>
    )
;
};


const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    top: {
        marginTop: 10,
        width: '100%',
    },
    title: {
        fontFamily: 'Gordita-Black',
        fontSize: 13,
    },
    text: {
        fontFamily: 'Gordita-medium',
        fontSize: 10,
        lineHeight:18,
        textAlign:'justify',
        width:'95%',
    },

});


export default ListingScreen;
