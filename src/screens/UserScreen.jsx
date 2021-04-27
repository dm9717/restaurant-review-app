import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { Form } from '../components/Form';
import { Button } from '../components/Button';
import { UserContext } from '../contexts/userContext';
import { updateUser } from '../lib/firebase';
import firebase from 'firebase';
import { Loading } from '../components/Loading';

export const UserScreen = ({ navigation, route }) => {
    const { user, setUser } = useContext(UserContext);
    const [name, setName] = useState(user.name);
    const [loading, setLoading] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <Form
                value={name}
                onChangeText={(text) => {
                    setName(text);
                }}
                label={'Name'}
            />
            <Button
                onPress={async () => {
                    setLoading(true);
                    const updatedAt = firebase.firestore.Timestamp.now();
                    await updateUser(user.id, { name: name, updatedAt: updatedAt });
                    setUser({ ...user, name: name, updatedAt: updatedAt });
                    setLoading(false);
                }}
                text="Save"
            />
            <Loading visible={loading} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
