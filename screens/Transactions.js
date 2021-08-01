import React, { useEffect} from 'react';

import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";

import { getInvestments} from "../redux/actions/data-action";
import { useDispatch, useSelector} from "react-redux";
import { widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Ionicons} from "@expo/vector-icons";


const InvestmentItem = ({DateCreated, NumberOfUnit, TotalAmount, theme}) =>
(
   <View style={{
backgroundColor:theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
       height:100,
       margin:5,
       padding:10,
       borderRadius:20,
       width:'95%',
       alignItems: 'center',
       justifyContent: 'space-evenly',
       flexDirection: 'row'
   }}>
<View style={{
    width:45,
    borderRadius:100,
    height:45,
    backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkOne :'#dde',
    alignItems:'center',
    justifyContent:'center'
}}>
<Ionicons name='arrow-up-sharp' size={18} color={DayColors.green} />
</View>

       <View style={{
           height:'100%',
           width:'50%',
           alignItems:'center',
           justifyContent:'center',
           flexDirection:'column'
       }}>
           <Text style={{
               fontSize:12,
               fontFamily:'Gordita-Black',
               color: theme === 'Dark' ? '#fff' : '#131313'
           }}>
               INVESTED
           </Text>
           <Text style={{
               fontFamily:'Gordita-medium',
               fontSize:9,
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
               fontSize:10
           }}>
               +₦{TotalAmount}
           </Text>
           <Text style={{
               fontFamily:'Gordita-medium',
               color: theme === 'Dark' ? '#ddd' : '#ccc',
               fontSize:9
           }}>
               Units: {NumberOfUnit}
           </Text>
       </View>

   </View>
)

const Transactions = (props) => {

    const data = useSelector(state => state.data)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {navigation} = props
    const {
        loading,
        investments,

    } = data
    const {
        userData: {
            member: {ID},
        }
    } = user

    const {theme} = data;

    useEffect(() => {
        const formdata = new FormData();
        formdata.append("userId", ID);

        dispatch(getInvestments(formdata))

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




export default Transactions;
