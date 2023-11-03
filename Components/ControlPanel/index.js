import { Image, Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useFonts } from 'expo-font';

import ENERGIZE_BOTTLE from '../../Media/energizeBottle.png';
import FOCUS_BOTTLE from '../../Media/focusBottle.png';
import RELAX_BOTTLE from '../../Media/relaxBottle.png';
import { useState } from 'react';

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

    const handleEnergyPlay = () => {
        setEnergizePlaying(true);

        setFocusDiasbled(true);
        setRelaxDiasbled(true);

        Animated.spring(liftedEnergize, {
            toValue: -50,
            duration: 300,
            useNativeDriver: false
        }).start();
    }
    const handleEnergyStop = () => {
        setEnergizePlaying(false);

        setFocusDiasbled(false);
        setRelaxDiasbled(false);

        Animated.spring(liftedEnergize, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start();
    }

    const handleFocusPlay = () => {
        setFocusPlaying(true);

        setEnergizeDiasbled(true);
        setRelaxDiasbled(true);

        Animated.spring(liftedFocus, {
            toValue: -50,
            duration: 300,
            useNativeDriver: false
        }).start();
    }
    const handleFocusStop = () => {
        setFocusPlaying(false);

        setEnergizeDiasbled(false);
        setRelaxDiasbled(false);

        Animated.spring(liftedFocus, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start();
    }

    const handleRelaxPlay = () => {
        setRelaxPlaying(true);

        setFocusDiasbled(true);
        setEnergizeDiasbled(true);

        Animated.spring(liftedRelax, {
            toValue: -50,
            duration: 300,
            useNativeDriver: false
        }).start();
    }
    const handleRelaxStop = () => {
        setRelaxPlaying(false);

        setFocusDiasbled(false);
        setEnergizeDiasbled(false);

        Animated.spring(liftedRelax, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start();
    }

    return (
        <View style={styles.container}>
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
        </View>
    );
}

export default ControlPanel;

const buttonStyles = StyleSheet.create({
    playingButton: {
        backgroundColor: '#fff'
    },
    playingButtonText: {
        color: '#000'
    },
    stopButton: {
        backgroundColor: 'transparent'
    },
    stopButtonText: {
        color: '#fff'
    },
    disabled: {
        opacity: 0.5
    }
});

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        marginTop: 125,
    },
    energizeContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '33.33%',
        backgroundColor: '#EE3831',
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    focusContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '33.33%',
        backgroundColor: '#FFC845',
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    relaxContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '33.33%',
        backgroundColor: '#6A9EF0',
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    image: {
        transform: [{scale: 0.9}],
        marginTop: -180,
    },
    text: {
        marginTop: -35,
        fontFamily: 'RydeBold',
        textTransform: 'uppercase',
        fontSize: 20,
        color: '#fff'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: 25,
    },
    button: {
        borderColor: '#fff',
        borderWidth: 4,
        borderRadius: 15,
        padding: 10,
        width: 150,
        display: 'flex',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        textTransform: 'uppercase',
        fontFamily: 'RydeBold',
    },
    disabled: {
        opacity: 0.5
    }
});
