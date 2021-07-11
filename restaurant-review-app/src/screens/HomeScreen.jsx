import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import { getShops } from '../lib/firebase';
import { ShopReviewItem } from '../components/ShopReviewItem';

export const HomeScreen = ({ navigation }) => {
    const [shops, setShops] = useState([]);

    // The first arugment is called when the second argument is changed.
    // But since it is an empty array in this case, the first argument
    // is called only once when the screen is mounted.
    useEffect(() => {
        getFirebaseItems();
    }, []);

    const getFirebaseItems = async () => {
        const shops = await getShops();
        // setShops(shops) is called after snapshot is retrieved, because this is an async function.
        // If this is not were an async function, setShops(shops) is executed while/before snapshot is retrieved
        setShops(shops);
    };

    const onPressShop = (shop) => {
        navigation.navigate('Shop', { shop });
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={shops}
                // renderItem is a function
                renderItem={({ item }) => (
                    <ShopReviewItem shop={item} onPress={() => onPressShop(item)} />
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
