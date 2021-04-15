import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const AddBank = () => {
    return (
        <View style={styles.container}>
            <Text>
                ADD BANK ACCOUNT HERE
            </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },


})

export default AddBank;
