import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { ShopDetail } from '../components/ShopDetail';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { getReviews } from '../lib/firebase';
import { ReviewItem } from '../components/ReviewItem';
import { ReviewsContext } from '../contexts/reviewsContext';

export const ShopScreen = ({ navigation, route }) => {
    const { shop } = route.params;
    const { reviews, setReviews } = useContext(ReviewsContext);

    useEffect(() => {
        navigation.setOptions({ title: shop.name });

        const fetchReviews = async () => {
            const reviews = await getReviews(shop.id);
            setReviews(reviews);
        };
        fetchReviews();
    }, [shop]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ListHeaderComponent={<ShopDetail shop={shop} />}
                data={reviews}
                renderItem={({ item }) => <ReviewItem review={item} />}
                keyExtractor={(item) => item.id}
            />
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
