import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image } from 'react-native';
import { IconButton } from '../components/IconButton';
import { TextArea } from '../components/TextArea';
import { StarInput } from '../components/StarInput';
import { Button } from '../components/Button';
import { addReview } from '../lib/firebase';
import { UserContext } from '../contexts/userContext';
import firebase from 'firebase';
import { pickImage } from '../lib/image-picker';

export const CreateReviewScreen = ({ navigation, route }) => {
    const { shop } = route.params;
    const { user } = useContext(UserContext);
    const [text, setText] = useState('');
    const [score, setScore] = useState(3);
    const [imageUri, setImageUri] = useState('');

    useEffect(() => {
        navigation.setOptions({
            title: shop.name,
            headerLeft: () => <IconButton name="x" onPress={() => navigation.goBack()} />,
        });
    }, [shop]);

    const onSubmit = async () => {
        const review = {
            user: {
                name: user.name,
                id: user.id,
            },
            shop: {
                name: shop.name,
                id: shop.id,
            },
            text,
            score,
            updatedAt: firebase.firestore.Timestamp.now(),
            createdAt: firebase.firestore.Timestamp.now(),
        };
        await addReview(shop.id, review);
    };

    const onPickImage = async () => {
        const uri = await pickImage();
        setImageUri(uri);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StarInput score={score} onChangeScore={(value) => setScore(value)} />
            <TextArea
                value={text}
                onChangeText={(value) => setText(value)}
                label="Review"
                placeholder="Write a review"
            />
            <View style={styles.photoContainer}>
                <IconButton name="camera" onPress={onPickImage} color="#ccc" />
                {!!imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            </View>
            <Button text="Post a review" onPress={onSubmit} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    photoContainer: {
        margin: 8,
    },
    image: {
        width: 100,
        height: 100,
        margin: 8,
    },
});
