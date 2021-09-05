import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Audio } from 'expo-av';



export default function App({ navigation , route}) {
  const { name, duration } = route.params;
  const [statusText, setStatusText] = useState("Start");
  const [sname, setSName] = useState({name}.name.name);
  const [sduration, setSDuration] = useState({duration}.duration.duration);
  const [sound, setSound] = useState();

  const playSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../images/alarm.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }
  function changeStatus() {
    if(statusText == "No Time Left"){ 

    }
    else if(statusText == "Start") {
      setStatusText("Pause");
    }else {
      setStatusText("Start");
    }
  }

  const [hourVar, setHourVar] = useState(Math.floor(sduration/3600));
  var leftDuration = sduration - (Math.floor(sduration/3600)*3600)
  const [minuteVar, setMinuteVar] = useState(Math.floor(leftDuration/60));
  leftDuration = leftDuration - (Math.floor(leftDuration/60)*60)
  const [secondVar, setSecondVar] = useState(leftDuration);
  

  
  if(statusText == "Pause") {
    setTimeout(() => {
      if(secondVar == 0) {
        if(minuteVar > 0) {
          setSecondVar(59);
          setMinuteVar(minuteVar - 1);
          
        }
        if(minuteVar == 0) {
          if(hourVar >= 1) {
            setSecondVar(59);
            setMinuteVar(59);
            
            setHourVar(hourVar - 1);
            
            
          }
        }
      }else {
        setSecondVar(secondVar - 1);
      }
       }, 1000);

    if(hourVar == 0 && minuteVar == 0 && secondVar == 1) {
      playSound();
      Alert.alert("Time is Up!!");
      setStatusText("No Time Left");
    }
  }

  if(hourVar.toString().length == 1) {
    setHourVar("0" + hourVar)
  }
  if(minuteVar.toString().length == 1) {
    setMinuteVar("0" + minuteVar)
  }
  if(secondVar.toString().length == 1) {
    setSecondVar("0" + secondVar)
  }

  return (
    //<View style={{backgroundColor: '#ffffff'}}>
    <ScrollView style={styles.container}>
      <View style={styles.taskNameBox}>
        <View style={{paddingLeft: 10, paddingRight: 10}}>
        <Text style={{fontSize: 18}}>{sname} </Text>
        <Text style={{textAlign: "right", fontSize: 18}}>Time: {sduration} Sec</Text>
        </View>
      </View>
      <View style={styles.timerBox}>
        <Text style={{color:'white', fontSize: 18, fontWeight: 'bold'}}>Timer</Text>
      </View>


      <View style={{height: '80%', width: '90%', marginLeft: 'auto', marginRight: 'auto',alignItems: "center",justifyContent: "center"}}>
      <View style={styles.countdownBox}>
        <Text style={styles.countdownText}>{hourVar}</Text>
        <Text style={styles.countdownText}> : </Text>
        <Text style={styles.countdownText}>{minuteVar}</Text>
        <Text style={styles.countdownText}> : </Text>
        <Text style={styles.countdownText}>{secondVar}</Text>
      </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Pressable style={[styles.stateButtons, {backgroundColor: '#bfff8c'}]} onPressIn={() => changeStatus()}>
          <Text style={styles.stateButtonsText}>{statusText}</Text>
        </Pressable>
        <Pressable style={[styles.stateButtons, {backgroundColor: '#ff8c8c'}]} onPress={() => {
              global.attack = 1;
              navigation.navigate('CompletedScreen');
            }}>
          <Text style={styles.stateButtonsText}>Completed</Text>
        </Pressable>
      </View>
    </ScrollView>
    //</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#ffffff',
    padding: 8,
    paddingTop: 150
  },
  taskNameBox: {
    borderColor: 'black',
    borderWidth: '3px',
    width: '90%',
    marginTop:20,
    marginBottom: 0,
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: '6px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  timerBox: {
    backgroundColor: 'black',
    color: 'white',
    height: '20px',
    width: '20px',
    padding: 10,
    borderRadius: 8,
    position: 'absolute'
  },
  countdownBox: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 28,
    borderRadius: 12
  },
  countdownText: {
    fontSize: 56,
    fontWeight: 700,
    color: 'white'
  },
  stateButtons: {
    width: '40%',
    padding:24,
    borderRadius: 12
  },
  stateButtonsText: {
    color: 'black',
    fontSize: 18,
    fontWeight: "bold",
    marginRight: "auto",
    marginLeft: "auto"
  },
});