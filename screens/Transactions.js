import React, {useContext, useEffect} from 'react';

import {Text, View, StyleSheet, StatusBar} from 'react-native';
import {DarkColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {ThemeContext} from "../util/ThemeManager";
import {clearErrors, clearMessage} from "../redux/actions/user-action";
import {getDeposits, getInvestments, getWithdrawals} from "../redux/actions/data-action";
import {connect} from "react-redux";

const Transactions = (props) => {

    const {getWithdrawals, getDeposits, getInvestments,route,navigation} = props
    const {transactionType} = route.params;
    const {
        loading,
        investments,
        deposits,
        returns
    } = props.data
    const {
        userData: {
            member: {ID, LastName},
        }
    } = props.user

    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        const formdata = new FormData();
        formdata.append("userId", ID);
        if (transactionType === 'deposits') {
            getDeposits(formdata)
        }
        if (transactionType === 'investment') {
            getInvestments(formdata)
        }
        if (transactionType === 'returns') {
            getWithdrawals(formdata)
        }
    }, [transactionType]);


    return (
        <View style={[styles.container, {
            backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                : "#f5f5f5"
        }]}>
            <View style={styles.top}>
                <BackButton theme={theme} navigation={navigation}/>
            </View>


            <Text>
        </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'
    },
})

Transactions.propTypes = {
    data: PropTypes.object.isRequired,
    addBank: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearMessage: PropTypes.func.isRequired,
    getInvestments: PropTypes.func.isRequired,
    getDeposits: PropTypes.func.isRequired,
    getWithdrawals: PropTypes.func.isRequired,

};


const mapActionToPops = {
    getDeposits,
    getInvestments,
    getWithdrawals,
    clearErrors,
    clearMessage
}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})



export default connect(mapStateToProps, mapActionToPops) (React.memo(Transactions));
