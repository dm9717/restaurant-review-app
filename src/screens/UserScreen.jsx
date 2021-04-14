import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

export const UserScreen = ({ navigation, route }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>UserScreen</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
