import React from 'react';
import { Touchable } from 'react-native';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Stars } from './Stars';

const { width } = Dimensions.get('window');
const CONTAINER_WIDTH = width / 2;
const PADDING = 16;
const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING * 2;

export const ShopReviewItem = ({ shop, onPress }) => {
    const { name, place, imageUrl, score } = shop;
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.placeText}>{place}</Text>
            <Stars score={shop.score}></Stars>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CONTAINER_WIDTH,
        padding: 16,
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_WIDTH * 0.7,
    },
    nameText: {
        fontSize: 16,
        color: '#000',
        marginTop: 8,
        fontWeight: 'bold',
    },
    placeText: {
        fontSize: 12,
        color: '#888',
        marginTop: 8,
    },
});
