import React, {useEffect, useState} from 'react';

import {ActivityIndicator, Text, View} from 'react-native';
import {Colors, DayColors} from "../constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {getReferredUsers} from "../redux/actions/data-action";

const ActiveReferral = () => {

    const data = useSelector(state => state.data)
    const user = useSelector(state => state.user)
    const [activeReferrals, setActiveReferrals] = useState(null);
    const dispatch = useDispatch()
    const {theme, referredUser} = data
    const {loading, userData: {member: {ReferralBalance, ReferralID, ID}}} = user

    useEffect(() => {
        const formdata = new FormData();
        formdata.append("userId", 2);
        dispatch(getReferredUsers(formdata))



    }, []);

    useEffect(() =>{

        //const activeRef = referredUser.filter(user => users.)

       // setActiveReferrals(activeRef)

    },[])


    return (
        <View style={{
            width: '100%',
            minHeight: 500,
            marginBottom: 10,
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}>


            {

                loading ? <ActivityIndicator size="large" color={Colors.Primary}/>
                    :
                    Object.keys(referredUser).length > 0 && referredUser.map((({FirstName, LastName, DateCreated, ActiveReferralAmount, InvestedAmount}, index) => (


                        <View key={index} style={{
                            height: 90,
                            borderRadius: 15,
                            width: '90%',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            borderColor: theme === 'Dark' ? DayColors.cream : '#bababa',
                            borderWidth: 1,
                            marginVertical: 8,
                        }}>
                            <View style={{
                                height: '90%',
                                width: '10%',
                                alignItems: 'flex-start',
                                justifyContent: 'center'
                            }}>
                                <View style={{
                                    width: 35,
                                    height: 35,
                                    backgroundColor: Colors.Primary,
                                    borderRadius: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>

                                    <Text style={{
                                        color: '#131313',
                                        fontSize: 8,
                                        textTransform: 'uppercase',
                                        fontFamily: 'Gordita-bold'
                                    }}>

                                        {
                                            LastName.split('').slice(0, 1)
                                        }
                                        {
                                            FirstName.split('').slice(0, 1)
                                        }
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                height: '95%',
                                width: '50%',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    color: theme === 'Dark' ? '#eee' : '#333',
                                    fontSize: 11,
                                    fontFamily: 'Gordita-bold'
                                }}>
                                    {LastName}
                                </Text>
                                <Text style={{
                                    color: '#929292',
                                    fontSize: 8,
                                    fontFamily: 'Gordita-medium'
                                }}>
                                    {DateCreated}
                                </Text>
                            </View>

                            <View style={{
                                height: '95%',
                                width: '25%',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                            }}>

                                <Text style={{
                                    color: theme === 'Dark' ? '#eee' : '#131313',
                                    fontSize: 10,
                                    fontFamily: 'Gordita-bold'
                                }}>
                                    ₦{ActiveReferralAmount === null ? '0' : ActiveReferralAmount}
                                </Text>

                            </View>


                        </View>


                    )))
            }

        </View>
    );
};

export default ActiveReferral;
