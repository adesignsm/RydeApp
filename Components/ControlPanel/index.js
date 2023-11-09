import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Image, Text, View, TouchableOpacity, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { buttonStyles, dropDownStyles, styles } from './styles';
import VolumeSlider from '../VolumeSlider';

import ENERGIZE_BOTTLE from '../../Media/energizeBottle.png';
import FOCUS_BOTTLE from '../../Media/focusBottle.png';
import RELAX_BOTTLE from '../../Media/relaxBottle.png';

import { initializeApp } from 'firebase/app';
import { getDatabase , ref, get, child, update } from 'firebase/database';

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

const ControlPanel = () => {
    const [energizePlaying, setEnergizePlaying] = useState(false);
    const [focusPlaying, setFocusPlaying] = useState(false);
    const [relaxPlaying, setRelaxPlaying] = useState(false);

    const [energizeDiasbled, setEnergizeDiasbled] = useState(false);
    const [focusDiasbled, setFocusDiasbled] = useState(false);
    const [relaxDiasbled, setRelaxDiasbled] = useState(false);

    const [liftedEnergize] = useState(new Animated.Value(0));
    const [liftedFocus] = useState(new Animated.Value(0));
    const [liftedRelax] = useState(new Animated.Value(0));

    const [tvOneStatus, setTvOneStatus] = useState(true);
    const [tvTwoStatus, setTvTwoStatus] = useState(true);
    const [tvThreeStatus, setTvThreeStatus] = useState(true);

    const [menuOpen, setMenuOpen] = useState(false);
    const [menuVal, setMenuVal] = useState(null);
    const items = [
        {label: 'TV One', value: 'tv-one',},
        {label: 'TV Two', value: 'tv-two',},
        {label: 'TV Three', value: 'tv-three',}
    ];

    const energizeContainerAnimationStyle = { transform: [{ translateY: liftedEnergize }] };
    const focusContainerAnimationStyle = { transform: [{ translateY: liftedFocus }] };
    const relaxContainerAnimationStyle = { transform: [{ translateY: liftedRelax }] };

    const [fontsLoaded] = useFonts({
        'RydeRegular': require('../../Fonts/RydeSans-Regular.otf'),
        'RydeBold': require('../../Fonts/RydeSans-Bold.otf'),
        'RydeBlack': require('../../Fonts/RydeSans-Black.otf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    DropDownPicker.setTheme('LIGHT');

    const getTvProfiles = () => {
        const dbRef = ref(database);
        get(child(dbRef, '/tv-profiles')).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setTvOneStatus(data['tv-one'].status);
                setTvTwoStatus(data['tv-two'].status);
                setTvThreeStatus(data['tv-three'].status);
            } else {
                console.log('no data');
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    getTvProfiles();

    const handleItemSelect = (item) => {
        const dbRef = ref(database, '/tv-profiles');

        const updates = {};
        updates[item.value] = {
          status: true,
          experience: item.value === 'tv-one'
            ? 'none'
            : (
              (item.value === 'tv-two' && (tvTwoStatus === 'energize' || tvTwoStatus === 'focus' || tvTwoStatus === 'relax')) ||
              (item.value === 'tv-three' && (tvThreeStatus === 'energize' || tvThreeStatus === 'focus' || tvThreeStatus === 'relax'))
            ) ? item.value : 'some_value',
        };
        
        update(dbRef, updates);
    
        // Get the experience of the currently selected TV option
        const selectedExperience = updates[item.value].experience; // Use `updates` instead of `updatedData`

        // Set the disabled states based on the selected experience
        setEnergizeDiasbled(selectedExperience !== 'none' && selectedExperience !== 'some_value');
        setFocusDiasbled(selectedExperience !== 'none' && selectedExperience !== 'some_value');
        setRelaxDiasbled(selectedExperience !== 'none' && selectedExperience !== 'some_value');

        setEnergizePlaying(selectedExperience === 'energize');
        setFocusPlaying(selectedExperience === 'focus');
        setRelaxPlaying(selectedExperience === 'relax');

        // No need to update TV statuses as it's handled in the Firebase update

        if (energizePlaying) {
        Animated.spring(liftedEnergize, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
        } else if (focusPlaying) {
        Animated.spring(liftedFocus, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
        } else if (relaxPlaying) {
        Animated.spring(liftedRelax, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
        }

    }
    
    const handleEnergyPlay = () => {

        setTvOneStatus({ ...tvOneStatus, experience: 'energize' });
        // setFocusDiasbled(true);
        // setRelaxDiasbled(true);

        Animated.spring(liftedEnergize, {
            toValue: -50,
            duration: 300,
            useNativeDriver: false
        }).start();

        setEnergizePlaying(true);

        const selectedTV = menuVal;

        const updatedData = {
            [selectedTV]: {
            status: tvOneStatus,
            experience: 'energize',
            },
        };

        const dbRef = ref(database, '/tv-profiles');
        update(dbRef, updatedData);
    }
    const handleEnergyStop = () => {
        setEnergizePlaying(false);

        setTvOneStatus({ ...tvOneStatus, experience: 'none' });
        // setFocusDiasbled(false);
        // setRelaxDiasbled(false);

        Animated.spring(liftedEnergize, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start();

        const selectedOption = menuVal;
        if (selectedOption) {
            const dbRef = ref(database, '/tv-profiles');
            
            // Check the current experience for the selected TV option
            get(child(dbRef, selectedOption)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const currentExperience = data.experience;
                
                // If the current experience is "none," update the status to false
                if (currentExperience === 'energize') {
                    const updatedData = {
                        [selectedOption]: {
                            status: false,
                            experience: 'none',
                        },
                    };
                    update(dbRef, updatedData);
                }
            }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const handleFocusPlay = () => {
        setFocusPlaying(true);

        setTvTwoStatus({ ...tvTwoStatus, experience: 'focus' });
        // setFocusDiasbled(true);
        // setRelaxDiasbled(true);

        Animated.spring(liftedFocus, {
            toValue: -50,
            duration: 300,
            useNativeDriver: false
        }).start();

        setFocusPlaying(true);

        const selectedTV = menuVal;

        const updatedData = {
            [selectedTV]: {
                status: tvTwoStatus,
                experience: 'focus',
            },
        };

        const dbRef = ref(database, '/tv-profiles');
        update(dbRef, updatedData);
    }
    const handleFocusStop = () => {
        setFocusPlaying(false);

        // setEnergizeDiasbled(false);
        // setRelaxDiasbled(false);

        Animated.spring(liftedFocus, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start();

        const selectedOption = menuVal;
        if (selectedOption) {
            const dbRef = ref(database, '/tv-profiles');
            
            // Check the current experience for the selected TV option
            get(child(dbRef, selectedOption)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const currentExperience = data.experience;
                
                // If the current experience is "none," update the status to false
                if (currentExperience === 'focus') {
                    const updatedData = {
                        [selectedOption]: {
                            status: false,
                            experience: 'none',
                        },
                    };
                    update(dbRef, updatedData);
                }
            }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const handleRelaxPlay = () => {
        setRelaxPlaying(true);

        setTvTwoStatus({ ...tvThreeStatus, experience: 'relax' });
        // setFocusDiasbled(true);
        // setRelaxDiasbled(true);

        Animated.spring(liftedRelax, {
            toValue: -50,
            duration: 300,
            useNativeDriver: false
        }).start();

        setFocusPlaying(true);

        const selectedTV = menuVal;

        const updatedData = {
            [selectedTV]: {
                status: tvThreeStatus,
                experience: 'relax',
            },
        };

        const dbRef = ref(database, '/tv-profiles');
        update(dbRef, updatedData);
    }
    const handleRelaxStop = () => {
        setRelaxPlaying(false);

        // setFocusDiasbled(false);
        // setEnergizeDiasbled(false);

        Animated.spring(liftedRelax, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start();

        const selectedOption = menuVal;
        if (selectedOption) {
            const dbRef = ref(database, '/tv-profiles');
            
            // Check the current experience for the selected TV option
            get(child(dbRef, selectedOption)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const currentExperience = data.experience;
                
                // If the current experience is "none," update the status to false
                if (currentExperience === 'relax') {
                    const updatedData = {
                        [selectedOption]: {
                            status: false,
                            experience: 'none',
                        },
                    };
                    update(dbRef, updatedData);
                }
            }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    return (
        <View style={styles.container}>
            {/*TV OPTIONS SELECT*/}
            <View style={dropDownStyles.dropDownContainer}>
                <DropDownPicker 
                    style={dropDownStyles.dropdown}
                    textStyle={dropDownStyles.dropdownText}
                    containerStyle={dropDownStyles.dropDownOptionsContainer}
                    dropDownContainerStyle={dropDownStyles.dropDownOptionsContainer}
                    disabledItemLabelStyle={dropDownStyles.itemDisabled}
                    open={menuOpen} 
                    value={menuVal} 
                    items={items} 
                    setOpen={setMenuOpen} 
                    setValue={setMenuVal} 
                    placeholder={'Select a TV'}
                    onSelectItem={(item) => handleItemSelect(item)}
                /> 
            </View>
            {/*ENERGIZE */}
            <Animated.View style={[styles.energizeContainer, energizeDiasbled && styles.disabled, energizeContainerAnimationStyle]}>
                <Image style={styles.image} source={ENERGIZE_BOTTLE} />
                <Text style={styles.text}>Energize</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, energizePlaying ? buttonStyles.playingButton : null]} onPress={handleEnergyPlay} disabled={energizeDiasbled}>
                        <Text style={[styles.buttonText, energizePlaying ? buttonStyles.playingButtonText : null]}>
                            {energizePlaying ? 'Playing' : 'Start'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleEnergyStop} disabled={energizeDiasbled}>
                        <Text style={styles.buttonText}>Stop</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            {/*FOCUS */}
            <Animated.View style={[styles.focusContainer, focusDiasbled && styles.disabled, focusContainerAnimationStyle]}>
                <Image style={styles.image} source={FOCUS_BOTTLE} />
                <Text style={styles.text}>Focus</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, focusPlaying ? buttonStyles.playingButton : null]} onPress={handleFocusPlay} disabled={focusDiasbled}>
                        <Text style={[styles.buttonText, focusPlaying ? buttonStyles.playingButtonText : null]}>
                            {focusPlaying ? 'Playing' : 'Start'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleFocusStop} disabled={focusDiasbled}>
                        <Text style={styles.buttonText}>Stop</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            {/*RELAX */}
            <Animated.View style={[styles.relaxContainer, relaxDiasbled && styles.disabled, relaxContainerAnimationStyle]}>
                <Image style={styles.image} source={RELAX_BOTTLE} />
                <Text style={styles.text}>Relax</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, relaxPlaying ? buttonStyles.playingButton : null]} onPress={handleRelaxPlay} disabled={relaxDiasbled}>
                        <Text style={[styles.buttonText, relaxPlaying ? buttonStyles.playingButtonText : null]}>
                            {relaxPlaying ? 'Playing' : 'Start'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleRelaxStop} disabled={relaxDiasbled}>
                        <Text style={styles.buttonText}>Stop</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
            {energizePlaying ? (
                <VolumeSlider />
            ) : focusPlaying ? (
                <VolumeSlider />
            ) : relaxPlaying ? (
                <VolumeSlider />
            ) : (
                null
            )}
        </View>
    );
}

export default ControlPanel;