import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { ShopDetail } from '../components/ShopDetail';
import { FloatingActionButton } from '../components/FloatingActionButton';

export const ShopScreen = ({ navigation, route }) => {
    const { shop } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: shop.name });
    }, [shop]);

    return (
        <SafeAreaView style={styles.container}>
            <ShopDetail shop={shop} />
            <FloatingActionButton
                iconName="plus"
                onPress={() => navigation.navigate('CreateReview', { shop })}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
});
