import React, { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import { View } from 'react-native';
import { styles } from './styles';

import { initializeApp } from 'firebase/app';
import { getDatabase , ref, update } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyDMaoMd9JHWrnG2_qlskyaq4nFZN88tmcY',
    authDomain: 'project-id.firebaseapp.com',
    databaseURL: 'https://ryde-env-default-rtdb.firebaseio.com',
    projectId: 'ryde-env',
    storageBucket: 'ryde-env.appspot.com',
    messagingSenderId: 'sender-id',
    appId: 'app-id',
    measurementId: 'G-measurement-id',
};

const VolumeSlider = () => {
    const [volume, setVolume] = useState(0.5);

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    const handleVolumeChange = (value) => {
        setVolume(value);

        const dbRef = ref(database, '/tv-volumes');
        const updatedVolume = {
            'tv-one-volume': volume
        };

        update(dbRef, updatedVolume);
    }

    return (
        <>
            <View style={styles.container} blurType='light' blurAmount={20}>
                <Slider 
                    style={styles.slider} 
                    minimumValue={0} 
                    maximumValue={1} 
                    minimumTrackTintColor='#fff' 
                    maximumTrackTintColor='#000'
                    onValueChange={(value) => handleVolumeChange(value)}
                    value={0.3}
                />
            </View>
        </>
    )
}

export default VolumeSlider;