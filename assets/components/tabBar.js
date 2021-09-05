import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const BottomNavigator = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={styles.header}>
      <View style={styles.navi}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key
            });
          };
          const image = [
            require("../images/navi/n2.jpg"),
            require("../images/navi/n1.jpg"),
            require("../images/navi/n3.jpg"),
            require("../images/navi/n4.jpg")
          ];
          const image2 = [
            require("../images/navi/n2.jpg"),
            require("../images/navi/n1.jpg"),
            require("../images/navi/n3.jpg"),
            require("../images/navi/n4.jpg")
          ];
          const styling = [
            styles.navi1,
            styles.navi2,
            styles.navi3,
            styles.navi4
          ];
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <Image
                style={styling[index]}
                source={isFocused ? image2[index] : image[index]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //Navigationbar
  header: {
    backgroundColor: "white",
    width: windowWidth*0.9,
    height: windowHeight * 0.1,
    position: "absolute",
    bottom: "3%",
    left: windowWidth*0.05,
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  navi: {
    flex: 1,
    flexDirection: "row",
    width: windowWidth*0.67,
    marginTop: 10,
    marginLeft: windowWidth * 0.015,
  },
  navi1: {
    marginTop: 3,
    width: windowWidth * 0.15,
    height: windowHeight * 0.07,
  },
  navi2: {
    marginTop: 2,
    width: windowWidth * 0.2,
    height: windowHeight * 0.07,
    resizeMode: "contain"
  },
  navi3: {
    marginLeft: 5,
    width: windowWidth * 0.15,
    height: windowHeight * 0.07,
  },
  navi4: {
    marginTop: 2,
    width: windowWidth * 0.38,
    height: windowHeight * 0.07,
  }
});
export default BottomNavigator;
