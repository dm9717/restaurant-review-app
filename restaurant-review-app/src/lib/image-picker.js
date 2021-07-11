import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const getCameraRollPermission = async () => {
    if (Constants.platform.ios) {
        const { status } = await ImagePicker.getCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert('You need a permission');
        }
    }
};

export const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
    });
    if (!result.cancelled) {
        return result.uri;
    }
};
