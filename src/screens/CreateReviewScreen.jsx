import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Alert, ScrollView } from 'react-native';
import { IconButton } from '../components/IconButton';
import { TextArea } from '../components/TextArea';
import { StarInput } from '../components/StarInput';
import { Button } from '../components/Button';
import { createReviewRef, uploadImage } from '../lib/firebase';
import { UserContext } from '../contexts/userContext';
import firebase from 'firebase';
import { pickImage } from '../lib/image-picker';
import { getExtension } from '../utils/file';
import { Loading } from '../components/Loading';
import { ReviewsContext } from '../contexts/reviewsContext';

export const CreateReviewScreen = ({ navigation, route }) => {
    const { shop } = route.params;
    const { user } = useContext(UserContext);
    const [text, setText] = useState('');
    const [score, setScore] = useState(3);
    const [imageUri, setImageUri] = useState('');
    const [loading, setLoading] = useState(false);
    const { reviews, setReviews } = useContext(ReviewsContext);

    useEffect(() => {
        navigation.setOptions({
            title: shop.name,
            headerLeft: () => <IconButton name="x" onPress={() => navigation.goBack()} />,
        });
    }, [shop]);

    const onSubmit = async () => {
        if (!text || !imageUri) {
            Alert.alert("The review is empty or you haven't uploaded an image.");
            return;
        }

        setLoading(true);

        // Add a new document with a generated id.
        const reviewDocRef = await createReviewRef(shop.id);
        // Set the path of an image on Cloud Storage
        const ext = getExtension(imageUri);
        const storagePath = `reviews/${reviewDocRef.id}.${ext}`;
        // Upload the image to Cloud Storage
        const donwloadUrl = await uploadImage(imageUri, storagePath);
        // Make a Review document

        const review = {
            id: reviewDocRef.id,
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
            imageUrl: donwloadUrl,
            updatedAt: firebase.firestore.Timestamp.now(),
            createdAt: firebase.firestore.Timestamp.now(),
        };
        // Behind the scenes, .add(...) and .doc().set(...) are completely equivalent, so you can use whichever is more convenient.
        await reviewDocRef.set(review);
        setReviews([review, ...reviews]);
        setLoading(false);
        navigation.goBack();
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
            <Loading visible={loading} />
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
