import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  UIManager,
  Platform,
  Pressable,
  LayoutAnimation,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
Linking
} from "react-native";
import Constants from "expo-constants";
import { Image } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Sucide hotline',
    description: '1800-221 4444',
    url: 'https://www.gov.sg/article/call-these-helplines-if-you-need-emotional-or-psychological-support',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Depression',
    description: 'How to deal with depression',
    url: 'https://www.helpguide.org/articles/depression/coping-with-depression.htm',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f53',
    title: 'National Care Hotline',
    description: '1800-202-6868',
    url: 'https://www.gov.sg/article/call-these-helplines-if-you-need-emotional-or-psychological-support',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e24d72',
    title: 'Institute of Mental Health’s Helpline',
    description: '6389-2222',
    url: 'https://www.imh.com.sg/',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Schizophrenia',
    description: 'What is Schizophrenia',
    url: 'https://www.psychiatry.org/patients-families/schizophrenia/what-is-schizophrenia#:~:text=Schizophrenia%20is%20a%20chronic%20brain,thinking%20and%20lack%20of%20motivation.',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad554bb28ba',
    title: 'TOUCHline (Counselling)',
    description: '1800 377 2252',
    url: 'https://www.touch.org.sg/about-touch/our-services/touch-cyber-wellness-homepage/contact-us',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd34551aa97f63',
    title: 'Samaritans of Singapore',
    description: '1800-221-4444',
    url: 'https://www.sos.org.sg/?gclid=CjwKCAjwruSHBhAtEiwA_qCppi95tisfPjl1E4Zu5OC8pCizvHRPYl1T4xSPgzi5QDqMfGj_6EFeIxoCh-AQAvD_BwE',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455234e29d72',
    title: 'Silver Ribbon Singapore',
    description: '6385-3714',
    url: 'https://www.silverribbonsingapore.com/',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'AIC Hotline',
    description: '1800 650 6060',
    url: 'https://www.aic.sg/',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d42',
    title: 'Tinkle Friend Helpline',
    description: '1800 274 4788',
    url: 'https://www.tinklefriend.sg/',
  },
];


const handleClick = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

const Item = ({ title, description, url }) => (
  <View>
    <TouchableOpacity style={styles.item} onPress={()=>{
  handleClick({url}.url)}}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{description}</Text>
    </TouchableOpacity>
  </View>
);

  const renderItem = ({ item }) => (
    <Item title={item.title} description={item.description} url={item.url} />
  );

export default function App() {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [currentHealth, setcurrentHealth] = useState(global.level);
  const [maxHealth, setMaxHealth] = useState(50);
  const [img, setImg] = useState(require("../images/monster/attacked.gif"));
  const [percentOfMaxHealth, setPercentOfMaxHealth] = useState(currentHealth/maxHealth * 100+"%");
  if (currentHealth!=global.level){
    setcurrentHealth(global.level)
    console.log(currentHealth)
    if (global.level==0){
      setPercentOfMaxHealth("0%");
      setImg(require("../images/monster/deadfluffy.gif"));
    } else {
      setPercentOfMaxHealth(global.level/maxHealth * 100+"%")
    }
  }
  function reduceHealthby5() {
    if (currentHealth > 0) {
      var tempHealth = currentHealth - 5;
      var tempPercent = (tempHealth / maxHealth) * 100 + "%";
      setcurrentHealth(tempHealth);
      setPercentOfMaxHealth(tempPercent);
    }
  }

  return (
    <>
    <Image
        source={require("../images/background/task.jpg")}
        style={styles.imageBackground}
      />
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.helptxt}>Achievement</Text>
        <Pressable
          style={styles.expandableAchievements}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setExpanded1(!expanded1);
          }}
        >
          <Text
            style={[styles.expandableAchievementsTitle, styles.monsterDone]}
          >
            Level 1: Procrastinator
          </Text>
        </Pressable>
        {expanded1 && (
          <View style={styles.container}>
            <Text style={styles.paragraph}>Congratulations</Text>
            <Text style={styles.paragraph}>
              You have successfully completed 30 tasks.
            </Text>
            <Image
              source={require("../images/monster/slimerest.gif")}
              style={styles.fimage}
            ></Image>
          </View>
        )}
      </View>
      <View>
        <Pressable
          style={styles.expandableAchievements}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setExpanded2(!expanded2);
          }}
        >
          <Text style={styles.expandableAchievementsTitle}>
            Level 2: Anxiety, Destroyer of Worlds
          </Text>
        </Pressable>
        {expanded2 && (
          <View style={styles.expandedView}>
            <Text style={styles.currentEnemyHead}>Current Enemy</Text>
            <Image
              source={img}
              style={styles.image}
            ></Image>
            <Text style={styles.monsterName}>Anxiety, Destroyer of Worlds</Text>
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
                  style={[
                    styles.healthPointsBar,
                    { width: percentOfMaxHealth }
                  ]}
                ></View>
                <Text style={styles.healthPointsText}>
                  {currentHealth}/{maxHealth}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <View></View>
      <View>
        <Pressable style={styles.expandableAchievements} onPress={() => {}}>
          <Text style={[styles.expandableAchievementsTitle]}>
            Level 3: Stress (Locked)
          </Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.helptxt}>Helpful Hotlines</Text>
        <FlatList
        numColumns={2}
       style={styles.fcontainer}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom:"25%"}} 
      />
      </View>

    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  image: {
    marginLeft: "auto",
    marginRight: "auto",
    width: windowWidth * 0.7,
    height: windowHeight * 0.4,
    resizeMode: 'contain'
  },
  fimage: {
    marginLeft: "-12",
    marginRight: "auto",
    width: windowWidth * 1,
    height: windowHeight * 0.4,
    resizeMode: "contain"
  },
  expandableAchievements: {
    backgroundColor: "white",
    borderColor: "black",
    borderTopWidth: "1px",
    borderBottomWidth: "1px"
  },
  expandableAchievementsTitle: {
    padding: 16,
    fontSize: 16
  },
  monsterDone: {
    textDecorationLine: "line-through",
    color: "grey"
  },
  expandedView: {
    padding: 20
  },
  currentEnemyHead: {
    fontWeight: "bold",
    fontSize: 16
  },
  monsterName: {
    marginTop: 10,
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  healthBar: {
    width: "87%",
    height: 40,
    backgroundColor: "grey",
    marginLeft: 7,
    transform: [{ skewX: "-10deg" }]
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  helptxt:{
    fontSize: "25%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10%",
    marginBottom: "15%",
  },
  fcontainer: {
    height: "100%",
    marginLeft: "2%",
  },
  item: {
    borderColor:'grey',
    borderRightWidth:2,
    borderBottomWidth:2,
    overflow: 'hidden',
    shadowColor: 'grey',
    shadowRadius: 10,
    shadowOpacity: 1,

    backgroundColor: 'white',
    width: windowWidth*0.4,
    height: windowHeight*0.16,
    padding: 20,
    marginVertical: 25,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 15,
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
