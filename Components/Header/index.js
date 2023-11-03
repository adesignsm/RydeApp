import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const Header = () => {
    const [fontsLoaded] = useFonts({
        'RydeRegular': require('../../Fonts/RydeSans-Regular.otf'),
        'RydeBold': require('../../Fonts/RydeSans-Bold.otf'),
        'RydeBlack': require('../../Fonts/RydeSans-Black.otf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.headerContainer}>
            <View>
                <Text style={styles.headingText}>Ryde:</Text>
                <Text style={styles.subHeadingText}>Sound Shower Experience</Text>
            </View>
            <View>
                <Text style={styles.instructionsText}>Tap the option below to trigger the experience</Text>
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 45,
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
    },
    headingText: {
        fontFamily: 'RydeBlack',
        fontSize: 72
    },
    subHeadingText: {
        fontFamily: 'RydeBold',
        fontSize: 26,
        width: 300,
    },
    instructionsText: {
        fontFamily: 'RydeBold',
        fontSize: 20,
        textAlign: 'right',
        width: 250,
        marginTop: 20,
        marginRight: 70
    }
});
