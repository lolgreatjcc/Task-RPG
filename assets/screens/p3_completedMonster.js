import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Dimensions
} from "react-native";
import Carousel from "../components/carousel"
import Constants from "expo-constants";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function App() {
  const [currentHealth, setcurrentHealth] = useState(global.level);
  const [maxHealth, setMaxHealth] = useState(50);
  const [percentOfMaxHealth, setPercentOfMaxHealth] = useState("100%");
  const [currentMonsterName, setCurrentMonsterName] = useState("Anxiety");
  const [monsterAttacked, setMonsterAttacked] = useState(
    require("../images/monster/attacked.gif")
  );
  const [monsterIdle, setMonsterIdle] = useState(require("../images/monster/restfluffy.gif"));
  const [monsterDeath, setmMonsterDeath] = useState(
    require("../images/monster/deadfluffy.gif")
  );
  const [currentImage, setCurrentImage] = useState(monsterIdle);
  const [offsetImage, setCurrentOffsetImage] = useState(40);

  function reduceHealthby5() {
    if (currentHealth >= 0) {
      var tempHealth = currentHealth - 5;
      var tempPercent = (tempHealth / maxHealth) * 100 + "%";
      var tempImage = currentImage;
      global.level = tempHealth;
      setcurrentHealth(tempHealth);
      setPercentOfMaxHealth(tempPercent);

      if (tempHealth > 0) {
        setCurrentOffsetImage(0);
        setCurrentImage(monsterAttacked);
        setTimeout(() => {
          setCurrentImage();
          setCurrentImage(monsterIdle);
          setCurrentOffsetImage(40);
        }, 3600);
      } else {
        setCurrentImage(monsterDeath);
      }
    }
  }

  if(global.attack == 1){
    reduceHealthby5();
    global.attack=0;
  }
  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          marginTop: 12,
          marginBottom: 12
        }}
      >
        {currentMonsterName}, Destroyer of Worlds
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Lv.2</Text>
        <View style={styles.healthBar}>
          <View
            style={[styles.healthPointsBar, { width: percentOfMaxHealth }]}
          ></View>
          <Text style={styles.healthPointsText}>
            {currentHealth} / {maxHealth}
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Image
          key={monsterIdle}
          source={currentImage}
          style={[styles.image, { marginLeft: offsetImage }]}
        />
      </View>
      
          <View style={styles.carousel}>
            <Carousel />
          </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20
  },
  healthBar: {
    width: "87%",
    height: 40,
    backgroundColor: "grey",
    marginLeft: 10,
    transform: [{ skewX: "-15deg" }]
  },
  healthPointsBar: {
    height: "100%",
    backgroundColor: "green"
  },
  healthPointsText: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 13,
    paddingTop: 7,
    color: "white"
  },
  image: {
    height: Dimensions.get("window").height * 0.3,
    resizeMode: "contain"
  },
  carousel: {
    width: windowWidth*0.4,
    height: windowHeight,
    position: "absolute",
    top: windowHeight*0.5,
    left: windowWidth*0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
