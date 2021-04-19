import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { IconButton } from '../components/IconButton';

export const CreateReviewScreen = ({ navigation, route }) => {
    const { shop } = route.params;
    useEffect(() => {
        navigation.setOptions({
            title: shop.name,
            headerLeft: () => <IconButton name="x" onPress={() => navigation.goBack()} />,
        });
    }, [shop]);

    return (
        <SafeAreaView style={styles.container}>
            <Text>Create Review Screen</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
