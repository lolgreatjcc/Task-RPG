import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';

export default class App extends Component {
  render() {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var daysInMonth = new Date(year, month, 0).getDate();

    const SingleObj = ({ day }) => {
      const date_now = year + '-' + month + '-' + { day }.day;
      const DATEDATA = global.tasks[date_now];
      const SubTask = ({ name, description})=> (
        <View>
            <Text style={{}}>{name}</Text>
            <Text style={{}}>{description}</Text>
        </View>
      )
      const TaskLst = ({ name, cat, description, enddate, notif, subtask }) => {
        console.log({ subtask }.subtask);
        var subtasks = [];
        for (var i =0; i<{ subtask }.subtask.length; i++ ){
          console.log("herer");
          console.log(({ subtask }.subtask)[i])
          subtasks.push (<SubTask name={({ subtask }.subtask)[i].name} description={({ subtask }.subtask)[i].description} />);
        }
        return (
          <View style={{}}>
            <Text style={{}}>{name}</Text>
            <Text style={{}}>{cat}</Text>
            <Text style={{}}>{description}</Text>
            <Text style={{}}>{enddate}</Text>
            <Text style={{}}>{notif}</Text>
            {subtasks}
          </View>
        );
      };

      const renderItem = ({ item }) => (
        <TaskLst
          name={item.name}
          cat={item.category}
          description={item.description}
          enddate={item.enddate}
          notif={item.notif}
          subtask={item.subtask}
        />
      );

      return (
        <View style={styles.extraContainer}>
          <View style={styles.icon}>
            <Text style={[styles.text, styles.heading]}>
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
      for (var i = 0; i < daysInMonth; i++) {
        timeline.push(<SingleObj day={i + 1} />);
      }
      return timeline;
    };
    return (
      <View style={styles.parent}>
      
        <ScrollView>
          <Timeline />
        </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
  },
  extraContainer: {
    paddingLeft: 7.5,
  },
  componentContainer: {
    borderLeftWidth: 1,
    paddingLeft: 10,
    paddingBottom: 30,
    borderColor: 'grey',
    position: 'relative',
    overflow: 'visible', // doesn't do anything
  },
  icon: {
    backgroundColor: '#ff0000',
    position: 'absolute',
    top: 0,
    left: 0,
    // zIndex: 100,
    // elevation: 100,
  },
  last: {
    borderColor: 'white',
  },
});
