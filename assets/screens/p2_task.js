import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default class App extends Component {
  render() {
    const { navigation } = this.props;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var daysInMonth = new Date(year, month, 0).getDate();

    const SingleObj = ({ day }) => {
      const date_now = year + '-' + month + '-' + { day }.day;
      const DATEDATA = global.tasks[date_now];


      const SubTask = ({ name, duration }) => (
        <View style={{ borderRadius : 10, padding: 10, marginLeft: 30 , marginTop: 10, backgroundColor: '#ff8a5b',borderWidth: 2, borderColor:'#B56F53',}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DurationScreen',  { name: {name}, duration: {duration} });
            }}>
            <Text style={{color:'white', fontSize: 18}}>{name}</Text>
            <Text style={{color:'white'}}>{duration}</Text>
          </TouchableOpacity>
        </View>
      );

      const TaskList = ({ name, cat, duration, enddate, notif, subtask }) => {
        console.log({ subtask }.subtask);
        var subtasks = [];
        for (var i = 0; i < { subtask }.subtask.length; i++) {
          console.log('herer');
          console.log({ subtask }.subtask[i]);
          subtasks.push(
            <SubTask
              name={{ subtask }.subtask[i].name}
              duration={{ subtask }.subtask[i].duration}
            />
          );
        }
        return (
          <>
         
            <View style={{ backgroundColor: '#EA526F', borderRadius : 10, padding: 10, marginTop: 10, borderWidth: 2, borderColor:'#A84D5F',}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DurationScreen',  { name: {name}, duration: {duration} });
                }}>
                <Text style={{fontSize: 18, marginVertical: 2, color: 'white', fontWeight: '600'}}>{name}</Text>
                <Text style={{ marginVertical: 2, color: 'white'}}>Duration: {duration}</Text>
                <Text style={{ marginVertical: 2, color: 'white'}}>Category: {cat}</Text>
                <Text style={{ marginVertical: 2, color: 'white'}}>Due By: {enddate}</Text>

              </TouchableOpacity>
            </View>
        
            {subtasks}
          </>
        );
      };

      const renderItem = ({ item }) => (
        <TaskList
          name={item.name}
          cat={item.category}
          duration={item.duration}
          enddate={item.enddate}
          notif={item.notif}
          subtask={item.subtask}
        />
      );

      return (
        <View style={styles.secondaryContainer}>
          <View style={styles.icon}>
            <Text style= {{color: 'white', fontSize: 16}}>
              {{ day }.day.toString().length == 1
                ? '0' + { day }.day
                : '' + { day }.day}
            </Text>
          </View>
          <View style={styles.componentContainer}>
            <View style={styles.content}>
              <FlatList
                data={DATEDATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                listKey={(item, index) => 'D' + index.toString()}
              />
            </View>
          </View>
        </View>
      );
    };

    const Timeline = () => {
      var timeline = [];
      for (var i = new Date().getDate()-1; i < daysInMonth; i++) {
        timeline.push(<SingleObj day={i + 1} />);
      }
      return timeline;
    };

    return (
      <View style={styles.parent}>
       <ImageBackground source={require("../images/backgroundApp.png")} resizeMode="stretch" style={{}}>
        <ScrollView>
       <View style = {{padding: 40,}}>
        <Text style={{fontSize:30, color: 'black', marginLeft:'auto', marginRight: 'auto', marginVertical : 20}}>September 2021</Text>
          <Timeline />
        </View>
        </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
  },
  secondaryContainer: {
    paddingLeft: 7.5,
    marginVertical: 25,
    borderBottomWidth: 2,
    borderBottomColor: 'grey'
  },
  componentContainer: {
    //borderLeftWidth: 1,
    marginLeft: 55,
    paddingLeft: 10,
    paddingBottom: 30,
   //borderColor: 'grey',
    position: 'relative',
  },
  icon: {
    backgroundColor: '#25CED1',
    padding: 18, 
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 10,
    borderColor: '#329899',
    borderWidth: 2,
    overflow: 'hidden',
  },
  last: {
    borderColor: 'white',
  },

});
