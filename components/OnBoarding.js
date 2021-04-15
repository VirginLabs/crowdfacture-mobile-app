import React, { useState, useRef } from 'react';
import {View, Text, StyleSheet, FlatList, Animated} from 'react-native';
import slides from '../Data';
import OnBoardingItem from "../components/OnBoardingItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from "./MyButton";


 const Onboarding = ({navigation}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

     const scrollTo =  async () => {
         if (currentIndex < slides.length - 1) {
             slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
             console.log('Last item.');
         } else {


             try {
                 await AsyncStorage.setItem('A_first_time_user', 'false');
           AsyncStorage.getItem('A_first_time_user').then((value) =>{
                  // console.log(value)

               navigation.navigate('MyNavigation', { screen: 'Auth' });
               console.log(navigation)

                })

             } catch (err) {
                 console.log('Error @A_first_time_user: ', err);
             }
         }


     };

     const skipOnboarding = () =>{
        // navigation.navigate('Auth')
     }

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <OnBoardingItem item={item} />}
                    horizontal
                   showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            <Paginator data={slides} scrollX={scrollX} />




            <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />


            <MyButton title='Skip' action={skipOnboarding} buttonStyle={styles.button} textStyle={styles.textStyle}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    button:{
        width:100,
        height:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle:{
        fontFamily:'poppins-medium',
        color:'#292929'
    }


});

export default Onboarding
