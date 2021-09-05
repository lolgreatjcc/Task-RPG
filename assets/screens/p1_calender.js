import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView } from "react-native";
import Cal from '../components/calendar';
import schedulePushNotification from '../components/notif';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const App = () => {
  if (global.notif ==0){
  schedulePushNotification()
  global.notif =1;
  }
  return ( 
    <>
    <Image
        source={require("../images/background/cal.jpg")}
        style={styles.imageBackground}
      />
      <SafeAreaView>
    <View style={styles.background}>
      
        <View>
            <Text style={styles.baseText}> Task RPG</Text>
        </View>
      <Cal/>
    </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  baseText: {
    marginTop: windowHeight*0.05,
    fontSize: 34,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: windowHeight*0.03,
  },
  subText: {

    marginBottom: windowHeight*0.03,
    fontSize: 30,
    marginRight: "auto",
    marginLeft: "auto"
  },
  
  imageBackground: {
    zIndex: -9,
    position: "absolute",
    top: 0,
    bottom: 0,
    width: windowWidth,
    height: windowHeight,
    resizeMode: "cover"
  },
});

export default App;
