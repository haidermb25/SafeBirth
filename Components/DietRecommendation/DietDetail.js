import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DietDetail = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Diet Detail</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default DietDetail;