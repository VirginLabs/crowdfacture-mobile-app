import React, {useContext, useEffect} from 'react';

import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    ActivityIndicator,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {ThemeContext} from "../util/ThemeManager";
import {clearErrors, clearMessage} from "../redux/actions/user-action";
import {getDeposits, getInvestments, getWithdrawals} from "../redux/actions/data-action";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Ionicons} from "@expo/vector-icons";


const InvestmentItem = ({DateCreated, NumberOfUnit, TotalAmount, theme}) =>
(
   <View style={{
backgroundColor:theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
       height:130,
       margin:5,
       padding:10,
       borderRadius:20,
       width:'95%',
       alignItems: 'center',
       justifyContent: 'space-evenly',
       flexDirection: 'row'
   }}>
<View style={{
    width:60,
    borderRadius:100,
    height:60,
    backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkOne :'#dde',
    alignItems:'center',
    justifyContent:'center'
}}>
<Ionicons name='arrow-up-sharp' size={20} color={DayColors.green} />
</View>

       <View style={{
           height:'100%',
           width:'50%',
           alignItems:'center',
           justifyContent:'center',
           flexDirection:'column'
       }}>
           <Text style={{
               fontFamily:'Gordita-Black',
               color: theme === 'Dark' ? '#fff' : '#131313'
           }}>
               INVESTED
           </Text>
           <Text style={{
               fontFamily:'Gordita-medium',
               fontSize:10,
               color: theme === 'Dark' ? '#555' : '#ccc'
           }}>
               {DateCreated}
           </Text>

       </View>

       <View style={{
           width:'30%',
           height:'100%',
           alignItems:'center',
           justifyContent:'center',
           flexDirection:'column'
       }}>
           <Text style={{
               fontFamily:'Gordita-bold',
               color:DayColors.green,
               fontSize:13
           }}>
               +₦{TotalAmount}
           </Text>
           <Text style={{
               fontFamily:'Gordita-medium',
               color: theme === 'Dark' ? '#ddd' : '#ccc',
               fontSize:11
           }}>
               Units: {NumberOfUnit}
           </Text>
       </View>

   </View>
)

const Transactions = (props) => {

    const {getWithdrawals, getDeposits, getInvestments,route,navigation} = props
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

            getInvestments(formdata)

    }, []);


    const Investment = ({item}) => (
        <InvestmentItem theme={theme} NumberOfUnit={item.NumberOfUnit} DateCreated={item.DateCreated} TotalAmount={item.TotalAmount}/>
    )

    return (
        <View
            style={[styles.container, {
            backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                : "#f5f5f5"
        }]}>
            <View style={styles.top}>
                <BackButton theme={theme} navigation={navigation}/>
            </View>

{
    loading ?     <ActivityIndicator  size="large" color={Colors.Primary}/>:

        Object.keys(investments).length > 0 ?
          <FlatList data={investments}
                    contentContainerStyle={{
                        width:wp('90%'),
                        alignItems: 'center',
                        alignContent:'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'column'
                    }}
                    renderItem={Investment} keyExtractor={item => item.ID}/>
                    :
            <View style={{
                width:'100%',
                flexDirection:'column',
                alignItems:'center'
            }}>
                <Text style={{
                    fontFamily:'Gordita-medium',
                    color :theme === 'Dark' ? '#eee':  '#131313'
                }}>
                    Oops.. You have no investments yet
                </Text>


                <TouchableOpacity
                    onPress={() => navigation.navigate('Projects')}
                    style={{
                    margin:10,
                    width:'70%',
                    height:35,
                    borderRadius:10,
                    backgroundColor:DayColors.primaryColor,
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Text style={{
                        fontFamily:'Gordita-bold'
                    }}>
                        INVEST NOW
                    </Text>
                </TouchableOpacity>


            </View>

            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 10,
        width: wp('100%'),
        paddingRight: 10,
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    top:{
    width:'100%'
},
})

Transactions.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
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
