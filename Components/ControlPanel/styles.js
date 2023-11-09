import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
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

export const styles = StyleSheet.create({
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
        transform: [{scale: 0.8}],
        marginTop: -230,
    },
    text: {
        marginTop: -45,
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
    },
});

export const dropDownStyles = StyleSheet.create({
    dropDownContainer: {
        position: 'absolute',
        left: '40%',
        top: -310,
        width: 230,
        height: 100,
        opacity: 0.9,
        zIndex: 1,
    },
    dropdown: {
        borderColor: 'transparent',
    },
    dropdownText: {
        fontFamily: 'RydeBold'
    },
    itemDisabled: {
        opacity: 0.1
    },
    dropDownOptionsContainer: {
        borderColor: 'transparent',
    },
});