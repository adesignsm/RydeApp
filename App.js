import { View, ImageBackground, StyleSheet } from "react-native";
import Header from "./Components/Header";
import ControlPanel from "./Components/ControlPanel";

const ALUMINUM_TEXTURE = require("./Media/aluminumTexture.png");

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={ALUMINUM_TEXTURE} style={styles.imageBackground}>
          <View style={styles.overlay}>
            <Header />
            <ControlPanel />
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    height: '100%',
    backgroundColor: 'rgba(207,201,196, 0.4)',
  }
});